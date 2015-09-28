/**
 * Created by 韩麒麟 on 2015/9/15.
 */

var Slider = function ($el) {
    var self = this;
    this.$el = $el;
    this.opts = {
        'data': [
            {"imgUrl": "images/ac/pic1.jpg", "link": "http://www.baidu.com"},
            {"imgUrl": "images/ac/pic2.jpg", "link": "http://www.google.com"},
            {"imgUrl": "images/ac/pic3.jpg", "link": "http://www.sina.com"}],
        'autoPlay': true,
        'speed': 600
    };
    this.index = 0;
    this.size = 0;
    this.timer = null;
    this.flag = true;
    this.getSetting();
    this.renderHtml();
    this.windowsWidth = 0;
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
        if (this.index < 0) {  // last img
            this.lastImg.css({'position': 'relative', left: -this.windowsWidth * this.size});
            temIndex = self.size - 1;
        }
        if (this.index >= this.size) {  // first img
            this.firstImg.css({'position': 'relative', left: this.windowsWidth * this.size});
            temIndex = 0;
        }
        this.btns.eq(temIndex).addClass("hot").siblings().removeClass("hot");


        this.ul.transit({left: -this.index * this.windowsWidth},
            this.opts.speed, 'ease', function () {

                self.flag = true;
                if (self.index < 0) {  // last img
                    self.lastImg.css({'position': 'static'});
                    self.index = temIndex;
                    $(this).css("left", -self.index * self.windowsWidth);
                }
                if (self.index >= self.size) {  // first img
                    self.firstImg.css({'position': 'static'});
                    self.index = temIndex;
                    $(this).css("left", -self.index * self.windowsWidth);
                }
            }
        );


    },
    btnsClick: function (index) {
        this.index = index;
        this.move();
    },
    restSize: function () {
        this.windowsWidth = $(window).width();
        this.ul.css({width: this.windowsWidth * this.size, left: -this.windowsWidth * this.index});
        this.li.css({width: this.windowsWidth}, 80);
    },
    setValues: function () {
        this.size = this.opts.data.length;
        this.btns.first().addClass("hot");
    },
    renderHtml: function () {
        var html =
            '<ul>'
            + '</ul>'
            + '<div class="pager">'
            + '</div>'
            + '<div class="controls">'
            + '<a href="javascript:;" class="btn prev"></a>'
            + '<a href="javascript:;" class="btn next"></a>'
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