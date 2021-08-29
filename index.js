//打包命令：   rollup src/main.js --file index.js --format umd --name "zl-nodefs"

const writeFile = require("./module/writeFile");
const deleteFile = require("./module/deleteFile");
const readFileList = require("./module/readFileList");
const readFileContent = require("./module/readFileContent");
const addFileContent = require("./module/addFileContent");

module.exports = {
    writeFile,
    deleteFile,
    readFileList,
    readFileContent,
    addFileContent,
}