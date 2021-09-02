
/**
 * @function 删除包含field字段的数组对象元素
 * @description 递归遍历对象数组，实现删除操作. 由于在遍历过程中实现的删除操作，所以是从后往前遍历的
 * @param {object[]} list 要处理的对象数组
 * @param {string} field 用于判断删除的字段元素,当val为传入时，只要对象中field字段存在就进行删除,字段默认值为empty
 * @param {any} val 如果传入了此元素，那么删除时就判断field的值等于val，才会进行删除
 * @author zl-fire 2021/09/02
 * @example
 * deleteIncludeSpeFieldArrEle(list, "id");//list为对象数组，id为数组元素中的一个字段
*/
function deleteIncludeSpeFieldArrEle(list, field="empty", val) {
    for (let i = list.length - 1; i >= 0; i--) {
        let Obj = list[i];
        if (Obj[field]) {
            if (!val) {
                let index = list.indexOf(Obj);
                list.splice(index, 1);
            }
            else {
                if (Obj[field] == val) {
                    let index = list.indexOf(Obj);
                    list.splice(index, 1);
                }
            }

        }
        else if (Obj.children && Obj.children.length > 0) {
            deleteIncludeSpeFieldArrEle(Obj.children, field, val)
        }
    }
}
export default deleteIncludeSpeFieldArrEle