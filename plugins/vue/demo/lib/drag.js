/**
 * Created by 麒麟 on 2016/4/6.
 */

/*$(".ui-state-disabled").click(function () {
 var $this = $(this);
 var html = '<li class="ui-state-default">' + $("#sortable li").length + '<span>x</span></li>';
 var dom = $(html).insertBefore($this);
 dom.find("span").on("click", function () {
 $(this).parent().remove();
 })
 });*/
/* $(".ui-state-default span").click(function () {
 $(this).parent().remove();
 });*/

var jsonData = [
    {rowId: "1", title: "太空", imgUrl: "../../../img/1.jpg"},
    {rowId: "2", title: "猴子", imgUrl: "../../../img/1.png"},
    {rowId: "3", title: "老鹰", imgUrl: "../../../img/2.jpg"},
    {rowId: "4", title: "海贼王", imgUrl: "../../../img/3.jpg"},
    {rowId: "5", title: "酒店", imgUrl: "../../../kylin/ac/s1.png"},
    {rowId: "6", title: "龙头", imgUrl: "../../../kylin/ac/s2.jpg"}
];
var pushData = [
    {rowId: "1", title: "太空", imgUrl: "../../../img/1.jpg"},
    {rowId: "2", title: "猴子", imgUrl: "../../../img/1.png"},
    {rowId: "3", title: "老鹰", imgUrl: "../../../img/2.jpg"},
    {rowId: "4", title: "海贼王", imgUrl: "../../../img/3.jpg"},
    {rowId: "5", title: "酒店", imgUrl: "../../../kylin/ac/s1.png"},
    {rowId: "6", title: "龙头", imgUrl: "../../../kylin/ac/s2.jpg"},
    {rowId: "7", title: "音乐", imgUrl: "../../../kylin/ac/s9.jpg"},
    {rowId: "8", title: "写作", imgUrl: "../../../kylin/ac/s4.jpg"},
    {rowId: "9", title: "代码", imgUrl: "../../../kylin/ac/s10.jpg"},
    {rowId: "10", title: "旅行", imgUrl: "../../../kylin/ac/s6.jpg"},
    {rowId: "11", title: "美女", imgUrl: "../../../kylin/ac/s8.jpg"}
];
var vm = new Vue({
    el: ".page",
    data: {
        items: null,
        checkedNames: [],
        pushData: pushData
    },
    created: function () {

        $("#sortable").sortable({
            items: "li:not(.ui-state-disabled)",
            update: function (event, ui) {
                var current = ui.item.attr("id");
                var ids = $(this).sortable('toArray');
                console.log("当前移动的item:" + current);
                var index = $.inArray(current, ids);
                console.log("移动到原始数组的位置:" + index);
                vm.swap(current, index);
            }
        });
        $("#sortable").disableSelection();

        var _this = this;
        $.ajax({
            url: ""
        }).done(function () {
            _this.items = jsonData;
        })
    },
    methods: {
        /*删除*/
        del: function (item) {
            var delItem = this.items.$remove(item);
        },
        open: function (obj) {
            this.checkedNames = [];
            //页面层
            this.ly = layer.open({
                type: 1,
                skin: 'layui-layer-rim', //加上边框
                area: ['420px', '340px'], //宽高
                content: $('.layer_notice') //捕获的元素
            });

        },
        add: function () {
            layer.close(this.ly);
            $.each(this.checkedNames, function () {
                vm.items.push(pushData[this]);
            });
        },
        swap: function (index1, index2) {
            this.items[index1] = this.items.splice(index2, 1, this.items[index1])[0];
        }
    }

})
