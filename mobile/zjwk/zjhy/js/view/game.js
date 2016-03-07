/**
 * Created by 麒麟 on 2016/3/1.
 */

var turnplate = {
    restaraunts: [],				//大转盘奖品名称
    type: [],					//大转盘奖品区块对应类型
    name: [],					//大转盘奖品区块对应名称
    rate: [],					//大转盘奖品区块对应几率
    colors: [],					//大转盘奖品区块对应背景颜色
    outsideRadius: 170,			//大转盘外圆的半径
    textRadius: 135,				//大转盘奖品位置距离圆心的距离
    insideRadius: 38,			//大转盘内圆的半径
    startAngle: 0,				//开始角度
    bRotate: false				//false:停止;ture:旋转
};
$(document).ready(function () {

    //动态添加大转盘的奖品与奖品区域背景颜色
    turnplate.restaraunts = ["12元宝", "50卡券", "50元", "50元", "100元宝", "100元宝", "100元宝", "100元宝", "100元宝", "100元宝"];
    //turnplate.restaraunts = [];
    var one = 360 / turnplate.restaraunts.length;
    var jd = -90 - one / 2;

    $(".item").css("-webkit-transform", "rotate(" + jd + "deg)");

    /*    turnplate.colors = ["#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF"];*/
    var rotateTimeOut = function () {
        $('.pointer').rotate({
            angle: 0,
            animateTo: 3600,
            duration: 8000,
            callback: function () {
                alert('网络超时，请检查您的网络设置！');
            }
        });
    };
    //旋转转盘 item:奖品位置; txt：提示语;
    var rotateFn = function (item, txt) {

        var angles = (item * one);
        /*    var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length * 2));
         if (angles < 270) {
         angles = 270 - angles;
         } else {
         angles = 360 - angles + 270;
         }*/
        $('.pointer').stopRotate();

        $('.pointer').rotate({
            angle: 0,
            animateTo: angles + 3600,
            duration: 8000,
            callback: function () {
                turnplate.bRotate = !turnplate.bRotate;
                var dia = $.dialog({
                    title: '温馨提示',
                    content: '恭喜您抽中'+turnplate.restaraunts[item],
                    button: ["查看", "再玩一次"],
                    showClose:true,
                    tapMaskClose:true
                });
                dia.on("dialog:action", function (e) {  //e.index 点击 按钮的索引
                    if (e.index == 0) {
                        $.popTips({
                            "content": "您点击了查看按钮！",
                            "type": "info",
                            "stayTime": 2000
                        });
                    } else {
                        $.toast("点击再玩一次按钮！")
                    }
                });


            }
        });
    };

    $('.pointer').click(function () {
        if (turnplate.bRotate)return;
        turnplate.bRotate = !turnplate.bRotate;
        //获取随机数(奖品个数范围内)
        var item = rnd(0, turnplate.restaraunts.length);
        //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
        rotateFn(item, turnplate.restaraunts[item]);
        //console.log(item);
    });
});
function rnd(n, m) {
    var random = Math.floor(Math.random() * (m - n + 1) + n);
    return random;
}
//页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
window.onload = function () {
    drawRouletteWheel();
};
function drawRouletteWheel() {
    var canvas = document.getElementById("wheelcanvas");
    if (canvas.getContext) {
        //根据奖品个数计算圆周角度
        var arc = Math.PI / (turnplate.restaraunts.length / 2);
        var ctx = canvas.getContext("2d");
        //在给定矩形内清空一个矩形
        ctx.clearRect(0, 0, 422, 422);
        //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
        ctx.strokeStyle = "#FFBE04";
        //font 属性设置或返回画布上文本内容的当前字体属性
        ctx.font = '16px Microsoft YaHei';
        for (var i = 0; i < turnplate.restaraunts.length; i++) {

            if (i % 2 == 0) {
                //turnplate.colors.push("#d35000");
                ctx.fillStyle = "#d35000";
            } else {
                //turnplate.colors.push("#ffde01");
                ctx.fillStyle = "#ffde01";
            }
            if (i == turnplate.restaraunts.length - 1 && turnplate.restaraunts.length % 2 != 0) {

                ctx.fillStyle = "#ff7a28";
            }
            var angle = turnplate.startAngle + i * arc;
            // ctx.fillStyle = turnplate.colors[i];
            ctx.beginPath();
            //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
            ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);
            ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();
            //锁画布(为了保存之前的画布状态)
            ctx.save();
            //----绘制奖品开始----
            /*  if (i % 2 == 0) {
             ctx.fillStyle = "#FFFFFF";
             } else {
             ctx.fillStyle = "#E5302F";
             }*/
            ctx.fillStyle = "#FFFFFF";
            // ctx.fillStyle = "#E5302F";
            var text = turnplate.restaraunts[i];
            //var type = turnplate.type[i];
            var line_height = 17;
            //translate方法重新映射画布上的 (0,0) 位置
            ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);
            //rotate方法旋转当前的绘图
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/

            ctx.fillText(text, -ctx.measureText(text).width / 2, 0 * line_height);
            // ctx.fillText(type, -ctx.measureText(type).width / 2, 1 * line_height);

            ctx.restore();
            //----绘制奖品结束----
        }
    }
}