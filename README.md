# zl-nodefs
对node的常用文件操作进行封装，提高开发效率

## 主要功能

 * **复制或剪切文件/文件夹** 
 * **删除指定文件/文件夹**(不限层级}
 * **创建指定路径的文件** (不论目录存在与否)
 * **读取指定目录下的所有文件和文件夹生成树结构** (不论层级，可配置化读取)
 * **向指定文件追加内容** （可指定追加位置，start,end，特定位置）
 * **读取文件内容** （可传入参数控制编码和返回类型等）

## 引入方式

```js

let zl_nodefs = require("zl-nodefs");
let {
    writeFile, //创建/写入文件
    deleteFile,//删除文件夹/文件
    copycutFiledir,//复制或剪切文件/文件夹
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


// 复制或剪切文件/文件夹
copycutFiledir({
    inputFileUrl: "./helloooo",
    outFileUrl: "./helloooo333",
    copyOrCut: "copy",
    // showExeResult:false,
    rewrite:false
})


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
------------------------- copycutFiledir, 复制或剪切文件/文件夹 -----------------------
/**
    * @function copycutFiledir
    * @param {Object} paramsObj 同步方式，对文件/文件夹执行复制/剪切操作
    * @param {String} paramsObj.inputFileUrl 要复制/剪切的文件/文件夹路径
    * @param {String} paramsObj.outFileUrl 要将文件/文件夹要复制/剪切到哪里(复制目录只能写目录路径，复制文件只能写文件路径)
    * @param {String} paramsObj.copyOrCut  复制还是剪切,值为copy|cut ，默认为复制copy
    * @param {Boolean} paramsObj.showExeResult  是否显示写入操作完后的提示，默认为true：显示。
    * @param {Boolean} paramsObj.rewrite  对于已经存在的文件是否跳过，默认false跳过, d当值为true时表示进行覆盖
    * @author zl-fire 2021/09/10
    * @example
    * copycutFiledir({
    *     inputFileUrl: "./helloooo",
    *     outFileUrl: "./helloooo333",
    *     copyOrCut: "copy",
    *     // showExeResult:false,
    *     rewrite:false
    * })
  */
export function copycutFiledir(paramsObj: {
    inputFileUrl: string;
    outFileUrl: string;
    copyOrCut: string;
    showExeResult: boolean;
    rewrite: boolean;
}): boolean;

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
    * @param {Boolean}  paramsObj.isfilterEmptyDir  是否过滤掉空目录字段信息（存在children字段，且children为空数组），默认不过滤， 传入true进行过滤
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
function readFileList(paramsObj: {
    dirPath: string;
    ignoreList: Array<string>;
    needTypes: Array<string>;
    ignoreTypes: Array<string>;
    ignoreTypes: boolean;
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

## 工具函数对象：util

### 引入工具对象
```js

let zl_nodefs = require("zl-nodefs");
let {
        deepCallGetMapObj, //递归遍历对象数组，生成一个map对象,指定字段为键，对象元素为值
        signEmptyDir,//将空目录（存在children字段，且children为空数组）进行标记
        deleteIncludeSpeFieldArrEle,//删除包含field字段的数组对象元素
        filterEmptyDir,//删除对象数组中的将空目录字段信息（存在children字段，且children为空数组）
        listnExePro,//监听一些不知道何时结束的程序进度
        asyncDelEmptyDir //异步方式删除对象数组中空的目录（无法精确把控何时删除完成）

} = zl_nodefs.util;

```


### 工具函数说明
```js

--------- deepCallGetMapObj 递归遍历对象数组，生成一个map对象,指定字段为键，对象元素为值 --------------
/**
 * @description 递归遍历对象数组，生成一个map对象,指定字段为键，对象元素为值
 * @param {Object} parObj 完整的参数对象信息
 * @param {String} parObj.list 要处理的对象数组
 * @param {String} parObj.id2objMap 生成的map对象
 * @param {Boolean} parObj.field  作为id的指定键
 * @author zl-fire 2021/09/02
 * @example
 * let list=[
 *     {
 *         "id": 111,
 *         "name": 222
 *     },
 *     {
 *         "id": 222,
 *         "name": 333,
 *         "children": [
 *             {
 *                 "id": 333,
 *                 "name": 444
 *             }
 *         ]
 *     }
 * ];
 * let id2objMap={};
 * let field="id";
 * deepCallGetMapObj({ list, id2objMap, field});
 * console.log(id2objMap);
 * //id2objMap值将会如下所示
 * {
 *     "111": {
 *         "id": 111,
 *         "name": 222
 *     },
 *     "222": {
 *         "id": 222,
 *         "name": 333,
 *         "children": [
 *             {
 *                 "id": 333,
 *                 "name": 444
 *             }
 *         ]
 *     },
 *     "333": {
 *         "id": 333,
 *         "name": 444
 *     }
 * }
*/

--------- signEmptyDir 将空目录（存在children字段，且children为空数组）进行标记 --------------------

