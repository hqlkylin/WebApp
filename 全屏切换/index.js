/**
 * Created by Administrator on 2015/5/21.
 */
(function ($) {
    /*Ĭ�ϲ���*/
    var defaults = {
        container: '#container', //����
        sections: '.section',    //������
        easing: 'ease',          //����
        duration: '500',        //ʱ��
        pagination: true,        //��ҳ
        loop: true,              //ѭ��
        keyboard: true,           //����
        direction: 'horizontal'    //���� vertical
    };
    var opts = {},
        iIndex = 0,
        arrElement = [],
        canScroll = true;
    var win = $(window), container, sections;
    var sp = $.fn.switchPage = function (options) {
        opts = $.extend({}, defaults, options || {});
        container = $(opts.container);
        sections = container.find(opts.sections);
        sections.each(function () {
            arrElement.push($(this));
        });
        $(document).on("mousewheel", MouseWheelHandler);
        var flag = true;

        function MouseWheelHandler(e, delta) {
            if (flag) {
                flag = false;
                e.preventDefault();
                if (canScroll) {
                    if (delta > 0) {
                        sp.mouseSectionUp();
                    }
                    else if (delta < 0) {
                        sp.mouseSectionDown();
                    }
                }
                setTimeout(function () {
                    flag = true;
                }, opts.duration);
            }
            return false;
        }

        /*���Ϲ���*/
        sp.mouseSectionUp = function () {
            if (iIndex) {
                iIndex--;
                scrollPage(arrElement[iIndex]);
            } else if (opts.loop) {
                iIndex = arrElement.length - 1;
                scrollPage(arrElement[iIndex]);
            }


        };
        /*���¹���*/
        sp.mouseSectionDown = function () {

            if (iIndex < (arrElement.length - 1)) {
                iIndex++;
                scrollPage(arrElement[iIndex]);
            } else if (opts.loop) {
                iIndex = 0;
                scrollPage(arrElement[iIndex]);
            }


        };
        /*�����¼�*/
        function scrollPage(element) {
            var dest = element.position();
            if (typeof dest === 'undefined') {
                return;
            }
            initEffects(dest, element);
        }

        //��ȾЧ��
        function initEffects(dest, element) {


            if (isSuportCss("transform") && isSuportCss("transition")) {
                var traslate = "";
                if (opts.direction == "horizontal") {
                    traslate = "-" + dest.left + "px, 0px,0px";
                } else {
                    traslate = "0px,-" + dest.top + "px,0px";
                }

                container.css({
                    "transition": "all " + opts.duration + "ms " + opts.easing,
                    "transform": "translate3d(" + traslate + ")"
                })
                //����������ע�����ﲻ����on�󶨣�����ᴴ�����������������Դ�˷�
                container.one("webkitTransitionEnd mozTransitionEnd msTransitionEnd oTransitionEnd transitionend", function () {
                    canScroll = true;
                });
            } else {

                var cssObj = (opts.direction == "horizontal") ? {
                    left: -dest.left
                } : {
                    top: -dest.top
                };

                container.animate(cssObj, opts.duration, function () {
                    canScroll = true;
                });
            }

            paginationHandler();
        }

        function initPagination() {
            var length = sections.length;
            if (length) {

            }
            var pageHtml = '<ul id="pages"><li class="active"></li>';
            for (var i = 1; i < length; i++) {
                pageHtml += '<li></li>'
            }
            pageHtml += '</ul>';
            console.log(1);
            $("body").append(pageHtml);
        }

        function paginationHandler() {
            var pages = $("#pages li");
            pages.eq(iIndex).addClass("active").siblings().removeClass("active");
        }

        function initLayout() {
            var length = sections.length,
                width = (length * 100) + "%",
                cellWidth = (100 / length).toFixed(2) + "%";
            console.log(cellWidth)
            container.width(width).addClass("left");
            sections.width(cellWidth).addClass("left");

        }

        function isSuportCss(prop) {
            var div = document.createElement('div'),
                vendors = 'Webkit Moz O ms'.split(' '),
                len = vendors.length;

            var dstyle = div.style;
            if (prop in dstyle) return true;
            prop = prop.replace(/^[a-z]/, function (val) {
                return val.toUpperCase();
            });
            while (len--) {
                if (vendors[len] + prop in dstyle) {
                    return true;
                }
            }
            return false;


            /*   var body = $("body")[0];
             for (var i = 0; i < body.style.length; i++) {

             if (property[i] in body.style) {
             return true;
             }
             }
             return false;*/
        }

        var resizeId;
        win.resize(function (){
            clearTimeout(resizeId);
            resizeId = setTimeout(function() {
                reBuild();
            }, 500);
        });

        function reBuild(){
            var currentHeight=win.height(),
                currentWidth=win.width();
            var element = arrElement[iIndex];
            var offsetTop = element.offset().top;
            if (opts.direction == "horizontal") {
                var offsetLeft = element.offset().left;
                if (Math.abs(offsetLeft) > currentWidth / 2 && iIndex < (arrElement.length - 1)) {
                    iIndex ++;
                }
            }else {
                var offsetTop = element.offset().top;
                if (Math.abs(offsetTop) > currentHeight /2 && iIndex < (arrElement.length - 1) ){
                    iIndex ++;
                }
            }
            if (iIndex) {
                paginationHandler();
                var currentElement = arrElement[iIndex];
                var dest = currentElement.position();
                initEffects(dest, currentElement);
            }
        }
        return this.each(function (i, item) {
            /*��ҳ��ʾ*/
            if (opts.pagination) {
                initPagination();
            }
            if (opts.direction == 'horizontal') {
                initLayout();
            }
        })
    }


})(jQuery);

