/**
 * Created by 韩麒麟 on 2015/9/7.
 */

$(function () {
    var box = $(".box"),
        pop = $(".pop"),
        container = $(".container"),
        buddy = $(".buddy"),
        open = $(".btn"),
        imgs = pop.find('img'),
        close = $(".close");

    /*自定义动画*/
    /*出场动画*/
    $.Velocity.RegisterUI("kylin.slideUpIn", {
        defaultDuration: 500,
        calls: [
            [{opacity: [1, 0], translateY: [0, 100]}]
        ]
    });
    /*点击动画*/
    $.Velocity.RegisterUI("kylin.slideDownOut", {
        defaultDuration: 300,
        calls: [
            [{opacity: [0, 1], translateY: [100, 0]}]
        ]
    });
    /*图片特效*/
    $.Velocity.RegisterUI("kylin.scaleIn", {
        defaultDuration: 300,
        calls: [
            [{opacity: [1, 0], scale: [1, 0.3]}]
        ]
    });
    $.Velocity.RegisterUI("kylin.scaleOut", {
        defaultDuration: 300,
        calls: [
            [{opacity: [0, 1], scale: [0.3, 1]}]
        ]
    });

    var secInit = [
        {
            elements: container,
            properties: 'kylin.slideUpIn',
            options: {
                delay: 300
            }
        },
        {
            elements: box,
            properties: 'kylin.slideUpIn',
            options: {
                sequenceQueue: false
            }
        },
        {
            elements: buddy,
            properties: 'kylin.slideUpIn',
            options: {
                delay: 60
            }
        }
    ];
    var secClick = [
        {
            elements: container,
            properties: 'kylin.slideDownOut'
        },
        {
            elements: box,
            properties: 'kylin.slideDownOut'
        },
        {
            elements: container,
            properties: 'kylin.slideUpIn'
        },
        {
            elements: pop,
            properties: 'kylin.slideUpIn',
            options: {
                sequenceQueue: false
            }
        },
        {
            elements: imgs,
            properties: 'kylin.scaleIn'
        }

    ];
    var secClose = [
        {
            elements: imgs,
            properties: 'kylin.scaleOut'
        },
        {
            elements: container,
            properties: 'kylin.slideDownOut'
        },
        {
            elements: pop,
            properties: 'kylin.slideDownOut'
        },
        {
            elements: container,
            properties: 'kylin.slideUpIn'
        },
        {
            elements: box,
            properties: 'kylin.slideUpIn',
            options: {
                sequenceQueue: false
            }
        }

    ]
    $.Velocity.RunSequence(secInit);
    open.click(function () {
        $.Velocity.RunSequence(secClick);
    });
    close.click(function () {
        $.Velocity.RunSequence(secClose);
    })

});