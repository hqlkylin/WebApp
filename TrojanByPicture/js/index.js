/**
 * Created by 韩麒麟 on 2015/8/14.
 *
 *
 *
 */
;
(function ($) {

    var Carousel = function (posters) {
        var self = this;
        this.posters = posters;
        this.postersItemMain = posters.find("ul.poster-list");
        this.prevBtn = posters.find("div.poster-prev-btn");
        this.nextBtn = posters.find("div.poster-next-btn");
        this.setting = {
            width: 1000,
            height: 270,
            posterWidth: 640,
            posterHeight: 270,
            verticalAlign: "middle",
            "autoPlay": false,
            "delay": 2000,
            scale: 0.9,
            speed: 500
        };
        this.posterItems = this.posters.find("li");

        // 如果为偶数 把第一张复制到最后一张
        if (this.posterItems.length % 2 == 0) {
            this.postersItemMain.append(this.posterItems.first().clone());
            this.posterItems = this.postersItemMain.children();
        }
        this.posterFirstItem = this.posterItems.first();
        this.posterLastItem = this.posterItems.last();
        this.rotateFlag = true;
        this.timer = null;
        $.extend(this.setting, this.getSetting());

        this.setSettingValue();
        this.setPosterPos();
        this.nextBtn.click(function () {
            if (self.rotateFlag) {
                self.rotateFlag = false;
                self.carouseRotate("left");
            }
        });
        this.prevBtn.click(function () {
            if (self.rotateFlag) {
                self.rotateFlag = false;
                self.carouseRotate("right");
            }
        });
        if (this.setting.autoPlay) {
            this.autoPlay();
            this.posters.hover(function () {
                window.clearInterval(self.timer);
            }, function () {
                self.autoPlay();
            })
        }
    };
    Carousel.prototype = {
        autoPlay: function () {
            var self = this;
            this.timer = setInterval(function () {
                self.nextBtn.click();
            }, this.setting.delay);
        },
        getSetting: function () {
            var setting = this.posters.attr("data-setting");
            if (setting && setting != "") {
                /*JSON.parse(setting)*/   //ECMA5 自带方法
                return $.parseJSON(setting);  // jQuery 方法
            } else {
                return {};
            }
        },
        setSettingValue: function () {
            this.posters.css({
                width: this.setting.width,
                height: this.setting.height
            });
            this.postersItemMain.css({
                width: this.setting.width,
                height: this.setting.height
            });
            var w = (this.setting.width - this.setting.posterWidth) / 2;
            this.prevBtn.css({
                width: w,
                height: this.setting.height,
                zIndex: Math.ceil(this.posterItems.length / 2)  //zIndex 不能是小数
            });
            this.nextBtn.css({
                width: w,
                height: this.setting.height,
                zIndex: Math.ceil(this.posterItems.length / 2)
            });
            this.posterFirstItem.css({
                left: w,
                zIndex: Math.floor(this.posterItems.length / 2),
                width: this.setting.posterWidth,
                height: this.setting.posterHeight
            });

        },
        setPosterPos: function () {
            var self = this;
            var sliceItem = this.posterItems.slice(1),
                sliceSize = sliceItem.length / 2,
                rightSlice = sliceItem.slice(0, sliceSize),
                level = Math.floor(this.posterItems.length / 2),
                leftSlice = sliceItem.slice(sliceSize);


            var rw = this.setting.posterWidth,
                rh = this.setting.posterHeight,
                gap = ((this.setting.width - rw) / 2) / level;

            var firstLeft = (self.setting.width - self.setting.posterWidth) / 2;
            var fixOffsetLeft = firstLeft + rw;

            // 设置右边图片位置
            rightSlice.each(function (i) {
                level--;
                rw = rw * self.setting.scale;
                rh = rh * self.setting.scale;
                $(this).css({
                    zIndex: level,
                    width: rw,
                    height: rh,
                    opacity: 1 / (++i),
                    left: fixOffsetLeft + (i * gap) - rw,
                    top: self.setVerticalAlign(rh)
                });
            });
            // 设置左边图片位置
            var lw = rightSlice.last().width(),
                lh = rightSlice.last().height(),
                oloop = Math.floor(this.posterItems.length / 2);
            leftSlice.each(function (i) {

                $(this).css({
                    zIndex: i,
                    width: lw,
                    height: lh,
                    opacity: 1 / oloop--,
                    left: i * gap,
                    top: self.setVerticalAlign(lh)
                });
                lw = lw / self.setting.scale;
                lh = lh / self.setting.scale;
            });

        },
        setVerticalAlign: function (height) {
            var verticalType = this.setting.verticalAlign,
                top = 0;
            if (verticalType === "middle") {
                top = (this.setting.height - height) / 2;
            } else if (verticalType === "top") {
                top = 0;
            } else if (verticalType === "bottom") {
                top = this.setting.height - height;
            } else {
                top = (this.setting.height - height) / 2;
            }
            return top;
        },
        carouseRotate: function (dir) {
            var _this_ = this,
                zIndexArr = [];
            if (dir === "left") {
                this.posterItems.each(function () {
                    var self = $(this),
                        prev = self.prev().get(0) ? self.prev() : _this_.posterLastItem,
                        width = prev.width(),
                        height = prev.height(),
                        zIndex = prev.css("zIndex"),
                        opacity = prev.css("opacity"),
                        left = prev.css("left"),
                        top = prev.css("top");

                    zIndexArr.push(zIndex);
                    self.animate({
                        width: width,
                        height: height,
                        left: left,
                        top: top,
                        opacity: opacity
                    }, _this_.setting.speed, function () {
                        _this_.rotateFlag = true;
                    });

                });
                this.posterItems.each(function (i) {
                    $(this).css("zIndex", zIndexArr[i]);
                });
            }
            else {
                this.posterItems.each(function () {
                    var self = $(this),
                        next = self.next().get(0) ? self.next() : _this_.posterFirstItem,
                        width = next.width(),
                        height = next.height(),
                        zIndex = next.css("zIndex"),
                        opacity = next.css("opacity"),
                        left = next.css("left"),
                        top = next.css("top");
                    zIndexArr.push(zIndex);
                    self.animate({
                            width: width,
                            height: height,
                            left: left,
                            top: top,
                            opacity: opacity
                        }, _this_.setting.speed, function () {
                            _this_.rotateFlag = true;
                        }
                    )
                    ;
                });
                this.posterItems.each(function (i) {
                    $(this).css("zIndex", zIndexArr[i]);
                });
            }

        }
    };
    Carousel.init = function (posters) {
        var _this_ = this;
        posters.each(function () {
            new _this_($(this));
        });
    };

    window["Carousel"] = Carousel;
})(jQuery);