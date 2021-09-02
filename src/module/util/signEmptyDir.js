
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
function signEmptyDir(list, id2objMap) {
    for (let i = 0; i < list.length; i++) {
        let Obj = list[i];
        // 判断是否为文件
        if (!Obj.children) {  //children不存在，则认为是文件
            continue;
        }
        else if (Obj.children && Obj.children.length == 0) {  //children存在，但为空，则认为是空目录
            Obj.empty = true; //表示为空目录，到时要删除掉
            deepCall2Top(Obj.parent_id, id2objMap); // 每删完一次就查看父级的children数组是否为空，如果为空就把父级也删了
        }
        else if (Obj.children && Obj.children.length > 0) {  //children存在，且不为空
            signEmptyDir(Obj.children, id2objMap);
        }

    }
}

// 递归向上查找，为所有空的父级进行标记
function deepCall2Top(parent_id, id2objMap) {
    //获取父级对象
    let parentObj = id2objMap[parent_id];
    if (!parentObj) return;
    // 如果父级对象的children已经为空，那么就删除此父级对象，同时在往上寻找
    let n = 0;
    parentObj.children.forEach((Obj) => {
        if (!Obj.empty) n++; //表示不为空目录的数量
    });
    if (n == 0) {
        parentObj.empty = true; //表示为空目录，到时要删除掉
        // 同时递归调用自身，往上层查找
        deepCall2Top(parentObj.parent_id, id2objMap);
    }
}

export default signEmptyDir