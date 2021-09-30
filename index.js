(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global['zl-nodefs'] = factory());
}(this, (function () { 'use strict';

    const fs$7 = require('fs'); // 引入fs模块
    // 处理解析绝对路径（windows）
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
            if (!fs$7.existsSync(url)) {
                fs$7.mkdirSync(url);
            }
        }
        // 创建文件
        fs$7.writeFileSync(thePath, content);
        if (showExeResult) {
            console.log(thePath + "创建成功");
        }
    }

    const fs$6 = require('fs'); // 引入fs模块

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
            if (fs$6.existsSync(url)) {
                i = i + 1;
                if (len > i) {
                    url = url + "/" + dirs[i];
                    mkDirs(url);
                }
            } else {
                mkDir(url);
            }
        }
        // 创建文件
        function mkDir(url) {
            fs$6.mkdirSync(url);
            i = i + 1;
            if (len > i) {
                url = url + "/" + dirs[i];
                mkDir(url);
            }
        }
    }

    const fs$5 = require('fs'); // 引入fs模块
    /**
        * @description 同步方式，向一个文件写入内容，不存在就创建，存在就覆盖
        * @param {Object} paramsObj 完整的参数对象信息
        * @param {String} paramsObj.path 要写入的文件路径,可绝对路径，可相对路径
        * @param {Any} paramsObj.content 要写入的文件内容
        * @param {Boolean} paramsObj.showExeResult  是否显示文件操作完后的提示，默认为true：显示。
        * @return  {Boolean} true/false 表示写入成功与否的状态
        * @author zl-fire 2021/08/28
        * @example
        *  let res=writeFile({path:"./test8.txt",content:"helloworld",showExeResult:true});
        *  console.log("res",res)
      */
    function writeFile(paramsObj) {

        let { path, content, showExeResult } = paramsObj;
        if (showExeResult == undefined) showExeResult = true; //默认显示提示
        // 绝对路径判断规则
        if (/^[A-Za-z]:/.test(path)) {
            try {
                handleAbsolutePath(path, content, showExeResult);
                return true;
            } catch (err) {
                console.log("======创建文件错误====", err);
                return false;
            }
        }
        return writePathFile({ path, content, showExeResult });
    }



    // 写入文件的外层调用函数
    function writePathFile({ path, content, showExeResult }) {
        var pathA = path.split("/");
        pathA.pop();
        // 生成提示语
        let msg = "";
        try {
            // 递归创建不存在的目录
            createDirsSync(pathA.join("/"));
            // 写入文件
            fs$5.writeFileSync(path, content);
            msg = path + " 创建成功.";
            // 控制默认的日志打印
            if (showExeResult) {
                console.log(msg);
            }
            return true;

        } catch (err) {
            msg = path + " 创建失败.";
            console.log(msg, err);
            return false;
        }
    }

    const fs$4 = require('fs'); // 引入fs模块
    const Path$1 = require('path');
    let showExeResultVal, log$1;

    /**
        * @function 同步方式，递归删除指定目录下的所有文件/文件夹
        * @param {Object} paramsObj 完整的参数对象信息
        * @param {String} paramsObj.fileUrl 要删除的文件/文件夹路径
        * @param {Boolean} paramsObj.flag 是否删除最外层目录，不传或为false表示不删除，true表示删除.
        * @param {Boolean} paramsObj.showExeResult  是否显示写入操作完后的提示，默认为true：显示。
        * @param {string[]} paramsObj.delExactType  当删除的是一个非空文件夹时，删除后代文件中指定的某种类型文件
        * 
        * @return {Boolean} true/false 表示操作是否成功
        * @author zl-fire 2021/08/28
        * @example
        *  let res1 = deleteFile({ fileUrl: "./gggg", flag: true});
        *  console.log("res1",res1)
      */
    function deleteFile(paramsObj) {
        let { fileUrl, flag, showExeResult, delExactType } = paramsObj;
        if (showExeResult == undefined) showExeResult = true; //默认显示提示
        showExeResultVal=showExeResult;
        return delFile({ fileUrl, flag, delExactType });
    }


    /**
        * @function 同步方式，删除指定目录下的所有文件/文件夹
        * @param {String} fileUrl 要删除的文件/文件夹路径
        * @param {Boolean} flag 是否删除最外层目录，不传或为false表示不删除，true表示删除.
        * @return {Boolean} true/false 表示操作是否成功
        * @author zl-fire 2021/08/28
        * @example
        *  let res=delFile("./hello", true, true);
        *  console.log("res",res)
      */
    function delFile({ fileUrl, flag, delExactType }) {
        var i;
        // 控制是否打印删除日志
        if (!showExeResultVal) {
            log$1 = function () { };  //不打印
        }
        else {
            log$1 = console.log; //打印
        }

        // 控制递归结束后，在最外层时进行返回
        if (i == undefined) i = 0;
        else i++;

        // 文件不存在时直接结束
        if (!fs$4.existsSync(fileUrl)) {
            log$1("你要删除的 " + fileUrl + " 不存在!");
            return false;
        }    // 当前删除对象为文件夹时 
        if (fs$4.statSync(fileUrl).isDirectory()) {
            var files = fs$4.readdirSync(fileUrl);
            var len = files.length,
                removeNumber = 0;
            if (len > 0) {
                files.forEach(function (file) {
                    var url = fileUrl + '/' + file;
                    if (fs$4.statSync(url).isDirectory()) {
                        delFile({ fileUrl: url, flag: true, delExactType }); //对于文件夹递归调用自身,由于这里固定传入了true,所以子文件夹一定会被删除
                    } else {
                        let extname = Path$1.extname(file);//获取文件的后缀名
                        if (delExactType && !delExactType.includes(extname)) return; //如果指定了要删除的具体名字文件类型，那么没在指定中的内容就不进行删除
                        fs$4.unlinkSync(url); //对于文件直接进行删除
                        log$1('删除文件' + url + '成功');
                    }
                    removeNumber++;
                });
                // 是否删除自身
                if (len == removeNumber && flag) {
                    fs$4.rmdirSync(fileUrl);
                    log$1('删除文件夹' + fileUrl + '成功');

                }
            } else if (len == 0 && flag) {
                // 对于最外层目录，将根据调用delFile时的第二个参数是否为true决定
                fs$4.rmdirSync(fileUrl);
                log$1('删除文件夹' + fileUrl + '成功');

            }
        } else {
            // 当前删除对象为文件时 
            fs$4.unlinkSync(fileUrl);
            log$1('删除文件' + fileUrl + '成功');
        }
        if (i == 0) {
            return true;//表示删除完成
        }
    }

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
                deepCall2Top$1(Obj.parent_id, id2objMap); // 每删完一次就查看父级的children数组是否为空，如果为空就把父级也删了
            }
            else if (Obj.children && Obj.children.length > 0) {  //children存在，且不为空
                signEmptyDir(Obj.children, id2objMap);
            }

        }
    }

    // 递归向上查找，为所有空的父级进行标记
    function deepCall2Top$1(parent_id, id2objMap) {
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
            deepCall2Top$1(parentObj.parent_id, id2objMap);
        }
    }

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
                deleteIncludeSpeFieldArrEle(Obj.children, field, val);
            }
        }
    }

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
            let index = parent_parObj.children.indexOf(parentObj);
            parent_parObj.children.splice(index, 1);
            // 同时递归调用自身，往上层查找
            deepCall2Top(parent_id2, id2objMap);
        }
    }
      //此方法还有点异常，后续在调整，先不使用

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
     * filterEmptyDir(list);
     * 
    */
    function filterEmptyDir(list, isfilterEmptyDir) {
        //递归遍历对象数组，生成一个map对象
        let id2objMap = {};
        deepCallGetMapObj({ list, id2objMap, field: "id" }); //以id为键进行构建map对象
        if (isfilterEmptyDir == "delEmptyDir") {
            console.log("=====delEmptyDir========");
            delEmptyDir(list, id2objMap);
        }
        else {
            signEmptyDir(list, id2objMap); //标识空目录，（存在children字段，且children为空数组），会加上empty字段表示空目录
            deleteIncludeSpeFieldArrEle(list, "empty");//删除空目录,含有这个empty字段的就认为是空目录
        }
    }

    const fs$3 = require('fs'); // 引入fs模块
    const Path = require('path');
    /**
        * @function 同步方式，读取指定目录下的所有文件/文件夹列表,返回tree结构数据
        * @param {Object} paramsObj 完整的参数对象信息
        * @param {String} paramsObj.dirPath 要读取目录，可传入相对路径(./,../),也可传入绝对路径
        * @param {Array<string>} paramsObj.ignoreList 读取过程中要忽略的目录名，如： ["node_modules",".git"]
        * @param {Array<string>} paramsObj.needTypes  指定要读取的具体文件类型,除此之外全部忽略，如：[".doc", ".docx"]
        * @param {Array<string>}  paramsObj.ignoreTypes  指定要忽略的具体文件类型,除此之外全部读取(如果needTypes存在，则以needTypes为准，会忽略ignoreTypes参数)
        * @param {Boolean}  paramsObj.isfilterEmptyDir  是否过滤掉空目录字段信息（存在children字段，且children为空数组），默认不过滤， 传入true进行过滤
        * @return {Array<object>} 返回tree结构数据（如果想保留文件对象上的空的children数组字段，那么就设置：readFileList.nodelEmptyChildren=true）
        * @author zl-fire 2021/08/29
        * @example
        * var fileList = readFileList({
        *     dirPath: "src",  //读取src下的所有文件
        *     ignoreList: ["node_modules", ".git"], //遇到node_modules目录时进行忽略
        *     needTypes: [".doc", ".docx"], //只读取".doc", ".docx" 类型文件
        *     // ignoreTypes:[".js",".doc"], //忽略".js",".doc"文件类型(如果needTypes存在，则以needTypes为准，会忽略ignoreTypes参数)
        * })
        * console.log(JSON.stringify(fileList, null, 4));
        * 
        * 
        * 
      */
    function readFileList(paramsObj) {
        let { dirPath, ignoreList, needTypes, ignoreTypes, isfilterEmptyDir = false } = paramsObj;//needTypes优先级最高
        // 文件列表
        const filesList = [];
        const idv = 0; //初始id值
        getFileList({ dirPath, filesList, idv, ignoreList, needTypes, ignoreTypes });
        if (isfilterEmptyDir) {
            filterEmptyDir(filesList, isfilterEmptyDir);//过滤空目录
        }
        return filesList;
    }

    function getFileList({ dirPath, filesList, idv, ignoreList, needTypes, ignoreTypes }) {
        let id = 1;// id起始值
        var files = fs$3.readdirSync(dirPath);
        files.forEach(function (file) { // file为每个文件的名字
            const obj = {
                name: file,
                id: idv + '_' + id++,
                parent_id: idv,
                children: [],
            };
            let fileUrl = dirPath + '/' + file;
            // 是文件夹就递归
            if (fs$3.statSync(fileUrl).isDirectory()) {
                if (ignoreList && ignoreList.includes(file)) return;//如果声明了只忽略某些子文件夹，则非指定文件夹全部读取
                filesList.push(obj);
                getFileList({ dirPath: fileUrl, filesList: obj.children, idv: obj.id, ignoreList, needTypes, ignoreTypes });
            }
            else {
                let extname = Path.extname(file);//获取文件的后缀名
                if (needTypes && !needTypes.includes(extname)) return; //同上，不过针对的是具体的文件而不是文件夹
                if (!needTypes && ignoreTypes && ignoreTypes.includes(extname)) return;
                // 默认删除文件对象中空的children数组
                if (!readFileList.nodelEmptyChildren) delete obj.children;
                filesList.push(obj);
            }
        });
    }

    const fs$2 = require('fs'); // 引入fs模块
    /**
        * @function 以同步方式读取指定文件的内容
        * @param {Object} paramsObj 完整的参数对象信息
        * @param {String} paramsObj.filePath 要读取的文件路径，可传入相对路径(./,../),也可传入绝对路径
        * @param {String} paramsObj.readEncode 表示以何种编码读取文件，无默认值为
        * @param {buffer|string} paramsObj.returnType 将读取结果以指定类型返回，默认返回字符串类型，可选值：buffer,string
        * @return {buffer|string} 返回buffer|string类型数据
        * @author zl-fire 2021/08/29
        * @example
        * let res = readFileContent({ filePath: "./src/main.js" });
        * console.log("=====res====", res);
      */
    function readFileContent(paramsObj) {
      let { filePath, readEncode, returnType = "string" } = paramsObj;
      let buffer;
      if (readEncode) {
        buffer = fs$2.readFileSync(filePath, readEncode);
      }
      else {
        buffer = fs$2.readFileSync(filePath);
      }
      if (returnType == "string") return String(buffer);
      else return buffer;
    }

    const fs$1 = require('fs'); // 引入fs模块
    /**
        * @function 以同步方式向指定文件追加内容
        * @description 对于在非末尾添加文件内容时，需要先将文件读取出来，然后在内存中修改后再进行写入
        * @param {Object} paramsObj 完整的参数对象信息
        * @param {String} paramsObj.filePath 要追加内容的文件路径
        * @param {String} paramsObj.content 要追加的内容
        * @param {String} paramsObj.position 要将内容追加到那个位置，可选择：start,end,特定字符，默认end (当写了特定字符时，将会把内容追加在特定字符后面)
        * @param {String} paramsObj.addType 添加类型：追加:add，替换:replace。（替换时只有position为指定位置时才有效）
        * @param {String} paramsObj.readFileContent_readEncode 对于在非末尾添加文件内容时,需要先读后写，所以这里表示以何种编码先读取文件，默认值为'utf-8'
        * @param {buffer|string} paramsObj.readFileContent_returnType 对于在非末尾添加文件内容时,需要先读后写，所以这里表示将以何种类型返回读取结果，默认字符串类型，可选值：buffer,string
        * @return {void}  无返回值
        * @author zl-fire 2021/08/29
        * @example
        * // paramsObj 完整的参数对象信息
        * // paramsObj.filePath 要追加内容的文件路径
        * // paramsObj.content 要追加的内容
        * // paramsObj.position 要将内容追加到那个位置，可选择：start,end,特定字符，默认end (当写了特定字符时，将会把内容追加在特定字符后面)
        * // paramsObj.addType 添加类型：追加:add，替换:replace。（替换时只有position为指定位置时才有效）
        * // paramsObj.readFileContent_readEncode 对于在非末尾添加文件内容时,需要先读后写，所以这里表示以何种编码先读取文件，默认值为'utf-8'
        * // paramsObj.readFileContent_returnType 对于在非末尾添加文件内容时,需要先读后写，所以这里表示将以何种类型返回读取结果，默认字符串类型，可选值：buffer,string
        *  addFileContent({filePath:"./test8.txt", content:"你好"})
      */
    function addFileContent(paramsObj) {
        let { filePath, content, position = "end", addType = "add", readFileContent_readEncode = 'utf-8', readFileContent_returnType = "string" } = paramsObj;
        let fileConten;
        if (position != "end") {
            // 读取文件
            fileConten = readFileContent({ filePath: filePath, readEncode: readFileContent_readEncode, returnType: readFileContent_returnType });
        }
        switch (position) {
            case "start":
                writeFile({ path: filePath, content: content + fileConten, showExeResult: false });
                break;
            case "end":
                fs$1.appendFileSync(filePath, content);
                break;
            default:
                // 构建正则表表达式
                let pattern = new RegExp(position, "g");
                if (addType == "replace") {
                    writeFile({ path: filePath, content: fileConten.replace(pattern, content), showExeResult: false });
                }
                else
                    writeFile({ path: filePath, content: fileConten.replace(pattern, position + content), showExeResult: false });
                break;
        }
    }

    const fs = require('fs'); // 引入fs模块
    const path = require('path');
    let log;
    /**
        * @function copycutFiledir
        * @param {Object} paramsObj 同步方式，对文件/文件夹执行复制/剪切操作
        * @param {String} paramsObj.inputFileUrl 要复制/剪切的文件/文件夹路径
        * @param {String} paramsObj.outFileUrl 要将文件/文件夹要复制/剪切到哪里(复制目录只能写目录路径，复制文件只能写文件路径)
        * @param {String} paramsObj.copyOrCut  复制还是剪切,值为copy|cut ，默认为复制copy
        * @param {Boolean} paramsObj.showExeResult  是否显示写入操作完后的提示，默认为true：显示。
        * @param {Boolean} paramsObj.rewrite  对于已经存在的文件是否跳过，默认false跳过, d当值为true时表示进行覆盖
        * @author zl-fire 2021/09/10
        * @example
        * copycutFiledir({
        *     inputFileUrl: "./helloooo",
        *     outFileUrl: "./helloooo333",
        *     copyOrCut: "copy",
        *     // showExeResult:false,
        *     rewrite:false
        * })
      */
    function copycutFiledir(paramsObj) {
        try {
            let {
                inputFileUrl, //要复制或剪切的文件路径
                outFileUrl, //要把文件或路径复制剪切到哪里
                copyOrCut = "copy",//复制(copy) or 剪切(cut),默认复制
                showExeResult = true,
                rewrite = false,
            } = paramsObj;

            // 标识时文件还是文件夹
            let fileOrDir;//dir|file

            // 控制是否打印日志
            if (showExeResult != undefined && showExeResult == false) {
                log = function () { };
            } else if (log == undefined) {
                log = console.log;
            }

            if (inputFileUrl === outFileUrl) {
                log("【 输入输出文件不能相同】");
                return;
            }

            // 先判断文件/文件夹是否存在
            if (!fs.existsSync(inputFileUrl)) {
                log("【 " + inputFileUrl + " 】不存在!");
                return false;
            };

            // 先判断是文件还是文件夹
            if (fs.statSync(inputFileUrl).isDirectory()) {
                fileOrDir = "dir";
            }
            else {
                fileOrDir = "file";
            }
            let res;
            if (fileOrDir == "file") res = handleFile(paramsObj);// 如果是文件，开始操作
            else handleDir(paramsObj);  // 如果是文件夹，开始操作
            // 如果是剪切操作，还需要删除下原始文件
            if (copyOrCut == "cut" && res != "跳过") deleteFile({ fileUrl: inputFileUrl, showExeResult, flag: true, showExeResult });
            // 操作完成后的提示
            log("【 " + inputFileUrl + " 】成功 " + copyOrCut + " 到 【" + outFileUrl + " 】");
        }
        catch (err) {
            console.log("=========err=========", err);
        }
    }

    // 对文件实现复制或剪切的操作
    function handleFile(params) {
        let {
            inputFileUrl, //要复制或剪切的文件路径
            outFileUrl, //要把文件或路径复制剪切到哪里
            copyOrCut, //复制(copy) or 剪切(cut)
            rewrite = false,//如果目标文件夹已经存在此文件，是否要覆盖，默认不覆盖
            showExeResult
        } = params;
        // 如果为复制操作（先读取，在写入）
        let content = readFileContent({ filePath: inputFileUrl, returnType: "buffer" });
        // 判断目标目录是否已经存在此文件
        let state = fs.existsSync(outFileUrl);//为true表示存在
        if (!state) {
            writeFile({ path: outFileUrl, content, showExeResult });
        }
        else {
            if (state && rewrite) {
                writeFile({ path: outFileUrl, content, showExeResult });
                log("【 " + inputFileUrl + "】 已经存在，自动覆盖此文件");
            }        // 不覆盖已经存在的文件
            if (state && !rewrite) {
                log("【 " + inputFileUrl + "】 已经存在，自动跳过此文件");
                return "跳过";
            }    }
    }

    // 对文件夹进行写入
    function handleDir(params) {
        let {
            inputFileUrl, //要复制或剪切的文件路径
            outFileUrl, //要把文件或路径复制剪切到哪里
            copyOrCut, //复制(copy) or 剪切(cut)
            rewrite = false,//如果目标文件夹已经存在此文件，是否要覆盖，默认不覆盖
            showExeResult
        } = params;

        // 开始递归进行复制
        var files = fs.readdirSync(inputFileUrl);
        var len = files.length;
        if (len > 0) {
            files.forEach(function (file) {
                // var inpUrl = inputFileUrl + '/' + file;
                // var outUrl = outFileUrl + '/' + file;
                // 通过path.join+全路径方法实现兼容
                var inpUrl = path.join(inputFileUrl,file);
                var outUrl = path.join(outFileUrl,file);
                // 操作目录
                if (fs.statSync(inpUrl).isDirectory()) {
                    var n = fs.readdirSync(inputFileUrl);
                    if (n.length > 0) {
                        handleDir({ ...params, inputFileUrl: inpUrl, outFileUrl: outUrl });
                    } else {
                        fs.rmdirSync(outFileUrl);  //创建空文件夹
                    }
                }
                // 操作文件
                else {
                    handleFile({ ...params, inputFileUrl: inpUrl, outFileUrl: outUrl });
                }
            });
        } else {
            log("【 " + inputFileUrl + "】 是空目录，没有可复制文件/文件夹");
            return;
        }
    }

    /**
        * @function 监听一些不知道何时结束的程序执行进程
        * @description 监听一些不知道何时结束的程序执行进程,实现原理为监听一个全局变量标识，这个标识在执行过程中会不断的发生变化。所以：如果连续ns后，这个标识都没改变，那就认为执行结束
        * @param {Object} paramsObj 完整的参数对象信息(提示：全局标识字段名字必须为:changFlag)
        * @param {number} paramsObj.msV 设置每过多少毫秒扫描一次标识变量 是否发生变化，单位：毫秒。（默认1000毫秒）
        * @param {number} paramsObj.num 设置扫描多少次标识都不变，就认为是已经完成，默认3次
        * @param {function} paramsObj.callBack 当认为执行过程结束后要执行的回调函数
        * @param {object} changFlagObj 完整的参数对象信息,结构：{val:number}
        * @author zl-fire 2021/09/02
        * @example
        * let changFlagObj={val:0}; //用于异步控制的标识
        * filterEmptyDir(list, id2objMap);//删除空目录,删除时changFlagObj.val会变化
        * listnExePro({msV,num,callBack},changFlagObj); //监听何时删除完成
      */
    function listnExePro(paramsObj = {},changFlagObj) {
        let {
            num = 3,//设置多少次标识不变就认为是已经完成
            msV = 1000,//设置每过多少毫秒扫描一次
            callBack = function () { //当认为执行过程结束后要执行的回调函数
                console.log("每" + msV + "毫秒扫描一次，连续" + num + "次都没发生变化，认为异步已经执行结束!");
            }
        } = paramsObj;
        let backChangFlag = changFlagObj.val;//用于和标识变量比较的备份值
        let times = 0;//连续没有变化的次数
        let timer = setInterval(() => {
            if (changFlagObj.val != backChangFlag) {
                backChangFlag = changFlagObj.val;
            }
            else {
                times++;
            }
            if (times == num) {  //连续n秒都没有变化，认为已经结束
                clearInterval(timer);
                callBack();
            }
        }, msV);
    }

    /**
        * @function 异步方式删除对象数组中空的目录（无法精确把控何时删除完成）
        * @param {Object[]} list 要去空的对象数组
        * @param {Object} other 完整的参数对象信息(提示：全局标识字段名字必须为:changFlag)
        * @param {number} other.msV 设置每过多少毫秒扫描一次标识变量 是否发生变化，单位：毫秒。（默认1000毫秒）
        * @param {number} other.num 设置扫描多少次标识都不变，就认为是已经完成，默认3次
        * @param {function} other.callBack 当认为执行过程结束后要执行的回调函数
        * @author zl-fire 2021/09/02
        * @example
        * var fileList = readFileList({
        *     dirPath: path.resolve("."),  //读取src下的所有文件
        *     ignoreList: ["node_modules", ".git"], //遇到node_modules目录时进行忽略
        *     needTypes: [".docx"], //只读取".doc", ".docx" 类型文件
        *     // isfilterEmptyDir:true
        *     // ignoreTypes:[".js",".doc"], //忽略".js",".doc"文件类型(如果needTypes存在，则以needTypes为准，会忽略ignoreTypes参数)
        * });
        * util.asyncDelEmptyDir(fileList);
        * console.log(JSON.stringify(fileList, null, 4));
      */
    function asyncDelEmptyDir(list,other={}) {
        // 控制异步执行的执行进程监听
        let {
            msV=1000,
            num=2,
            callBack=function () {
                console.log("============list中空的目录删除完成======", JSON.stringify(list, null, 4));
            }
        }=other;
        //递归遍历对象数组，生成一个map对象
        let id2objMap = { 0: { children: list } };
        deepCallGetMapObj({ list, id2objMap, field: "id" });

        let changFlagObj={val:0}; //用于异步控制的标识

        filterEmptyDir(list, id2objMap);//删除空目录,删除时changFlagObj.val会变化

        listnExePro({msV,num,callBack},changFlagObj); //监听何时删除完成

        // 将空目录（即没有我需要的类型文件的目录）过滤掉
        function filterEmptyDir(list, id2objMap) {
            for (let i = 0; i < list.length; i++) {
                let Obj = list[i];
                // 这里写定时器+自执行函数的目的是为了，保证随着数组元素的删除，i值已经不准确的情况下，逻辑正确
                (function (Obj) {
                    setTimeout(function () {
                        // 判断是否为文件
                        if (!Obj.children) {  //children不存在，则认为是文件
                            return;
                        }
                        else if (Obj.children && Obj.children.length == 0) {  //children存在，但为空，则认为是空目录
                            let parent_id = Obj.parent_id;
                            let index = list.indexOf(Obj);
                            changFlagObj.val++;//表示变化了
                            list.splice(index, 1);
                            deepCall2Top(parent_id, id2objMap); // 每删完一次就查看父级的children数组是否为空，如果为空就把父级也删了
                        }
                        else if (Obj.children && Obj.children.length > 0) {  //children存在，且不为空
                            filterEmptyDir(Obj.children, id2objMap);
                        }
                    }, 0);
                })(Obj);
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
                let index = parent_parObj.children.indexOf(parentObj);
                parent_parObj.children.splice(index, 1);
                changFlagObj.val++;//表示变化了
                // 同时递归调用自身，往上层查找
                deepCall2Top(parent_id2, id2objMap);
            }
        }
    }

    var main = {
        writeFile,
        deleteFile,
        copycutFiledir,
        readFileList,
        readFileContent,
        addFileContent,
        util: {
            deepCallGetMapObj,
            signEmptyDir,
            deleteIncludeSpeFieldArrEle,
            filterEmptyDir,
            delEmptyDir,
            listnExePro,
            asyncDelEmptyDir,
            createDirsSync
        }
    };

    return main;

})));
