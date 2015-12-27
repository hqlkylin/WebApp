/**
 * Created by hanqilin on 15/12/26.
 */

window.onload = function () {
    var main = document.querySelector("#main");
    var olis = document.querySelectorAll("#list>li");
    var winH = window.innerHeight;
    var winW = window.innerWidth;
    var desW = 640;
    var desH = 960;
    main.style.webkitTransform = 'scale(' + winH / desH + ')';

    for (var i = 0; i < olis.length; i++) {
        olis[i].index = i;
        olis[i].addEventListener("touchstart", start, false);
        olis[i].addEventListener("touchmove", move, false);
        olis[i].addEventListener("touchend", end, false);

    }
    function start(e) {
        this.startY = e.changedTouches[0].pageY;

    }

    function move(e) {
        e.preventDefault();
        this.flag = true;
        var moveY = e.changedTouches[0].pageY;
        var changePos = moveY - this.startY;
        var cur = this.index;
        var step = 1 / 4;
        for (var i = 0; i < olis.length; i++) {
            if (i != cur) {
                olis[i].style.display = "none";
            }
            olis[i].className = "";
            olis[i].firstElementChild.id = "";
        }

        if (changePos > 0) { /*下滑*/
            this.prevIndex = cur == 0 ? olis.length - 1 : cur - 1;
            var presPos = -winH + changePos;
        } else if (changePos < 0) { /*上滑*/
            this.prevIndex = cur == olis.length - 1 ? 0 : cur + 1;
            var presPos = winH + changePos;
        }
        var scalePos = 1 - Math.abs(changePos) / winH * step;
        olis[cur].style.webkitTransform = 'scale(' + scalePos + ') translate(0,' + changePos + 'px)';

        olis[this.prevIndex].style.webkitTransform = 'translate(0,' + presPos + 'px)';
        olis[this.prevIndex].style.display = "block";
        olis[this.prevIndex].className = "zIndex";

    }

    function end(e) {

        if (this.flag) {

            olis[this.prevIndex].style.webkitTransform = 'translate(0,0)';
            olis[this.prevIndex].style.webkitTransition = '.5s';
            olis[this.prevIndex].addEventListener("webkitTransitionEnd", transitionend, false);

        }
        function transitionend() {
            this.style.webkitTransition = "";
            this.firstElementChild.id = 'a' + (this.index + 1);
        }

    }


}

