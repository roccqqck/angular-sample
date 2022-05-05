var $htmlbody = $("html,body"),
    $modal  = $(".modal"),
    $WizardIndex = 0;

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

// 頁籤元件
$(".secondTabs li , .subTabs li").click( function() {
    var index = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    $('.tabContent .tabPane').eq(index).addClass('active').siblings().removeClass('active');
});

// switch 開關
$(".switchState .switch").on('click', function(){
    if($(this).find('input:checked').val()){
        $(".enabled").text('啟用');
    }else {
        $(".enabled").text('未啟用');
    }
});

// 下拉式選單增加搜尋功能，並給予中文備註
$("select.select2").select2({
    language: {
      noResults: function (params) {
        return "查無資料";
      }
    }
  }
).one('select2:open', function(e) {
    $('input.select2-search__field').prop('placeholder', '請輸入關鍵字');
});

// 遮蔽金額
$(".available").click( function() {
    $(".sumCash").toggleClass("active");
});
// 遮蔽密碼
$(".iconSwitch").click( function() {
    $(this).toggleClass("active");
    var name = $(this).attr("data-name"),
        $input = $('.inputPwd input');
        $input.each(function(i, index){
        if($(this).attr('data-name') == name){
            if ($input.eq(i).attr("type") == "password") {
                $input.eq(i).attr("type", "text");
            } else {
                $input.eq(i).attr("type", "password");
            }
        }
    });
});

// 幣別換匯foucs偵測
$(".coinBlock input").focusin( function() { $(this).parent().parent().parent().addClass("active"); })
                                             .focusout( function() { $(this).parent().parent().parent().removeClass("active"); })

// 必填驗證
$(".inputRequire .inputBox").on('keyup', function() {
    var msg = $(this).parent();
    $(this).val() ? $(msg).removeClass('error') : $(msg).addClass('error');
});
// 勾選驗證
$(".checkAgree input").change(function() {
    var msg = $(this).parent();
    this.checked == true ? $(msg).removeClass('error') : $(msg).addClass('error');
});
// 密碼比對驗證
$(".pwd").on('keyup', function(_this) {
    var pwdTarget = "#" + _this.target.id + "check";
    var text = $(pwdTarget).val();
    var targetMsg = $(pwdTarget).parent();
    var msg = $(this).parent();
    $(this).val() == text ? $(targetMsg).removeClass('error') : $(targetMsg).addClass('error');
    $(this).val() == text ? $(msg).removeClass('error') : $(msg).addClass('error');
});
$(".verifypwd").on('keyup', function(_this) {
    var pwdTarget = "#" + _this.target.id.substr(0,this.id.length - 5);
    var text = $(pwdTarget).val();
    var targetMsg = $(pwdTarget).parent();
    var msg = $(this).parent();
    $(this).val() == text ? $(targetMsg).removeClass('error') : $(targetMsg).addClass('error');
    $(this).val() == text ? $(msg).removeClass('error') : $(msg).addClass('error');
});


