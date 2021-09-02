const fs = require('fs'); // 引入fs模块
// 处理解析绝对路径
function handleAbsolutePath(thePath, content, showExeResult) {
    // if (/^[A-Za-z]:/.test(thePath)) { } // 绝对路径判断规则
    let start = thePath[0] + thePath[1] + thePath[2]; //取出盘符
    let other = thePath.replace(start, ""); //去掉盘符，只剩下路径
    let pathArr = [thePath[0] + thePath[1]];
    let otherArr = other.split("\\"); //将路径转换为数组
    otherArr.splice(otherArr.length - 1, 1);// 移除文件名，只剩下纯路径
    pathArr.push(...otherArr);
    // 开始递归实现对不存在的目录进行创建
    let url = "";
    for (let i = 0; i < pathArr.length; i++) {
        // 路径不存在就创建
        url += pathArr[i] + "\\";
        if (!fs.existsSync(url)) {
            fs.mkdirSync(url);
        }
    }
    // 创建文件
    fs.writeFileSync(thePath, content);
    if (showExeResult) {
        console.log(thePath + "创建成功");
    }
}

export default   handleAbsolutePath
