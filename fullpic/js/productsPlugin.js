/**
 * Created by 韩麒麟 on 2015/8/6.
 */
(function ($) {
    $.fn.pluginPicturesShow = function (options) { //定义插件的名称
        var dft = {
            //以下为该插件的属性及其默认值
            zIndex: 1, //默认
            index: 0,
            li_height: 0,
            click_index: 0,
            big_wrap: "#big_wrap",
            prev: "#pre",
            next: "#next",
            time: 400,
            li_min_count: 5, // 开关限制
            li_length: 0
        };
        var ops = $.extend(dft, options);
        var $this = this;
        var methods = {
            init: function () {
                ops.li_length = $("li", this).length;
                ops.li_height = $("li", this).first().outerHeight(true);
                if (ops.li_length > ops.li_min_count) {
                    $(ops.prev).click(methods.prev);
                    $(ops.next).click(methods.next);
                }
                return this.each(function () {
                    //将元素集合赋给变量 本例中是 ul对象
                    var items = $("li", $(this));
                    //点击事件
                    items.click(function () {
                        if (ops.click_index == $(this).index()) {
                            return;
                        }
                        ops.click_index = $(this).index();
                        $("li", ops.big_wrap).eq(ops.click_index).css({
                            "zIndex": ops.zIndex++,
                            'opacity': 0
                        }).animate({"opacity": 1}, ops.time);
                    })
                });
            },
            prev: function () {
                ops.index--;
                if (ops.index < 0) {
                    ops.index = 0;
                } else {
                    methods.move();
                }
            },
            next: function (e) {
                ops.index++;
                console.log(ops.index);

                if (ops.li_length - ops.index >= ops.li_min_count) {
                    methods.move();
                } else {
                    ops.index = ops.index - 1;
                }
                e.stopPropagation();
                return false;
            },
            move: function () {
                $this.stop().animate({"top": "-" + ops.li_height * ops.index + "px"}, 300);
            }
        };
        methods.init.apply(this);
    }
})(jQuery);

