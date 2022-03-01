var $WizardIndex = 0;

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