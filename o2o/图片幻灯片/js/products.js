$(function(){
	///*****产品大图star*****/
	//$(".magnify").click(function(){
	//	$(".products-pop").show();
	//});
	/*关闭产品弹出层*/
	/*$(".products-pop .close,.return").click(function(){
		$(".products-pop").hide();
	});	*/
	/******产品所在店面信息弹出*****/
	var shop_info=$(".shop span");
	shop_info.mouseover(function(){
		$(this).css("z-index","1").find(".info").show();
	});
	shop_info.mouseout(function(){
		$(this).css("z-index","0").find(".info").hide();
	});
});
