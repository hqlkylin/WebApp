/**
 * Created by 韩麒麟 on 2015/10/22.
 * QQ:290147465
 */


$(function () {

    function random(min, max) {
        return Math.floor(min + Math.random() * (max - min));
    }

    var posTop = function ($a) {
        var speed;
        if ($a.css("top") == "450px") {
            $a.data("info", {
                    speedNum: random(600, 5000),
                    leftPos: random(0, 480 - $a.outerWidth()),
                    size: random(10, 30),
                    color: '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6),
                    opacity: Math.random() + 0.5
                }
            );
            console.log($a.data("info").leftPos);

            $a.css({
                left: $a.data("info").leftPos,
                fontSize: $a.data("info").size,
                backgroundColor: $a.data("info").color,
                opacity: $a.data("info").opacity
            });
            speed = $a.data("info").speedNum;

        } else {
            speed = Number.parseInt($a.css("top")) / (500 / $a.data("info").speedNum);
        }
        $a.animate({top: 0}, speed, "linear", function () {
            $(this).css("top", 450);
            posTop($(this));
        });
    }
    $("a").each(function () {
        posTop($(this));
    });
    $("a").hover(function () {
        $(this).stop();
    }, function () {
        var self = $(this);
        setTimeout(function () {
            posTop(self);
        }, 500)

    })

})