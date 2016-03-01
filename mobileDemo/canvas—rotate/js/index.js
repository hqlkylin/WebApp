var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');
ctx.globalCompositeOperation = 'lighter';
canvas.height = 422;
canvas.width = 422;

/*var db = new localDatabase();*/


var lottery = new lotteryProject();
lottery.init(5);


$(function () {
    $("#continue_button").click(function () {
        return false;
    });
    $("#stop_button").click(function () {
        lottery.go();
        return false;
    });
});



// 创建 渐变颜色列表
var colorList = [];
var colorCount = 0;

function createColor() {
    var colors = {"r": ['ff'], "b": ['ff'], "g": ['ff']};
    colors.c = ['g', 'b', 'g', 'r', 'b', 'g', 'r'];
    colors.n = [255, 255, 0, 255, 0, 255, 0];

    // 颜色压缩
    var ratio = 8, len = 256 / ratio;

    // 定义基础颜色
    var r = 255, g = 255, b = 255, rgb = {"r": "", "g": "", "b": ""};

    var n = 0, color = '';
    for (var k in colors.c) {

        if (k == 3) continue;

        // 记录RBG 颜色变化流程
        for (var rgbk in rgb) {
            colors[rgbk][k * 1 + 1] = rgbk == colors.c[k] ? dechex(255 - colors.n[k]) : colors[rgbk][k];
        }

        // 绘制渐变线条
        for (var i = colors.n[k]; i > -1 && i < 256;) {
            if (k == 0 && i > 128) i = 128;

            switch (colors.c[k]) {
                case 'r':
                    r = i;
                    break;
                case 'b':
                    b = i;
                    break;
                case 'g':
                    g = i;
                    break;
            }

            color = 'rgb(' + r + ',' + b + ',' + g + ')';

            if (colors.n[k] == 255) i -= ratio;
            else i += ratio;

            colorList.push(color);
        }
    }
    colorCount = colorList.length;
}

function dechex(num) {
    var r = Math.round(num).toString(16);
    return r.length == 1 ? '0' + r : r;
}

createColor();
