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
    }
    $.extend(this.opt, opt);
};
Dialog.prototype = {
    renderHtml: function () {
        // 默认模板
        var _dialogTpl = '<div class="ui-dialog">' +
            '<div class="ui-dialog-cnt">' +
            '<div class="ui-dialog-bd">' +
            '<div>' +
            '<h4>' + this.opt.title + '</h4>' +
            '<div>' + this.opt.content + '</div></div>' +
            '</div>' +
            '<div class="ui-dialog-ft ui-btn-group">';
        for (var i = 0; i < this.opt.button.length; i++) {
            _dialogTpl += '<button type="button" data-role="button"  class="select" id="dialogButton' + i + '">' +
                this.opt.button[i] + '</button>';
        }
        _dialogTpl += '</div>' +
            '</div>' +
            '</div>';
    }
};