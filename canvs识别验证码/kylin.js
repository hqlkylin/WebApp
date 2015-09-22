// $.getScript("http://zt.jimei.com.cn/Kylin.js",function(){
// 	//初始化 账号密码
// 		myKylin.init({tel:"15801606686",pwd:"19871011"});
// });




function Kylin() {

	this.init = function(obj) {
		console.log("开始登陆等待...");
		var that = this;
		$.ajax({
			url: "http://hd.jimei.com.cn/login/localLogin.html",
			data: {
				"bean.name": obj.tel,
				"bean.password": obj.pwd
			},
			dataType: "GET",
			success: function(html) {
				console.log(html);
			}
		});
		console.log("发送请求中……")
		setTimeout(function() {

			$.get("http://hd.jimei.com.cn/login/autoLogin.html?date=" + new Date().getTime(), {}, function(result) {

				if (result) {
					if (result.userName) {
						$("#user").html("您好  " + result.userName + "!<a href='http://hd.jimei.com.cn/logout/logout.html'>[退出]</a>");
						console.log("成功登陆 tel:" + result.userName);
					} else {
						console.log("登陆失败 程序已停止");
						clearTimeout(that.timer);

					}
				} else {
					console.log("登陆异常 程序已停止");
					clearTimeout(that.timer);
				}
			}, "json");

		}, 2000)

		qiangGou();
		console.log("验证码识别中……");
		this.timer = setTimeout(this.proc, 6000)
	};
	this.proc = function() {
		var image = document.querySelector("#imgCode"); //如果要用在greasemonkey脚本里,可以把下面的代码放在image的onload事件里          
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext("2d");
		var numbers = [ //模板,依次是0-9十个数字对应的明暗值字符串
			"110000001100111100100111100001111110001111110001111110001111110001111110001111110100111100100111100110000001111000011111111111111111111111111111",
			"100000111100000111111100111111100111111100111111100111111100111111100111111100111111100111111100111100000000100000000111111111111111111111111111",
			"000000001011111000111111100111111100111111001111110011111100111111001111110011111100111111001111111000000000000000000111111111111111111111111111",
			"100000001101111000111111100111111100111111001110000111110000001111111000111111100111111100101111000100000001110000011111111111111111111111111111",
			"111110001111100001111001001111001001110011001100111001100111001000000000000000000111111001111111001111111001111111001111111111111111111111111111",
			"100000000100111111100111111100111111100000111100000001111111000111111100111111100111111100101111000100000001110000011111111111111111111111111111",
			"110000000100011110100111111001111111001000001000000000000111100001111110001111110001111110100111100110000000111000011111111111111111111111111111",
			"100000001111111110111111101111111101111111001111110011111110011111100111111100111111001111111001111110011111110011111111111111111111111111111111",
			"110000001100111100100111100100111100110001001111000011100010000100111100001111110001111110000111100100000000110000001111111111111111111111111111",
			"100000001100111100001111110001111110001111110100111100100000000110000010111111110111111100101111000100000001110000111111111111111111111111111111"
		];
		var captcha = ""; //存放识别后的验证码
		canvas.width = image.width;
		canvas.height = image.height;
		document.body.appendChild(canvas);
		ctx.drawImage(image, 0, 0);
		for (var i = 0; i < 4; i++) {
			var pixels = ctx.getImageData(13 * i + 7, 3, 9, 16).data;
			var ldString = "";
			for (var j = 0, length = pixels.length; j < length; j += 4) {
				ldString = ldString + (+(pixels[j] * 0.3 + pixels[j + 1] * 0.59 + pixels[j + 2] * 0.11 >= 140));
			}
			var comms = numbers.map(function(value) { //为了100%识别率,这里不能直接判断是否和模板字符串相等,因为可能有个别0被计算成1,或者相反
				return ldString.split("").filter(function(v, index) {
					return value[index] === v
				}).length
			});
			captcha += comms.indexOf(Math.max.apply(null, comms)); //添加到识别好的验证码中
		};
		document.querySelector("input[name=code]").value = captcha; //写入目标文本框
		console.log("验证码识别成功！");
		var speed = 1000;

		var call = function() {
			if (startime > 0) {
				if(startime==30){speed=200;console.warn("进入疯狂模式");}
				console.log("等待：" + startime + "秒后活动开始  毫秒："+new Date().getMilliseconds());
			} else {
				$('#codeHidden').val(captcha);
				$('#form').submit();
				clearInterval(timer);
			}

			var timer = setTimeout(arguments.callee, speed);
		};
		call();
	};

};
var myKylin = new Kylin();