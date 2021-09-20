const fs = require('fs'); // 引入fs模块

/**
    * @function createDirsSync
    * @description 递归创建路径层次中不存在的目录
    * @param {String} dir  目录路径参数
    * @author zl-fire 2021/08/28
  */
function createDirsSync(dir) {
    if (dir == "." || dir == "..") {
        return;
    }
    var dirs = dir.split('/');
    if (dirs[0] == '.' || dirs[0] == "..") {
        dirs[1] = dirs[0] + "/" + dirs[1];
        dirs.shift();
    }
    if (dirs[dirs.length - 1] == "") {
        dirs.pop();
    }
    if (dirs[0] == "") dirs[0] = "/"; //兼容mac等以/开头的绝对路径
    var len = dirs.length;
    var i = 0;
    var url = dirs[i];
    // 启动递归函数
    mkDirs(url);
    // 逐级检测有没有当前文件夹，没有就创建，有就继续检测下一级
    function mkDirs(url) {
        if (fs.existsSync(url)) {
            i = i + 1;
            if (len > i) {
                url = url + "/" + dirs[i];
                mkDirs(url);
            }
        } else {
            mkDir(url)
        }
    }
    // 创建文件
    function mkDir(url) {
        fs.mkdirSync(url);
        i = i + 1;
        if (len > i) {
            url = url + "/" + dirs[i];
            mkDir(url);
        }
    }
}
export default createDirsSync