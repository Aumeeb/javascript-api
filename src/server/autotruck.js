"use strict";
exports.__esModule = true;
var path = require("path");
var copy = require('recursive-copy');
exports.outputFolder = 'build'; //文件的输出的文件夹
var foldersName = ['data', 'resource'];
var srcPath = path.resolve(__dirname, '..') + '\\'; //获取资源路径
var buildPath = path.resolve(__dirname, '../../') + '\\' + exports.outputFolder;
function copyResources() {
    for (var _i = 0, foldersName_1 = foldersName; _i < foldersName_1.length; _i++) {
        var folderName = foldersName_1[_i];
        var from = srcPath + folderName;
        var dest = buildPath + '\\' + folderName;
        console.log('-----------------------');
        console.log(from);
        console.log(dest);
        console.log('-----------------------');
        copy(from, dest, { overwrite: true }, function (error, results) {
            if (error) {
                console.error('拷贝 : ' + error);
            }
            else {
                console.info('拷贝了 ' + results.length + ' 文件');
            }
        });
    }
}
exports.copyResources = copyResources;
