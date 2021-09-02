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
function listnExePro(paramsObj = {},changFlagObj) {
    let {
        num = 3,//设置多少次标识不变就认为是已经完成
        msV = 1000,//设置每过多少毫秒扫描一次
        callBack = function () { //当认为执行过程结束后要执行的回调函数
            console.log("每" + msV + "毫秒扫描一次，连续" + num + "次都没发生变化，认为异步已经执行结束!");
        }
    } = paramsObj;
    let backChangFlag = changFlagObj.val;//用于和标识变量比较的备份值
    let times = 0;//连续没有变化的次数
    let timer = setInterval(() => {
        if (changFlagObj.val != backChangFlag) {
            backChangFlag = changFlagObj.val;
        }
        else {
            times++;
        }
        if (times == num) {  //连续n秒都没有变化，认为已经结束
            clearInterval(timer);
            callBack();
        }
    }, msV)
}

export default listnExePro
