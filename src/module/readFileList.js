import filterEmptyDir from "./util/filterEmptyDir";
import sortByName from "./util/sortByName";

const fs = require('fs'); // 引入fs模块
const Path = require('path');
/**
    * @function 同步方式，读取指定目录下的所有文件/文件夹列表,返回tree结构数据
    * @param {Object} paramsObj 完整的参数对象信息
    * @param {String} paramsObj.dirPath 要读取目录，可传入相对路径(./,../),也可传入绝对路径
    * @param {Array<string>} paramsObj.ignoreList 读取过程中要忽略的目录名，如： ["node_modules",".git"]
    * @param {Array<string>} paramsObj.needTypes  指定要读取的具体文件类型,除此之外全部忽略，如：[".doc", ".docx"]
    * @param {Array<string>}  paramsObj.ignoreTypes  指定要忽略的具体文件类型,除此之外全部读取(如果needTypes存在，则以needTypes为准，会忽略ignoreTypes参数)
    * @param {Boolean}  paramsObj.isfilterEmptyDir  是否过滤掉空目录字段信息（存在children字段，且children为空数组），默认不过滤， 传入true进行过滤
    * @param {Boolean}  paramsObj.issortByNum  是否对名字通过开头的数字进行排序，默认是整体按照 ASCII 码进行排序
    * @return {Array<object>} 返回tree结构数据（如果想保留文件对象上的空的children数组字段，那么就设置：readFileList.nodelEmptyChildren=true）
    * @author zl-fire 2021/08/29
    * @example
    * var fileList = readFileList({
    *     dirPath: "src",  //读取src下的所有文件
    *     ignoreList: ["node_modules", ".git"], //遇到node_modules目录时进行忽略
    *     needTypes: [".doc", ".docx"], //只读取".doc", ".docx" 类型文件
    *     // ignoreTypes:[".js",".doc"], //忽略".js",".doc"文件类型(如果needTypes存在，则以needTypes为准，会忽略ignoreTypes参数)
    * })
    * console.log(JSON.stringify(fileList, null, 4));
    * 
    * 
    * 
  */
function readFileList(paramsObj) {
    let { dirPath, ignoreList, needTypes, ignoreTypes, isfilterEmptyDir = false,issortByNum=true } = paramsObj;//needTypes优先级最高
    // 文件列表
    const filesList = [];
    const idv = 0; //初始id值
    getFileList({ dirPath, filesList, idv, ignoreList, needTypes, ignoreTypes });
    if (isfilterEmptyDir) {
        filterEmptyDir(filesList, isfilterEmptyDir);//过滤空目录
    }
    if(issortByNum){
        sortByName(filesList);// 对名字按照开头的数字进行排序
    }
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
            // 默认删除文件对象中空的children数组
            if (!readFileList.nodelEmptyChildren) delete obj.children;
            filesList.push(obj);
        }
    });
}

export default readFileList;
