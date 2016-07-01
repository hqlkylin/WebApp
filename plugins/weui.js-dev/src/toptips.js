(function ($) {

    let $topTips = null;
    let timer = null;

    /**
     * show top tips
     * @param {String} content
     * @param {Object|Number|Function} [options]
     */
    $.weui.topTips = function (content = 'topTips', options) {

        if ($topTips) {
            $topTips.remove();
            timer && clearTimeout(timer);
            $topTips = null;
        }

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
        const html = `<div class="weui_toptips weui_warn">${content}</div>`;
        $topTips = $(html);
        $topTips.appendTo($('body'));
        if (typeof $topTips.slideDown === 'function') {
            $topTips.slideDown(20);
        }
        else {
            $topTips.show();
        }

        timer = setTimeout(() => {
            if ($topTips) {
                if (typeof $topTips.slideUp === 'function') {
                    $topTips.slideUp(120, () => {
                        $topTips.remove();
                        $topTips = null;
                        options.callback();
                    });
                }
                else {
                    $topTips.remove();
                    $topTips = null;
                    options.callback();
                }
            }
        }, options.duration);
    };

})($);