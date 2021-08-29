export = writeFile;
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
declare function writeFile(paramsObj: {
    path: string;
    content: any;
    showExeResult: boolean;
}): boolean;
