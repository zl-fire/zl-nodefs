
var fs = require('fs'); // 引入fs模块

/**
    * @function 删除指定目录下的所有文件/文件夹
    * @description 通过递归方式实现,此操作完全同步，不会返回promise对象
    * @param {String} fileUrl 要删除的文件/文件夹路径
    * @param {Boolean} flag 是否删除最外层目录，不传或为false表示不删除，true表示删除.
    * @param {Boolean} showExeResult  是否显示文件写入操作 执行完后的提示，默认为true：显示。
    * @return {void} 无返回值
    * @author zl-fire 2021/08/28
    * @example
    *  deleteFile("./hello", true, false);
  */
function deleteFile(fileUrl, flag, showExeResult) {
    var log;
    if (showExeResult != undefined && showExeResult == false) {
        log = function () { }
    }
    else if (log==undefined) {
        log = console.log;
    }

    if (!fs.existsSync(fileUrl)) {
        log("你要删除的 " + fileUrl + " 不存在!");
        return;
    };
    // 当前文件为文件夹时 
    if (fs.statSync(fileUrl).isDirectory()) {
        var files = fs.readdirSync(fileUrl);
        var len = files.length,
            removeNumber = 0;
        if (len > 0) {
            files.forEach(function (file) {
                removeNumber++;
                var url = fileUrl + '/' + file;
                if (fs.statSync(url).isDirectory()) {
                    deleteFile(url, true); //对于文件夹递归调用自身,由于这里固定传入了true,所以子文件夹一定会被删除
                } else {
                    fs.unlinkSync(url); //对于文件直接进行删除
                    log('删除文件' + url + '成功');
                }
            });
            // 是否删除自身
            if (len == removeNumber && flag) {
                fs.rmdirSync(fileUrl);
                log('删除文件夹' + fileUrl + '成功');

            }
        } else if (len == 0 && flag) {
            // 对于最外层目录，将根据调用deleteFile时的第二个参数是否为true决定
            fs.rmdirSync(fileUrl);
            log('删除文件夹' + fileUrl + '成功');

        }
    } else {
        // 当前删除对象为文件时 
        fs.unlinkSync(fileUrl);
        log('删除文件' + fileUrl + '成功');
    }
}

console.log(666)