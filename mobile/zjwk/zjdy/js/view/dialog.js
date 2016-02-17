/**
 * Created by hanqilin on 16/2/15.
*/

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