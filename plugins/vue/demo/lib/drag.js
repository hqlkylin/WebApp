/**
 * Created by 麒麟 on 2016/4/6.
 */

$("#sortable").sortable({
    items: "li:not(.ui-state-disabled)"
});
$("#sortable").disableSelection();

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
]
var vm = new Vue({
    el: ".page",
    data: {
        items: null
    },
    created: function () {
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
            this.items.$remove(item);
        },
        open: function (obj) {
            //页面层
            this.ly = layer.open({
                type: 1,
                skin: 'layui-layer-rim', //加上边框
                area: ['420px', '240px'], //宽高
                content: $('.layer_notice') //捕获的元素

            });

        },
        add: function () {
            layer.close(this.ly);

        }
    }

})
