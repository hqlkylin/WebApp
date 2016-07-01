(function ($) {
    var oldFnTab = $.fn.tab;
    $.fn.tab = function (options){
        options = $.extend({
            defaultIndex: 0,
            activeClass: `weui_bar_item_on`,
            onToggle: $.noop
        }, options);
        const $tabbarItems = this.find('.weui_tabbar_item, .weui_navbar_item');
        const $tabBdItems = this.find('.weui_tab_bd_item');

        this.toggle = function (index){
            const $defaultTabbarItem = $tabbarItems.eq(index);
            $defaultTabbarItem.addClass(options.activeClass).siblings().removeClass(options.activeClass);

            const $defaultTabBdItem = $tabBdItems.eq(index);
            $defaultTabBdItem.show().siblings().hide();

            options.onToggle(index);
        };
        const self = this;

        this.on('click', '.weui_tabbar_item, .weui_navbar_item', function (e){
            const index = $(this).index();
            self.toggle(index);
        });

        this.toggle(options.defaultIndex);

        return this;
    };
    $.fn.tab.noConflict = function(){
        return oldFnTab;
    };
})($);