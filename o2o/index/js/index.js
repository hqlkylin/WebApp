/**
 * Created by 韩麒麟 on 2015/9/15.
 */

var Slider = function ($el) {
    var self = this;
    this.$el = $el;
    this.opts = {
        'data': [{
            "imgUrl": "images/ac/pic1.jpg",
            "link": "http://www.baidu.com"
        }, {
            "imgUrl": "images/ac/pic2.jpg",
            "link": "http://www.google.com"
        }, {
            "imgUrl": "images/ac/pic3.jpg",
            "link": "http://www.sina.com"
        }],
        'autoPlay': true,
        'speed': 600
    };
    this.index = 0;
    this.size = 0;
    this.timer = null;
    this.flag = true;
    this.getSetting();
    this.renderHtml();
    this.widowsWidth = 0;
    this.ul = this.$el.find("ul");
    this.li = this.ul.find("li");
    this.prevBtn = this.$el.find(".prev");
    this.nextBtn = this.$el.find(".next");
    this.pager = this.$el.find(".pager");
    this.btns = this.pager.find("a");
    this.setValues();
    this.restSize();
    this.firstImg = this.li.first();
    this.lastImg = this.li.last();

    $(window).resize(function () {
        self.restSize();
    });
    this.btns.click(function () {
        self.btnsClick($(this).index());
    });

    this.nextBtn.click(function () {
        self.npClick("next");
    });
    this.prevBtn.click(function () {
        self.npClick("prev");
    });
    if (this.opts.autoPlay) {
        this.autoPlay();

        this.$el.hover(function () {
            clearInterval(self.timer);
        }, function () {
            self.autoPlay();
        });
    }

}
Slider.prototype = {
    autoPlay: function () {
        var self = this;
        clearInterval(this.timer);
        this.timer = setInterval(function () {
            self.npClick("next");
        }, 2000);
    },
    npClick: function (direction) {
        if (this.flag) {
            direction == "prev" ? this.index-- : this.index++;
            this.flag = !this.flag;
            this.move();
        } else {
            return;
        }

    },
    move: function () {

        var self = this;

        var temIndex = this.index;
        if (this.index < 0) { // last img
            this.lastImg.css({
                'position': 'relative',
                left: -this.widowsWidth * this.size
            });
            temIndex = self.size - 1;
        }
        if (this.index >= this.size) { // first img
            this.firstImg.css({
                'position': 'relative',
                left: this.widowsWidth * this.size
            });
            temIndex = 0;
        }
        this.btns.eq(temIndex).addClass("hot").siblings().removeClass("hot");


        this.ul.animate({
                left: -this.index * this.widowsWidth
            },
            this.opts.speed, function () {

                self.flag = true;
                if (self.index < 0) { // last img
                    self.lastImg.css({
                        'position': 'static'
                    });
                    self.index = temIndex;
                    $(this).css("left", -self.index * self.widowsWidth);
                }
                if (self.index >= self.size) { // first img
                    self.firstImg.css({
                        'position': 'static'
                    });
                    self.index = temIndex;
                    $(this).css("left", -self.index * self.widowsWidth);
                }
            }
        );


    },
    btnsClick: function (index) {
        this.index = index;
        this.move();
    },
    restSize: function () {
        this.widowsWidth = $(window).width();
        this.ul.css({
            width: this.widowsWidth * this.size,
            left: -this.widowsWidth * this.index
        });
        this.li.css({
            width: this.widowsWidth
        }, 80);
    },
    setValues: function () {
        this.size = this.opts.data.length;
        this.btns.first().addClass("hot");
    },
    renderHtml: function () {
        var html =
            '<ul>' + '</ul>' + '<div class="pager">' + '</div>' + '<div class="controls">' + '<a href="javascript:;" class="btn prev"></a>' + '<a href="javascript:;" class="btn next"></a>'
        '</div>';
        this.$el.append(html);

        var li = '',
            a = '';
        for (var i = 0; i < this.opts.data.length; i++) {
            var obj = this.opts.data[i];
            li += '<li><a href="' + obj.link + '" target="_blank" style="background-image: url(' + obj.imgUrl + ')"></a></li>';
            a += '<a href="javascript:;"></a>'
        }
        this.$el.find("ul").append(li);
        this.$el.find(".pager").append(a);

    },
    getSetting: function () {
        $.extend(this.opts, $.parseJSON(this.$el.attr("data-setting") || {}));
    }
};

Slider.init = function ($el) {

    var _this = this;
    $el.each(function () {
        new _this($(this));
    })

}

