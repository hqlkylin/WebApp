/**
 * Created by hanqilin on 16/4/11.
 */

var jsonData = {
    list1: {
        imgUrl: "img/temp/2.jpg",
        name: "靠胖",
        point: "821",
        top: "21",
        tag: "积分数",
        data: [

            {imgUrl: "img/temp/1.jpg", name: "haha", number: "23"},
            {imgUrl: "img/temp/ad1.gif", name: "hehe", number: "21"},
            {imgUrl: "img/temp/ad1.gif", name: "hehe", number: "21"},
            {imgUrl: "img/temp/1.jpg", name: "haha", number: "23"},
            {imgUrl: "img/temp/ad1.gif", name: "hehe", number: "21"},
            {imgUrl: "img/temp/ad1.gif", name: "hehe", number: "21"},
            {imgUrl: "img/temp/1.jpg", name: "haha", number: "23"},
            {imgUrl: "img/temp/ad1.gif", name: "hehe", number: "21"},
            {imgUrl: "img/temp/ad1.gif", name: "hehe", number: "21"},
            {imgUrl: "img/temp/ad1.gif", name: "hehe", number: "21"}
        ],
        pageCount: 12
    },
    list2: {
        imgUrl: "img/temp/2.jpg",
        name: "66666",
        point: "66",
        top: "666",
        tag: "关注数",
        data: [
            {imgUrl: "img/temp/1.jpg", name: "haha", number: "66"},
            {imgUrl: "img/temp/1.jpg", name: "haha", number: "66"},
            {imgUrl: "img/temp/1.jpg", name: "haha", number: "66"},
            {imgUrl: "img/temp/1.jpg", name: "haha", number: "66"},
            {imgUrl: "img/temp/1.jpg", name: "haha", number: "66"},
            {imgUrl: "img/temp/1.jpg", name: "haha", number: "66"},
            {imgUrl: "img/temp/1.jpg", name: "haha", number: "66"},
            {imgUrl: "img/temp/1.jpg", name: "haha", number: "66"},
            {imgUrl: "img/temp/ad1.gif", name: "hehe", number: "66"}
        ],
        pageCount: 15
    }
}

var vm = new Vue({
    el: ".page",
    data: {
        list1: {
            imgUrl: "",
            name: "",
            point: "",
            top: "",
            data: []
        },
        list2: {
            imgUrl: "",
            name: "",
            point: "",
            top: "",
            data: []
        },
        current: {},
        loading: false,
        pageSize: 10
    },
    created: function () {
        this.tab("list1");
        $(document.body).infinite().on("infinite", function () {
            if (vm.loading) return;
            vm.loading = true;
            if (vm.current.data.length >= vm.current.pageCount) {
                $(".weui-infinite-scroll").hide();
                $(".text").show();
                vm.loading = false;
                return;
            }
            $(".text").hide();
            $(".weui-infinite-scroll").show();

            setTimeout(function () {
                vm.getData(vm.dataListStatus);
            }, 1500)

        });

    },
    methods: {
        tab: function (tag) {
            if (this.loading) return;
            var $dom = $("." + tag);
            $(".text").hide();
            $(".weui-infinite-scroll").show();
            var flag = $dom.data("initData");
            if (flag == undefined) {
                $dom.data("initData", "true");
                this.initData(tag);
            } else {
                this.current = this[tag];
                if (this.current.data.length >= this.current.pageCount) {
                    $(".weui-infinite-scroll").hide();
                    $(".text").show();
                }
            }
            $dom.addClass("active").siblings().removeClass("active");
            var index = $(".navBox li").index($dom);

        },
        getData: function (type) {
            $.ajax({
                url: '',
                data: {
                    type: type,
                    startCount: vm.current.data.length,
                    pageSize: vm.pageSize
                }
            }).done(function () {
                vm[type].data.push(
                    {imgUrl: "img/temp/1.jpg", name: "haha", number: "23"},
                    {imgUrl: "img/temp/ad1.gif", name: "hehe", number: "21"}
                )
                vm.loading = false;
            })
        },
        initData: function (type) {
            var _this = this;
            var tip = $.showMsg();
            $.ajax({
                url: '',
                data: {
                    type: type,
                    pageSize:_this.pageSize
                }
            }).done(function (Data) {
                _this[type] = _this.current = jsonData[type];
                _this.loading = false;
                _this.current = _this[type];
                if (_this.current.data.length >= _this.current.pageCount) {
                    $(".weui-infinite-scroll").hide();
                    $(".text").show();
                }
                tip.hide();
            })

        }
    },
    computed: {
        dataListStatus: function () {
            return this.current.tag == "积分数" ? "list1" : "list2"
        }
    }
})