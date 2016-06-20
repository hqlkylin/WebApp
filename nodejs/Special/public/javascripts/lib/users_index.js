$(function () {
//        初始化时间插件
    $("input[type='datetime']").datetimepicker({
        format: "yyyy-mm-dd hh:ii:ss",
        autoclose: true,
        todayBtn: true,
        pickerPosition: "bottom-left",
        language: 'zh-CN'
    });


    /*修改*/
    $("#editBtn").on("click", function () {
        $("#form1").attr("action", "/users/edit");
        var row = $table.bootstrapTable('getSelections');
        if (row.length != 1) {
            $.messager.popup("请选择一行");
            return;
        }
        //获取数据
        $.ajax({
            url: '/users/edit',
            data: {_id: row[0]._id},
            dataType: 'json',
            type: 'get',
            success: function (data) {
                ///刷新当前table
                if (data) {
                    $("input[name='name']", $("#form1")).val(data.name);
                    $("input[name='addTime']", $("#form1")).val(new Date(data.addTime).format("yyyy-MM-dd hh:mm:ss"));

                    $("input[name='address']", $("#form1")).val(data.address);
                    $("input[name='ip']", $("#form1")).val(data.ip);
                    $("input[name='tel']", $("#form1")).val(data.tel);
                    $("input[name='money']", $("#form1")).val(data.money);
                    $("input[name='activity']", $("#form1")).val(data.activity.name);
                    $("input[name='_id']", $("#form1")).val(data._id);

                    $("input[name='state']", $("#form1")).each(function (index, item) {
                        $(item).val() == data.state ? $(item).attr("checked", "true") : $(item).removeAttr("checked");
                    });
                    //打开模态框
                    $('#myModal').modal('show');
                } else {
                    $(".alert-danger").stop(true, true).fadeIn().find(".msg").html('发生异常，请联系管理员').end().delay(3000).fadeOut();
                    return;
                }
            }
        })


    });
    /*删除*/
    $("#delBtn").on("click", function () {

        var row = $table.bootstrapTable('getSelections');
        if (row.length < 1) {
            $.messager.popup("请选择一行");
            return;
        }
        var arr = [];
        // 获取所有选中项
        $.each(row, function (index, obj) {
          arr.push(obj._id);
        });

        $.messager.confirm("删除提示", "确定要删除当前选中项吗？", function () {
            //删除数据
            $.ajax({
                url: '/users/del',
                data: {_id: arr},
                dataType: 'json',
                type: 'post',
                success: function (data) {
                    if (data.success) {
                        //提示框
                        $(".alert-success").stop(true, true).fadeIn().find(".msg").html(data.msg).end().delay(3000).fadeOut();
                        $table.bootstrapTable('refresh');
                    } else {
                        $(".alert-danger").stop(true, true).fadeIn().find(".msg").html(data.msg).end().delay(3000).fadeOut();
                    }
                }
            });
        });


    });
    $("#saveUpdate").click(function () {
        // 表单验证
        if (!$("#form1")[0].checkValidity()) {
            return;
        }
        $.ajax({
            url: $("#form1").attr("action"),
            data: $("#form1").serialize(),
            dataType: 'json',
            type: 'post',
            success: function (data) {
                ///刷新当前table
                if (data.success) {
                    $table.bootstrapTable('refresh');
                    //隐藏模态框
                    $('#myModal').modal("hide");
                    //提示框
                    $(".alert-success").stop(true, true).fadeIn().find(".msg").html(data.msg).end().delay(3000).fadeOut();
                    // 清空表单
                    $("#form1")[0].reset();
                } else {
                    //提示错误
                    $(".alert-danger").stop(true, true).fadeIn().find(".msg").html(data.msg).end().delay(3000).fadeOut();
                }
            }
        })
        return false;
    });

    //初始化分页
    var $table = $('#table1').bootstrapTable({
        method: 'get',
        url: 'users/data',
        cache: false,
        height: 600,
        striped: false,
        pagination: true,
        sidePagination: 'server',
        pageList: [2, 3, 4, 5],
        showColumns: true,
        showRefresh: true,
        minimumCountColumns: 2,
        pageSize: 5,
        clickToSelect: true,

        columns: [
            {checkbox: true},
            /*{
             field: '_id',
             title: '系统编号',
             align: 'right',
             valign: 'bottom'
             },*/ {
                field: 'name',
                title: '姓名',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'ip',
                title: 'ip地址',
                align: 'left',
                valign: 'top'
            }, {
                field: 'tel',
                title: '电话',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'addTime',
                title: '报名时间',
                align: 'left',
                valign: 'top',
                formatter: function (value) {
                    return new Date(value).format("yyyy-MM-dd hh:mm:ss");
                }
            }, {
                field: 'state',
                title: '状态',
                align: 'center',
                valign: 'middle'
            }
            , {
                field: 'address',
                title: '地址',
                align: 'center',
                valign: 'middle'
            }
        ]
    });

    //点击查询数据
    $("#searchBtn").click(function () {
        $('#table1').bootstrapTable('refresh', {
            url: 'users/data?' + $('#searchForm').serialize()
        });
    });

})