/**
 * Created by 韩麒麟 on 2015/9/7.
 */


$(function () {


    //////////
    // 小孩走路 //
    //////////
    var boy = BoyWalk();


    // 音乐配置
    var audioConfig = {
        enable: true, // 是否开启音乐
        playURl: 'http://www.imooc.com/upload/media/happy.wav', // 正常播放地址
        cycleURL: 'http://www.imooc.com/upload/media/circulation.wav' // 正常循环播放地址
    };
    /////////
    //背景音乐 //
    /////////
    function Hmlt5Audio(url, isloop) {
        var audio = new Audio(url);
        audio.autoPlay = true;
        audio.loop = isloop || false;
        audio.play();
        return {
            end: function (callback) {
                audio.addEventListener('ended', function () {
                    callback();
                }, false);
            }
        };
    }

    // 开始
    $("button").click(function () {
        var audio1 = Hmlt5Audio(audioConfig.playURl);
        audio1.end(function () {
            Hmlt5Audio(audioConfig.cycleURL, true);
        });
        // 太阳公转
        $("#sun").addClass('rotation');
        // 飘云
        $(".cloud:first").addClass('cloud1Anim');
        $(".cloud:last").addClass('cloud2Anim');

        // 开始第一次走路
        boy.walkTo(1000, 0.2)
            .then(function () {
                // 第一次走路完成
                // 开始页面滚动
                scrollTo(5000, 1);

            }).then(function () {
                //第二次走路
                return boy.walkTo(5000, 0.5);
            }).then(function () {
                // 开门
                return openDoor();
            })
            .then(function () {
                // 开灯
                lamp.bright();
            })
            .then(function () {
                // 进商店
                return boy.toShop(1000);
            }).then(function () {
                // 取花
                return boy.talkFlower();
            }).then(function () {
                // 飞鸟
                bird.fly();
            }).then(function () {
                // 出商店
                return boy.outShop(2000);
            }).then(function () {
                // 关门
                return shutDoor();
            }).then(function () {
                // 灯暗
                lamp.dark();
                scrollTo(5000, 2);
                return boy.walkTo(5000, 0.15);
            }).then(function () {
                // 第二次走路到桥上left,top
                return boy.walkTo(1500, 0.25, girl.getPosition().top / visualHeight);
            })
            .then(function () {
                // 实际走路的比例
                var proportionX = (girl.getPosition().left - 66 - boy.getWidth() + girl.getWidth() / 5) / visualWidth;

                // 第三次桥上直走到小女孩面前
                return boy.walkTo(1500, proportionX);
            }).then(function () {
                // 图片还原原地停止状态
                boy.resetOriginal();
            }).then(function () {
                // 增加转身动作
                setTimeout(function () {
                    girl.rotate();
                    boy.rotate(function () {
                        // 开始logo动画
                        logo.run();
                        snowflake()
                    });
                }, 1000);
            });


    });
})
