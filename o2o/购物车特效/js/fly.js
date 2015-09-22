/*
 * jquery.fly
 * 
 * 抛物线动画
 * @github https://github.com/amibug/fly
 * Copyright (c) 2015 wuyuedong
 * copy from tmall.com
 * <script src="jquery.js"></script>
 <script src="dist/jquery.fly.min.js"></script>
 <script>
 jQuery(function($) {
 $('#fly').fly({
 start:{
 left: 11,  //开始位置（必填）#fly元素会被设置成position: fixed
 top: 600,  //开始位置（必填）
 },
 end:{
 left: 500, //结束位置（必填）
 top: 130,  //结束位置（必填）
 width: 100, //结束时高度
 height: 100, //结束时高度
 },
 autoPlay: false, //是否直接运动,默认true
 speed: 1.1, //越大越快，默认1.2
 vertex_Rtop：100, //运动轨迹最高点top值，默认20
 onEnd: function(){} //结束回调
 });
 $('#fly').play(); //autoPlay: false后，手动调用运动
 $('#fly').destroy(); //移除dom
 });
 </script>
 IE10以下，引入src/requestAnimationFrame.js

 @support IE>=7
 */
(function ($) {
  $.fly = function (element, options) {
    // 默认值
    var defaults = {
      version: '1.0.0',
      autoPlay: true,
      vertex_Rtop: 20, // 默认顶点高度top值
      speed: 1.2,
      start: {}, // top, left, width, height
      end: {},
      onEnd: $.noop
    };

    var self = this,
      $element = $(element);

    /**
     * 初始化组件，new的时候即调用
     */
    self.init = function (options) {
      this.setOptions(options);
      !!this.settings.autoPlay && this.play();
    };

    /**
     * 设置组件参数
     */
    self.setOptions = function (options) {
      this.settings = $.extend(true, {}, defaults, options);
      var settings = this.settings,
        start = settings.start,
        end = settings.end;
  ///此处修改过
      //$element.css({marginTop: '0px', marginLeft: '0px', position: 'fixed'}).appendTo('body');
      $element.css({marginTop: '0px', marginLeft: '0px', position: 'fixed'});
      // 运动过程中有改变大小
      if (end.width != null && end.height != null) {
        $.extend(true, start, {
          width: $element.width(),
          height: $element.height()
        });
      }
      // 运动轨迹最高点top值
      var vertex_top = Math.min(start.top, end.top) - Math.abs(start.left - end.left) / 3;
      if (vertex_top < settings.vertex_Rtop) {
        // 可能出现起点或者终点就是运动曲线顶点的情况
        vertex_top = Math.min(settings.vertex_Rtop, Math.min(start.top, end.top));
      }

      /**
       * ======================================================
       * 运动轨迹在页面中的top值可以抽象成函数 y = a * x*x + b;
       * a = curvature
       * b = vertex_top
       * ======================================================
       */

      var distance = Math.sqrt(Math.pow(start.top - end.top, 2) + Math.pow(start.left - end.left, 2)),
        // 元素移动次数
        steps = Math.ceil(Math.min(Math.max(Math.log(distance) / 0.05 - 75, 30), 100) / settings.speed),
        ratio = start.top == vertex_top ? 0 : -Math.sqrt((end.top - vertex_top) / (start.top - vertex_top)),
        vertex_left = (ratio * start.left - end.left) / (ratio - 1),
        // 特殊情况，出现顶点left==终点left，将曲率设置为0，做直线运动。
        curvature = end.left == vertex_left ? 0 : (end.top - vertex_top) / Math.pow(end.left - vertex_left, 2);

      $.extend(true, settings, {
        count: -1, // 每次重置为-1
        steps: steps,
        vertex_left: vertex_left,
        vertex_top: vertex_top,
        curvature: curvature
      });
    };

    /**
     * 开始运动，可自己调用
     */
    self.play = function () {
      this.move();
    };

    /**
     * 按step运动
     */
    self.move = function () {
      var settings = this.settings,
        start = settings.start,
        count = settings.count,
        steps = settings.steps,
        end = settings.end;
      // 计算left top值
      var left = start.left + (end.left - start.left) * count / steps,
        top = settings.curvature == 0 ? start.top + (end.top - start.top) * count / steps : settings.curvature * Math.pow(left - settings.vertex_left, 2) + settings.vertex_top;
      // 运动过程中有改变大小
      if (end.width != null && end.height != null) {
        var i = steps / 2,
          width = end.width - (end.width - start.width) * Math.cos(count < i ? 0 : (count - i) / (steps - i) * Math.PI / 2),
          height = end.height - (end.height - start.height) * Math.cos(count < i ? 0 : (count - i) / (steps - i) * Math.PI / 2);
        $element.css({width: width + "px", height: height + "px", "font-size": Math.min(width, height) + "px"});
      }
      $element.css({
        left: left + "px",
        top: top + "px"
      });
      settings.count++;
      // 定时任务
      var time = window.requestAnimationFrame($.proxy(this.move, this));
      if (count == steps) {
        window.cancelAnimationFrame(time);
        // fire callback
        settings.onEnd.apply(this);
      }
    };

    /**
     * 销毁
     */
    self.destroy = function(){
      $element.remove();
    };

    self.init(options);
  };

  // add the plugin to the jQuery.fn object
  $.fn.fly = function (options) {
    return this.each(function () {
      if (undefined == $(this).data('fly')) {
        $(this).data('fly', new $.fly(this, options));
      }
    });
  };
})(jQuery);
