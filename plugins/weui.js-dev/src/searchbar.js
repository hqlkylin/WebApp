(function ($) {
    $.fn.searchBar = function (options) {
        options = $.extend({
            focusingClass:'weui_search_focusing',
            searchText:"搜索",
            cancelText:"取消"
        },options);

        let html = `<div class="weui_search_bar">
                    <form class="weui_search_outer">
                        <div class="weui_search_inner">
                            <i class="weui_icon_search"></i>
                            <input type="search" class="weui_search_input" id="weui_search_input" placeholder="${options.searchText}" required/>
                            <a href="javascript:" class="weui_icon_clear"></a>
                        </div>
                        <label for="weui_search_input" class="weui_search_text">
                            <i class="weui_icon_search"></i>
                            <span>${options.searchText}</span>
                        </label>
                    </form>
                    <a href="javascript:" class="weui_search_cancel">${options.cancelText}</a>
                </div>`;

        let $search = $(html);
        this.append($search);

        const $searchBar = this.find('.weui_search_bar');
        const $searchText = this.find('.weui_search_text');
        const $searchInput = this.find('.weui_search_input');

        this.on('focus', '#weui_search_input', function () {
            $searchText.hide();
            $searchBar.addClass(options.focusingClass);
            bindEvent($searchInput, 'onfocus', options);
        }).on('blur', '#weui_search_input', function () {
            $searchBar.removeClass(options.focusingClass);
            !!$(this).val() ? $searchText.hide() : $searchText.show();
            bindEvent($searchInput, 'onblur', options);
        }).on('touchend', '.weui_search_cancel', function () {
            $searchInput.val('');
            bindEvent($searchInput, 'oncancel', options);
        }).on('touchend', '.weui_icon_clear', function (e) {
            //阻止默认动作
            e.preventDefault();
            $searchInput.val('');
            if(document.activeElement.id != 'search_input') {
                $searchInput.trigger('focus');
            }
            bindEvent($searchInput, 'onclear', options);
        }).on('input', '.weui_search_input', function () {
            bindEvent($searchInput, 'input', options);
        }).on('submit', '.weui_search_outer', function () {
            if(typeof(options.onsubmit) == 'function'){
                bindEvent($searchInput, 'onsubmit', options);
                return false;
            }
        });

        function bindEvent(target,event,options){
            if(typeof(options[event]) == 'function'){
                let value = $(target).val();
                options[event].call(target, value);
            }
        }
    };
})($);