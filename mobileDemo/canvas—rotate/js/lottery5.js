var lotteryProject = function () {

    this.users = ["奖品一", "奖品二", "奖品三", "谢谢参与", "奖品四", "奖品四", "奖品四", "奖品四"];
    this.item = 2;
    this.count = this.users.length; // 奖项长度
    this.width = 422;   //画布大小
    this.height = 422;  //画布大小
    this.numberRound = 0;  //旋转圈数
    this.outsideRadius = 165;	 //外圆的半径
    this.insideRadius = 70;	 //内圆的半径
    this.textRadius = 165;	 //奖品位置距离圆心的距离

    this.qiuRadius = 10;	 //圆球

    this.startAngle = 0;		 //开始角度
    this.winner = -1; //判断是否 中奖
    this.arc = Math.PI / (this.count / 2); //根据奖品个数计算圆周角度
    this.nowIndex = 0;  //当前索引
    this.minSpeed = 500; //最慢速度
    this.maxSpeed = 40;  //最快速度
    this.acceleration = 80; // 加速度 --- 减速度
    this.speedMode = true; //速度的峰值 判断
    this.speed = this.minSpeed;
    this.runing = false; //false:停止; ture:旋转
    this.allowStop = true;
    this.colors = [
        "#f8b100", "#ffe400",
        "#f8b100", "#ffe400",
        "#f8b100", "#ffe400",
        "#f8b100", "#ffe400",
        "#f8b100", "#ffe400"
    ];

}

lotteryProject.prototype = {

    // 绘制球
    drawQiu: function (i, isWin) {

        var angle = this.startAngle + i * this.arc;

        //----绘制奖品开始----
        ctx.fillStyle = "#E5302F";
        var text = this.users[i], line_height = 17, x, y;

        x = this.width / 2 + Math.cos(angle + this.arc / 2) * this.textRadius;
        y = this.height / 2 + Math.sin(angle + this.arc / 2) * this.textRadius;


        ctx.translate(x, y); //translate方法重新映射画布上的 (0,0) 位置
        ctx.rotate(angle + this.arc / 2 + Math.PI / 2); //rotate方法旋转当前的绘图


        this.preImage("images/qiu11.png", function () {
            ctx.drawImage(this, 10, 10);
        });


    },
    // 绘制格子
    create: function (i, color, isWin, hover) {


        ctx.strokeStyle = "#e95455"; //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
        ctx.font = '14px Microsoft YaHei'; //font 属性设置或返回画布上文本内容的当前字体属性
        var angle = this.startAngle + i * this.arc;

        ctx.fillStyle = color;
        ctx.beginPath();


        //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
        ctx.arc(this.width / 2, this.height / 2, this.outsideRadius, angle, angle + this.arc, false);
        ctx.arc(this.width / 2, this.height / 2, this.insideRadius, angle + this.arc, angle, true);


        //ctx.stroke();
        ctx.fill();
        //锁画布(为了保存之前的画布状态)
        ctx.save();


       this.drawFont(i, isWin, hover);

    },


    preImage: function (url, callback) {
        var img = new Image(); //创建一个Image对象，实现图片的预下载
        img.src = url;

        if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
            callback.call(img);
            return; // 直接返回，不用再处理onload事件
        }

        img.onload = function () { //图片下载完毕时异步调用callback函数。
            console.log(111);

            callback.call(img);//将回调函数的this替换为Image对象
        };
    },

    // 绘制文字
    drawFont: function (i, isWin, hover) {
        var angle = this.startAngle + i * this.arc;
        //----绘制奖品开始----
        ctx.fillStyle = "#E5302F";
        var text = this.users[i], line_height = 17, x, y;

        x = this.width / 2 + Math.cos(angle + this.arc / 2) * this.textRadius;
        y = this.height / 2 + Math.sin(angle + this.arc / 2) * this.textRadius;


        ctx.translate(x, y); //translate方法重新映射画布上的 (0,0) 位置
        ctx.rotate(angle + this.arc / 2 + Math.PI / 2); //rotate方法旋转当前的绘图

        this.preImage("images/qiu.png", function () {
            ctx.drawImage(this, -35, -35, 70, 70);
        });

      /*  if (hover) {

            this.preImage("images/qiu_hover.png", function () {
                ctx.drawImage(this, -45, -45, 90, 90);
            });
        } else {
            this.preImage("images/qiu.png", function () {
                ctx.drawImage(this, -35, -35, 70, 70);
            });

        }*/


        ctx.fillText(text, -ctx.measureText(text).width / 2, 0); //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
        //this.drawQiu(i, isWin);

        ctx.restore(); //把当前画布返回（调整）到上一个save()状态之前
    },

    // 旋转
    whirling: function () {

        this.nowIndex = this.nowIndex % this.count;

        if (this.nowIndex == this.count - 1) {
            this.numberRound++;
        }
        if (this.numberRound > 8) {
            this.speedMode = false;
        }

        var fontIndex = this.nowIndex == 0 ? this.count - 1 : this.nowIndex - 1;


        if (this.speedMode == true) { // 加速
            this.speed -= this.acceleration;
            if (this.speed < this.maxSpeed) {
                this.allowStop = true;
                this.speed = this.maxSpeed;
            }
        } else { // 减速
            this.speed += this.acceleration;
            if (this.speed > 330) {
                if (this.nowIndex == this.item) {
                    this.winner = this.nowIndex;
                }
            }
        }

        this.create(fontIndex, this.colors[fontIndex]);
        this.create(this.nowIndex, this.createHoverColor(), "", "qiu_hover.png");
        this.nowIndex++;

        var _this = this;
        if (this.winner != -1) {
            setTimeout(function () {
                _this.showWinner();
            }, 1000);
            return false;
        }

        autoTime = setTimeout(function () {
            _this.whirling();
        }, this.speed);
    },

    nowColorIndex: 0,
    createHoverColor: function () {
        this.nowColorIndex++;
        this.nowColorIndex = this.nowColorIndex % colorCount;

        return colorList[this.nowColorIndex];
    },

    // 显示获胜者
    showWinner: function () {
        var winColors = ['#ff00ff', '#ffff00', '#00ffff', '#ff0000', '#35E854', '#4E8FFE'];
        var _this = this;
        var i = 0, r = 0, time = 0;
        time = setInterval(function () {
            _this.create(_this.winner, winColors[i % 6]);
            i++;
            if (i % 6 == 0) r++;

            if (r > 3) {
                clearTimeout(time);
                _this.create(_this.winner, winColors[1], true);
                _this.runing = false;
                alert("恭喜您抽中了:" + _this.item);
                location.replace(location.href);
            }
        }, 100);
    },

    // 绘制
    draw: function () {
        ctx.clearRect(0, 0, this.width, this.height);
        var m = this.count, _this = this, k = 0;


        for (var i = 0; i < m; i++) {

            setTimeout(function () {
                _this.create(k, _this.colors[k]);
                k++;
            }, i * 10);
        }

    },
    go: function () {
        this.whirling();
    },
    init: function (item) {
        if (this.runing) return;
        this.runing = true;
        this.speedMode = true;
        this.allowStop = false;
        this.winner = -1;
        this.speed = this.minSpeed;
        this.draw();
    }
};


