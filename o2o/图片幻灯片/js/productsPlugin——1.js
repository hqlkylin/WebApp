/**
 * Created by ������ on 2015/8/6.
 */
(function ($) {
    $.fn.pluginPicturesShow = function (options) { //������������
        var dft = {
            //����Ϊ�ò�������Լ���Ĭ��ֵ
            zIndex: 1, //Ĭ��
            index: 0,
            li_height: 0,
            click_index: 0,
            big_wrap: "#big_wrap",
            prev: "#pre",
            next: "#next",
            time: 400,
            li_min_count: 5, // ��������
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
                    //��Ԫ�ؼ��ϸ������� �������� ul����
                    var items = $("li", $(this));
                    //����¼�
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
            next: function () {
                ops.index++;
                if (ops.li_length - ops.index >= ops.li_min_count) {
                    methods.move();
                } else {
                    ops.index = ops.li_min_count - 1;
                }
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
        //������� - pluginPhotoShow
        pluginPhotoShow: function (options) {

            //������Ĭ��ֵ
            var defaults = {
                slide_li_img_width: 0,
                slide_li_width_array: [],
                slide_li_selected_length: 0,
                window_width: 0,
                index: 0,
                nav: "#nav_box", //��������
                slide: "#slide_box", //ͼƬ����
                box: ".products-pop",// ����������
                //flag: true,
                sel: ".selected",// ͼƬ�ֲ�li ����
                prev: "p.previous",//��һ�� ����
                next: "p.next", // ��һ�� ����
                speed: 600

            };

            var ops = $.extend(defaults, options);
            var methods = {
                init: function () {
                    ops.slide_li_selected_length = $(ops.sel).length;
                    ops.window_width = $(window).width();
                    this.on("click", function () {
                        $(ops.box).show();
                        methods.init_selected_width();
                        methods.clone();
                        $(ops.slide).css("left", "-" + (ops.slide_li_img_width - (ops.window_width / 2 - ops.slide_li_width_array[ops.index])) + "px"); //��ʼ����һ��ͼƬ����
                        $(ops.prev).on("click", methods.prev);
                        $(ops.next).on("click", methods.next);

                        $("li", ops.nav).on("click", methods.clickIndex);
                    });


                    //��ʼ�� li width

                },
                prev: function () {
                    ops.index--;
                    if (ops.index < 0) {
                        ops.index = ops.slide_li_selected_length - 1;
                        var imgCenter = ops.window_width / 2 - ops.slide_li_width_array[ops.index];
                        var move_width = $(ops.sel).first().prev().position().left;

                        /*  $(ops.slide).stop().animate({"left": "-" + (move_width - imgCenter) + "px"}, ops.speed, function () {
                         $(this).css("left", "-" + ($(ops.sel).eq(ops.index).position().left - imgCenter) + "px");
                         });*/
                        methods.move(move_width - imgCenter, function () {
                            $(ops.slide).css("left", "-" + ($(ops.sel).eq(ops.index).position().left - imgCenter) + "px");
                        });


                    } else {
                        var imgCenter = ops.window_width / 2 - ops.slide_li_width_array[ops.index];
                        var move_width = $(ops.sel).eq(ops.index).position().left;

                        //$(ops.slide).stop().animate({"left": "-" + (move_width - imgCenter) + "px"}, ops.speed);
                        methods.move(move_width - imgCenter);
                    }
                    // methods.active();
                },
                next: function () {
                    ops.index++;
                    if (ops.index >= ops.slide_li_selected_length) {
                        ops.index = 0;
                        var imgCenter = ops.window_width / 2 - ops.slide_li_width_array[ops.index];
                        var move_width = ($("li", ops.slide).eq(ops.slide_li_selected_length * 2).position().left);
                        /*  $(ops.slide).stop().animate({"left": "-" + (move_width - imgCenter) + "px"}, ops.speed, function () {
                         $(this).css("left", "-" + (ops.slide_li_img_width - imgCenter) + "px");
                         });*/
                        methods.move(move_width - imgCenter, function () {
                            $(ops.slide).css("left", "-" + (ops.slide_li_img_width - imgCenter) + "px");
                        });

                    } else {

                        var imgCenter = ops.window_width / 2 - ops.slide_li_width_array[ops.index];
                        var move_width = $(ops.sel).eq(ops.index).position().left;
                        //$(ops.slide).stop().animate({"left": "-" + (move_width - imgCenter) + "px"}, ops.speed);
                        methods.move(move_width - imgCenter);
                    }
                    //methods.active();
                },
                init_selected_width: function () {
                    ops.slide_li_width_array = [];
                    ops.slide_li_img_width = 0;
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

                        /*  $(ops.slide).stop().animate({"left": "-" + (move_width - imgCenter) + "px"}, ops.speed, function () {
                         $(this).css("left", "-" + (ops.slide_li_img_width - imgCenter) + "px");
                         });*/
                        methods.move(move_width - imgCenter, function () {
                            $(ops.slide).css("left", "-" + (ops.slide_li_img_width - imgCenter) + "px");
                        });

                    } else if (lastIndex == 0 && ops.index == ops.slide_li_selected_length - 1) {

                        var imgCenter = ops.window_width / 2 - ops.slide_li_width_array[ops.index];
                        var move_width = $(ops.sel).first().prev().position().left;
                        /*  $(ops.slide).stop().animate({"left": "-" + (move_width - imgCenter) + "px"}, ops.speed, function () {
                         $(this).css("left", "-" + ($(ops.sel).eq(ops.index).position().left - imgCenter) + "px");
                         });*/
                        methods.move(move_width - imgCenter, function () {
                            $(ops.slide).css("left", "-" + ($(ops.sel).eq(ops.index).position().left - imgCenter) + "px");
                        });


                    } else {

                        var imgCenter = ops.window_width / 2 - ops.slide_li_width_array[ops.index];
                        var move_width = $(ops.sel).eq(ops.index).position().left;
                        methods.move(move_width - imgCenter);
                        // $(ops.slide).stop().animate({"left": "-" + (move_width - imgCenter) + "px"}, ops.speed);
                    }

                    //methods.active();


                },
                move: function (leftWidth, cb) {
                    $(ops.slide).stop().animate({"left": "-" + leftWidth + "px"}, ops.speed, function () {
                        if (cb) {
                            cb();
                        }
                    });
                    methods.active();
                }
            };
            methods.init.apply(this);
        }
    });
})(jQuery);