$(document).ready(function(){
	$("#navsearchAgain").click(function(){

	})
})
$(document).ready(function(){
	$(".level1 > a").click(function(){
		$(this).addClass("current")   //给当前元素添加current样式
    .next().show()   //下一个元素显示
    .parent().siblings().children("a").removeClass("current")
    .next().hide();
    return false;
	});
});