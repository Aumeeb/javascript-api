"use strict";
exports.__esModule = true;
var path = require("path");
var autotruck_1 = require("./src/server/autotruck");
autotruck_1.copyResources();
var outerIP = '117.62.230.235';
var innerIP = '127.0.0.1';
var config = {
    devtool: 'source-map',
    entry: ['./src/index.ts'],
    output: {
        path: path.resolve(__dirname, autotruck_1.outputFolder),
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
        contentBase: path.resolve(__dirname, autotruck_1.outputFolder),
        host: innerIP,
        compress: true,
        port: 2222 //端口
    }
};
exports["default"] = config;
