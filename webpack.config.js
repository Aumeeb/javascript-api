"use strict";
exports.__esModule = true;
var path = require("path");
var config = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
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
    }
};
exports["default"] = config;
