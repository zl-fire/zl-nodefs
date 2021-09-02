import deepCallGetMapObj from "./deepCallGetMapObj";
import signEmptyDir from "./signEmptyDir";
import deleteIncludeSpeFieldArrEle from "./deleteIncludeSpeFieldArrEle";

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
 * signEmptyDir(list);
 * 
*/
function filterEmptyDir(list) {
    //递归遍历对象数组，生成一个map对象
    let id2objMap = {};
    deepCallGetMapObj({ list, id2objMap, field: "id" }); //以id为键进行构建map对象
    signEmptyDir(list, id2objMap); //标识空目录，（存在children字段，且children为空数组），会加上empty字段表示空目录
    deleteIncludeSpeFieldArrEle(list, "empty");//删除空目录,含有这个empty字段的就认为是空目录
}
export default filterEmptyDir