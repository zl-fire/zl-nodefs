// 
/**
    * @function sortByName
    * @description 通过对象的名字前开头的数字对同级对象进行排序
    * @param {Object} list 要排序的对象数组（提示：需要有name和children字段，代表名字和后代）
    * @author zl-fire 2021/11/08
    * @example
    * sortByName(list)
    * console.log(list);
    * 
  */
function sortByName(list) {
    list.sort((a, b) => {
        // 获取每个对象的名字前面的序号
        let aName = a.name.match(/^\d+/);
        let bName = b.name.match(/^\d+/);
        if (aName && bName) {
            aName =aName[0] - 0;
            bName =bName[0] - 0;
            return aName - bName;
        }
    });

    list.forEach(ele => {
        if (ele.children && ele.children.length > 0) {
            sortByName(ele.children);
        }
    });
}


export default sortByName
