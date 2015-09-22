/**
 * Created by 韩麒麟 on 2015/8/11.
 */
;
(function ($) {

    var LightBox = function () {
        var self = this;
        this.popupMask = $('<div id="G-lightbox-mask">');
        this.popupWin = $('<div id="G-lightbox-popup">');
        this.bodyNode = $(document.body);
        //初始化 html
        this.renderDOM();
        this.groupName = null;
        this.groupData = [];
        this.bodyNode.on("click", ".js-lightbox,*[data-role=lightbox]", function (e) {
            e.stopPropagation();
            var currentGroupName = $(this).attr("data-group");
            if (currentGroupName != self.groupName) {
                self.groupName = currentGroupName;
                self.getGroup();
            }
            self.initPopup($(this));

        });
        this.picViewArea = this.popupWin.find("div.lightbox-pic-view");//图片预览区
        this.popupPic = this.popupWin.find("img.lightbox-image");//图片
        this.picCaptionArea = this.popupWin.find("div.lightbox-pic-caption");
        this.prevBtn = this.popupWin.find("span.lightbox-prev-btn");
        this.nextBtn = this.popupWin.find("span.lightbox-next-btn");
        this.captionText = this.popupWin.find("p.lightbox-pic-desc");
        /*图片描述*/
        this.currentIndex = this.popupWin.find("span.lightbox-of-index");
        /*当前索引*/
        this.closeBtn = this.popupWin.find("span.lightbox-close-btn");
        /*关闭*/
        this.flag = true;
        this.popupMask.click(function () {
            $(this).fadeOut();
            self.popupWin.fadeOut();
            self.clear = false;
        });
        this.closeBtn.click(function () {
            self.popupMask.fadeOut();
            self.popupWin.fadeOut();
            self.clear = false;
        });
        /*调整窗口大小*/
        this.timer = null;
        this.clear = false;
        $(window).resize(function () {
            if (self.clear) {
                clearTimeout(self.timer);
                self.timer = setTimeout(function () {
                    self.loadPicSize(self.groupData[self.index].src);
                }, 500);
            }
        });
        //添加next prev
        this.nextBtn.hover(
            function () {
                if (!$(this).hasClass("disabled") && self.groupData.length > 1) {
                    $(this).addClass("lightbox-next-btn-show");
                }
            }, function () {
                if (!$(this).hasClass("disabled") && self.groupData.length > 1) {
                    $(this).removeClass("lightbox-next-btn-show");
                }
            }).click(function (e) {

                e.stopPropagation();
                if (!$(this).hasClass("disabled") && self.flag) {
                    self.flag = false;
                    self.goto("next");
                }
            });
        this.prevBtn.hover(
            function () {
                if (!$(this).hasClass("disabled") && self.groupData.length > 1) {
                    $(this).addClass("lightbox-prev-btn-show");
                }
            }, function () {
                if (!$(this).hasClass("disabled") && self.groupData.length > 1) {
                    $(this).removeClass("lightbox-prev-btn-show");
                }
            }).click(function (e) {
                e.stopPropagation();
                if (!$(this).hasClass("disabled") && self.flag) {
                    self.flag = false;
                    self.goto("prev");
                }
            });

    };
    LightBox.prototype = {
        goto: function (dir) {
            if (dir == "next") {
                this.index++;
                if (this.index >= this.groupData.length - 1) {
                    this.nextBtn.addClass("disabled").removeClass("lightbox-next-btn-show");
                }
                if (this.index != 0) {
                    this.prevBtn.removeClass("disabled");
                }
                var src = this.groupData[this.index].src;
                this.loadPicSize(src);
            } else if (dir == "prev") {
                this.index--;
                if (this.index <= 0) {
                    this.prevBtn.addClass("disabled").removeClass("lightbox-prev-btn-show");
                }
                if (this.index != this.groupData.length - 1) {
                    this.nextBtn.removeClass("disabled");
                }
                var src = this.groupData[this.index].src;
                this.loadPicSize(src);
            }
        },
        getGroup: function () {
            var self = this;
            var groupList = this.bodyNode.find("[data-group=" + this.groupName + "]");
            self.groupData.length = 0;
            groupList.each(function () {
                self.groupData.push({
                    src: $(this).attr("data-source"),
                    caption: $(this).attr("data-caption"),
                    id: $(this).attr("data-id")
                });
            });
        },
        loadPicSize: function (sourceSrc) {
            var self = this;
            self.popupPic.css({width: "auto", height: "auto"}).hide();
            this.picCaptionArea.hide();
            this.picLoadImg(sourceSrc, function () {
                self.popupPic.attr("src", sourceSrc);
                var picWidth = self.popupPic.width(),
                    picHeight = self.popupPic.height();
                self.chanePic(picWidth, picHeight);
            });
        },
        chanePic: function (picWidth, picHeight) {
            var self = this,
                winWidth = $(window).width(),
                winHeight = $(window).height(),
                scale = Math.min(winWidth / (picWidth + 10), winHeight / (picHeight + 10), 1);

            picWidth = picWidth * scale;
            picHeight = picHeight * scale;
            this.picViewArea.animate({width: picWidth - 10, height: picHeight - 10});
            this.popupWin.animate({
                width: picWidth,
                height: picHeight,
                marginLeft: -picWidth / 2,
                top: (winHeight - picHeight) / 2
            }, function () {
                self.popupPic.css({width: picWidth - 10, height: picHeight - 10}).fadeIn();
                self.picCaptionArea.fadeIn();
                self.flag = true;
                self.clear = true;
            });
            this.captionText.html(this.groupData[this.index].caption);
            this.currentIndex.html("当前索引：" + (this.index + 1) + " of " + this.groupData.length);
        },
        picLoadImg: function (sourceSrc, callback) {
            var img = new Image();
            if (!!window.ActiveXObject) {
                img.onreadystatechange = function () {
                    if (this.readyState == 'complete') {
                        callback();
                    }
                }
            } else {
                img.onload = function () {
                    callback();
                }
            }
            img.src = sourceSrc;
        },
        showMaskAndPopup: function (sourceSrc, currentId) {
            var self = this;
            this.popupPic.hide();
            this.picCaptionArea.hide();
            this.popupMask.fadeIn();
            var winWidth = $(window).width();
            var winHeight = $(window).height();
            this.picViewArea.css({width: winWidth / 2, height: winHeight / 2});
            this.popupWin.fadeIn();
            var viewHeight = winHeight / 2 + 10;
            this.popupWin.css({
                width: winWidth / 2 + 10,
                height: winHeight / 2 + 10,
                marginLeft: -(winWidth / 2 + 10) / 2,
                top: -viewHeight
            }).animate({
                top: (winHeight - viewHeight) / 2
            }, function () {
                self.loadPicSize(sourceSrc);
            });
            this.index = this.getIndexOf(currentId);

            var groupDataLength = this.groupData.length;
            if (groupDataLength > 1) {
                if (this.index == 0) {
                    this.prevBtn.addClass("disabled");
                    this.nextBtn.removeClass("disabled");
                } else if (this.index == groupDataLength - 1) {
                    this.nextBtn.addClass("disabled");
                    this.prevBtn.removeClass("disabled");
                } else {
                    this.prevBtn.removeClass("disabled");
                    this.nextBtn.removeClass("disabled");
                }

            }

        },
        getIndexOf: function (id) {

            var index = 0;
            $(this.groupData).each(function (i) {
                index = i;
                if (this.id == id) {
                    return false;
                }
            });
            return index;
        },
        initPopup: function (currentObj) {
            var self = this,
                sourceSrc = currentObj.attr("data-source"),
                currentId = currentObj.attr("data-id");
            this.showMaskAndPopup(sourceSrc, currentId);
        },
        renderDOM: function () {
            var strDOM = '<div class="lightbox-pic-view">'
                + '<span class="lightbox-btn lightbox-prev-btn"></span>'
                + '<img class="lightbox-image" src="" alt="" />'
                + '<span class="lightbox-btn lightbox-next-btn"></span>'
                + '</div>'
                + '<div class="lightbox-pic-caption">'
                + '<div class="lightbox-caption-area">'
                + '<p class="lightbox-pic-desc">　</p>'
                + '<span class="lightbox-of-index">当前索引：0 of 0</span>'
                + '</div>'
                + '<span class="lightbox-close-btn"></span>'
                + '</div>';
            this.popupWin.html(strDOM);
            this.bodyNode.append(this.popupMask);
            this.bodyNode.append(this.popupWin);

        }
    };
    window["LightBox"] = LightBox;

})(jQuery)