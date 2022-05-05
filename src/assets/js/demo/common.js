var $htmlbody = $("html,body");

// 選單開合
$(".btnMenu").click( function(e) {  
    $htmlbody.toggleClass('on')
});
$(".menuToggle").click( function(e) {
    $(this).toggleClass('active');
    e.stopPropagation();
});
// 特殊元件開合
$(".selectFont").click( function(e) { 
    $(this).toggleClass('on');
});
// 文字字級設定
$("#selectFont ul").on('click', 'li', function() {
    var _this = $(this);
    $('#selectFont .text').text( _this.text() );
    $('#selectFont ul li').eq(_this.index()).addClass('active').siblings().removeClass('active');
    switch(_this.index()) {
        case 0 :
            $('html').css('font-size', '18px');
            break;
        case 1 :
            $('html').css('font-size', '16px');
            break;
        case 2 :
            $('html').css('font-size', '14px');
            break;
    }
})