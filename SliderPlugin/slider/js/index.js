/**
 * Created by 韩麒麟 on 2015/9/11.
 */

var Slider = function ($el) {
    var self = this;
    this.$el = $el;
    this.opts = {
        "width": 100,
        "height": 100,
        "speed": 600,
        "autoPlay": false
        , "data": ["img/1.png", "img/2.jpg", "img/3.jpg", "img/4.jpg"]
    };
    this.index = 0;
    this.size = 0;
    this.timer = null;
    this.getSetting(); // 合并参数
    this.renderHtml(); // 渲染Dom对象
    this.btns = this.$el.find(".buttons span");
    this.list = this.$el.find(".list");
    this.nextBtn = this.$el.find(".next");
    this.prevBtn = this.$el.find(".prev");
    this.settingValue();
    this.btns.click(function () {
        self.btnsClick($(this).index());
    });
    this.flag = true;
    this.firstImg = this.list.children().first();
    this.lastImg = this.list.children().last();
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
        if (this.index < 0) {  // last img
            this.lastImg.css({'position': 'relative', left: -this.opts.width * this.size});
            temIndex = self.size - 1;
        }
        if (this.index >= this.size) {  // first img
            this.firstImg.css({'position': 'relative', left: this.opts.width * this.size});
            temIndex = 0;
        }
        this.btns.eq(temIndex).addClass("on").siblings().removeClass("on");

        this.list.transit(
            {left: -this.index * this.opts.width},
            this.opts.speed,
            'ease',
            function () {
                self.flag = true;
                if (self.index < 0) {  // last img
                    self.lastImg.css({'position': 'static'});
                    self.index = temIndex;
                    $(this).css("left", -self.index * self.opts.width);
                }
                if (self.index >= self.size) {  // first img
                    self.firstImg.css({'position': 'static'});
                    self.index = temIndex;
                    $(this).css("left", -self.index * self.opts.width);
                }
            });


    },
    btnsClick: function (index) {
        this.index = index;
        this.move();
    },
    settingValue: function () {
        this.size = this.opts.data.length;
        this.btns.first().addClass("on");
        this.list.width(this.opts.width * this.size);
        this.$el.width(this.opts.width);
        this.$el.height(this.opts.height);
        this.list.find("img").width(this.opts.width).height(this.opts.height);
    },
    renderHtml: function () {

        var strHtml =
            '<div class="list"></div>' +
            '<div class="buttons"></div>' +
            '<a href="javascript:;" class="prev arrow">&lt;</a>' +
            '<a href="javascript:;" class="next arrow">&gt;</a>';

        if (!this.opts.data.length) {
            alert("数据获取异常!");
            return false;
        } else {
            this.$el.append(strHtml);
        }
        var strImg = "",
            strBtn = "";
        for (var img in this.opts.data) {
            strImg += "<img src='" + this.opts.data[img] + "'/>";
            strBtn += "<span></span>";
        }
        this.$el.find(".list").append(strImg).next().append(strBtn);

    },
    getSetting: function () {
        var opts = this.$el.attr("data-setting") || {};
        $.extend(this.opts, $.parseJSON(opts) || {});
    }
}
Slider.init = function ($el) {
    $el.each(function () {
        new Slider($(this));
    })
}