// Email格式驗證
$(".inputEmail .inputBox").on('keyup', function() {
    var regExp = /^([\w\.\+]{1,})([^\W])(@)([\w]{1,})(\.[\w]{1,})+$/,
        msg = $(this).parent();
    regExp.test( $(this).val() ) ? $(msg).removeClass('error') : $(msg).addClass('error');
});
// 網址格式驗證
$('.inputUrl .inputBox').on('keyup', function() {
    var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/,
        msg = $(this).parent();
        objExp = new RegExp(Expression);
    objExp.test( $(this).val() ) ? $(msg).removeClass('error') : $(msg).addClass('error');
});
// 多選chechbox個數驗證
$('.checkMulti input[type="checkbox"]').click( function() {
    console.log($(this));
    checkboxlimit(this, 4,2);
});
function checkboxlimit(_this, max, min) {
    var len = $(".checkMulti input[type='checkbox']").filter(":checked").length;
    var max = max , 
        min = min ,
        msg = $(_this).parent().parent();
    if( len > max ){
        $(msg).addClass('error');
        if($(this).prop('checked')) {
            return false;
        }
    }else if (len < min){
        $(msg).addClass('error');
    }else{
        $(msg).removeClass('error');
    }
}
// 整數驗證
$(".integer input").on('keyup', function() {
    var arr = /^[0-9]*[1-9][0-9]*$/,
        num = $(this).val(),
        max = $(this).attr('data-max'),
        min = $(this).attr('data-min'),
        dataName = $(this).attr('data-name'),
        msg = $(this).parent();
        if (num.substr(0,1) == 0) {
            $(msg).addClass('error');
        } else if( $(this).attr('data-name') == dataName ) {
            if(arr.test(num)) {
                if( max == undefined || 0 || null && min == undefined || 0 || null )  {
                    $(msg).removeClass('error');
                }
            } else {
                $(msg).addClass('error');
            }
        }
});
// 大於數字驗證
$(".integerMax input").on('keyup', function() {
    var arr = /^[0-9]*[1-9][0-9]*$/,
        num = $(this).val(),
        max = parseInt($(this).attr('data-max')),
        dataName = $(this).attr('data-name'),
        msg = $(this).parent();

        if( $(this).val().substr(0,1) == 0 ){
            $(msg).addClass('error');
            $(msg).parent().parent().find('.fontwarn').text("※請輸入大於"+max+"的數值");
        } else if( $(this).attr('data-name') == dataName ) {
            if(arr.test(num)) {
                if( num < max ) {
                    $(msg).addClass('error');
                    $(msg).parent().parent().find('.fontwarn').text("※請輸入大於"+max+"的數值");
                } else {
                    $(msg).removeClass('error');
                }
            } else {
                $(msg).addClass('error');
                $(msg).parent().parent().find('.fontwarn').text("※應為數值");
            }         
        }
});
// 小於數字驗證
$(".integerMin input").on('keyup', function() {
    var arr = /^[0-9]*[1-9][0-9]*$/,
        num = $(this).val(),
        min = parseInt($(this).attr('data-min')),
        dataName = $(this).attr('data-name'),
        msg = $(this).parent();

        if( $(this).val().substr(0,1) == 0 ){
            $(msg).addClass('error');
            $(msg).parent().parent().find('.fontwarn').text("※請輸入小於"+min+"的數值");
        } else if($(this).attr('data-name') == dataName) {
            if(arr.test(num)) {
                if( num > min ) {
                    $(msg).addClass('error');
                    $(msg).parent().parent().find('.fontwarn').text("※請輸入小於"+min+"的數值");
                } else {
                    $(msg).removeClass('error');
                }
            } else {
                $(msg).addClass('error');
                $(msg).parent().parent().find('.fontwarn').text("※應為數值");
            }
        }
});
// 判斷區間數字驗證
$(".integerMid input").on('keyup', function() {
    var arr = /^[0-9]*[1-9][0-9]*$/,
        num = $(this).val(),
        max = $(this).attr('data-max'),
        min = $(this).attr('data-min'),
        dataName = $(this).attr('data-name'),
        msg = $(this).parent();

        if (num.substr(0,1) == 0) {
            $(msg).addClass('error');
            $(msg).parent().parent().find('.fontwarn').text("※請輸入介於"+min+"到"+max+"的數值");
        } else if($(this).attr('data-name') == dataName){
            if(arr.test(num)) {
                if( num > parseInt(min) && num <= parseInt(max) ) {
                    $(msg).removeClass('error');
                } else {
                    $(msg).addClass('error');
                    $(msg).parent().parent().find('.fontwarn').text("※請輸入介於"+min+"到"+max+"的數值");
                }
            } else {
                $(msg).addClass('error');
                $(msg).parent().parent().find('.fontwarn').text("※應為數值");
            }         
        }
});

