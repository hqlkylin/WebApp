/**
 * 指尖人脉
 */

var imgSize = $(".bar-img").height();
$(".tab-content").height($(window).height() - 52 * 3 - imgSize);

/*
 * 过滤器 - 头像为空自动添加默认图片
 * */
Vue.filter('imgSrcDefault', function (value) {
    return value == "" ? $.baseUrl + "/image/defHead.jpg" : value;
})
Vue.filter('nameDefault', function (value) {
    return value == "" ? "未知" : value;
})
var vm = new Vue({
    el: ".page",
    data: {
        pageSize: 10,
        pageIndex1: 1,
        pageIndex2: 1,
        pageIndex3: 1,

        jsonData: {
            totalCount: 0,
            level_1: {
                childTotalCount: 0,
                list: []
            },
            level_2: {
                childTotalCount: 0,
                list: []
            },
            level_3: {
                childTotalCount: 0,
                list: []
            }
        }
    },
    created: function () {
        var _this = this;
        $.showLoading("加载数据中…");
        /*初始化数据*/
        $.ajax({
            //url: $.baseUrl + "/personal/connection/1/" + openId + "?currentPage=1&pageSize=10"
            url:""
        }).done(function (data) {
            $.hideLoading();
            data.data = {
                "data": {
                    "level_3": {"childTotalCount": 0},
                    "totalCount": 0,
                    "level_2": {"childTotalCount": 0},
                    "level_1": {"childTotalCount": 0}
                }
            }; /*模拟数据*/
            _this.jsonData = data.data;
            $(".tab-title").eq(0).trigger("click");
        });

    },
    methods: {
        getData: function (typeStr) {
            var _this = this;
            $.showLoading("加载数据中…");
            this["pageIndex" + typeStr.substring(typeStr.length - 1)]++;


            var data = {
                pageSize: this.pageSize,
                //type: type, /*类型：level_1、level_2、level_3*/
                currentPage: this["pageIndex" + typeStr.substring(typeStr.length - 1)] /*页码*/
            };
            var layer;
            if (typeStr == 'level_1') {
                layer = 1;
            } else if (typeStr == 'level_2') {
                layer = 2;
            } else {
                layer = 3;
            }
            $.ajax({
                url: $.baseUrl + "/personal/connection/1/" + layer + "/" + openId,
                data: data
            }).done(function (datas) {
                for (var i = 0; i < datas.length; i++) {
                    _this.jsonData[typeStr].list.push(
                        datas[i]
                    );
                }
                $.hideLoading();
            });


        }
    },
    /*计算属性*/
    computed: {

        showPage1: function () {
            return this.jsonData.level_1.childTotalCount > this.jsonData.level_1.list.length;
        },
        showPage2: function () {
            return this.jsonData.level_2.childTotalCount > this.jsonData.level_2.list.length;
        },
        showPage3: function () {
            return this.jsonData.level_3.childTotalCount > this.jsonData.level_3.list.length;
        }
    },
    /*监听变量*/
    watch: {}
});
$(".tab-title").on("click", function () {
    $(this).closest(".tab").addClass("active").siblings().removeClass("active");
})


new xScroll({el: "#scroll_1"});
new xScroll({el: "#scroll_2"});
new xScroll({el: "#scroll_3"});
