/**
 * Created by Administrator on 2015/8/31.
 */

define(["jquery", "scrollto"], function ($, scrollto) {
    function BackTop(el, opts) {
        this.opts = $.extend({}, BackTop.DEFAULTS, opts);
        this.$el = $(el);
        this.scroll = new scrollto.ScrollTo({
            desc: 0,
            speed: this.opts.speed
        });
        if (this.opts.mode == "move") {
            this.$el.on("click", $.proxy(this._move, this));
        } else {
            this.$el.on("click", $.proxy(this._go, this));
        }
        this._checkPosition();
        $(window).on("scroll", $.proxy(this._checkPosition, this));

    }

    BackTop.prototype = {
        _move: function () {
            this.scroll.move();
        },
        _go: function () {
            this.scroll.go();
        },
        _checkPosition: function () {
            if ($(window).scrollTop() > this.opts.pos) {
                this.$el.fadeIn();
            } else {
                this.$el.fadeOut();
            }
        }
    };

    BackTop.DEFAULTS = {
        mode: "move",
        pos: $(window).height(),
        speed: 800
    };
    $.fn.extend({
        backtop: function (opts) {
            return this.each(function () {
                new BackTop(this, opts);
            })
        }
    })

    return {
        BackTop: BackTop
    }
});