var SliderRoll = function ($el) {
    var self = this;
    this.$el = $el;
    this.ul = $el.find("ul");
    this.prev = $el.find(".prev");
    this.next = $el.find(".next");
    this.li = $el.find("li");
    this.liMoveWidth = this.li.first().outerWidth();
    this.index = 0;
    this.viewCount = 0;
    this.len = this.li.size();
    this.timer = null;
    this.isAnimate = true;
    this.opts = {
        "width": 1198,
        "height": 240,
        "speed": 400,
        "scrollNumber": 2
    };
    this.getSetting();
    this.setValues();
    this.next.click(function () {
        if (!$(this).hasClass("end")) {
            self.npClick("next");
        }
    });
    this.prev.click(function () {
        if (!$(this).hasClass("end")) {
            self.npClick("prev");
        }
    });

}
SliderRoll.prototype = {
    npClick: function (direction) {
        if (this.isAnimate) {
            direction == "prev" ? this.index -= this.opts.scrollNumber : this.index += this.opts.scrollNumber;
            this.isAnimate = !this.isAnimate;
            this.move();
        } else {
            return;
        }
    },
    move: function () {
        var self = this;
        var posLeft = 0;
        if (this.index <= 0) {
            this.index = 0;
            this.prev.addClass("end");
            //console.log("已经到第一张了");

        } else if (this.len - this.index <= this.viewCount) {
            this.index = this.len - this.viewCount;
            this.next.addClass("end");
            //console.log("已经到最后一张了");
        } else {
            this.prev.removeClass("end");
            this.next.removeClass("end");
        }
        posLeft = -this.liMoveWidth * this.index;

        this.ul.animate({left: posLeft}, this.opts.speed, function () {
            self.isAnimate = true;
        });

    },
    setValues: function () {
        this.ul.css({
            width: this.len * this.liMoveWidth,
            height: this.opts.height
        });
        this.$el.css({
            width: this.opts.width,
            height: this.opts.height
        });
        this.prev.addClass("end");//设置第一个 默认不能点
        this.viewCount = Math.ceil(this.$el.outerWidth() / this.liMoveWidth); // 计算 容器可以显示几个Li
    },
    getSetting: function () {
        $.extend(this.opts, $.parseJSON(this.$el.attr("data-setting") || {}));
    }
}

SliderRoll.init = function ($el) {
    var _this = this;
    $el.each(function () {
        new _this($(this));
    });
}

$(function () {
    // if (!supports("transform")) {  // <=ie9
    if (!supports("transition")) {

        $(".fashion ul li").hover(function () {
            $(this).stop().animate({
                width: 600
            }, 500).siblings("li").stop().animate({
                width: 300
            }, 500);
            $(this).find("img").stop().animate({
                marginLeft: 0
            }, 500);
        }, function () {
            $(this).find("img").stop().animate({
                marginLeft: -100
            }, 500);
        });

        $(".fashion ul").mouseleave(function () {
            $(this).find("li").stop().animate({
                width: 400
            }, 500);
        });
        $(".fashion li").trigger("mouseout"); // 第一默认 不执行动画bug.. 未知！！！

        $(".space ul li").hover(function () {
            $(this).find("img").stop().animate({
                marginTop: "-50%"
            }, 1000).end()
                .find(".mask").stop().animate({
                    top: 0
                }, 500);
        }, function () {
            $(this).find("img").stop().animate({
                marginTop: 0
            }, 500).end()
                .find(".mask").stop().animate({
                    top: '100%'
                }, 500);
        })

        $(".space ul li").trigger("mouseout"); //css3 transition  bug for ie9
    }
});
/*班车弹框*/
$(function () {
    $(".city dl").hover(function () {
        $(this).find("dd").show();
    }, function () {
        $(this).find("dd").hide();
    });
});

$(function () {
    /*家居馆选项卡*/
    $(".furniture .sort li").mouseover(function () {
        var _num = $(this).index();
        $(this).find(".mask").addClass("active").end().siblings().find(".mask").removeClass("active");
        $(".furniture .tag").eq(_num).addClass("active").siblings().removeClass("active");
    });

    //推荐品牌
    $(".reference-brand ul li img").hover(function () {
        $(this).addClass("a-ring");
    }, function () {
        $(this).removeClass("a-ring");
    });
    /*建材馆选项卡*/
    $(".build .box").mouseover(function () {
        $(".build .box .mask").removeClass("active");
        $(this).find(".mask").addClass("active");
        $(".build .tag").eq($(".build .box").index($(this))).addClass("active").siblings().removeClass("active");
    });


    /*标签*/
    $(".tag-box .tag li a").mouseover(function () {
        var _num = $(this).parents(".tag").index();
        $(this).addClass("bg" + _num).parent("li").siblings().find("a").removeClass();
    });
});