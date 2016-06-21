var express = require('express');
var ueditor = require("ueditor");//百度富文本编辑器
var path = require('path');
var ejs = require('ejs');// 改变 .html
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');//session


var routes = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin/index');
var news = require('./routes/news');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/uploads'));
app.use(session({secret: 'kylin' /*加密*/}));

app.use("/ueditor/ueditor", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var imgname = req.ueditor.filename;
        var img_url = '/images/ueditor/';
        //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.ue_up(img_url);
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/images/ueditor/';
        // 客户端会列出 dir_url 目录下的所有图片
        res.ue_list(dir_url);
    }
    // 客户端发起其它请求
    else {
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));


//文件上传
var multer = require('multer');
var common = require('./public/javascripts/common');// 公共方法 时间格式化

app.use(multer({
    dest: './uploads/',
    rename: function (fieldname, filename) {
        /*return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()*/
        return new Date().format("yyyyMMddhhmmss");
    }
}));

app.use('/', routes);
app.use('/users', users);
app.use('/admin', admin);
app.use('/news', news);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(4100, function () {
    console.log("项目启动成功：http://localhost:4100");
});


module.exports = app;

/*
http://baoming.jimei.com.cn:5000/admin/login    账号：kylin  密码：123123*/
