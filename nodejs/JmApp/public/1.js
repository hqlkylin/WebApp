
$('.bomb_btn9').off().click(function(){
    var code=$('#code').val();

    if(code !== null&& code !== undefined && code !== ''){
        var re = /^\d{4}$/;//判断正整数
        if (re.test(code))
        {
            $.ajax({
                type:"post",
                url:"/event/eventAction!ajaxCheckCode.html",
                data:"code="+code+"&time"+new Date().getTime(),
                dataType:"json",
                beforeSend:function(){
                    $('#message').html('正在验证,请稍后！');
                },
                success:function(data){
                    if(data.flag){
                        $('#message').html('');
                        $(".bomb_box").hide();
                        $(".tan-bg").hide();
                        $('#codeHidden').val(code);
                        var apid = $("#activityProductId").val();
                        $.ajax({
                            url: "/order/orderAction!asysInspect.action",
                            data: "data="+new Date()+"&apid="+apid,
                            type: "get",
                            dataType:"json",
                            success: function(data){
                                if(!data.falg){
                                    alert(data.massge);
                                    return;
                                }else{
                                     setTimeout(function () {
                                         $('#form').submit();
                                     },15000)

                                    $("#qianggoudiv").html("订单生成中，请等待〉〉〉〉〉");
                                }
                            }
                        });
                    }else{
                        $('#message').html('验证码不正确！');
                    }
                },
                error:function(){
                    $('#message').html('后台异常请重新提交！');
                }
            });
        }else{
            $('#message').html('验证码为4位数字！');
        }
    }else{
        $('#message').html('请输入验证码！');
    }
});