var turnplate = {
    restaraunts: [],				//大转盘奖品名称
    colors: [],					//大转盘奖品区块对应背景颜色
    outsideRadius: 192,			//大转盘外圆的半径
    textRadius: 155,				//大转盘奖品位置距离圆心的距离
    insideRadius: 68,			//大转盘内圆的半径
    startAngle: 0,				//开始角度
    bRotate: false				//false:停止;ture:旋转
};
turnplate.restaraunts = ["50M免费流量包", "10闪币", "谢谢参与", "5闪币", "10M免费流量包", "20M免费流量包", "20闪币 ", "30M免费流量包", "100M免费流量包", "2闪币"];
turnplate.colors = ["#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF"];


window.onload = function () {
    var i = 0;
    var a;

    function hh() {
        if (i == 10) {
            clearTimeout(a);
        } else {
            a = setTimeout(function () {
                drawRouletteWheel(i);
                i++;
                hh()
            }, 10);

        }


    }

    /// hh();
};

function drawRouletteWheel(i) {

    // console.log(i);

    //根据奖品个数计算圆周角度
    var arc = Math.PI / (turnplate.restaraunts.length / 2);
    var ctx = canvas.getContext("2d");
    //在给定矩形内清空一个矩形
    //ctx.clearRect(0, 0, 422, 422);
    //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
    ctx.strokeStyle = "#FFBE04";
    //font 属性设置或返回画布上文本内容的当前字体属性
    ctx.font = '16px Microsoft YaHei';
    /*   for(var i = 0; i < turnplate.restaraunts.length; i++) {*/
    var angle = turnplate.startAngle + i * arc;
    ctx.fillStyle = turnplate.colors[i];
    ctx.beginPath();
    //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
    ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);
    ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
    ctx.stroke();
    ctx.fill();
    //锁画布(为了保存之前的画布状态)
    ctx.save();
    //----绘制奖品开始----
    ctx.fillStyle = "#E5302F";
    var text = turnplate.restaraunts[i];
    var line_height = 17;
    //translate方法重新映射画布上的 (0,0) 位置

    ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);
    //rotate方法旋转当前的绘图
    ctx.rotate(angle + arc / 2 + Math.PI / 2);
    /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
    if (text.indexOf("M") > 0) {//流量包
        var texts = text.split("M");
        for (var j = 0; j < texts.length; j++) {
            ctx.font = j == 0 ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei';
            if (j == 0) {
                ctx.fillText(texts[j] + "M", -ctx.measureText(texts[j] + "M").width / 2, j * line_height);
            } else {
                ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
            }
        }
    } else if (text.indexOf("M") == -1 && text.length > 6) {//奖品名称长度超过一定范围
        text = text.substring(0, 6) + "||" + text.substring(6);
        var texts = text.split("||");
        for (var j = 0; j < texts.length; j++) {
            ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
        }
    } else {
        //在画布上绘制填色的文本。文本的默认颜色是黑色
        //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    }
    //添加对应图标
    if (text.indexOf("闪币") > 0) {
        var img = document.getElementById("def");
        img.onload = function () {
            ctx.drawImage(img, -15, 10);
        };
        ctx.drawImage(img, -15, 10);
    } else if (text.indexOf("谢谢参与") >= 0) {
        var img = document.getElementById("def");
        img.onload = function () {
            ctx.drawImage(img, -15, 10);
        };
        ctx.drawImage(img, -15, 10);
    }
    //把当前画布返回（调整）到上一个save()状态之前
    ctx.restore();
    //----绘制奖品结束----
    /*    }*/
}
