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
function deepCallGetMapObj(parObj) {
    let { list, id2objMap, field } = parObj;
    if (list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
            id2objMap[list[i][field]] = list[i];
            //递归调用
            if (list[i].children)
                deepCallGetMapObj({ list: list[i].children, id2objMap, field });
        }
    }
}
export default deepCallGetMapObj

