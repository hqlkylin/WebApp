/**
 * Created by 韩麒麟 on 2015/9/25.
 * qq:290147465
 */


startime = 1;
var $body = $("body");

var iframe = $("<iframe>").width(1000).height(500).css({"position": "absolute", top: 0, left: 0})

    .attr("src", "http://www.jimei.cn/front/order/saveorder.html?pid=d5da89b541384243a2f2c0650fe09ad6&activityProductId=5ac425aed3634118901af9c53c2432b5&code=");
$body.append(iframe)

setInterval(function () {
    iframe.
        attr("src", "http://www.jimei.cn/front/order/saveorder.html?pid=d5da89b541384243a2f2c0650fe09ad6&activityProductId=5ac425aed3634118901af9c53c2432b5&code=&dat=" + new Date());
}, 50);
