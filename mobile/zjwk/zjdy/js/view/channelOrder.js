/**
 * Created by hanqilin on 16/4/25.
 */
//模拟数据
var jsonData = {
    "resultList": [
        {
            "orderItem": [
                {
                    "image": "../../../kylin/ac/s2.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "[新品上市]大核桃点桃仁200g"
                },
                {
                    "image": "../../../kylin/ac/s3.jpg",
                    "price": 1.01,
                    "qty": 2,
                    "productName": "测试订单推广"
                }
            ],
            "tranTimeFormat": "2016-03-25",
            "total_price": 0.01,
            "orderNumber": "20160425131407498213"
        },
        {
            "orderItem": [
                {
                    "image": "../../../kylin/ac/s4.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广"
                }
            ],
            "tranTimeFormat": "2016-02-24",
            "total_price": 10.01,
            "orderNumber": "20160421231407498212"
        },
        {
            "Row_Id": "749cb99c755c4df58a0737b9e5e92071",
            "orderItem": [
                {
                    "image": "../../../kylin/ac/s5.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                },
                {
                    "image": "../../../kylin/ac/s6.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                },
                {
                    "image": "../../../kylin/ac/s7.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                },
                {
                    "image": "../../../kylin/ac/s8.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                }
            ],
            "tranTimeFormat": "2016-03-25",
            "total_price": 11.01,
            "orderNumber": "204212314074d98214"
        },
        {
            "Row_Id": "749cb99c755c4df58a0737b9e5e92071",
            "orderItem": [
                {
                    "image": "../../../kylin/ac/s9.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广"
                }
            ],
            "tranTimeFormat": "2016-02-24",
            "total_price": 10.01,
            "orderNumber": "20160421231407498212"
        },
        {
            "Row_Id": "749cb99c755c4df58a0737b9e5e92071",
            "orderItem": [
                {
                    "image": "../../../kylin/ac/s10.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                },
                {
                    "image": "../../../kylin/ac/s11.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                },
                {
                    "image": "../../../kylin/ac/s12.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                },
                {
                    "image": "../../../kylin/ac/s13.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                }
            ],
            "tranTimeFormat": "2016-03-25",
            "total_price": 11.01,
            "orderNumber": "204212314074d98214"
        },
        {
            "Row_Id": "749cb99c755c4df58a0737b9e5e92071",
            "orderItem": [
                {
                    "image": "../../../kylin/ac/s14.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "[新品上市]大核桃点桃仁200g"
                },
                {
                    "image": "../../../kylin/ac/s15.jpg",
                    "price": 1.01,
                    "qty": 2,
                    "productName": "测试订单推广"
                }
            ],
            "tranTimeFormat": "2016-03-25",
            "total_price": 0.01,
            "orderNumber": "20160425131407498213"
        }
    ],
    "rowsCount": 20
}
var jsonData1 = {
    "data": [],
    "counts": 0
}
var vm = new Vue({
    el: ".page",
    data: {
        items: [],
        loading: false,
        pageSize: 5,
        counts: 1
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
                    startSize: _this.items.length,
                    pageSize: _this.pageSize,
                    userId: userId
                }
            }).done(function (data) {
                $.each(jsonData.resultList, function () {
                    _this.items.push(this);
                });
                _this.counts = jsonData.rowsCount;
                if (_this.items.length >= _this.counts) {
                    $(".weui-infinite-scroll").hide();
                    $(".text").show();
                    return;
                }
                _this.loading = false;
            })
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
