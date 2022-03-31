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
