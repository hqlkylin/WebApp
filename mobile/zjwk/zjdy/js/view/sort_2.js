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
            {imgUrl: "img/temp/ad1.gif", name: "hehe", number: "21"}
        ],
        pageCount: 4
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
            {imgUrl: "img/temp/ad1.gif", name: "hehe", number: "66"}
        ],
        pageCount: 5
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

        this.list1 = this.current = jsonData.list1;
        this.list2 = jsonData.list2;

        //$(".weui-infinite-scroll").hide();
        //$(".text").hide();

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
                vm.getData(vm.current.tag == "积分数" ? "list1" : "list2");
            }, 1500)

        });

    },
    methods: {
        tab: function (tag, event) {
            $(event.target).addClass("active").siblings().removeClass("active");
            var index = $(".navBox li").index(event.target);
            $(".content .tab").eq(index).addClass("active").siblings().removeClass("active");
            this.current = vm.$data[tag];

            if (vm.current.data.length >= vm.current.pageCount) {
                $(".weui-infinite-scroll").hide();
                $(".text").show();
            }
        },
        getData: function (type) {
            $.ajax({
                url: '',
                data: {
                    type: type,
                    startCount: vm.startCount,
                    pageSize: vm.pageSize
                }
            }).done(function () {
                vm.$data[type].data.push(
                    {imgUrl: "img/temp/1.jpg", name: "haha", number: "23"},
                    {imgUrl: "img/temp/ad1.gif", name: "hehe", number: "21"}
                )
                vm.loading = false;
            })
        },
        initData: function (type) {

        }
    },
    computed: {}
})