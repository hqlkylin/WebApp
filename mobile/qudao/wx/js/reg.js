
(function($, window) {
	var CLASS_ACTIVE = 'mui-active';
	/**
	 * 自动消失提示框
	 */
	$.toastError = function(message) {
		if ($.os.plus) {
			//默认显示在底部；
			$.plusReady(function() {
				plus.nativeUI.toast(message, {
					verticalAlign: 'bottom'
				});
			});
		} else {
			if(jQuery(".tipError")){
				jQuery(".tipError").remove();
			}
			var toast = document.createElement('div');
			//toast.classList.add('mui-toast-container');
			toast.classList.add('tipError');
			toast.innerHTML = '<div>' + message + '</div>';
			toast.addEventListener('webkitTransitionEnd', function() {
				if (!toast.classList.contains(CLASS_ACTIVE)) {
					toast.parentNode.removeChild(toast);
				}
			});
			document.body.appendChild(toast);
			toast.offsetHeight;
			toast.classList.add(CLASS_ACTIVE);
			setTimeout(function() {
				toast.classList.remove(CLASS_ACTIVE);
			}, 2000);
		}
	};

})(mui, window);


$(document).ready(function (){

	// 手机号码验证
	jQuery.validator.addMethod("isMobile", function(value, element) {
		var length = value.length;
		var mobile =/^1[3|4|5|7|8][0-9]{9}$/;
		return this.optional(element) || (length == 11 && mobile.test(value));
	}, "请输入手机号");

	//序列化form为json字符串
	$.fn.serializeObject = function(){
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};

	//校验
	$('#myform').validate({
		rules: {
			companyName : "required",
			userName : "required",
			publicId : "required",
			mobile: {
				required:true,
				isMobile:true
			},
		},
		onfocusout:false,
		onkeyup:false,
		onclick:false,
		errorPlacement: function(error, element) {

		},
		showErrors:function(errorMap,errorList) {
			if(errorList.length>0){
				mui.toastError(errorList[0].message);
			}
		},
		messages: {
			companyName : "请输入企业",
			userName :    "请输入姓名",
			publicId :    "异常，不允许注册",
			mobile : {
				required : "请输入手机号",
				isMobile : "请输入正确的手机号"
			}
		},
		submitHandler : function(form) {
			//校验通过进行注册
			$.ajax({
				url: getContentPath()+"/mnt/user",
				data:JSON.stringify($(form).serializeObject()),
				type:'post',
				dataType:'json',
				contentType: 'application/json; charset=utf-8',
				async:false,
				success:function(data){
					if (true == data){
						alert("恭喜您！注册成功");
						WeixinJSBridge.call('closeWindow');
					}else{
						alert("注册失败");
					}

				},
				error:function(){
					alert("系统繁忙")
				}
			})
		}
	});

	function getContentPath(){
		var contextPath = document.location.pathname;
		var index =contextPath.substr(1).indexOf("/");
		contextPath = contextPath.substr(0,index+1);
		return contextPath;
	}
}) ;
