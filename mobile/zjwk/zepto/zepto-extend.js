/**
 * Created by hanqilin on 16/4/25.
 */
//添加nextAll
;(function($){
    var e = {
        nextAll: function(s) {
            var $els = $(), $el = this.next()
            while( $el.length ) {
                if(typeof s === 'undefined' || $el.is(s)) $els = $els.add($el)
                $el = $el.next()
            }
            return $els
        },
        prevAll: function(s) {
            var $els = $(), $el = this.prev()
            while( $el.length ) {
                if(typeof s === 'undefined' || $el.is(s)) $els = $els.add($el)
                $el = $el.prev()
            }
            return $els
        }
    }

    $.extend( $.fn, e )
})(Zepto);