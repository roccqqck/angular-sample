// 下拉式選單增加搜尋功能
var Defaults = $.fn.select2.amd.require('select2/defaults');
$.extend(Defaults.defaults, {
    searchInputPlaceholder: ''
});
var SearchDropdown = $.fn.select2.amd.require('select2/dropdown/search'),
    _renderSearchDropdown = SearchDropdown.prototype.render;
    SearchDropdown.prototype.render = function(decorated) {
        // invoke parent method
        var $rendered = _renderSearchDropdown.apply(this, Array.prototype.slice.apply(arguments));
        this.$search.attr('placeholder', this.options.get('searchInputPlaceholder'));
        return $rendered;
    };
$("select.select2").select2({
    searchInputPlaceholder: '請輸入關鍵字'
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