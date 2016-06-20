$(function () {
//        初始化时间插件
    $("input[type='datetime']").datetimepicker({
        format: "yyyy-mm-dd hh:ii:ss",
        autoclose: true,
        todayBtn: true,
        pickerPosition: "bottom-left",
        language: 'zh-CN'
    });

    /*添加方法*/
    $("#addBtn").on("click", function () {
        $("#form1").attr("action","/activity/add").get(0).reset();
        $('#myModal').modal('show');
    });
    /*修改*/
    $("#editBtn").on("click", function () {
        $("#form1").attr("action","/activity/edit")
        var row = $table.bootstrapTable('getSelections');
        if (row == false) {
            $(".alert-warning").stop(true, true).fadeIn().find(".msg").html('请选中一行').end().delay(3000).fadeOut();
            return;
        }
        //获取数据
        $.ajax({
            url: '/activity/edit',
            data: {_id: row[0]._id},
            dataType: 'json',
            type: 'get',
            success: function (data) {
                ///刷新当前table
                if (data) {
                    $("input[name='name']", $("#form1")).val(data.name);
                    $("input[name='startDate']", $("#form1")).val(new Date(data.startDate).format("yyyy-MM-dd hh:mm:ss"));
                    $("input[name='endDate']", $("#form1")).val(new Date(data.endDate).format("yyyy-MM-dd hh:mm:ss"));
                    $("select[name='market']", $("#form1")).val(data.market);
                    $("textarea[name='messageTemplate']", $("#form1")).val(data.messageTemplate);
                    $("input[name='clickCount']", $("#form1")).val(data.clickCount);
                    $("input[name='limitForm']", $("#form1")).val(data.limitForm);
                    $("input[name='_id']", $("#form1")).val(data._id);
                    $("input[name='state']", $("#form1")).each(function(index,item){
                        $(item).val()==data.state?$(item).attr("checked","true"):$(item).removeAttr("checked");
                     });

                    //打开模态框
                    $('#myModal').modal('show');
                }else{

                    $(".alert-danger").stop(true, true).fadeIn().find(".msg").html('发生异常，请联系管理员').end().delay(3000).fadeOut();
                    return;
                }
            }
        })


    });
    /*删除*/
    $("#delBtn").on("click", function () {

        var row = $table.bootstrapTable('getSelections');
        if (row == false) {
            $.messager.popup("请选择一行");
            return;
        }
        $.messager.confirm("删除提示", "确定要删除当前选中项吗？", function() {
            //删除数据
            $.ajax({
                url: '/activity/del',
                data: {_id: row[0]._id},
                dataType: 'json',
                type: 'post',
                success: function (data) {
                    if(data.success){
                        //提示框
                        $(".alert-success").stop(true, true).fadeIn().find(".msg").html(data.msg).end().delay(3000).fadeOut();
                        $table.bootstrapTable('refresh');
                    }else{
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
            url:$("#form1").attr("action"),
            data: $("#form1").serialize(),
            dataType: 'json',
            type: 'post',
            success: function (data) {
                ///刷新当前table
                if (data.success) {
                    $('#table1').bootstrapTable('refresh', {
                        url: 'activity/data'
                    });
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

    /*数据导出*/
    $("#excelBtn").on("click", function () {

        var row = $table.bootstrapTable('getSelections');
        if (row == false) {
            $.messager.popup("请选择一行");
            return;
        }
        $.messager.confirm("导出提示", "确定要输出当前选中项吗？", function() {
            window.location.href= '/activity/excel?_id='+row[0]._id
        });



    });
    //初始化分页
    var $table = $('#table1').bootstrapTable({
        method: 'get',
        url: 'activity/data',
        cache: false,
        height: 600,
        striped: false,
        pagination: true,
        sidePagination: 'server',
        pageList: [ 10, 15, 20, 25],
        // search: true,
//            queryParams: function (params) {
//                return {
//
//                    limit: params.limit,
//
//                    offset: params.offset,
//
//                    name: $("#name").val(),
//
//                    startDate: $("#startdate").val(),
//
//                    order: params.order
//
//                };
//            },
        showColumns: true,
        showRefresh: true,
        minimumCountColumns: 2,
        pageSize: 10,
        clickToSelect: true,
        singleSelect: true,
        columns: [
            {},
            {
                field: '_id',
                title: '系统编号',
                align: 'right',
                valign: 'bottom'
            },
            {
                field: 'name',
                title: '活动名称',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'market',
                title: '市场',
                align: 'left',
                valign: 'top'
            }, {
                field: 'clickCount',
                title: '点击率',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'startDate',
                title: '活动开始时间',
                align: 'left',
                valign: 'top',
                formatter: function (value) {
                    return new Date(value).format("yyyy-MM-dd hh:mm:ss");
                }
            }, {
                field: 'endDate',
                title: '活动结束时间',
                align: 'left',
                valign: 'top',
                formatter: function (value) {
                    return new Date(value).format("yyyy-MM-dd hh:mm:ss");
                }
            }
        ]
    });

    //点击查询数据
    $("#searchBtn").click(function () {
        $('#table1').bootstrapTable('refresh', {
            url: 'activity/data?' + $('#searchForm').serialize()
        });
    });

    /*批量导入*/
    $("#batceBtn").on("click", function () {
        var row = $table.bootstrapTable('getSelections');
        if (row == false) {
            $.messager.popup("请选择一行");
            return;
        }
        $('#batceModal').modal('show');
    });

    $('#file_upload').click(function () {
        var data = new FormData();
        var files = $('#file')[0].files;
        if (files) {
            data.append('excel', files[0]);
            data.append("_id",$table.bootstrapTable('getSelections')[0]._id);
        }
        $.ajax({
            cache: false,
            type: 'post',
            dataType: 'json',
            url: 'activity/upload',
            data: data,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.success) {
                    //隐藏模态框
                    $('#batceModal').modal("hide");
                    $.messager.popup(data.msg);
                }else{
                    $.messager.popup(data.msg);
                }
            }
        });
    });

})