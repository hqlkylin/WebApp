(function ($) {

    let $dialog = null;

    /**
     *  weui dialog
     * @param {Object} [options]
     */
    $.weui.dialog = function (options) {
        options = $.extend({
            title: '标题',
            content: '内容',
            className: '',
            buttons: [{
                label: '确定',
                type: 'primary',
                onClick: $.noop
            }]
        }, options);

        const buttons = options.buttons.map((button) => {
            return `<a href="javascript:;" class="weui_btn_dialog ${button.type}">${button.label}</a>`;
        }).join('\n');
        const html = `<div class="${options.className}">
                <div class="weui_mask"></div>
                <div class="weui_dialog">
                    <div class="weui_dialog_hd">
                        <strong class="weui_dialog_title">
                            ${options.title}
                        </strong>
                    </div>
                    <div class="weui_dialog_bd">
                        ${options.content}
                    </div>
                    <div class="weui_dialog_ft">
                        ${buttons}
                    </div>
                </div>
            </div>`;
        $dialog = $(html);
        $('body').append($dialog);
        $dialog.on('click', '.weui_btn_dialog', function () {
            const button = options.buttons[$(this).index()];
            const cb = button.onClick || $.noop;
            cb.call();
            $.weui.closeDialog();
        });
    };

    /**
     * close dialog
     */
    $.weui.closeDialog = function () {
        if ($dialog) {
            $dialog.off('click');
            // zepto 核心不包含动画相关的方法
            if (typeof $dialog.fadeOut === 'function') {
                $dialog.fadeOut('fast', () => {
                    $dialog.remove();
                    $dialog = null;
                });
            }
            else {
                $dialog.remove();
                $dialog = null;
            }
        }
    };

})($);