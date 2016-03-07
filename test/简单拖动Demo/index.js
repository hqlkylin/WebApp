/**
 * Created by Administrator on 2015/5/25.
 */

window.onload = function () {

    var util = new Util();
    var oTitle = util.getElementByClassName("kylin")[0];
    util.addEvent(oTitle, "mousedown", function (event) {
        event = event || window.event;

        if (event.preventDefault) {
            event.preventDefault();// 阻止默认行为：选中状态。
        } else {
            event.returnValue = false; // ！！！！！！这里ie<=8 无效
        }


        var target = event.target || event.srcElement,
            nodeParent = target.parentElement || target.parentNode,
            pox = event.clientX - nodeParent.offsetLeft,
            poy = event.clientY - nodeParent.offsetTop,
            oDiv = document.getElementsByTagName("div")[0];

        util.addEvent(document, "mousemove", move = function (event) {
            event = event || window.event;
            var target = event.target || event.srcElement;
            var l = event.clientX - pox,
                t = event.clientY - poy;

            if (l < 0) {
                l = 0;
            } else if (l >= document.documentElement.clientWidth - oDiv.offsetWidth) {
                l = document.documentElement.clientWidth - oDiv.offsetWidth;
            }
            if (t < 0) {
                t = 0;
            } else if (t >= document.documentElement.clientHeight - oDiv.offsetHeight) {
                t = document.documentElement.clientHeight - oDiv.offsetHeight;
            }
            oDiv.style.left = l + "px";
            oDiv.style.top = t + "px";

        });
        util.addEvent(document, "mouseup", up = function (event) {
            util.removeEvent(document, "mousemove", move);
            util.removeEvent(document, "mouseup", up);
        })
    });
    var oClose = document.getElementsByTagName("a")[0];
    util.addEvent(oClose, "click", function (event) {
        event = event || window.event;
        if(event.preventDefault){
            //event.stopPropagation();
            event.preventDefault();
        }else{
            event.returnValue=false;
        }
        var target = event.target || event.srcElement,
            nodeParent = target.parentElement.parentElement || target.parentNode.parentNode;
        nodeParent.style.display = 'none';

    })
}

