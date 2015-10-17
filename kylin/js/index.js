/**
 * Created by 韩麒麟 on 2015/10/16.
 * QQ:290147465
 */


$(function () {

    $(".nav li").hover(function () {
        $(this).addClass("active");
    }, function () {
        $(this).removeClass("active");
    });


    $(".list li").on("mouseenter mouseleave", function (e) {
        var arr = [];
        var w = $(this).width();
        var h = $(this).height();
        arr.push(e.pageY - $(this).offset().top); //top
        arr.push($(this).offset().left + w - e.pageX); //right
        arr.push($(this).offset().top + h - e.pageY); //bottom
        arr.push(e.pageX - $(this).offset().left);
        var sub = arr.indexOf(Math.min.apply(null, arr));
        var aPos = [{left: 0, top: -h}, {left: w, top: 0}, {left: 0, top: h}, {left: -w, top: 0}];
        if (e.type == 'mouseenter') {
            $(this).find("div").css(aPos[sub]).show().stop(true, true).animate({left: 0, top: 0}, 200, function () {
            });
        } else {
            $(this).find("div").stop(true, true).animate(aPos[sub], 200, function () {
                $(this).hide();
            });
        }
    });
})