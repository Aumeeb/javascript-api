import * as fs from 'fs';
import * as path from "path";
var copy = require('recursive-copy');


export const outputFolder = 'build'; //文件的输出的文件夹

const foldersName = ['data', 'resource'];
const srcPath = path.resolve(__dirname, '..') + '\\' //获取资源路径

const buildPath = path.resolve(__dirname, '../../') + '\\' + outputFolder;


export function copyResources() {
    for (const folderName of foldersName) {

        let from = srcPath + folderName;
        let dest = buildPath + '\\' + folderName;

        console.log('-----------------------');
        console.log(from);
        console.log(dest);
        console.log('-----------------------');

        copy(from, dest, { overwrite: true }, (error: any, results: any) => {
            if (error) {
                console.error('拷贝 : ' + error);
            } else {
                console.info('拷贝了 ' + results.length + ' 文件');
            }
        });

    }

}






