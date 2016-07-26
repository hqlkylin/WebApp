/**
 * Created by hanqilin on 16/7/22.
 */
/**
 * 代言排行榜.
 */
var vm = new Vue({
    el: ".page",
    data: {
        list: {
            headImg: "",
            nickName: "",
            amtTotal: "",
            rankTotal: "",
            data: []
        },
        loading: false,
        pageSize: 10
    },
    created: function () {
        this.getData();
        $(document.body).infinite().on("infinite", function () {
            if (vm.loading) return;
            vm.loading = true;
            if (vm.list.data.length >= vm.list.data.pageCount) {
                return;
            }
            setTimeout(function () {
                vm.getData();
            }, 1500)

        });

    },
    methods: {
        getData: function (type) {
            var _this = this;
            $.ajax({
                url: $.baseUrl + '/zjind/rankList',
                data: {
                    rankFlag: type,
                    startSize: _this.list.data.length,
                    pageSize: _this.pageSize
                }
            }).done(function (Data) {
                $.each(Data.data, function () {
                    _this.list.data.push(this)
                });
                vm.loading = false;
            })
        }
    }
})
