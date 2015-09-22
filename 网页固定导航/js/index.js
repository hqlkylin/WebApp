/**
 * Created by kylin on 2015/9/9.
 */
$(function () {


    $(window).scroll(function () {


        var currentId = "";
        var current = $("#menu .current");


        if ($(window).scrollTop() < $("#content .item :first").offset().top - 500) {
            current.removeClass("current");
            return;
        }

        if ($(window).scrollTop() > $("#content .item :last").offset().top + 500) {
            current.removeClass("current");
            return;
        }

        $("#content .item").each(function () {
                if ($(window).scrollTop() > $(this).offset().top - 200) {
                    currentId = "#" + $(this).attr("id");

                } else {
                    return false;
                }
            }
        )


        if (currentId && current.attr("href") != "currentId") {
            current.removeClass("current");
            $("[href=" + currentId + "]").addClass("current");
        }


    })

});