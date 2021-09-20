
import writeFile from "./module/writeFile";
import deleteFile from "./module/deleteFile";
import readFileList from "./module/readFileList";
import readFileContent from "./module/readFileContent";
import addFileContent from "./module/addFileContent";
import copycutFiledir from "./module/copycutFiledir";
// 导出工具相关函数模块
import deepCallGetMapObj from "./module/util/deepCallGetMapObj";
import signEmptyDir from "./module/util/signEmptyDir";
import deleteIncludeSpeFieldArrEle from "./module/util/deleteIncludeSpeFieldArrEle";
import filterEmptyDir from "./module/util/filterEmptyDir";
import delEmptyDir from "./module/util/delEmptyDir";
import listnExePro from "./module/util/listnExePro";
import asyncDelEmptyDir from "./module/util/asyncDelEmptyDir";
import createDirsSync from "./module/util/createDirsSync";

export default {
    writeFile,
    deleteFile,
    copycutFiledir,
    readFileList,
    readFileContent,
    addFileContent,
    util: {
        deepCallGetMapObj,
        signEmptyDir,
        deleteIncludeSpeFieldArrEle,
        filterEmptyDir,
        delEmptyDir,
        listnExePro,
        asyncDelEmptyDir,
        createDirsSync
    }
}