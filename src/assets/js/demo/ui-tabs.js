// 頁籤元件
$(".secondTabs li , .subTabs li").click( function() {
    var index = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    $('.tabContent .tabPane').eq(index).addClass('active').siblings().removeClass('active');
});