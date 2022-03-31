// 面板收合
$(".collapseTitle").click( function(e) { 
    $(this).parent().toggleClass('active');
});
// 面板全螢幕
$(".fullscreen a").click( function(e) { 
    $(this).parent().parent().toggleClass('active');
});
// 關閉面板
$(".deletePanels a").click( function(e) { 
    $(this).parent().parent().remove();
});
// 面板交易收合
$(".detailUp").click( function(e) { 
    $(this).toggleClass('active');
    $(".detailContnet").toggleClass('active');
});