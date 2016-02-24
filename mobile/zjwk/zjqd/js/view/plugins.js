/*******************************************************************************************************
 *  调用方法 : $.wx_showTipData()    关闭加载等待提示
 ********************************************************************************************************/
$.wx_showTipData = function () {
    $("#loadingToast").show();
}
/*******************************************************************************************************
 *  调用方法 : $.wx_hideTipData()    打开加载等待提示
 ********************************************************************************************************/
$.wx_hideTipData = function () {
    setTimeout(function () {
        $("#loadingToast").hide();
    }, 20);
};
/*******************************************************************************************************
 *  调用方法 : $.popTips(options)    头部 浮层提示条
 ********************************************************************************************************/
/*var pop = $.popTips({
 "content": "恭喜您 操作成功!",
 "type": "info",
 "stayTime": 2000
 });
 //自定义事件
 pop.on("tips:show", function () {
 console.log("sb");
 });
 pop.on("tips:hide", function () {
 console.log("bs");
 });*/
$.popTips = function (options) {

    var PopTips = function (options) {
        var self = this;
        // 默认参数
        this.opts = {
            content: '成功',
            stayTime: 2000,
            type: 'info'
        };
        $.extend(this.opts, options);
        this.renderHtml();
        this.elementHeight = $(this.element).height();
        $(this.element).css({
            "-webkit-transform": "translateY(-" + this.elementHeight + "px)"
        });
        setTimeout(function () {
            $(self.element).css({
                "-webkit-transition": "all .5s"
            });
            self.show();
        }, 20);
    };

    PopTips.prototype = {
        renderHtml: function () {
            $(".ui-poptips").remove();
            var html = '<div class="ui-poptips ui-poptips-' + this.opts.type + '">' +
                '<div class="ui-poptips-cnt">' +
                '<i></i>' + this.opts.content + '' +
                '</div>' +
                '</div>';
            $("body").append(html);
            this.element = $(".ui-poptips");
        },
        show: function () {
            var self = this;
            self.element.trigger($.Event("tips:show"));

            this.element.css({
                "-webkit-transform": "translateY(0px)"
            });
            if (self.opts.stayTime > 0) {
                setTimeout(function () {
                    self.hide();
                }, self.opts.stayTime)
            }
        },
        hide: function () {
            var self = this;
            self.element.trigger($.Event("tips:hide"));
            this.element.css({
                "-webkit-transform": "translateY(-" + this.elementHeight + "px)"
            });
            setTimeout(function () {
                self.element.remove();
            }, 500)
        }
    }

    return new PopTips(options).element;
};

/*******************************************************************************************************
 *  调用方法 : $.dialog(options)    弹出框
 ********************************************************************************************************/
/*
 var dia = $.dialog({
 title: '温馨提示',
 content: '温馨提示内容',
 button: ["取消", "确认"]
 });
 dia.on("dialog:action", function (e) {  //e.index 点击 按钮的索引
 if (e.index == 0) {
 $.popTips({
 "content": "您点击了取消按钮！",
 "type": "info",
 "stayTime": 2000
 });
 } else {
 $.toast("您点击了确定按钮！")
 }
 });
 dia.on("dialog:hide", function (e) {
 console.log("dialog hide")
 });
 dia.on("dialog:show", function (e) {
 console.log("dialog hide")
 });*/

$.dialog = function (options) {
    var Dialog = function (opt) {
        this.opt = {
            title: '',
            content: '',
            button: ['确认'],
            select: 0,
            allowScroll: false
        };
        $.extend(this.opt, opt);
        this.renderHtml();
        this.button = this.element.find('.weui_btn_dialog');
        this._bindEvent();
        this.toggle();
    };
    Dialog.prototype = {
        renderHtml: function () {
            // 默认模板
            var _dialog = '<div class="weui_dialog_confirm">' +
                '<div class="weui_mask"></div>' +
                '<div class="weui_dialog">' +
                '<div class="weui_dialog_hd"><strong class="weui_dialog_title">' + this.opt.title + '</strong></div>' +
                '<div class="weui_dialog_bd">' + this.opt.content + '</div>' +
                '<div class="weui_dialog_ft">';
            for (var i = 0; i < this.opt.button.length; i++) {
                _dialog += '<a href="javascript:;" class="weui_btn_dialog default">' +
                    this.opt.button[i] + '</a>'
            }
            _dialog += '</div>' +
                '</div>' +
                '</div>';
            this.element = $(_dialog).appendTo($('body'));
        },
        _bindEvent: function () {
            var self = this;
            self.button.on("tap", function () {
                var index = $(self.button).index($(this));
                // self.option.callback("button",index);
                var e = $.Event("dialog:action");
                e.index = index;
                self.element.trigger(e);
                self.hide.apply(self);
                return false;
            });
        },
        show: function () {

            var self = this;
            self.element.trigger($.Event("dialog:show"));
            self.element.addClass("active");

        },
        hide: function () {
            var self = this;
            self.element.trigger($.Event("dialog:hide"));
            self.element.removeClass("active");
            self.element.remove();

        },
        toggle: function () {
            if (this.element.hasClass("active")) {
                this.hide();
            } else {
                this.show();
            }
        }
    };
    return new Dialog(options).element;
};

/*******************************************************************************************************
 *  调用方法 : $.toast(msg,type)    自动消失提示框
 ********************************************************************************************************/
$.toast = function (msg, type) {
    var msg = msg || "";
    var type = type || "success";
    if (jQuery(".toast-container")) {
        jQuery(".toast-container").remove();
    }
    var renderHtml = '<div class="toast-container toast-' + type + '"><p>' + msg + '</p></div>';
    var $toast = $(renderHtml).appendTo($("body"));
    $toast.on('webkitTransitionEnd', function () {
        if (!$(this).hasClass("active")) {
            $(this).remove();
        }
    });
    $toast.addClass("active");
    setTimeout(function () {
        $toast.removeClass("active");
    }, 2000);
};


var isIPHONE = navigator.userAgent.toUpperCase().indexOf('IPHONE') != -1;
/*---------------------------------------- Ajax 扩展 -------------------------------------------------*/

/*******************************************************************************************************
 *  调用方法 : $.ajaxJson  获取 json 对象
 *
 ********************************************************************************************************/
$.ajaxJson = function (url, data, onSuccess, onError) {
    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        data: data,
        success: onSuccess,
        error: onError
    });
};
/*---------------------------------------- Ajax 扩展 -------------------------------------------------*/


$(function () {
    /* 解决iOS下input和fixed 问题*/
    !function () {
        var $box = $(".ft");
        if (!$box) {
            return;
        }
        if (isIPHONE) {
            var dh = $(document).height();
            var wh = $(window).height();
            if (dh <= wh) {
                return;
            }
            $("input[type='tel'],input[type='text'],input[type='date'],input[type='email']").focus(function () {
                $box.css({'position': 'absolute', 'bottom': 0});
            }).blur(function () {
                $box.css("position", "fixed");
            })
        }
    }();

    $.wx_hideTipData();
});
