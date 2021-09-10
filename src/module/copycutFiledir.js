
const fs = require('fs'); // 引入fs模块
const path = require('path');
import writeFile from "./writeFile";
import readFileContent from "./readFileContent";
import readFileList from "./readFileList";
import deleteFile from "./deleteFile";
let log;
/**
    * @function copycutFiledir
    * @param {Object} paramsObj 同步方式，对文件/文件夹执行复制/剪切操作
    * @param {String} paramsObj.inputFileUrl 要复制/剪切的文件/文件夹路径
    * @param {String} paramsObj.outFileUrl 要将文件/文件夹要复制/剪切到哪里(复制目录只能写目录路径，复制文件只能写文件路径)
    * @param {String} paramsObj.copyOrCut  复制还是剪切,值为copy|cut ，默认为复制copy
    * @param {Boolean} paramsObj.showExeResult  是否显示写入操作完后的提示，默认为true：显示。
    * @param {Boolean} paramsObj.rewrite  对于已经存在的文件是否跳过，默认false跳过, d当值为true时表示进行覆盖
    * 
    * @return {Boolean} true/false 表示操作是否成功
    * @author zl-fire 2021/09/10
    * @example
    *  let res1 = copycutFiledir({ fileUrl: "./gggg", flag: true});
    *  console.log("res1",res1)
  */
function copycutFiledir(paramsObj) {
    try {
        let {
            inputFileUrl, //要复制或剪切的文件路径
            outFileUrl, //要把文件或路径复制剪切到哪里
            copyOrCut = "copy",//复制(copy) or 剪切(cut),默认复制
            showExeResult = true,
            rewrite = false,
        } = paramsObj;

        // // 获取文件名
        // let fileName = path.basename(inputFileUrl);
        // console.log("==fileName====", fileName)
        // // 拼接文件名
        // outFileUrl = outFileUrl + "/" + fileName;
        // 标识时文件还是文件夹
        let fileOrDir;//dir|file

        // 控制是否打印删除日志

        if (showExeResult != undefined && showExeResult == false) {
            log = function () { }
        } else if (log == undefined) {
            log = console.log;
        }

        // 先判断文件/文件夹是否存在
        if (!fs.existsSync(inputFileUrl)) {
            log("【 " + inputFileUrl + " 】不存在!");
            return false;
        };

        // 先判断是文件还是文件夹
        if (fs.statSync(inputFileUrl).isDirectory()) {
            fileOrDir = "dir";
        }
        else {
            fileOrDir = "file";
        }
        let res;
        if (fileOrDir == "file") res = handleFile(paramsObj);// 如果是文件，开始操作
        else handleDir(paramsObj);  // 如果是文件夹，开始操作
        // 如果是剪切操作，还需要删除下原始文件
        if (copyOrCut == "cut" && res != "跳过") deleteFile({ fileUrl: inputFileUrl, showExeResult, flag: true, showExeResult });
    }
    catch (err) {
        console.log("=========err=========", err);
    }
}

// 对文件实现复制或剪切的操作
function handleFile(params) {
    let {
        inputFileUrl, //要复制或剪切的文件路径
        outFileUrl, //要把文件或路径复制剪切到哪里
        copyOrCut, //复制(copy) or 剪切(cut)
        rewrite = false,//如果目标文件夹已经存在此文件，是否要覆盖，默认不覆盖
        showExeResult
    } = params;
    // 如果为复制操作（先读取，在写入）
    let content = readFileContent({ filePath: inputFileUrl, returnType: "buffer" });
    // 判断目标目录是否已经存在此文件
    let state = fs.existsSync(inputFileUrl);//为true表示存在
    if (!state) {
        writeFile({ path: outFileUrl, content, showExeResult });
    }
    else {
        if (state && rewrite) {
            writeFile({ path: outFileUrl, content, showExeResult });
            log("【 " + inputFileUrl + "】 已经存在，自动覆盖此文件");
        };
        // 不覆盖已经存在的文件
        if (state && !rewrite) {
            log("【 " + inputFileUrl + "】 已经存在，自动跳过此文件");
            return "跳过";
        };
    }
    // 操作完成后的提示
    log("【 " + inputFileUrl + " 】成功 " + copyOrCut + " 到 【" + outFileUrl + " 】");
}

// 对文件夹进行写入
function handleDir(params) {
    let {
        inputFileUrl, //要复制或剪切的文件路径
        outFileUrl, //要把文件或路径复制剪切到哪里
        copyOrCut, //复制(copy) or 剪切(cut)
        rewrite = false,//如果目标文件夹已经存在此文件，是否要覆盖，默认不覆盖
        showExeResult
    } = params;

    // 开始递归进行复制
    var files = fs.readdirSync(inputFileUrl);
    var len = files.length;
    if (len > 0) {
        files.forEach(function (file) {
            var inpUrl = inputFileUrl + '/' + file;
            var outUrl = outFileUrl + '/' + file;
            // 操作目录
            if (fs.statSync(inpUrl).isDirectory()) {
                var n = fs.readdirSync(inputFileUrl);
                if (n.length > 0) {
                    handleDir({ ...params, inputFileUrl: inpUrl, outFileUrl: outUrl });
                } else {
                    fs.rmdirSync(outFileUrl);  //创建空文件夹
                }
            }
            // 操作文件
            else {
                handleFile({ ...params, inputFileUrl: inpUrl, outFileUrl: outUrl });
            }
        });
    } else {
        log("【 " + inputFileUrl + "】 是空目录，没有可复制文件/文件夹");
        return;
    }
}

export default copycutFiledir;
