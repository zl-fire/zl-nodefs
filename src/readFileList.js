
var fs = require('fs'); // 引入fs模块
var Path = require('path');

/**
    * @function 同步方式，读取指定目录下的所有文件/文件夹列表，返回json结构数据
    * @param {Object} paramsObj 完整的参数对象信息
    * @param {String} paramsObj.fileUrl 要删除的文件/文件夹路径
    * @param {Boolean} paramsObj.flag 是否删除最外层目录，不传或为false表示不删除，true表示删除.
    * @param {Boolean} paramsObj.showExeResult  是否显示写入操作完后的提示，默认为true：显示。
    * @return {Boolean} true/false 表示操作是否成功
    * @author zl-fire 2021/08/28
    * @example
    *  let res=deleteFile({fileUrl:"./hello",flag:true,showExeResult:true});
    *  console.log("res",res)
  */

// 此模块作用为读取传入目录下的所有目录和文件，返回一个json对象
function readFileList({ dirPath, ignoreList, needTypes, ignoreTypes }) { //needTypes优先级最高
    // 文件列表
    const filesList = [];
    const idv = 0; //初始id值
    getFileList({ dirPath, filesList, idv, ignoreList, needTypes, ignoreTypes });
    return filesList;
}

function getFileList({ dirPath, filesList, idv, ignoreList, needTypes, ignoreTypes }) {
    let id = 1;// id起始值
    var files = fs.readdirSync(dirPath);
    files.forEach(function (file) { // file为每个文件的名字
        const obj = {
            name: file,
            id: idv + '_' + id++,
            parent_id: idv,
            children: [],
        };
        let fileUrl = dirPath + '/' + file;
        // 是文件夹就递归
        if (fs.statSync(fileUrl).isDirectory()) {
            if (ignoreList && ignoreList.includes(file)) return;//如果声明了只忽略某些子文件夹，则非指定文件夹全部读取
            filesList.push(obj);
            getFileList({ dirPath: fileUrl, filesList: obj.children, idv: obj.id, ignoreList, needTypes, ignoreTypes });
        }
        else {
            let extname = Path.extname(file);//获取文件的后缀名
            if (needTypes && !needTypes.includes(extname)) return; //同上，不过针对的是具体的文件而不是文件夹
            if (!needTypes && ignoreTypes && ignoreTypes.includes(extname)) return;

            delete obj.children;
            filesList.push(obj);
        }
    });
}

module.exports = readFileList;


var readDir = readFileList({
    dirPath: "../",  //读取src下的所有文件
    ignoreList: ["node_modules",".git"], //遇到node_modules目录时进行忽略
    needTypes: [".doc", ".docx"], //只读取".doc", ".docx" 类型文件
    // ignoreTypes:[".js",".doc"], //忽略".js",".doc"文件类型(如果needTypes存在，则以needTypes为准，会忽略ignoreTypes参数)
})
console.log(JSON.stringify(readDir, null, 4));