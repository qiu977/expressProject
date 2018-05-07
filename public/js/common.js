//弹出框的初始化
$("#yonganli").popover();
//图片轮播的设置
$("#mycarousel").carousel({
	interval:2000
})

//注册按钮添加active类，登陆按钮移除active类
$("#regbtn").on("click",function(){
	$(".nav.nav-tabs  li:first-child").removeClass("active");
	$(".nav.nav-tabs li:last-child").addClass("active");
})

$("#loginbtn").on("click",function(){
	$(".nav.nav-tabs  li:last-child").removeClass("active");
	$(".nav.nav-tabs li:first-child").addClass("active");
})




