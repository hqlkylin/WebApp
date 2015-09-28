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