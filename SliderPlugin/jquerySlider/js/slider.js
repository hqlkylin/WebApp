/**
 * Created by 韩麒麟 on 2015/9/25.
 */


/*
 *参数说明
 *
 *
 *   width: 500,-- 宽度
 *   height: 300,-- 高度
 *   autoPlay: true,--定时播放
 *   isShowNextAndPrev: true,--显示上一个、下一个按钮
 *   isShowTitle: true,--显示标题
 *   isShowControls: true,--显示控制
 *   data: [{
 "imgUrl": "img/1.png",
 "link": "链接",
 "title": "标题"
 }],--数据
 *   speed: 600--动画时间/毫秒
 *
 *
 */

/* 创建一个闭包 */
;
(function ($) {

    //对象
    $.Slider = function (element, options) {
        var self = this;
        this.$element = element;
        this.defaults = {
            width: 500,
            height: 300,
            autoPlay: true,
            isShowNextAndPrev: true,
            isShowTitle: true,
            isShowControls: true,
            data: [],
            speed: 600
        };
        this.init = function () {
            this.opts = $.extend({}, this.defaults, options || {});
            if (!this.opts.data.length) {
                alert("数据获取异常!");
                return;
            }
            this.renderHtml();
        }
        //初始化 渲染Dom
        this.init();

        this.prev = this.$element.find(".prev");
        this.next = this.$element.find(".next");
        this.ul = this.$element.find("ul");
        this.index = 0;
        this.isAnimate = false;
        this.arrLi = this.ul.find("li");
        this.arrImg = this.ul.find("img");
        this.arrTitle = this.$element.find("p");
        this.size = this.arrImg.size();
        this.timer = null;
        this.controls = this.$element.find(".controls");
        this.controlsA = this.controls.find('a');
        this.setValues();
        this.firstLi = this.arrLi.first();
        this.lastILi = this.arrLi.last();
        this.posWidth = this.arrLi.width();
        //Show Title
        if (!this.opts.isShowTitle) {
            this.arrTitle.hide();
        }
        //Show Next Prev
        if (!this.opts.isShowNextAndPrev) {
            this.prev.hide();
            this.next.hide();
        }
        if (!this.opts.isShowControls) {
            this.controls.hide();
        }
        this.next.click(function () {
            self.npClick("next");
        });
        this.prev.click(function () {
            self.npClick("prev");
        });
        this.controlsA.click(function () {
            self.controlsClick($(this).index());
        });
        //autoPlay
        if (this.opts.autoPlay) {
            this.autoPlay();
            this.$element.hover(function () {
                clearInterval(self.timer);
            }, function () {
                self.autoPlay();
            });
        }

    }
    //原型
    $.Slider.prototype = {
        autoPlay: function () {
            var self = this;
            clearInterval(this.timer);
            this.timer = setInterval(function () {
                self.npClick("next");
            }, 2000);
        },
        controlsClick: function (index) {
            this.index = index;
            this.move();
        },
        npClick: function (direction) {
            if (!this.isAnimate) {
                this.isAnimate = !this.isAnimate;
                direction == "prev" ? this.index-- : this.index++;
                this.move();
            } else {
                return;
            }
        },
        showA: function () {
            var index = this.index;
            if (index < 0) {
                index = this.index - 1;
            }
            if (index >= this.size) {
                index = 0;
            }
            this.controlsA.eq(index).addClass("active").siblings().removeClass("active");

            if (this.opts.isShowTitle) {
                this.arrTitle.html(this.opts.data[index].title);
            }

        },
        move: function () {

            var self = this;
            if (this.index < 0) {
                this.lastILi.css({position: "absolute", left: -this.posWidth});
            }
            if (this.index >= this.size) {
                this.firstLi.css({position: "relative", left: this.index * this.posWidth});
            }
            $(this.ul).animate({left: -this.index * this.posWidth},
                this.opts.speed,
                function () {
                    if (self.index < 0) {
                        self.index = self.size - 1;
                        self.lastILi.css({position: "relative", left: ""});
                        self.ul.css({left: -self.index * self.posWidth});
                    }
                    if (self.index >= self.size) {
                        self.index = 0;
                        self.firstLi.css({position: "relative", left: ""});
                        self.ul.css({left: 0});
                    }
                    self.isAnimate = false;
                });

            this.showA();
        },
        renderHtml: function () {
            var strHtml =
                '<ul></ul>'
                + '<div class="controls">'
                + '</div>'
                + '<a href="javascript:;" class="arrow prev">&lt;</a>'
                + '<a href="javascript:;" class="arrow next">&gt;</a>'
                + '<p></p>';

            this.$element.append(strHtml);

            var strImg = "",
                strA = "";

            for (var obj in this.opts.data) {
                var object = this.opts.data[obj];
                //strImg += "<li><a  href='" + object.link + "'><img src='" + object.imgUrl + "'/><p>" + object.title + "</p></a></li>";
                strImg += "<li><a  href='" + object.link + "'><img src='" + object.imgUrl + "'/></a></li>";
                strA += "<a href='javascript:;'></a>";
            }
            this.$element.find("ul").append(strImg).next().append(strA);
        },
        setValues: function () {
            this.$element.css({width: this.opts.width, height: this.opts.height});
            this.arrImg.css({width: this.opts.width, height: this.opts.height});
            this.ul.css({width: this.size * this.opts.width});
            this.controlsA.first().addClass("active");
            this.arrTitle.html(this.opts.data[this.index].title);
        }

    }
    //插件
    $.fn.slider = function (options) {


        return this.each(function () {

            if (undefined == $(this).data('slidePlugin')) {
                var slidePlugin = new $.Slider($(this), options);
                $(this).data('slidePlugin', slidePlugin);
            }

        })

    }

})(jQuery);

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

app.listen(4000, function () {
    console.log("项目启动成功：http://localhost:5000");
});


module.exports = app;
