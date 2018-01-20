import * as webpack from "webpack";
import * as path from "path";



const config: webpack.Configuration = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'build'), //获取当前路径
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
};

export default config;

