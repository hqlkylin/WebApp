/**
 * 这是个针对modile端的小型滚动条框架
 * 兼容 IE9+,chrome,firefox,safari及所有现代浏览器
 * @author ouxingzhi@vip.qq.com
 * @createDate 2014/06/01
 */

void function(window,document,undefined){

	//utils
	var ap = Array.prototype,
		slice = ap.slice,
		push = ap.push,
		regSelector = /^#([a-z][\w-]+)|\.([a-z][\w-]+)|([a-z]+)/i,
		regTag = /^[a-z]+$/i,
		isIE = !!document.attachEvent;
	Function.prototype.bind = Function.prototype.bind || function(self){
		var fn = this;
		return function(){
			return fn.apply(self,arguments);
		}
	};
	//简单选择器
	function $(selector,rootNode){
		rootNode = rootNode || document;
		var rets = [],r;
		var matches = regSelector.exec(selector);
		if(matches){
			if(matches[1] && rootNode.getElementById){
				r = rootNode.getElementById(matches[1]);
				r && rets.push(r);
				return rets;
			}else if(matches[2] && rootNode.getElementsByClassName){
				r = rootNode.getElementsByClassName(matches[2]);
				r && r.length && push.apply(rets,r);
				return rets;
			}else if(matches[3] && rootNode.getElementsByTagName){
				r = rootNode.getElementsByClassName(matches[3]);
				r && r.length && push.apply(rets,r);
				return rets;
			}
		}
		rootNode.querySelectorAll && push.apply(rets,rootNode.querySelectorAll(selector));
		return rets;
	}

	function getCss(el,styleName){
		if(window.getComputedStyle){
			return window.getComputedStyle(el)[styleName];
		}else if(el.currentStyle){
			return el.currentStyle[styleName];
		}
	}
	function css(el,styleName,val){
		if(!val){
			return getCss(el,styleName);
		}else{
			el.style[styleName] = val;
		}
	}
	function offset(el){
		var left=0,top=0;
		do{
			left += el.offsetLeft;
			top += el.offsetTop;
		}while(el = el.offsetParent);
		return {
			left:left,
			top:top
		};
	}
	function isElement(o){
		return !!(o && o.addEventListener && o.nodeType === 1);
	}
	function addEvent(el,type,fn){
		if(el.addEventListener){
			el.addEventListener(type,fn,false);
		}else if(el.attachEvent){
			el['__on'+type+'__'] = fn; 
			el.attachEvent('on'+type,el['__on'+type+'__']);
		}
	}

	function removeEvent(el,type,fn){
		if(el.removeEventListener){
			el.removeEventListener(type,fn);
		}else if(el.detachEvent){
			el.detachEvent('on'+type,fn);
		}
	}

	function trigger(el,event){
		if(el.dispatchEvent){
			el.dispatchEvent(event);
		}else if(el.fireEvent){
			el.fireEvent(event);
		}
	}

	var C = function(div){
		return function(html,attr,events){
			var dom = null;
			if(regTag.test(html)){
				dom = document.createElement(html);
			}else{
				div.innerHTML = html;
				var child = div.firstChild;
				loop:do{
					if(child && child.nodeType === 1) {
						div.removeChild(child);
						div.innerHTML = '';
						dom = child;
						break loop;
					}
				}while(child = child.nextSibling);
			}
			attr = attr || {};
			var val;
			for(var i in attr){
				val = attr[i];
				if(i === 'class') i = 'className';
				if(i === 'style'){
					dom[i]['cssText'] = val;
				}else{
					dom[i] = val;
				}
			}
			events = events || {};
			for(var i in events){
				addEvent(dom,i,events[i]);
			}
			return dom;
		};
	}(document.createElement('div'));
	//获得元素大小
	function getSize(el,useBorder){
		var width,height;
		if(useBorder){
			width = el.offsetWidth;
			height = el.offsetHeight;
		}else{
			width = el.clientWidth;
			height = el.clientHeight;
		}
		return {
			height:height,
			width:width
		};
	}
	//取页面大小
	function getPageSize(){
		return {
			width:Math.max(document.documentElement.offsetWidth,window.innerWidth),
			height:Math.max(document.documentElement.offsetHeight,window.innerHeight)
		};
	}
	//取元素的内部高度
	function getScrollInfo(el){
		return {
			pageWidth:el.scrollWidth,
			pageHeight:el.scrollHeight,
			height:el.clientHeight,
			width:el.clientWidth,
			top:el.scrollTop,
			left:el.scrollLeft
		};
	}
	//取视口大小
	function getViewPortSize(){
		return {
			width:window.innerWidth,
			height:window.innerHeight
		}
	}

	//取消默认行为
	function preventDefault(e){
		if(e.preventDefault){
			e.preventDefault();
		}
		if('returnValue' in e){
			e.returnValue = false;
		}
	}
	//停止派发事件
	function stopPropagation(e){
		if(e.stopPropagation){
			e.stopPropagation();
		}
		if('cancelBubble' in e){
			e.cancelBubble = true;
		}
	}
	//判断元素是不是属于或是等于另一元素
	function insideElement(el,box){
		return el === box || box.compareDocumentPosition && !!(box.compareDocumentPosition(el) & 16) || box.contains && box.contains(el);
	}

	var requestAnimationFrame = window.requestAnimationFrame
							|| window.mozRequestAnimationFrame
							|| window.webkitRequestAnimationFrame
							|| window.msRequestAnimationFrame
							|| window.oRequestAnimationFrame
							|| function(callback) {
							setTimeout(callback, 1000 / 60);
							};
	//计算加速度
	function Acceleration(){
		this.times = [];
		this.state = Acceleration.STATE_STOP;
		this.timer;
		this.curX;
		this.curY;
		this.resource;
	}

	Acceleration.STATE_STOP = 0;
	Acceleration.STATE_RUNNING = 1;

	Acceleration.prototype = {
		constructor:Acceleration,
		start:function(x,y){
			this.add(x,y);
			this.state = Acceleration.STATE_RUNNING;
			this.loop();
		},
		loop:function(){
			if(this.state === Acceleration.STATE_STOP) return;
			this.add(this.curX,this.curY);
			this.timer = setTimeout(this.loop.bind(this),1000/40);
		},
		add:function(x,y){
			this.state = Acceleration.STATE_RUNNING;
			clearTimeout(this.timer);
			this.times.unshift({
				time:new Date().valueOf(),
				x:x,
				y:y
			});
			this.curX = x;
			this.curY = y;
			if(this.times.length > 5){
				this.times.splice(5,this.times.length - 5);
			}
			this.timer = setTimeout(this.loop.bind(this),1000/40);
			return this.calc();
		},
		end:function(x,y){
			this.add(x,y);
			this.state = Acceleration.STATE_STOP;
			clearTimeout(this.timer);
			return this.calc();
		},
		calc:function(){
			var i = 3;
			var t = this.times,
				p1 = t[i] || t[i-1] || t[i-2],
				p2 = t[0];
			if(!p1) return {x:0,y:0};
			var diff = p2.time - p1.time,
				x = p2.x - p1.x,
				y = p2.y - p1.y;
			var xs = (1000 / diff) * x,
				ys = (1000 / diff) * y;
			return {
				x:xs,
				y:ys
			}
		}
	};

	var isSuportTouch = 'ontouchstart' in document,
		isIE = 'attachEvent' in document;
	function noop(){}

	var CLASS_PREFIX = 'xscroll-';

	function xScroll(ops){
		this.html;
		//外部容器
		this.container;
		//容器
		this.el;
		//滚动条
		//x轴滚动条
		this.xScrollBar;
		//y轴滚动条
		this.yScrollBar;

		//x轴滚动条外补丁
		this.xScrollBarMargin = 1;
		//y轴滚动条外补丁
		this.yScrollBarMargin = 1;

		//记录touchstart时的开始位置
		this.startX = 0;
		this.startY = 0;
		//记录touchstart时的scroll位置
		this.startScrollX = 0;
		this.startScrollY = 0;
		//加速度计算对象
		this.acceleration = new Acceleration();
		//滚动状态
		this.slide_state = xScroll.SLIDE_STATE_STOP;

		//缓动时记录上一次位置
		this.lastLeft;
		this.lastTop;

		//回调函数
		this.onScrollStart = noop;
		this.onScrollMove = noop;
		this.onScrollEnd = noop;

		//是否隐藏scroll
		this.hideScroller = false;
		//当前滚动条比例
		this.curXRatio = 1;
		this.curYRatio = 1;

		this._onTouchStart = this.onTouchStart.bind(this);
		this._onTouchMove = this.onTouchMove.bind(this);
		this._onTouchEnd = this.onTouchEnd.bind(this);
		//兼容ie的mouse事件
		this.isLeftBtnDown = false;
		this._ieOnTouchStart = function(e){
			e = window.event || e;
			if(insideElement(e.target || e.srcElement,this.el)){
				if(e.button === 0 || isIE && e.button === 1){
					this.isLeftBtnDown = true;
					this.onTouchStart(e);
				}
			}
		}.bind(this);

		this._ieOnTouchMove = function(e){
			e = window.event || e;
			if( (e.button === 0 || isIE && e.button === 1) && this.isLeftBtnDown){
				this.onTouchMove(e);
			}
		}.bind(this);

		this._ieOnTouchEnd = function(e){
			e = window.event || e;
			if((e.button === 0 || isIE && e.button === 1) && this.isLeftBtnDown){
				this.onTouchEnd(e);
				this.isLeftBtnDown = false;
			}
		}.bind(this);
		//滚动的线程id
		this.curThreadId = 0;

		this.events = {};
		this.setOption(ops);
		this.init();
	}
	xScroll.SLIDE_STATE_STOP = 0;
	xScroll.SLIDE_STATE_RUNNING = 1;

	xScroll.prototype = {
		constructor:xScroll,

		setOption:function(ops){
			if(ops.el){
				if(typeof ops.el === 'string'){
					this.el = $(ops.el)[0];
					if(!this.el){
						throw "element does not exist!";
					}
				}else{
					this.el = ops.el;
				}
			}
			//设置回调
			if(ops.onSrcollStart && typeof ops.onSrcollStart === 'function'){
				this.onScrollStart = ops.onSrcollStart;
			}
			if(ops.onScrollMove && typeof ops.onScrollMove === 'function'){
				this.onScrollMove = ops.onScrollMove;
			}
			if(ops.onScrollEnd && typeof ops.onScrollEnd === 'function'){
				this.onScrollEnd = ops.onScrollEnd;
			}
			//是否显示滚动条
			if(typeof ops.hideScroller !== 'undefined'){
				this.hideScroller = ops.hideScroller;
			}
			//滚动条margin
			if(typeof ops.xScrollBarMargin !== 'undefined'){
				this.xScrollBarMargin = ops.xScrollBarMargin;
			}
			if(typeof ops.yScrollBarMargin !== 'undefined'){
				this.yScrollBarMargin = ops.yScrollBarMargin;
			}
		},
		init:function(){
			this.buildEvent();
			this.createScrollBar();
			this.calcScroll();
			this._onScrollEnd();
		},
		buildEvent:function(){
			if(isSuportTouch){
				addEvent(this.el,'touchstart',this._onTouchStart);
				addEvent(this.el,'touchmove',this._onTouchMove);
				addEvent(this.el,'touchend',this._onTouchEnd);
			}else{
				addEvent(document.documentElement,'mousedown',this._ieOnTouchStart);
				addEvent(document.documentElement,'mousemove',this._ieOnTouchMove);
				addEvent(document.documentElement,'mouseup',this._ieOnTouchEnd);
			}
			
		},
		scrollTo:function(x,y){
			this.setScroll(x,y);
		},
		getPointerPos:function(e){
			var touch
			if(isSuportTouch){
				touch = e && e.changedTouches && e.changedTouches[0];
			}else{
				touch = e;
			}
			return touch;
		},
		getTouchPos:function(e){
			var touch = this.getPointerPos(e);
			if(!touch) return {x:0,y:0};
			return {
				x:touch.screenX,
				y:touch.screenY
			};
		},
		setStartPos:function(e){
			var pos = this.getTouchPos(e);
			var spos = getScrollInfo(this.container);
			this.startX = pos.x;
			this.startY = pos.y;
			this.startScrollX = spos.left;
			this.startScrollY = spos.top;
		},
		getNewPos:function(e){
			var pos = this.getTouchPos(e),
				x = this.startScrollX + (this.startX - pos.x),
				y = this.startScrollY + (this.startY - pos.y);
			return {
				x:x,
				y:y
			};
		},
		getPageTouchPos:function(e){
			var touch = this.getPointerPos(e);
			return {
				x:touch.screenX,
				y:touch.screenY
			};
		},
		onTouchStart:function(e){
			//preventDefault(e);
			stopPropagation(e)
			this.setStartPos(e);
			var pos = this.getPageTouchPos(e);
			this.acceleration.add(pos.x,pos.y);
			this.stopSlideLoop();
			this.onScrollStart();
		},
		onTouchMove:function(e){
			this._onScrollMove();
			preventDefault(e);
			stopPropagation(e)
			var pos = this.getNewPos(e);
			this.setScroll(pos.x,pos.y);
			var p = this.getPageTouchPos(e);
			this.acceleration.add(p.x,p.y);
			
		},
		onTouchEnd:function(e){
			//preventDefault(e);
			stopPropagation(e)
			var pos = this.getPageTouchPos(e);
			var speed = this.acceleration.end(pos.x,pos.y);
			if(speed.y || speed.x) this.startSlide(speed);
		},
		startSlide:function(speed){
			this.slide_state = xScroll.SLIDE_STATE_RUNNING;
			var len = parseInt(Math.sqrt(Math.pow(speed.x,2)+Math.pow(speed.y,2))*0.03);
			this.slideLoop(60+len,60+len,this.curThreadId,speed.x,speed.y);
		},
		slideLoop:function(num,den,threadid,x,y){
			clearTimeout(this.endtimeer);
			if(threadid !== this.curThreadId){
				return;
			}
			if(!num || !x && !y){
				this.slide_state = xScroll.SLIDE_STATE_STOP;
				this.onScrollEnd();
				this.endtimeer = setTimeout(this._onScrollEnd.bind(this),400);
				return ;
			}
			//到头了
			var spos = getScrollInfo(this.container);
			if(spos.left === this.lastLeft && spos.top === this.lastTop){
				this.slide_state = xScroll.SLIDE_STATE_STOP;
				this.onScrollEnd();
				this.endtimeer = setTimeout(this._onScrollEnd.bind(this),400);
				return ;
			}
			var ratio = 0.03 * Math.pow((num / den),3);
			var xm = spos.left - x * ratio ,
				ym = spos.top - y * ratio;

			this.lastLeft = spos.left;
			this.lastTop = spos.top;
			this.calcSlidePos(xm,ym);
			requestAnimationFrame(function(){
				this.slideLoop(--num,den,threadid,x,y)
			}.bind(this));
		},
		stopSlideLoop:function(){
			this.curThreadId++;
		},
		calcSlidePos:function(xm,ym){
			this.setScroll(xm,ym)
		},
		setScroll:function(x,y){
			this.container.scrollTop = y;
			this.container.scrollLeft = x;
			this.calcScroll();
		},
		_onScrollMove:function(){
			if(!this.hideScroller){
				if(this.curXRatio !== 1){
					css(this.xScrollBar,'display','block');
				}
				if(this.curYRatio !== 1){
					css(this.yScrollBar,'display','block');
				}
			}
			this.onScrollMove();
		},
		_onScrollEnd:function(){
			if(this.slide_state === xScroll.SLIDE_STATE_STOP){
				css(this.xScrollBar,'display','none');
				css(this.yScrollBar,'display','none');
			}
		},
		calcScroll:function(){
			var sinfo = getScrollInfo(this.container),
				height = sinfo.pageHeight - sinfo.height,
				width = sinfo.pageWidth - sinfo.width,
				xpos = sinfo.left / width || 0,
				ypos = sinfo.top / height || 0,
				xratio = sinfo.width / sinfo.pageWidth,
				yratio = sinfo.height / sinfo.pageHeight,
				xscrollW = xratio * (sinfo.width - this.xScrollBarMargin*2),
				yscrollH = yratio * (sinfo.height - this.yScrollBarMargin*2),
				xscrollL = this.xScrollBarMargin + xpos * (sinfo.width - this.xScrollBarMargin*2 - xscrollW),
				xscrollT = this.yScrollBarMargin + ypos * (sinfo.height - this.yScrollBarMargin*2 - yscrollH);
			this.curXRatio = xratio;
			this.curYRatio = yratio;
			//更新宽度
			css(this.xScrollBar,'width',xscrollW+'px');
			css(this.yScrollBar,'height',yscrollH+'px');
			//更新位置

			css(this.xScrollBar,'left',xscrollL+'px');
			css(this.yScrollBar,'top',xscrollT+'px');
			if(xratio === 1){
				css(this.xScrollBar,'display','none');
			}
			if(yratio === 1){
				css(this.yScrollBar,'display','none');
			}
		},
		createScrollBar:function(){
			var defaultStyle = 'position:absolute;height:5px;width:5px;background:#000;opacity:0.5;border-radius:2px; zoom:1;overflow:hidden;';
			this.container = C('div',{
				'class':CLASS_PREFIX + 'container',
				'style':'height:100%;width:100%;overflow:hidden'
			});

			this.xScrollBar = C('div',{
				'class':CLASS_PREFIX + 'xscrollbar',
				'style':defaultStyle + 'left:'+this.xScrollBarMargin+'px;bottom:'+this.xScrollBarMargin+'px;'
			});
			this.yScrollBar = C('div',{
				'class':CLASS_PREFIX + 'yscrollbar',
				'style':defaultStyle + 'right:'+this.yScrollBarMargin+'px;top:'+this.yScrollBarMargin+'px;'
			});
			var tmplist=[];
			for(var i=0,len=this.el.childNodes.length;i<len;i++){
				tmplist.push(this.el.childNodes[i]);
			}
			for(i=0,len=tmplist.length;i<len;i++){
				this.container.appendChild(tmplist[i]);
			}

			this.el.appendChild(this.container);
			this.el.appendChild(this.xScrollBar);
			this.el.appendChild(this.yScrollBar);
			var elPosition = css(this.el,'position');
			if(!elPosition || elPosition === 'static'){
				css(this.el,'position','relative');
			}
		},
		getContent:function(){
			return this.container;
		}
	};

	window.xScroll = xScroll;
}(window,document);