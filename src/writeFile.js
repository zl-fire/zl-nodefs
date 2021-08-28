var fs = require('fs'); // 引入fs模块

/**
    * @description 向一个文件写入内容，不存在就创建，存在就覆盖
    * @param {Object} paramsObj 完整的参数对象信息
    * @param {String} paramsObj.path 要写入的文件路径
    * @param {Any} paramsObj.content 要写入的文件内容
    * @param {Boolean} paramsObj.showExeResult  是否显示文件写入操作 执行完后的提示，默认为true：显示。
    * @return  {Boolean} true/false 表示写入成功与否的状态
    * @author zl-fire 2021/08/28
    * @example
    *  writeFile({path:"./test.txt",content:"helloworld"});
  */
function writeFile(paramsObj) {
    let { path, content, showExeResult } = paramsObj;
    if (showExeResult == undefined) showExeResult = true; //默认显示提示
    return new Promise(function (resolve, reject) {
        writePathFile({ path, content, resolve, reject, showExeResult });
    })

}



// 写入文件的外层调用函数
function writePathFile({ path, content, resolve, reject, showExeResult }) {
    var pathA = path.split("/");
    pathA.pop();
    createDirsSync(pathA.join("/"), function () {
        // 写入文件内容的回调函数
        fs.writeFile(path, content, function (err) {
            content = "";
            // 生成提示语
            let msg = "";
            if (err) {
                msg = path + " 创建失败.";
            }
            else {
                msg = path + " 创建成功."

            }
            // 控制默认的日志打印
            if (showExeResult) {
                console.log(msg);
            }
            // 返回操作状态
            if (err) reject(msg)
            else resolve(msg)
        });
    })
}

/**
    * @function 递归的查找并创建整个路径层次中的所有文件夹
    * @description 他会层层的往下找，没有就创建文件夹目录，有就查询下一层文件夹，直到找完参数路径的每一层路径
    * @param {String} dir  递归的查找并创建的目录路径
    * @param {Function} callback 目录路径递归的查找与创建完后，要执行的回调函数
    * @author zl-fire 2021/08/28
    * @example
    *  writeFile({path:"./test.txt",content:"helloworld"});
  */
function createDirsSync(dir, callback) {
    if (dir == "." || dir == "..") {
        callback();
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
            } else {
                callback();
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
        } else {
            callback();
        }
    }
}

module.exports = writeFile
