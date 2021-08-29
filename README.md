# zl-nodefs
对node的常用文件操作进行封装，提高开发效率

## 主要功能
 * **通过递归方式对指定文件/文件夹进行删除**(删除时还可以指定只删除特定类型的文件，删除时也可指定是否删除目录本身}
 * **创建指定路径的文件** (如果指定的路径中某些目录不存在，那么就会递归创建)
 *  **读取指定目录下的所有文件和文件夹生成树结构** (可以通过参数过滤某些目录或者某些文件类型，也可指定只读取某些文件类型)
 *  **向指定文件追加内容** （可指定最佳位置，start,end，特定位置）
 *  **读取文件内容** （可传入参数控制编码和返回类型等）

## 引入方式

```js

let zl_nodefs = require("zl-nodefs");
let {
    writeFile, //创建/写入文件
    deleteFile,//删除文件夹/文件
    readFileList,//读取目录树tree
    readFileContent,//读取文件内容
    addFileContent //追加文件内容
} = zl_nodefs;

```

## 基本使用示例

```js

// 写入文件示例
let res = writeFile({ path: "./test8.txt", content: "helloworld", showExeResult: true });
console.log("res", res)

// 删除文件
let res1 = deleteFile({ fileUrl: "./hello", flag: true });
console.log("res1", res1)

// 读取文件列表
var fileList = readFileList({
    dirPath: "./",  //读取当前目录下的所有文件
    ignoreList: ["node_modules", ".git"], //遇到node_modules目录时进行忽略
})
console.log(JSON.stringify(fileList, null, 4));

// 读取文件内容
let res = readFileContent({ filePath: "./test8.txt" });
console.log("=====res====", res);

// 追加文件内容
addFileContent({ filePath: "./test8.txt", content: "你好" });

```

## 各方法详解

```js

------------------------- writeFile, 创建/写入文件 -----------------------

/**
    * @description 同步方式，向一个文件写入内容，不存在就创建，存在就覆盖
    * @param {Object} paramsObj 完整的参数对象信息
    * @param {String} paramsObj.path 要写入的文件路径
    * @param {Any} paramsObj.content 要写入的文件内容
    * @param {Boolean} paramsObj.showExeResult  是否显示文件操作完后的提示，默认为true：显示。
    * @return  {Boolean} true/false 表示写入成功与否的状态
    * @author zl-fire 2021/08/28
    * @example
    *  let res=writeFile({path:"./test8.txt",content:"helloworld",showExeResult:true});
    *  console.log("res",res)
  */
function writeFile(paramsObj: {
    path: string;
    content: any;
    showExeResult: boolean;
}): boolean;

------------------------- deleteFile, 删除文件夹/文件 -----------------------

/**
    * @function 同步方式，递归删除指定目录下的所有文件/文件夹
    * @param {Object} paramsObj 完整的参数对象信息
    * @param {String} paramsObj.fileUrl 要删除的文件/文件夹路径
    * @param {Boolean} paramsObj.flag 是否删除最外层目录，不传或为false表示不删除，true表示删除.
    * @param {Boolean} paramsObj.showExeResult  是否显示写入操作完后的提示，默认为true：显示。
    * @param {Boolean} paramsObj.delExactType  当删除的是一个非空文件夹时，删除后代文件中指定的某种类型文件
    *
    * @return {Boolean} true/false 表示操作是否成功
    * @author zl-fire 2021/08/28
    * @example
    *  let res1 = deleteFile({ fileUrl: "./gggg", flag: true});
    *  console.log("res1",res1)
  */
function deleteFile(paramsObj: {
    fileUrl: string;
    flag: boolean;
    showExeResult: boolean;
    delExactType: boolean;
}): boolean;

------------------------- readFileList, 读取目录树tree -----------------------

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
function readFileList(paramsObj: {
    dirPath: string;
    ignoreList: Array<string>;
    needTypes: Array<string>;
    ignoreTypes: Array<string>;
}): Array<object>;

------------------------- readFileContent, 读取文件内容 --------------------

/**
    * @function 以同步方式读取指定文件的内容
    * @param {Object} paramsObj 完整的参数对象信息
    * @param {String} paramsObj.filePath 要读取的文件路径，可传入相对路径(./,../),也可传入绝对路径
    * @param {String} paramsObj.readEncode 表示以何种编码读取文件，默认值为'utf-8'
    * @param {buffer|string} paramsObj.returnType 将读取结果以指定类型返回，默认返回字符串类型，可选值：buffer,string
    * @return {buffer|string} 返回buffer|string类型数据
    * @author zl-fire 2021/08/29
    * @example
    * let res = readFileContent({ filePath: "./src/main.js" });
    * console.log("=====res====", res);
  */
function readFileContent(paramsObj: {
    filePath: string;
    readEncode: string;
    returnType: any | string;
}): any | string;

------------------------- addFileContent, 追加文件内容 --------------------

export = addFileContent;
/**
    * @function 以同步方式向指定文件追加内容
    * @description 对于在非末尾添加文件内容时，需要先将文件读取出来，然后在内存中修改后再进行写入
    * @param {Object} paramsObj 完整的参数对象信息
    * @param {String} paramsObj.filePath 要追加内容的文件路径
    * @param {String} paramsObj.content 要追加的内容
    * @param {String} paramsObj.position 要将内容追加到那个位置，可选择：start,end,特定字符，默认end (当写了特定字符时，将会把内容追加在特定字符后面)
    * @param {String} paramsObj.readFileContent_readEncode 对于在非末尾添加文件内容时,需要先读后写，所以这里表示以何种编码先读取文件，默认值为'utf-8'
    * @param {buffer|string} paramsObj.readFileContent_returnType 对于在非末尾添加文件内容时,需要先读后写，所以这里表示将以何种类型返回读取结果，默认字符串类型，可选值：buffer,string
    * @return {void}  无返回值
    * @author zl-fire 2021/08/29
    * @example
    *  addFileContent({filePath:"./test8.txt", content:"你好"})
  */
function addFileContent(paramsObj: {
    filePath: string;
    content: string;
    position: string;
    readFileContent_readEncode: string;
    readFileContent_returnType: any | string;
}): void;


```