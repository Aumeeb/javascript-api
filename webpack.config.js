"use strict";
exports.__esModule = true;
var path = require("path");
var outputFolder = 'build'; //文件的输出的文件夹
var outerIP = '117.62.230.235';
var innerIP = '127.0.0.1';
var config = {
    entry: ['./src/index.ts', './src/data'],
    output: {
        path: path.resolve(__dirname, outputFolder),
        filename: 'bundle.js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['*', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.svg/, loader: 'svg-url-loader' },
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, outputFolder),
        host: innerIP,
        compress: true,
        port: 2222 //端口
    }
};
exports["default"] = config;
