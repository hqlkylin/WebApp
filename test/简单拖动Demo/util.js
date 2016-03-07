/**
 * Created by Administrator on 2015/5/26.
 */
var Util = function () {
    this.addEvent = function (event, type, handler) {
    if (event.addEventListener) {
        event.addEventListener(type, handler, false);
    } else {
        event.attachEvent("on" + type, handler);
    }
},
    this.removeEvent = function (event, type, handler) {
        if (event.removeEventListener) {
            event.removeEventListener(type, handler, false);
        } else {
            event.detachEvent("on" + type, handler);
        }
    },
    this.getElementByClassName = function (className, docs) {
        docs = docs ? docs : document.getElementsByTagName("*");
        var arr = []
        for (var i = 0; i < docs.length; i++) {
            if (docs[i].className == className) {
                arr.push(docs[i]);
            }
        }
        return arr;
    }
};
