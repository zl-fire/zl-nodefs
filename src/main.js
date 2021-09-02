
import writeFile from "./module/writeFile";
import deleteFile from "./module/deleteFile";
import readFileList from "./module/readFileList";
import readFileContent from "./module/readFileContent";
import addFileContent from "./module/addFileContent";
// 导出工具相关函数模块
import deepCallGetMapObj from "./module/util/deepCallGetMapObj";
import signEmptyDir from "./module/util/signEmptyDir";
import deleteIncludeSpeFieldArrEle from "./module/util/deleteIncludeSpeFieldArrEle";
import filterEmptyDir from "./module/util/filterEmptyDir";
import delEmptyDir from "./module/util/delEmptyDir";
import listnExePro from "./module/util/listnExePro";

export default {
    writeFile,
    deleteFile,
    readFileList,
    readFileContent,
    addFileContent,
    util: {
        deepCallGetMapObj,
        signEmptyDir,
        deleteIncludeSpeFieldArrEle,
        filterEmptyDir,
        delEmptyDir,
        listnExePro
    }
}