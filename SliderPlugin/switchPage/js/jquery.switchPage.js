(function ($) {
	//默认配置
	var defaults = {
		'container' : "#container",
		'sections' : '.section',
		'easing' : 'ease',
		'duration' : 1000,
		'pagination' : true,
		'loop' : true,
		'start' : 1,
	};
	
	var win = $(window), container, sections;
	
	var opts = {}, canScroll = true;
	
	var index = 0;
	
	var arrElement = [];
	
	var SP = $.fn.switchPage = function (options){
		
		opts = $.extend({},defaults, options || {});
		
		container = $(opts.container),
		sections = container.find(opts.sections);
		
		sections.each(function() {
			arrElement.push($(this));
		});
		
		return this.each(function () {
			if(opts.direction == "horizontal"){
				initLayout();
			}
			
			if(opts.pagination) {
				initPagination();
			}
			
			if(opts.keyboard) {
				keyDown();
			}
		})
	}
	
	SP.moveSectionUp = function() {
		if (index) {
			index--;
		}else if(opts.loop){
			index = arrElement.length - 1;
		}
		scrollPage(arrElement[index]);
	};
	
	SP.moveSectionDown = function () {
		if (index < (arrElement.length - 1)) {
			index ++;
		}else if (opts.loop) {
			index = 0;
		}
		scrollPage(arrElement[index]);
	}
	
	function scrollPage(element) {
		var dest = element.position();
		if (typeof dest === 'undefined'){ return;}
		initEffects(dest, element);
	}
	
	$(document).on("mousewheel", MouseWheelHandler);
	
	var flag = true;
	function MouseWheelHandler(e) {
		if (flag) {
			flag = false;
			e.preventDefault();
			var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;
			var delta = Math.max(-1, Math.min(1, value));
			console.log("delta = " + delta);
			if (canScroll) {
				if (delta < 0) {
					console.log("down");
					SP.moveSectionDown();
				}else {
					console.log("up");
					SP.moveSectionUp();
				}
			}
			setTimeout(function () {
				flag = true;	
			}, opts.duration);
		}
		return false;
	}
	
	function initLayout() {
		var length = sections.length,
			width = (length + 100) + "%",
			cellWidth = (100 / length).toFixed(2) + " %";
		
		container.width(width).addClass("left");
		sections.width(cellWidth).addClass("left");
	}
	
	function initPagination() {
		var length = sections.length;
		if (length) {
			
		}
		var pageHtml = '<ul id="pages"><li class="active></li>';
		for (var i = 1; i < length; i++) {
			pageHtml += '<li></li>;'
		}
		pageHtml += '</ul>';
		$("body").append(pageHtml); 
	}
	
	function paginationHandler() {
		var pages = $("#pages li");
		pages.eq(index).addClass("active").siblings().removeClass("active");
	}
	
	function isSuportCss(property) {
		//jq对象转DOM
		var body = $("body")[0];
		for (var i = 0; i < property.length;i ++){
			if(property[i] in body.style) {
				return true;
			}
		}
		return false;
	}
	
	function initEffects (dest,element) {
		console.log("init");
		var transform = ["-webkit-transform","-ms-transform","-moz-transform","transform"];
			transition = ["-webkit-transition","-ms-transition","-moz-transition","transition"];
		console.log(dest.top + " = top");
		canScroll = false;
		if (isSuportCss(transform) && isSuportCss(transition)) {
			var traslate = "";
			if (opts.direction == "horizontal") {
				traslate = "-"+dest.left +"px, 0px, 0px";
			}else {
				traslate = "0px, -" + dest.top + "px, 0px";
			}
			container.css({
				"transition": "all " + opts.duration + "ms "+ opts.easing,
				"-webkit-transform": "translate3d(" + traslate + ")"
			});
			//动画结束，注意这里不能用on绑定，否则会创建多个匿名函数，资源浪费
			container.one("webkitTransitionEnd mozTransitionEnd msTransitionEnd oTransitionEnd transitionend", function() {	
				canScroll = true;
			});
		}else {
			var cssObj = (opts.direction == "horizontal")? {
				left: -dest.left
			} : {
				top: -dest.top
			};
			
			container.animate(cssObj, opts.duration, function () {
				canScroll = true;
			});
		}
		element.addClass("active").siblings().removeClass("active");
		if (opts.pagination) {
			paginationHandler();
		}
	}
	
	var resizeId;
	win.resize(function (){
		clearTimeout(resizeId);
		resizeId = setTimeout(function() {
			reBuild();
		}, 500);
	});
	
	function reBuild() {
		var currentHeight = win.height();
			currentWidth = win.width();
		var element = arrElement[index];
		if (opts.direction == "horizontal") {
			var offsetLeft = element.offset().left;
			if (Math.abs(offsetLeft) > currentWidth / 2 && index < (arrElement.length - 1)) {
				index ++;
			}
		}else {
			var offsetTop = element.offset().top;
			if (Math.abs(offsetTop) > currentHeight /2 && index < (arrElement.length - 1) ){
				index ++;
			}
		}
		if (index) {
			paginationHandler();
			var currentElement = arrElement[index];
			var dest = currentElement.position();
			initEffects(dest, currentElement);
		}
	}
	//类级别
})(jQuery);
