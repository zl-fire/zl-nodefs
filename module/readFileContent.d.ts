export = readFileContent;
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
declare function readFileContent(paramsObj: {
    filePath: string;
    readEncode: string;
    returnType: any | string;
}): any | string;
