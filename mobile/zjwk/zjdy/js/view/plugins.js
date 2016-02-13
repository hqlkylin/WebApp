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
 *  $.wx_popTips({
 *       "content": "恭喜您 操作成功!",
 *       "type": "info",
 *       "stayTime": 2000
 *   });
 *
 *
 *
 ********************************************************************************************************/

$.wx_popTips = function (options) {

    var PopTips = function (options) {
        var self = this;
        // 默认参数
        this.opts = {
            content: '',
            stayTime: 2000,
            type: 'info',
            callback: function () {
            }
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
            self.opts.callback();

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
            this.element.css({
                "-webkit-transform": "translateY(-" + this.elementHeight + "px)"
            });
            setTimeout(function () {
                self.element.remove();
            }, 500)


        }
    }

    new PopTips(options);
};


var isIPHONE = navigator.userAgent.toUpperCase().indexOf('IPHONE')!= -1;
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


