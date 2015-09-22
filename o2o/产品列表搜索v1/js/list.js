/**
 * Created by 韩麒麟 on 2015/8/25.
 */
(function ($) {
    $(function () {
        /*点击多选*/
        $('.box .multiple').click(function () {
            var $box = $(this).parents(".box"),
                $box_dd = $box.find("dd"),
                lineHeight = $box.attr("data-lineHeight");
            if ($box.data("flag") == true) {
                return;
            }
            $box_dd.find(".cancel").unbind("click");
            $box_dd.find("ul li a").unbind("click");

            $box_dd.find(".logo").css("overflow-y", "auto");
            $box.data("flag", true);
            $('.box dd').not($box_dd).find(".cancel").trigger("click");
            var oldHeight = $box_dd.height();
            var height = $box_dd.css("height", "auto").height();
            $box_dd.height(oldHeight);
            $box_dd.stop().animate({"height": height}, 200, function () {
                $box_dd.find(".switch .bg").html("收起").addClass("down");
            });
            var current = $box_dd.find("li a.active");
            $box_dd.find("li a").removeClass("active").addClass("normol");
            $box_dd.find(".cancel").click(function () {
                $box_dd.find("li a").removeClass("normol active");
                $box_dd.stop().animate({"height": lineHeight}, 200, function () {
                    $box_dd.find(".switch .bg").html("更多").removeClass("down");
                    $box.data("flag", false);
                    $box_dd.find(".logo").css("overflow", "hidden").scrollTop(0);
                });
                $box.data("flag", false);
                current.addClass("active");
            });
            $box_dd.find("li a").click(function (e) {
                if ($box.data("flag") == false) {
                    return;
                }
                $(this).toggleClass("active");
                return false;
            });
        });
        /*
         点击更多
         */
        $('.box .switch').click(function () {
            var $box = $(this).parents(".box"),
                $box_dd = $box.find("dd"),
                lineHeight = $box.attr("data-lineHeight");
            if ($box.data("flag") == true) {
                return;
            }
            var oldHeight = $box_dd.height();
            var height = $box_dd.css("height", "auto").height();
            $box_dd.height(oldHeight);
            if ($(this).find(".bg").hasClass("down")) {
                $box_dd.stop().animate({"height": lineHeight}, 300);
                $(this).find(".bg").html("更多").removeClass("down");
                $box_dd.find(".logo").css("overflow", "hidden").scrollTop(0);
            } else {
                $box_dd.stop().animate({"height": height - 50}, 300);
                $(this).find(".bg").html("收起").addClass("down");
                $box_dd.find(".logo").css("overflow-y", "auto");
            }
        });
        /*品牌选项卡*/
        $(".kay ol li a").click(function () {
            $(this).addClass("ac").parent().siblings().find("a").removeClass("ac");
            var current = $(".logo").eq($(this).parent().index()),
                len = current.find("li").size();
            current.addClass("ac").siblings().removeClass("ac");
            if (len <= 9) {
                $(this).parents(".box").find(".switch").css("visibility", "hidden");
            } else {
                $(this).parents(".box").find(".switch").css("visibility", "visible");
            }
        });
        //初始化更多按钮 < 6 none
        $(".box[data-lineHeight=44]").each(function () {
            var len = $(this).find("li").size();
            if (len <= 6) {
                $(this).find(".switch").css("visibility", "hidden");
            }
        });

        var dlItem = $(".screen dl");
        if (dlItem.size() <= 4) {
            $(".more-option").hide();
        } else {
            $(".more-option").click(function () {
                if ($(this).find(".bg").hasClass("down")) {
                    $(this).find(".bg").removeClass("down").html("收起");
                    $(".screen dl:gt(4)").show();
                } else {
                    $(this).find(".bg").addClass("down").html("更多选项");
                    $(".screen dl:gt(4)").hide();
                }
            });
        }
        $(".screen dl:gt(4)").hide();
    });
})(jQuery);
