var $modal  = $(".modal");

// 相對應的彈跳視窗 跟input月曆
$(".btnBox").click( function(e) { 
    var nameBox = $(this).attr('data-name');
    $htmlbody.css('overflow','hidden');
    $modal.each(function(i, index){
        if( $modal.eq(i).attr('data-name') == nameBox){
            $modal.eq(i).addClass('active');
        }
    });
});
// 彈跳視窗 按鈕關閉跟背景
$(".btnClose").click( function() {
    var nameBox = $(this).attr('data-name');
    $htmlbody.css('overflow','auto');
    $modal.each( function(i, index){
        if( $modal.eq(i).attr('data-name') == nameBox){
            $modal.eq(i).removeClass('active');
        }
    });
});
// 搜尋與選項裡面展開收合
$(".expendTitle").click( function(e) { 
    $(this).parent().toggleClass('active');
});
// 彈跳視窗-均分人數、請選擇帳號 按鈕關閉跟背景
$(".listPick li, .accList li").click( function() {
    var nameBox = $(this).parent().attr('data-name');
    $htmlbody.css('overflow','auto');
    $modal.each( function(i, index){
        if( $modal.eq(i).attr('data-name') == nameBox){
            $modal.eq(i).removeClass('active');
        }
    });
});
// 幣別換匯foucs偵測
$(".exchangeContent input").focusin( function() { $(this).parent().addClass("active"); })
                           .focusout( function() { $(this).parent().removeClass("active"); })

// 請選擇本金扣款帳號裡面頁籤切換
var $tab_on = $(".tabTitle a"),
    $tabContent= $(".tabContent");
    $tab_on.click( function(){
        var nm = $(this).index();
        $tabContent.eq(nm).addClass('active').siblings().removeClass('active');
        $(this).addClass('active').siblings().removeClass('active');
    });
// 請選擇本金扣款帳號裡面展開收合
$(".btnExplain").click( function(e) { 
    $(this).toggleClass('active');
});