/**
 * @description 将空目录（存在children字段，且children为空数组）进行标记
 * @param {object[]} list 要处理的对象数组
 * @param {object} id2objMap list生成的map对象
 * @author zl-fire 2021/09/02
 * @example
 * list的结构示例(id,parent_id,children三个字段必须有)：
 * [
 *     {
 *         "name": "src",
 *         "id": "0_11",
 *         "parent_id": 0,
 *         "children": [
 *             {
 *                 "name": "module",
 *                 "id": "0_11_2",
 *                 "parent_id": "0_11",
 *                 "children": [],
 *             }
 *         ]
 *     }
 * ]
 * id2objMap结构示例（id为键，对象为值）：{id1:obj1,id2:obj2}
 * {
 *     "0_11": {
 *         "name": "src",
 *         "id": "0_11",
 *         "parent_id": 0,
 *         "children": [
 *             {
 *                 "name": "module",
 *                 "id": "0_11_2",
 *                 "parent_id": "0_11",
 *                 "children": []
 *             }
 *         ]
 *     },
 *     "0_11_2": {
 *         "name": "module",
 *         "id": "0_11_2",
 *         "parent_id": "0_11",
 *         "children": []
 *     }
 * }
 * //当执行完后，list的对象元素会自动标记空目录（即加上empty字段）
 * signEmptyDir(list, id2objMap);
 * 
*/

--------- deleteIncludeSpeFieldArrEle 删除包含field字段的数组对象元素 ----------------------------

/**
 * @function 删除包含field字段的数组对象元素
 * @description 递归遍历对象数组，实现删除操作. 由于在遍历过程中实现的删除操作，所以是从后往前遍历的
 * @param {object[]} list 要处理的对象数组
 * @param {string} field 用于判断删除的字段元素,当val为传入时，只要对象中field字段存在就进行删除,字段默认值为empty
 * @param {any} val 如果传入了此元素，那么删除时就判断field的值等于val，才会进行删除
 * @author zl-fire 2021/09/02
 * @example
 * deleteIncludeSpeFieldArrEle(list, "id");//list为对象数组，id为数组元素中的一个字段
*/

--------- filterEmptyDir 删除对象数组中的将空目录字段信息（存在children字段，且children为空数组） -----
/**
 * @description 删除对象数组中的将空目录字段信息（存在children字段，且children为空数组）
 * @param {object[]} list 要处理的对象数组
 * @author zl-fire 2021/09/02
 * @example
 * list的结构示例(id,parent_id,children三个字段必须有)：
 * [
 *     {
 *         "name": "src",
 *         "id": "0_11",
 *         "parent_id": 0,
 *         "children": [
 *             {
 *                 "name": "module",
 *                 "id": "0_11_2",
 *                 "parent_id": "0_11",
 *                 "children": [],
 *             }
 *         ]
 *     }
 * ]
 *
 * //当执行完后，list的对象元素会自动删除
 * filterEmptyDir(list);
 * 
*/
--------- listnExePro 监听一些不知道何时结束的程序进度 --------------------------------------------
/**
    * @function 监听一些不知道何时结束的程序执行进程
    * @description 监听一些不知道何时结束的程序执行进程,实现原理为监听一个全局变量标识，这个标识在执行过程中会不断的发生变化。所以：如果连续ns后，这个标识都没改变，那就认为执行结束
    * @param {Object} paramsObj 完整的参数对象信息(提示：全局标识字段名字必须为:changFlag)
    * @param {number} paramsObj.msV 设置每过多少毫秒扫描一次标识变量 是否发生变化，单位：毫秒。（默认1000毫秒）
    * @param {number} paramsObj.num 设置扫描多少次标识都不变，就认为是已经完成，默认3次
    * @param {function} paramsObj.callBack 当认为执行过程结束后要执行的回调函数
    * @param {object} changFlagObj 完整的参数对象信息,结构：{val:number}
    * @author zl-fire 2021/09/02
    * @example
    * let changFlagObj={val:0}; //用于异步控制的标识
    * filterEmptyDir(list, id2objMap);//删除空目录,删除时changFlagObj.val会变化
    * listnExePro({msV,num,callBack},changFlagObj); //监听何时删除完成
  */

--------- asyncDelEmptyDir 异步方式删除对象数组中空的目录（无法精确把控何时删除完成） --------------------------------------------
/**
    * @function 异步方式删除对象数组中空的目录（无法精确把控何时删除完成）
    * @param {Object[]} list 要去空的对象数组
    * @param {Object} other 完整的参数对象信息(提示：全局标识字段名字必须为:changFlag)
    * @param {number} other.msV 设置每过多少毫秒扫描一次标识变量 是否发生变化，单位：毫秒。（默认1000毫秒）
    * @param {number} other.num 设置扫描多少次标识都不变，就认为是已经完成，默认3次
    * @param {function} other.callBack 当认为执行过程结束后要执行的回调函数
    * @author zl-fire 2021/09/02
    * @example
    * var fileList = readFileList({
    *     dirPath: path.resolve("."),  //读取src下的所有文件
    *     ignoreList: ["node_modules", ".git"], //遇到node_modules目录时进行忽略
    *     needTypes: [".docx"], //只读取".doc", ".docx" 类型文件
    *     // isfilterEmptyDir:true
    *     // ignoreTypes:[".js",".doc"], //忽略".js",".doc"文件类型(如果needTypes存在，则以needTypes为准，会忽略ignoreTypes参数)
    * });
    * util.asyncDelEmptyDir(fileList);
    * console.log(JSON.stringify(fileList, null, 4));
  */

```
