export = readFileList;
/**
    * @function 同步方式，读取指定目录下的所有文件/文件夹列表,返回tree结构数据
    * @param {Object} paramsObj 完整的参数对象信息
    * @param {String} paramsObj.dirPath 要读取目录，可传入相对路径(./,../),也可传入绝对路径
    * @param {Array<string>} paramsObj.ignoreList 读取过程中要忽略的目录名，如： ["node_modules",".git"]
    * @param {Array<string>} paramsObj.needTypes  指定要读取的具体文件类型,除此之外全部忽略，如：[".doc", ".docx"]
    * @param {Array<string>}  paramsObj.ignoreTypes  指定要忽略的具体文件类型,除此之外全部读取(如果needTypes存在，则以needTypes为准，会忽略ignoreTypes参数)
    * @return {Array<object>} 返回tree结构数据
    * @author zl-fire 2021/08/29
    * @example
    * var fileList = readFileList({
    *     dirPath: "src",  //读取src下的所有文件
    *     ignoreList: ["node_modules", ".git"], //遇到node_modules目录时进行忽略
    *     needTypes: [".doc", ".docx"], //只读取".doc", ".docx" 类型文件
    *     // ignoreTypes:[".js",".doc"], //忽略".js",".doc"文件类型(如果needTypes存在，则以needTypes为准，会忽略ignoreTypes参数)
    * })
    * console.log(JSON.stringify(fileList, null, 4));
  */
declare function readFileList(paramsObj: {
    dirPath: string;
    ignoreList: Array<string>;
    needTypes: Array<string>;
    ignoreTypes: Array<string>;
}): Array<object>;
