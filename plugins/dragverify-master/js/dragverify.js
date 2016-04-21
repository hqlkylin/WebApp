/**
 * dragverify.js for drag buttons to verify,not input verification code
 *
 * @author hbsndg_code
 * @version 1.0
 * @createdtime 2015-11-12
 * @contact hbsndg_code@126.com
 */

(function ($) {
    $.fn.dragverify = function (params) {
        var x;
        var dragverify = this;
        var moveFlag = false;
        var defaults = {};
        var params = $.extend(defaults, params);
        var htmls = '<div class="dragverifybg"></div><div class="dragverifytext" onselectstart="return false;" unselectable="on">拖动滑块验证</div><div class="block blockbg"></div>';

        this.append(htmls);

        var block = dragverify.find(".block");
        var dragverifybg = dragverify.find(".dragverifybg");
        var drafverifytext = dragverify.find(".dragverifytext");
        var maxWidth = dragverify.width() - block.width();
        block.on("touchstart", function (e) {

            moveFlag = true;
            x = e.originalEvent.targetTouches[0].clientX - parseInt(block.css("left"), 10);
            return false;
        });


        $(document).on("touchmove", function (e) {

            var moveX = e.originalEvent.targetTouches[0].clientX - x;
            if (moveFlag) {
                if (moveX > 0 && moveX < maxWidth) {
                    block.css({"left": moveX});
                    dragverifybg.css({"width": moveX});
                } else if (moveX > maxWidth) {
                    verifySuc();
                }
            }
            return false;
        }).on("touchend", function (e) {

            moveFlag = false;
            var mX = e.originalEvent.changedTouches[0].clientX - x;
            if (mX < maxWidth) {
                block.css({"left": 0});
                dragverifybg.css({"width": 0});
            }
        });
        function verifySuc() {
            block.removeClass("blockbg").addClass("blockbgsuc");
            drafverifytext.text("验证通过");
            dragverify.css({"color": "#ffffff"});
            dragverify.width();

            block.css({"left": dragverify.width() - block.width()});
            dragverifybg.css({"width": dragverify.width() - block.width()});

            block.off("touchstart");
            $(document).off("touchmove");
            $(document).off("touchend");
            layer.load();
            setTimeout(function () {
                layer.closeAll();
            },1500);
        }

    }
})(jQuery);

//usedemo

$("#dragverify").dragverify();