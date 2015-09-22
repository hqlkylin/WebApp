/**
 * Created by 韩麒麟 on 2015/8/28.
 */

(function ($) {
    $(function () {
        var progress = function ($el) {
            var liItem = $el.find("ul li");
            var len = liItem.size();
            var index = 0;
            var timer = setInterval(function () {
                if (index % len == 0) {
                    liItem.removeClass("active");
                }
                liItem.eq(index).addClass("active");
                index++;
                index = index % len;
            }, 500)
        }
        $(".btn a").click(function () {
            $(".ticket-pop").show();
            progress($(".ticket-pop"));
        });
    });
})(jQuery);


