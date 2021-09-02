/**
 * @function 删除对象数组中的将空目录字段信息（存在children字段，且children为空数组）
 * @description 此函数为直接删除，性能高于filterEmptyDir（filterEmptyDir 这个方法的删除时先标识一遍空）
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
 * delEmptyDir(list, id2objMap);
 * 
 * 
*/
function delEmptyDir(list, id2objMap) {
    if (!id2objMap["0"]) id2objMap["0"] = { children: list };
    for (let i = list.length - 1; i >= 0; i--) {
        let Obj = list[i];
        // 判断是否为文件
        if (!Obj.children) {  //children不存在，则认为是文件
            return;
        }
        else if (Obj.children && Obj.children.length == 0) {  //children存在，但为空，则认为是空目录
            let parent_id = Obj.parent_id;
            let index = list.indexOf(Obj);
            list.splice(index, 1);
            deepCall2Top(parent_id, id2objMap); // 每删完一次就查看父级的children数组是否为空，如果为空就把父级也删了
        }
        else if (Obj.children && Obj.children.length > 0) {  //children存在，且不为空
            delEmptyDir(Obj.children, id2objMap);
        }

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
        // 同时递归调用自身，往上层查找
        deepCall2Top(parent_id2, id2objMap);
    }
}

export default delEmptyDir  //此方法还有点异常，后续在调整，先不使用