/**
 * Created by hanqilin on 16/10/22.
 * npm i babel-core babel-loader babel-preset-es2015 css-loader file-loader sass-loader style-loader url-loader -D

 */


var webpack = require("webpack");
var path = require('path');
// NodeJS中的Path对象，用于处理目录的对象，提高开发效率。
// 模块导入
module.exports = {
    // 入口文件地址，不需要写完，会自动查找
    entry: {index: './src/app'},
    // 输出
    output: {
        // 文件地址，使用绝对路径形式
        path: path.join(__dirname, './dist'),
        //[name]这里是webpack提供的根据路口文件自动生成的名字
        filename: '[name].build.js?v=[hash]',
        // 在 path 属性之前的, 比如调试或者 CDN 之类的域名
        publicPath: '/WebApp/test/webpack2/dist/',

        chunkFilename: '[name].min.js'
    },
    // 服务器配置相关，自动刷新!
    devServer: {
        historyApiFallback: true,
        hot: false,
        inline: true,
        grogress: true,
    },
    // 加载器
    module: {
        // 加载器
        loaders: [
            // 解析.vue文件
            {test: /\.vue$/, loader: 'vue'},
            // 转化ES6的语法
            {
                test: /\.js$/,
                loader: 'babel',
                query: {presets: ['es2015']},
                exclude: /node_modules/

            },
            // 编译css并自动添加css前缀
            {test: /\.css$/, loader: 'style!css!autoprefixer'},
            //.scss 文件想要编译，scss就需要这些东西！来编译处理
            //install css-loader style-loader sass-loader node-sass --save-dev
            {test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            // 图片转化，小于8K自动转化为base64的编码
            {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192&name=[path][hash:8].[ext]&context=src'},
            //html模板编译？
            {test: /\.(html|tpl)$/, loader: 'html-loader'},
        ]

    },
    vue: {
        loaders: {
            css: 'style!css!autoprefixer',
        }
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['', '.js', '.vue'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {

        }
    },
    plugins: [
        new webpack.BannerPlugin('This file is created by hanqilin'),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ],
    //Query 直接在 html 中引入，然后在 webpack 中把它配置为全局即可。

    externals: {
        jquery: 'window.$'
    },
    // 开启source-map，webpack有多种source-map，在官网文档可以查到
    // devtool: 'eval-source-map'
};