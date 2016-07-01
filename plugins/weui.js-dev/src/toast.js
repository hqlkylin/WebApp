(function ($) {

    /**
     * show toast
     * @param {String} content
     * @param {Object|Number} [options]
     */
    $.weui.toast = function (content = 'toast', options) {

        if (typeof options === 'number') {
            options = {
                duration: options
            };
        }

        if (typeof options === 'function') {
            options = {
                callback: options
            };
        }

        options = $.extend({
            duration: 3000,
            callback: $.noop
        }, options);
        
        const html = `<div>
            <div class="weui_mask_transparent"></div>
            <div class="weui_toast">
                <i class="weui_icon_toast"></i>
                <p class="weui_toast_content">${content}</p>
            </div>
        </div>`;
        let $toast = $(html);
        $('body').append($toast);

        setTimeout(function () {
            $toast.remove();
            $toast = null;
            options.callback();
        }, options.duration);
    };

})($);