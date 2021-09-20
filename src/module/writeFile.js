const fs = require('fs'); // 引入fs模块
import handleAbsolutePath from "./handleAbsolutePath";
import createDirsSync from "./util/createDirsSync";
/**
    * @description 同步方式，向一个文件写入内容，不存在就创建，存在就覆盖
    * @param {Object} paramsObj 完整的参数对象信息
    * @param {String} paramsObj.path 要写入的文件路径,可绝对路径，可相对路径
    * @param {Any} paramsObj.content 要写入的文件内容
    * @param {Boolean} paramsObj.showExeResult  是否显示文件操作完后的提示，默认为true：显示。
    * @return  {Boolean} true/false 表示写入成功与否的状态
    * @author zl-fire 2021/08/28
    * @example
    *  let res=writeFile({path:"./test8.txt",content:"helloworld",showExeResult:true});
    *  console.log("res",res)
  */
function writeFile(paramsObj) {

    let { path, content, showExeResult } = paramsObj;
    if (showExeResult == undefined) showExeResult = true; //默认显示提示
    // 绝对路径判断规则
    if (/^[A-Za-z]:/.test(path)) {
        try {
            handleAbsolutePath(path, content, showExeResult);
            return true;
        } catch (err) {
            console.log("======创建文件错误====", err)
            return false;
        }
    }
    return writePathFile({ path, content, showExeResult });
}



// 写入文件的外层调用函数
function writePathFile({ path, content, showExeResult }) {
    var pathA = path.split("/");
    pathA.pop();
    // 生成提示语
    let msg = "";
    try {
        // 递归创建不存在的目录
        createDirsSync(pathA.join("/"));
        // 写入文件
        fs.writeFileSync(path, content);
        msg = path + " 创建成功."
        // 控制默认的日志打印
        if (showExeResult) {
            console.log(msg);
        }
        return true;

    } catch (err) {
        msg = path + " 创建失败.";
        console.log(msg, err);
        return false;
    }
}


export default writeFile
