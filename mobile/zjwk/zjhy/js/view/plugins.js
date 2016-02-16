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
 *  调用方法 : $.wx_popTips(options)    头部 浮层提示条
 *
 *  var pop=$.popTips({
 *       "content": "恭喜您 操作成功!",
 *       "type": "info",
 *       "stayTime": 2000
 *   });
 *   自定义事件
 *  pop.on("tips:show", function () {
 *               console.log("sb");
 *           })
 *  pop.on("tips:hide", function () {
 *               console.log("bs");
 *          })
 ********************************************************************************************************/
$.popTips = function (options) {

    var PopTips = function (options) {
        var self = this;
        // 默认参数
        this.opts = {
            content: '',
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

});
