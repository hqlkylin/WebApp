/**
 * Created by hanqilin on 16/6/1.
 */

var webpack = require("webpack");

module.exports = {

    entry: {
        index: "./src/js/index.js",
        list: "./src/js/list.js"
    },
    output: {
        path: __dirname + '/dist/',
        filename: '[name].build.js?v=[hash]',
        publicPath: "/dist/"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                query: {
                    presets: ['es2015']
                }
            },
            {test: /\.css$/, loader: "style!css"},
            {test: /\.(jpg|png)$/, loader: "url?limit=8192&name=[path][hash:8].[ext]&context=src"},//context :https://github.com/spmjs/spm-webpack/issues/5
            {test: /\.scss$/, loader: "style!css!sass"}
        ]
    },
    plugins: [
        new webpack.BannerPlugin('This file is created by hanqilin')
    ]
    , resolve: {
        alias: {
            jquery: "./src/js/jquery.js"
        }
    }

}