/**
 * Created by 韩麒麟 on 2015/9/15.
 */


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