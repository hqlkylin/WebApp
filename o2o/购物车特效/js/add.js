/**
 * Created by 韩麒麟 on 2015/8/26.
 */

$(function () {
    /*抛物线添加购物车*/
    $(".add").click(function () {
        var copyA = $(this).parent().prev().clone().addClass("active");
        $(this).append(copyA);
        var copyA_offset = copyA.offset();
        var scrollTop = $(window).scrollTop();
        var box_offset = $(".fixed-fload .box").offset();
        copyA.fly({
            start: {left: copyA_offset.left, top: copyA_offset.top - scrollTop},
            end: {top: box_offset.top - scrollTop, left: box_offset.left, width: 20, height: 20},
            onEnd: function () {
                this.destroy();
                var count = parseInt($(".fixed-fload .box").find(".count").html()) || 0;
                $(".fixed-fload .box").find(".count").html(count += 1);
            }
        });
        return false;
    });
});
