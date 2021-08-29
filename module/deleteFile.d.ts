export = deleteFile;
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
declare function deleteFile(paramsObj: {
    fileUrl: string;
    flag: boolean;
    showExeResult: boolean;
    delExactType: boolean;
}): boolean;
