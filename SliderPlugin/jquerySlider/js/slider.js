/**
 * Created by 韩麒麟 on 2015/9/25.
 */

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
        this.isAnimate = true;
        this.arrImg = this.ul.find("img");
        this.size = this.arrImg.size();
        this.timer = null;
        this.controls = this.$element.find(".controls");
        this.controlsA = this.controls.find('a');
        this.firstImg = this.arrImg.first();
        this.lastImg = this.arrImg.last();
        this.setValues();
    }
    //原型
    $.Slider.prototype = {

        renderHtml: function () {
            var strHtml =
                '<ul></ul>'
                + '<div class="controls">'
                + '</div>'
                + '<a href="javascript:;" class="arrow prev">&lt;</a>'
                + '<a href="javascript:;" class="arrow next">&gt;</a>';

            this.$element.append(strHtml);

            var strImg = "",
                strA = "";

            for (var obj in this.opts.data) {
                var object = this.opts.data[obj];
                strImg += "<li><a  href='" + object.link + "'><img src='" + object.imgUrl + "'/><p>" + object.title + "</p></a></li>";
                strA += "<a href='javascript:;'></a>";
            }
            this.$element.find("ul").append(strImg).next().append(strA);
        },
        setValues: function () {
            this.$element.css({width: this.opts.width, height: this.opts.height});
            this.arrImg.css({width: this.opts.width, height: this.opts.height});
            this.ul.css({width: this.size * this.opts.width});
            this.controlsA.first().addClass("active");

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