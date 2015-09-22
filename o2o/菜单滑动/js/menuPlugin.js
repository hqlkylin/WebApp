/**
 * Created by 韩麒麟 on 2015/8/14.
 */
;
(function ($) {
    $.fn.menuSlide = function (options) {
        var def = {
            dir: "horizontal", /*horizontal:水平方向，vertical:垂直方向*/
            itemClassName: "", //菜单选项 className
            active: ".active",  //选中的className
            bg: ".moving_bg"//移动层
        };
        var ops = $.extend({}, def, options);
        var move = function ($el, $context) {
            var pos = $el.position();
            if (ops.dir != "horizontal") {
                $context.find(ops.bg).stop().animate({"top": pos.top}, "1000", "easeOutBack");
            } else {
                $context.find(ops.bg).stop().animate({"left": pos.left}, "1000", "easeOutBack");
            }
        };
        this.each(function () {
            var self = this;
            var initItem = $(ops.itemClassName, this).filter(ops.active);
            if (initItem.length <= 0) {
                console.log("初始化失败：未找到默认的active ClassName；下标是：" + $(this).index());
                return;
            }
            if (ops.dir != "horizontal") {
                $(ops.bg, self).css("top", initItem.position().top);
            } else {
                $(ops.bg, self).css("left", initItem.position().left);
            }
            $(ops.itemClassName, this).each(function () {
                $(this).mouseenter(function () {
                    move($(this), $(self));
                });
            });
            $(this).mouseleave(function () {
                move(initItem, $(self));
            });
        });
    }
})(jQuery);