(function ($) {
    $.fn.extend({
        //插件名称 - pluginPhotoShow
        pluginPhotoShow: function (options) {
            //参数和默认值
            var defaults = {
                slide_li_img_width: 0,
                slide_li_width_array: [],
                slide_li_selected_length: 0,
                window_width: 0,
                index: 0,
                nav: "#nav_box", //导航容器
                slide: "#slide_box", //图片容器
                box: ".products-pop",// 弹出层容器
                flag: true,
                sel: ".selected",// 图片轮播li 容器
                prev: "p.previous",//上一个 容器
                next: "p.next", // 下一个 容器
                speed: 600,
                close: ".close,.return",// 关闭最大层
                blur: "blur",// 不许要 .
                setBody: "o-hidden"
            };
            var ops = $.extend(defaults, options);
            var methods = {
                init: function () {
                    this.on("click", function () {
                        $(ops.box).show();
                        $("body").addClass(ops.setBody);
                        ops.slide_li_selected_length = $(ops.sel).length;
                        methods.resize();
                        if (ops.flag) {
                            //ops.slide_li_selected_length = $(ops.sel).length;
                            //ops.window_width = $(window).width();
                            //  methods.init_selected_width();
                            methods.clone();
                            $(ops.slide).css("left", "-" + (ops.slide_li_img_width - (ops.window_width / 2 - ops.slide_li_width_array[ops.index])) + "px"); //初始化第一张图片居中
                            $(ops.prev).on("click", methods.prev);
                            $(ops.next).on("click", methods.next);
                            $("li", ops.nav).on("click", methods.clickIndex);
                            $(ops.box).on('mousewheel', function (event) {
                                clearTimeout(this.timer);
                                this.timer = setTimeout(function () {
                                    if (event.deltaY < 0) {
                                        $(ops.next).trigger("click");
                                    } else {
                                        $(ops.prev).trigger("click");
                                    }
                                }, 100);
                            });
                        }
                        $(window).resize(function () {
                            methods.resize();
                        });
                        ops.flag = false;
                    });
                    $(ops.close, ops.box).on("click", function () {
                        $(ops.box).hide();
                        $("body").removeClass(ops.setBody);
                    })

                },
                prev: function () {

                    ops.index--;
                    if (ops.index < 0) {
                        ops.index = ops.slide_li_selected_length - 1;
                        var imgCenter = ops.window_width / 2 - ops.slide_li_width_array[ops.index];
                        var move_width = $(ops.sel).first().prev().position().left;
                        methods.move(move_width - imgCenter, function () {
                            $(ops.slide).css("left", "-" + ($(ops.sel).eq(ops.index).position().left - imgCenter) + "px");
                        });
                    } else {
                        var imgCenter = ops.window_width / 2 - ops.slide_li_width_array[ops.index];
                        var move_width = $(ops.sel).eq(ops.index).position().left;
                        methods.move(move_width - imgCenter);
                    }
                },
                next: function () {

                    ops.index++;
                    if (ops.index >= ops.slide_li_selected_length) {
                        ops.index = 0;
                        var imgCenter = ops.window_width / 2 - ops.slide_li_width_array[ops.index];
                        var move_width = ($("li", ops.slide).eq(ops.slide_li_selected_length * 2).position().left);
                        methods.move(move_width - imgCenter, function () {
                            $(ops.slide).css("left", "-" + (ops.slide_li_img_width - imgCenter) + "px");
                        });
                    } else {
                        var imgCenter = ops.window_width / 2 - ops.slide_li_width_array[ops.index];
                        var move_width = $(ops.sel).eq(ops.index).position().left;
                        methods.move(move_width - imgCenter);
                    }

                },
                init_selected_width: function () {
                    ops.slide_li_width_array = [];
                    ops.slide_li_img_width = 0;
                    ops.window_width = $(window).width();
                    $(ops.sel, ops.slide).each(function () {
                        $(this).width($(this).find("img").width() / $(this).find("img").height() * $(this).parent().height());
                        ops.slide_li_width_array.push($(this).outerWidth() / 2)
                        ops.slide_li_img_width += $(this).outerWidth(true);
                    });
                    $(ops.slide).width(ops.slide_li_img_width * 3);
                },
                clone: function () {
                    $(ops.slide).prepend($(ops.sel).clone().removeClass());
                    $(ops.slide).append($(ops.sel).clone().removeClass());
                },
                active: function () {
                    $("li", ops.nav).eq(ops.index).addClass("active").siblings().removeClass("active");
                },
                clickIndex: function () {

                    var lastIndex = ops.index;
                    ops.index = $(this).index();

                    if (lastIndex == ops.slide_li_selected_length - 1 && ops.index == 0) {

                        var imgCenter = ops.window_width / 2 - ops.slide_li_width_array[ops.index];
                        var move_width = ($("li", ops.slide).eq(ops.slide_li_selected_length * 2).position().left);
                        methods.move(move_width - imgCenter, function () {
                            $(ops.slide).css("left", "-" + (ops.slide_li_img_width - imgCenter) + "px");
                        });

                    } else if (lastIndex == 0 && ops.index == ops.slide_li_selected_length - 1) {

                        var imgCenter = ops.window_width / 2 - ops.slide_li_width_array[ops.index];
                        var move_width = $(ops.sel).first().prev().position().left;
                        methods.move(move_width - imgCenter, function () {
                            $(ops.slide).css("left", "-" + ($(ops.sel).eq(ops.index).position().left - imgCenter) + "px");
                        });

                    } else {

                        var imgCenter = ops.window_width / 2 - ops.slide_li_width_array[ops.index];
                        var move_width = $(ops.sel).eq(ops.index).position().left;
                        methods.move(move_width - imgCenter);

                    }

                },
                move: function (leftWidth, cb) {
                    $(ops.slide).stop().animate({"left": "-" + leftWidth + "px"}, ops.speed, function () {
                        if (cb) {
                            cb();
                        }
                    });
                    methods.active();
                    $("li", ops.slide).find("img").addClass(ops.blur);
                    $(ops.sel).eq(ops.index).find("img").removeClass();
                },
                resize: function () {
                    methods.init_selected_width();
                    $("li", ops.slide).not(ops.sel).each(function (index) {
                        $(this).width($(this).find("img").width() / $(this).find("img").height() * $(this).parent().height());
                    });
                    $(ops.slide).width(ops.slide_li_img_width * 3);
                    $(ops.slide).css("left", "-" + ($(ops.sel).eq(ops.index).position().left - (ops.window_width / 2 - ops.slide_li_width_array[ops.index])) + "px"); //初始化第一张
                }
            };
            methods.init.apply(this);
        }
    });
})(jQuery);