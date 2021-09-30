
const fs = require('fs'); // 引入fs模块
import writeFile from "./writeFile";
import readFileContent from "./readFileContent";
/**
    * @function 以同步方式向指定文件追加内容
    * @description 对于在非末尾添加文件内容时，需要先将文件读取出来，然后在内存中修改后再进行写入
    * @param {Object} paramsObj 完整的参数对象信息
    * @param {String} paramsObj.filePath 要追加内容的文件路径
    * @param {String} paramsObj.content 要追加的内容
    * @param {String} paramsObj.position 要将内容追加到那个位置，可选择：start,end,特定字符，默认end (当写了特定字符时，将会把内容追加在特定字符后面)
    * @param {String} paramsObj.addType 添加类型：追加:add，替换:replace。（替换时只有position为指定位置时才有效）
    * @param {String} paramsObj.readFileContent_readEncode 对于在非末尾添加文件内容时,需要先读后写，所以这里表示以何种编码先读取文件，默认值为'utf-8'
    * @param {buffer|string} paramsObj.readFileContent_returnType 对于在非末尾添加文件内容时,需要先读后写，所以这里表示将以何种类型返回读取结果，默认字符串类型，可选值：buffer,string
    * @return {void}  无返回值
    * @author zl-fire 2021/08/29
    * @example
    * // paramsObj 完整的参数对象信息
    * // paramsObj.filePath 要追加内容的文件路径
    * // paramsObj.content 要追加的内容
    * // paramsObj.position 要将内容追加到那个位置，可选择：start,end,特定字符，默认end (当写了特定字符时，将会把内容追加在特定字符后面)
    * // paramsObj.addType 添加类型：追加:add，替换:replace。（替换时只有position为指定位置时才有效）
    * // paramsObj.readFileContent_readEncode 对于在非末尾添加文件内容时,需要先读后写，所以这里表示以何种编码先读取文件，默认值为'utf-8'
    * // paramsObj.readFileContent_returnType 对于在非末尾添加文件内容时,需要先读后写，所以这里表示将以何种类型返回读取结果，默认字符串类型，可选值：buffer,string
    *  addFileContent({filePath:"./test8.txt", content:"你好"})
  */
function addFileContent(paramsObj) {
    let { filePath, content, position = "end", addType = "add", readFileContent_readEncode = 'utf-8', readFileContent_returnType = "string" } = paramsObj;
    let fileConten
    if (position != "end") {
        // 读取文件
        fileConten = readFileContent({ filePath: filePath, readEncode: readFileContent_readEncode, returnType: readFileContent_returnType });
    }
    switch (position) {
        case "start":
            writeFile({ path: filePath, content: content + fileConten, showExeResult: false });
            break;
        case "end":
            fs.appendFileSync(filePath, content);
            break;
        default:
            // 构建正则表表达式
            let pattern = new RegExp(position, "g");
            if (addType == "replace") {
                writeFile({ path: filePath, content: fileConten.replace(pattern, content), showExeResult: false });
            }
            else
                writeFile({ path: filePath, content: fileConten.replace(pattern, position + content), showExeResult: false });
            break;
    }
}

export default addFileContent;


