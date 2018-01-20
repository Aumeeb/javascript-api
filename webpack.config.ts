import * as webpack from "webpack";
import * as path from "path";
import { outputFolder,copyResources } from "./src/server/autotruck";



copyResources();

const outerIP = '117.62.230.235';
const innerIP = '127.0.0.1';

const config: webpack.Configuration = {
    devtool: 'source-map',
    entry: ['./src/index.ts'],
    output: {
        path: path.resolve(__dirname, outputFolder), //获取当前路径
        filename: 'bundle.js', //文件名
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
        ],

    },
    devServer: {
        contentBase: path.resolve(__dirname, outputFolder),//文件地址
        host: innerIP, //IP地址
        compress: true, //服务器压缩
        port: 2222 //端口
    }
};

export default config;

