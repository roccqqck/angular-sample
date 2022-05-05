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
