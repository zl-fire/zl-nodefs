(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

    const writeFile = require("./writeFile");
    const deleteFile = require("./deleteFile");

    module.exports = {
        writeFile, deleteFile
    };

    // // 写入文件示例
    // let res = writeFile({ path: "./test8.txt", content: "helloworld", showExeResult: true });
    // console.log("res", res)

    // // 删除文件
    // let res1=deleteFile({fileUrl:"./hello",flag:true,showExeResult:true});
    // console.log("res1", res1)

})));
