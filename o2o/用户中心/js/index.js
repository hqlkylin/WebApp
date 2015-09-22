/**
 * Created by 韩麒麟 on 2015/8/26.
 */
/*关注品牌*/
(function ($) {
    $(function () {
        var prevBtn = $(".previous"),
            nextBtn = $(".next"),
            index = 0,
            scrollBarMain = $(".scrollBar"),
            li_Item = scrollBarMain.find("li"),
            li_Item_len = scrollBarMain.find("li").size(),
            li_width = li_Item.first().outerWidth(),
            li_min_len = 4,
            moveFlag = true;
        var move = function () {
            scrollBarMain.animate({left: -li_width * index}, 400, function () {
                moveFlag = true;
            });
        };
        var isClick = function () {
            if (index <= 0) {
                prevBtn.addClass("active");
            } else {
                prevBtn.removeClass("active");
            }
            if (li_Item_len - index <= li_min_len) {
                nextBtn.addClass("active");
            } else {
                nextBtn.removeClass("active");
            }
        };
        if (li_Item_len > li_min_len) {
            isClick();
            nextBtn.click(function () {
                if (moveFlag) {
                    moveFlag = false;
                    index++;
                    if (!$(this).hasClass("active")) {
                        move();
                    } else {
                        moveFlag = true;
                        index = index - 1;
                    }
                    isClick();
                }
            });
            prevBtn.click(function () {
                if (moveFlag) {
                    moveFlag = false;
                    index--;
                    if (!$(this).hasClass("active")) {
                        move();
                    } else {
                        moveFlag = true;
                        index = 0
                    }
                    isClick();
                }

            });
        } else {
            nextBtn.remove();
            prevBtn.remove();
        }
    })
})(jQuery);
