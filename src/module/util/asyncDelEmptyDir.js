import listnExePro from "./listnExePro";
import deepCallGetMapObj from "./deepCallGetMapObj";

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
function asyncDelEmptyDir(list,other={}) {
    // 控制异步执行的执行进程监听
    let {
        msV=1000,
        num=2,
        callBack=function () {
            console.log("============list中空的目录删除完成======", JSON.stringify(list, null, 4));
        }
    }=other;
    //递归遍历对象数组，生成一个map对象
    let id2objMap = { 0: { children: list } };
    deepCallGetMapObj({ list, id2objMap, field: "id" });

    let changFlagObj={val:0}; //用于异步控制的标识

    filterEmptyDir(list, id2objMap);//删除空目录,删除时changFlagObj.val会变化

    listnExePro({msV,num,callBack},changFlagObj); //监听何时删除完成

    // 将空目录（即没有我需要的类型文件的目录）过滤掉
    function filterEmptyDir(list, id2objMap) {
        for (let i = 0; i < list.length; i++) {
            let Obj = list[i];
            // 这里写定时器+自执行函数的目的是为了，保证随着数组元素的删除，i值已经不准确的情况下，逻辑正确
            (function (Obj) {
                setTimeout(function () {
                    // 判断是否为文件
                    if (!Obj.children) {  //children不存在，则认为是文件
                        return;
                    }
                    else if (Obj.children && Obj.children.length == 0) {  //children存在，但为空，则认为是空目录
                        let parent_id = Obj.parent_id;
                        let index = list.indexOf(Obj);
                        changFlagObj.val++;//表示变化了
                        list.splice(index, 1);
                        deepCall2Top(parent_id, id2objMap); // 每删完一次就查看父级的children数组是否为空，如果为空就把父级也删了
                    }
                    else if (Obj.children && Obj.children.length > 0) {  //children存在，且不为空
                        filterEmptyDir(Obj.children, id2objMap);
                    }
                }, 0)
            })(Obj)
        }
    }

    // 递归向上查找，删除所有空的父级
    function deepCall2Top(parent_id, id2objMap) {
        if (parent_id == "0") return;//已经递归到最顶端了，结束
        //获取父级对象
        let parentObj = id2objMap[parent_id];
        // 记录父对象的父iD
        let parent_id2 = parentObj.parent_id;
        // 父级的父级对象
        let parent_parObj = id2objMap[parent_id2];
        // 如果父级对象的children已经为空，那么就删除此父级对象，同时在往上寻找
        if (parentObj.children.length == 0) {
            let index = parent_parObj.children.indexOf(parentObj)
            parent_parObj.children.splice(index, 1);
            changFlagObj.val++;//表示变化了
            // 同时递归调用自身，往上层查找
            deepCall2Top(parent_id2, id2objMap);
        }
    }
}

export default asyncDelEmptyDir