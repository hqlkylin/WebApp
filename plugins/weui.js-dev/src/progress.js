(function ($) {
    $.fn.progress = function (options) {
        options = $.extend({
            value: 0
        }, options);
        if (options.value < 0) {
            options.value = 0;
        }

        if (options.value > 100) {
            options.value = 100;
        }

        const $progress = this.find('.weui_progress_inner_bar');
        if($progress.length === 0){
            const opr = typeof options.onClick === 'function' ? `<a href="javascript:;" class="weui_progress_opr">
                    <i class="weui_icon_cancel"></i>
                </a>` : '';
            const html = `<div class="weui_progress">
                <div class="weui_progress_bar">
                    <div class="weui_progress_inner_bar" style="width: ${options.value}%;"></div>
                </div>
                ${opr}
            </div>`;
            if (typeof options.onClick === 'function'){
                this.on('click', '.weui_progress_opr', () => {
                    options.onClick.call(this);
                });
            }
            return this.html(html);
        }

        //return $progress.animate({
        //    width: `${options.value}%`
        //}, 100);
        return $progress.width(`${options.value}%`);
    };
})($);