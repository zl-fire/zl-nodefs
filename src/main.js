//打包命令：   rollup src/main.js --file index.js --format umd --name "zl-nodefs"

const writeFile = require("./module/writeFile");
const deleteFile = require("./module/deleteFile");
const readFileList = require("./module/readFileList");
const readFileContent = require("./module/readFileContent");

module.exports = {
    writeFile, deleteFile, readFileList, readFileContent
}

// // 写入文件示例
// let res = writeFile({ path: "./test8.txt", content: "helloworld", showExeResult: true });
// console.log("res", res)

// // 删除文件
// let res1 = deleteFile({ fileUrl: "./src/gggg", flag: true, showExeResult: true });
// console.log("res1", res1)

// 读取文件列表
// var fileList = readFileList({
//     dirPath: "src",  //读取src下的所有文件
//     ignoreList: ["node_modules", ".git"], //遇到node_modules目录时进行忽略
//     // needTypes: [".doc", ".docx"], //只读取".doc", ".docx" 类型文件
//     // ignoreTypes:[".js",".doc"], //忽略".js",".doc"文件类型(如果needTypes存在，则以needTypes为准，会忽略ignoreTypes参数)
// })
// console.log(JSON.stringify(fileList, null, 4));

// // 读取文件内容
// let res = readFileContent({ filePath: "./src/main.js", returnType: "string" });
// console.log("=====res====", res);