var $modal  = $(".modal");

// switch 開關
$(".switchState .switch").on('click', function(){
    if($(this).find('input:checked').val()){
        $(".enabled").text('啟用');
    }else {
        $(".enabled").text('未啟用');
    }
});
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