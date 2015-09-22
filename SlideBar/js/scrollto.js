/**
 * Created by 韩麒麟  on 2015/8/31.
 */

define(['jquery'], function ($) {
    function ScrollTo(opt) {

        this.opt = $.extend({}, ScrollTo.DEFAULTS, opt);
        this.$el = $('html,body');

    }

    ScrollTo.prototype = {
        move: function () {
            var opt = this.opt;
            if ($(window).scrollTop() != opt.dest && !this.$el.is(":animated")) {
                this.$el.animate({
                    scrollTop: opt.dest
                }, opt.speed);
            }
        },
        go: function () {
            var opt = this.opt;
            if ($(window).scrollTop() != opt.dest) {
                this.$el.scrollTop(opt.dest);
            }
        }
    }
    ScrollTo.DEFAULTS = {
        dest: 0,
        speed: 800
    }
    return {
        ScrollTo: ScrollTo
    }
});
