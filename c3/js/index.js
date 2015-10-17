/**
 * Created by 韩麒麟 on 2015/10/13.
 * QQ:290147465
 */

$(function () {

    $(".item").click(function () {

        var index = $(this).index();
        //$(this).parent().find(".item").animate({width: 0, opacity: 0}, 600);
        $(this).parents(".line").addClass("active");
        $(".content li").eq(index).addClass("active").siblings().removeClass("active");
        /* setTimeout(function () {
         $(".content li").eq(index).addClass("active").siblings().removeClass("active");
         }, 1000);*/
    });
    $(".content li i").mouseenter(function () {
        $(this).parent().addClass("active").siblings().removeClass("active");
    });
    $(".callback").click(function () {
        $(".line").removeClass("active");
    })
})