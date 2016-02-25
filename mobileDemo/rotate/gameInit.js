/**
 * Created by 麒麟 on 2016/2/16.
 */


var jsonData = [
    {"_id": "a1", "type": "元宝", "name": "一等奖", "rate": 11},
    {"_id": "a2", "type": "抵用券", "name": "二等奖", "rate": 14},
    {"_id": "a3", "type": "元", "name": "三等奖", "rate": 15},
    {"_id": "a4", "type": "抵用券", "name": "四等奖", "rate": 16},
    {"_id": "a5", "type": "抵用券", "name": "五等奖", "rate": 17},
    {"_id": "a6", "type": "元宝", "name": "六等奖", "rate": 18},
    {"_id": "a7", "type": "抵用券", "name": "七等奖", "rate": 19},
    {"_id": "a8", "type": "元", "name": "八等奖", "rate": 10},
    {"_id": "a9", "type": "元", "name": "九等奖", "rate": 13},
    {"_id": "a10", "type": "元宝", "name": "十等奖", "rate": 12}
];
var turnplate = {
    restaraunts: [],				//大转盘奖品名称
    type: [],					//大转盘奖品区块对应类型
    name: [],					//大转盘奖品区块对应名称
    rate: [],					//大转盘奖品区块对应几率
    colors: [],					//大转盘奖品区块对应背景颜色
    outsideRadius: 192,			//大转盘外圆的半径
    textRadius: 155,				//大转盘奖品位置距离圆心的距离
    insideRadius: 68,			//大转盘内圆的半径
    startAngle: 0,				//开始角度
    bRotate: false				//false:停止;ture:旋转
};
$(document).ready(function () {

    //动态添加大转盘的奖品与奖品区域背景颜色
    turnplate.restaraunts = ["20000", "100", "10", "50", "100", "100", "200", "20", "5", "2000"];
    turnplate.type = ["元宝", "抵用券", "元", "抵用券", "抵用券", "元宝", "抵用券", "元", "元", "元宝"];
    turnplate.name = ["一等奖", "二等奖", "三等奖", "四等奖", "五等奖", "六等奖", "七等奖", "八等奖", "九等奖", "十等奖"];
    turnplate.rate = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10];


    /*    turnplate.colors = ["#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF"];*/
    var rotateTimeOut = function () {
        $('#wheelcanvas').rotate({
            angle: 0,
            animateTo: 2160,
            duration: 8000,
            callback: function () {
                alert('网络超时，请检查您的网络设置！');
            }
        });
    };
    //旋转转盘 item:奖品位置; txt：提示语;
    var rotateFn = function (item, txt) {
        var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length * 2));
        if (angles < 270) {
            angles = 270 - angles;
        } else {
            angles = 360 - angles + 270;
        }
        $('#wheelcanvas').stopRotate();
        $('#wheelcanvas').rotate({
            angle: 0,
            animateTo: angles + 1800,
            duration: 8000,
            callback: function () {
                alert(txt);
                turnplate.bRotate = !turnplate.bRotate;
            }
        });
    };
    $('.pointer').click(function () {
        if (turnplate.bRotate)return;
        turnplate.bRotate = !turnplate.bRotate;
        //获取随机数(奖品个数范围内)
        var item = rnd(1, turnplate.restaraunts.length);
        //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
        rotateFn(item, turnplate.restaraunts[item - 1]);

        console.log(item);
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
                turnplate.colors.push("#FFF4D6");
            } else {
                turnplate.colors.push("#FFFFFF");
            }
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
            var type = turnplate.type[i];

            var line_height = 17;
            //translate方法重新映射画布上的 (0,0) 位置
            ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);
            //rotate方法旋转当前的绘图
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/

            ctx.fillText(text, -ctx.measureText(text).width / 2, 0 * line_height);
            ctx.fillText(type, -ctx.measureText(type).width / 2, 1 * line_height);

            ctx.restore();
            //----绘制奖品结束----
        }
    }
}

function addItem(obj) {
    turnplate.type.push(obj.type);
    turnplate.restaraunts.push(obj.restaraunts);
    turnplate.name.push(obj.name);
    turnplate.rate.push(obj.rate);
}
function removeItem(obj) {

    turnplate.type.push(obj.type);
    turnplate.restaraunts.push(obj.restaraunts);
    turnplate.name.push(obj.name);
    turnplate.rate.push(obj.rate);

}

$(document).ready(function () {
    $.hMenu("会员活动游戏设置");
    $(".Js-open").click(function () {
        var baseUrl = $(this).attr("data-url");
        if ($(this).attr("data-type") == 'on') {
            $(".gameDetail").hide();
            $(this).attr("data-type", "off");
            $(this).attr("src", baseUrl + "/image/btn_off.png");
        } else {
            $(".gameDetail").show();
            $(this).attr("data-type", "on");
            $(this).attr("src", baseUrl + "/image/btn_on.png");
        }
    });

    //增加规则
    $(".Js-listAward-modal").click(function () {

        turnplate.restaraunts.push("haha")

        drawRouletteWheel();

        var content = '<tr><td class="orderBy"><i class="fa fa-arrow-up"></i><i class="fa fa-arrow-down"></i></td><td>'
            + '<select name="" id="" class="form-control"><option value="">现金</option><option value="">元宝</option><option value="">微信卡券</option></select>'
            + '</td><td><input type="text" class="w70 form-control"></td><td><input type="text" class="w70  form-control"></td><td><input type="text" class="w70 form-control"></td>'
            + '<td><i class="fa fa-trash hoverRed Js-del"></i></td></tr>';
        $(".listAwardCount").closest("tr").before(content);


    });
    // 删除规则
    $(".listAwardContent").on("click", ".Js-del", function () {
        var del = this;
        sweetAlert({
            title: "确定删除此条规则吗?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "删除",
            cancelButtonText: "取消",
            closeOnConfirm: false
        }, function () {
            $(del).closest("tr").remove();

            sweetAlert({
                title: "操作成功！",
                type: "success"
            }, function () {
            });
        });
    });

});


