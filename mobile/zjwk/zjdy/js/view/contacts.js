/**
 * Created by 麒麟 on 2016/3/30.
 */
var jsonData = {
    allCount: 15,
    level_1: {
        count: 30,
        list: [
            {name: "俊哥", levelName: "铜牌会员", number: 2, imgUrl: "img/temp/ad1.gif"},
            {name: "a哥", levelName: "金牌会员", number: 3, imgUrl: "img/temp/1.jpg"},
            {name: "b哥", levelName: "铜牌会员", number: 4, imgUrl: "img/temp/2.jpg"},
            {name: "c哥", levelName: "银牌会员", number: 5, imgUrl: "img/temp/users.png"},
            {name: "e哥", levelName: "银牌会员", number: 6, imgUrl: "img/temp/ad1.gif"},
            {name: "俊哥", levelName: "铜牌会员", number: 2, imgUrl: "img/temp/ad1.gif"},
            {name: "a哥", levelName: "金牌会员", number: 3, imgUrl: "img/temp/1.jpg"},
            {name: "b哥", levelName: "铜牌会员", number: 4, imgUrl: "img/temp/2.jpg"},
            {name: "c哥", levelName: "银牌会员", number: 5, imgUrl: "img/temp/users.png"},
            {name: "e哥", levelName: "银牌会员", number: 6, imgUrl: "img/temp/ad1.gif"}

        ]
    },
    level_2: {
        count: 15,
        list: [
            {name: "俊哥", levelName: "铜牌会员", number: 2, imgUrl: "img/temp/ad1.gif"},
            {name: "e哥", levelName: "银牌会员", number: 6, imgUrl: "img/temp/ad1.gif"},
            {name: "a哥", levelName: "金牌会员", number: 3, imgUrl: "img/temp/1.jpg"},
            {name: "c哥", levelName: "银牌会员", number: 5, imgUrl: "img/temp/users.png"},
            {name: "e哥", levelName: "银牌会员", number: 6, imgUrl: "img/temp/ad1.gif"},
            {name: "a哥", levelName: "金牌会员", number: 3, imgUrl: "img/temp/1.jpg"},
            {name: "俊哥", levelName: "铜牌会员", number: 2, imgUrl: "img/temp/ad1.gif"},
            {name: "e哥", levelName: "银牌会员", number: 6, imgUrl: "img/temp/ad1.gif"},
            {name: "a哥", levelName: "金牌会员", number: 3, imgUrl: "img/temp/1.jpg"},
            {name: "c哥", levelName: "银牌会员", number: 5, imgUrl: "img/temp/users.png"}
        ]
    },
    level_3: {
        count: 12,
        list: [
            {name: "俊哥", levelName: "铜牌会员", number: 2, imgUrl: "img/temp/ad1.gif"},
            {name: "e哥", levelName: "银牌会员", number: 6, imgUrl: "img/temp/ad1.gif"}
        ]
    }
};

var vm = new Vue({
    el: ".page",
    data: {
        pageSize: 10,
        pageIndex1: 1,
        pageIndex2: 1,
        pageIndex3: 1,

        jsonData: {
            allCount: 0,
            level_1: {
                count: 0,
                list: []
            },
            level_2: {
                count: 0,
                list: []
            },
            level_3: {
                count: 0,
                list: []
            }
        }
    },
    created: function () {
        var _this = this;
        var showMsg = $.showMsg("加载数据中…");
        /*初始化数据*/
        $.ajax({
            url: ""
        }).done(function () {
            /*模拟取数据*/
            setTimeout(function () {
                showMsg.hide();
                _this.jsonData = jsonData;
                $(".tab-title").eq(0).trigger("tap");
            }, 2000)
        });

    },
    methods: {
        getData: function (type) {
            var _this = this;
            var showMsg = $.showMsg("加载数据中…");
            this["pageIndex" + type.substring(type.length - 1)]++;


            var data = {
                pageSize: this.pageSize,
                type: type, /*类型：level_1、level_2、level_3*/
                pageIndex: this["pageIndex" + type.substring(type.length - 1)] /*页码*/
            };

            $.ajax({
                url: "",
                data: data
            }).done(function () {
                /*模拟取数据*/
                setTimeout(function () {
                    _this.jsonData[type].list.push(
                        {name: "c哥", levelName: "银牌会员", number: 5, imgUrl: "img/temp/users.png"},
                        {name: "a哥", levelName: "金牌会员", number: 3, imgUrl: "img/temp/1.jpg"},
                        {name: "b哥", levelName: "铜牌会员", number: 4, imgUrl: "img/temp/2.jpg"},
                        {name: "c哥", levelName: "银牌会员", number: 5, imgUrl: "img/temp/users.png"},
                        {name: "e哥", levelName: "银牌会员", number: 6, imgUrl: "img/temp/ad1.gif"});
                    showMsg.hide();
                }, 1000)
            });


        }
    },
    /*计算属性*/
    computed: {

        showPage1: function () {
            return this.jsonData.level_1.count > this.jsonData.level_1.list.length;
        },
        showPage2: function () {
            return this.jsonData.level_2.count > this.jsonData.level_2.list.length;
        },
        showPage3: function () {
            return this.jsonData.level_3.count > this.jsonData.level_3.list.length;
        }
    },
    /*监听变量*/
    watch: {}
});

$(".tab-title").on("tap", function () {
    $(this).closest(".tab").addClass("active").siblings().removeClass("active");
})
$(".tab-content").height($(window).height() - 52 * 4);

new xScroll({el: "#scroll_1"});
new xScroll({el: "#scroll_2"});
new xScroll({el: "#scroll_3"});
