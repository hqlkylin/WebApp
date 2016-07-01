(function ($) {
    /**
     * confirm
     * @param {String} content
     * @param {String} options
     * @param {Function} yes
     * @param {Function} no
     */
    $.weui.confirm = function (content, options, yes, no) {

        var type = typeof options === 'function';
        if (type) {
            no = yes;
            yes = options;
        }

        options = $.extend({
            title: '确认',
            content: content || '确认内容',
            className: '',
            buttons: [{
                label: '取消',
                type: 'default',
                onClick: no || $.noop
            }, {
                label: '确定',
                type: 'primary',
                onClick: yes || $.noop
            }]
        }, type ? {} : options);
        options.className = `weui_dialog_confirm ${options.className}`;

        $.weui.dialog(options);
    };
})($);