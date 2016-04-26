/**
 * Created by hanqilin on 16/4/25.
 */
//模拟数据
var jsonData = {
    "data": [
        {
            "Row_Id": "749cb99c755c4df58a0737b9e5e92071",
            "items": [
                {
                    "imgUrl": "../../../kylin/ac/s2.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "[新品上市]大核桃点桃仁200g"
                },
                {
                    "imgUrl": "../../../kylin/ac/s3.jpg",
                    "price": 1.01,
                    "qty": 2,
                    "productName": "测试订单推广"
                }
            ],
            "status": "已完成le ",
            "total_price": 0.01,
            "order_no": "20160425131407498213"
        },
        {
            "Row_Id": "749cb99c755c4df58a0737b9e5e92071",
            "items": [
                {
                    "imgUrl": "../../../kylin/ac/s4.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广"
                }
            ],
            "status": "已完成",
            "total_price": 10.01,
            "order_no": "20160421231407498212"
        },
        {
            "Row_Id": "749cb99c755c4df58a0737b9e5e92071",
            "items": [
                {
                    "imgUrl": "../../../kylin/ac/s5.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                },
                {
                    "imgUrl": "../../../kylin/ac/s6.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                },
                {
                    "imgUrl": "../../../kylin/ac/s7.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                },
                {
                    "imgUrl": "../../../kylin/ac/s8.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                }
            ],
            "status": "已完成1",
            "total_price": 11.01,
            "order_no": "204212314074d98214"
        },
        {
            "Row_Id": "749cb99c755c4df58a0737b9e5e92071",
            "items": [
                {
                    "imgUrl": "../../../kylin/ac/s9.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广"
                }
            ],
            "status": "已完成",
            "total_price": 10.01,
            "order_no": "20160421231407498212"
        },
        {
            "Row_Id": "749cb99c755c4df58a0737b9e5e92071",
            "items": [
                {
                    "imgUrl": "../../../kylin/ac/s10.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                },
                {
                    "imgUrl": "../../../kylin/ac/s11.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                },
                {
                    "imgUrl": "../../../kylin/ac/s12.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                },
                {
                    "imgUrl": "../../../kylin/ac/s13.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                }
            ],
            "status": "已完成1",
            "total_price": 11.01,
            "order_no": "204212314074d98214"
        },
        {
            "Row_Id": "749cb99c755c4df58a0737b9e5e92071",
            "items": [
                {
                    "imgUrl": "../../../kylin/ac/s14.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "[新品上市]大核桃点桃仁200g"
                },
                {
                    "imgUrl": "../../../kylin/ac/s15.jpg",
                    "price": 1.01,
                    "qty": 2,
                    "productName": "测试订单推广"
                }
            ],
            "status": "已完成le ",
            "total_price": 0.01,
            "order_no": "20160425131407498213"
        }
    ],
    "counts": 20,
    "type": "0"
}
var vm = new Vue({
    el: ".page",
    data: {
        items: [],
        loading: false,
        pageSize: 5,
        counts: 1,
        type: "0"
    },
    created: function () {
        this.tip = $.showMsg();
        this.init();
        $(document.body).infinite().on("infinite", function () {
            if (vm.loading) return;
            vm.loading = true;
            if (vm.items.length >= vm.counts) {
                $(".weui-infinite-scroll").hide();
                $(".text").show();
                return;
            }
            setTimeout(function () {
                vm.getData();
            }, 1500)
        });
    },
    ready: function () {
        setTimeout(function () {
            vm.tip.hide();
        }, 10)
    },
    methods: {
        getData: function () {
            var _this = this;
            $.ajax({
                url: '',
                data: {
                   // type: _this.type,
                    startSize: _this.items.length,
                    pageSize: _this.pageSize,
                    userId: userId
                }
            }).done(function (data) {
                $.each(jsonData.data, function () {
                    _this.items.push(this);
                });
                _this.counts = jsonData.counts;
                _this.type = jsonData.type;
                if (_this.items.length >= _this.counts) {
                    $(".weui-infinite-scroll").hide();
                    $(".text").show();
                    return;
                }
                _this.loading = false;
            })
        },
        showAll: function () {
            var $dom = $(event.target);
            $dom.empty().closest(".weui_cell").nextAll(".weui_cell").show();
        },
        tab: function (type) {
            location.href = $.baseUrl + "/mobile/zjwk/zjdy/order.html?type=" + type;
        },
        init: function () {
            var type = $.getUrlParam('type');
            if (type != null) {
                this.type = type;
            }
            $(".navBox li").eq(this.type).addClass("active");
            this.getData();
        }
    },
    computed: {
        showData: function () {
            return this.counts > 0;
        }
    }
});
