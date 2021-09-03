let path = require("path");
let fs = require("fs");
let zl_nodefs = require("./index");
let {
    writeFile, //创建/写入文件
    deleteFile,//删除文件夹/文件
    readFileList,//读取目录树tree
    readFileContent,//读取文件内容
    addFileContent, //追加文件内容
    util,
} = zl_nodefs;


// // 写入文件
// let dir0 = path.join(path.resolve("."), "aaa\\bbb\\ccc\\d\\test8.txt");

// addFileContent({filePath:dir0, content:"你好"})

// let res = readFileContent({ filePath: dir0 });
//  console.log("=====res====", res);

//  writeFile({ path: dir0, content: "helloworld", showExeResult: false });
//  deleteFile({ fileUrl: path.join(path.resolve("."), "aaa"), flag: true});

var fileList = readFileList({
    dirPath: path.resolve("."),  //读取src下的所有文件
    ignoreList: ["node_modules", ".git"], //遇到node_modules目录时进行忽略
    needTypes: [".docx"], //只读取".doc", ".docx" 类型文件
    isfilterEmptyDir:true
    // ignoreTypes:[".js",".doc"], //忽略".js",".doc"文件类型(如果needTypes存在，则以needTypes为准，会忽略ignoreTypes参数)
});
// util.asyncDelEmptyDir(fileList,{ msV: 1000, num: 2}); //默认连续2秒没有变化就认为执行完成
console.log("====fileList=====",fileList)