// 精靈元件切換步驟
$("#wizardBtns button").on('click', function() {
    let clickBtn = $(this).attr('data-name'),
        max = $('#wizard .accContent').length - 1,
        $button =$('#wizardBtns button'),
        $title = $('#wizardTitle');
    if( clickBtn == 'prev' && $WizardIndex > 0) {
        $WizardIndex-- ;
    } else if( clickBtn == 'next' && $WizardIndex < max) {
        $WizardIndex++ ;
    } else {
        return;
    }
    switch($WizardIndex) {
        case 0 :
            $title.text('建立帳號');
            $button.eq(0).hide();  
            break;
        case 1 :
            $title.text('個人資料');
            $button.eq(0).show();  
            break;
        case 2 :
            $title.text('聯絡方式');
            $button.eq(1).text('下一步');  
            break;
        case 3 :
            $title.text('完成');  
            $(this).text('確認送出');  
            break;         
    }
    $('#wizard .progressCircle li').eq($WizardIndex).addClass('active').siblings().removeClass('active');
    $('#wizard .stepRt .accContent').eq($WizardIndex).addClass('active').siblings().removeClass('active');
});

// 單傳檔案
$(".file input").change( function() {
    var str = $(this).val().replace(/^.*[\\\/]/, '')
    $(this).parent().parent().parent().find('.fileBox').text(str);
});
// 多個檔案上傳
$('.multiFile input').on('change',function(e){
    console.log(e);
    var files = e.target.files;
    for (var i = 0; i < files.length; i++) {
        var fileName = files[i].name;
        $(".multiFile .fileList").append('<li> <span>'+ fileName+'</span><button class="closerFile" onclick="deleteFile(this); event.stopPropagation()"></button></li>');
    }	
});
// 多個檔案刪除
function deleteFile(_this) {
    _this.parentNode.remove(_this);
}
// 拖拉檔案
var previewNode = document.querySelector("#template");
    previewNode.id = "";
var previewTemplate = previewNode.parentNode.innerHTML;
    previewNode.parentNode.removeChild(previewNode);
var myDropzone = new Dropzone( document.body, {
    url: "/file/post",
    method: 'post',
    createImageThumbnails: false,
    parallelUploads: 20,
    previewTemplate: previewTemplate,
    autoQueue: false,
    previewsContainer: "#previews",
    clickable: ".fileBlock"
});
myDropzone.on("addedfile", function() {
    if(myDropzone.files.length > 0) {
        document.querySelector("#previews").style.display = 'inline-flex';
        document.querySelector("div.dargBtn").style.display = 'none';
    }
});
myDropzone.on("removedfile", function() {
    if(myDropzone.files.length == 0) {
        document.querySelector("#previews").style.display = 'none';
        document.querySelector("div.dargBtn").style.display = 'block';
    }
});


// 表格開合
$(".arrowBtn2 , .mobileShow .btnSmborder2 , .arrowBtnM button").click( function(){
    var onText = $(this).text();
    if($(this).hasClass('btnSmborder2') ){
        if ( onText == '展開更多' ){
            $(this).text('收合更多');
        } else {
            $(this).text('展開更多');
        }
    }
    $(this).parent().parent().toggleClass('active');
});

// 常見問題展開收合 
let qaHeight = [];
function getfaqConetnetHeight() {
    $(document).find('.faqList').each( function(index){
        let change = this.querySelector("div.faqContent");
        qaHeight[index] = this.querySelector("div.faqContent > div").offsetHeight;
        if($(this).hasClass('active')) {
            $(change).css('max-height', qaHeight[index]);
        } else {
            $(change).css('max-height', 0);
        }
    });
}
function showDetail(num, _this) {
    let parent = _this.parentElement;
    let change = parent.querySelector("div.faqContent");
    qaHeight[num] = parent.querySelector("div.faqContent > div").offsetHeight;

    $(parent).toggleClass('active');
    if($(parent).hasClass('active')) {
        $(change).css('max-height', qaHeight[num]);
    } else {
        $(change).css('max-height', 0);
    }
}
getfaqConetnetHeight();



