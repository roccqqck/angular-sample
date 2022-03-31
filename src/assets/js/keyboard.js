/**
 * [動態鍵盤]
 * ver 1.0 , create 2016.09.04 , lastmodify 2016.09.04
 * jQuery use : YES
 * [搭配樣式]
 * keyboard.css
 * [如何使用]
 * mainObj : keyboard的主要名稱，如果沒有的話會於頁面自動產生
 * openObj : 動態鍵盤啟動按鈕，請於頁面建立
 * caplockFlag : 英文字母為大小寫,true大寫/false小寫 [預設false]
 * openFlag : 預設動態鍵盤開啟狀態,true開啟/false關閉 [預設false]
 * inputObj : 請設定要使用動態鍵盤的input,可為ID(#myinput),可為class(.inputBox),可為其他選單(#formObj input[type=text])
 * styleData : 動態鍵盤樣式調整
 * 		keyboard : 主要動態鍵盤樣式與位置設定
 * 		keyboard_word : 鍵盤文字區塊
 * 		keyboard_number : 鍵盤數字區塊
 *
 *	[Demo]
	//==[動態鍵盤 START]==//
	$(function(){
		var keyboardObj = new KeyboardClass({
			mainObj : '#keyboardBox',
			openObj : '#keyboardOpen',
			caplockFlag : false,
			openFlag : true,
			inputObj : ['input[name=loginCustId]'],
			styleData : {
				keyboard : {},
				keyboard_word : {},
				keyboard_number : {}
			}
		});
		keyboardObj.setInputFocus(['#usrIdInput']); //後續補上input
	});
	//==[動態鍵盤 END]==//
 **/
var KeyboardClass = function(optionData){
	//==Data set==//
	var classObj = this;
	this.optionSetList = {
		openFlag : false, //預設開啟狀態
		wordData : {},
		caplockFlag : false, //true 大寫,false 小寫
		styleData : {},
		//==obj==//
		mainObj : null,
		openObj : null,
		focusObj : null,
		tranFocusName:null,
		inputObj : [], //標的物
		inputObjSet : [], //標的物
		keyboardSize:'',
		checkTF:true,
		chkId:false,
		targetObj : {
			//==data part==//
			keyboardMainBox : '.keyboard_frame',
			inputNumberBox : '.keyboard_frame .input_number',
			keyboardWordBox : '.keyboard_frame ul.keyboard_word',
			keyboardNumberBox : '.keyboard_frame ul.keyboard_number',
			//==btn part==//
			caplockBtn : '.keyboard_frame ul.btn_maincheck button.btn_caplock',
			deleteBtn : '.keyboard_frame ul.btn_maincheck button.btn_delete',
			clearBtn : '.keyboard_frame ul.btn_maincheck button.btn_clear',
			sendBtn : '.keyboard_frame ul.btn_maincheck button.btn_send',
			closeBtn : '.keyboard_frame a.btn_close', //目前沒有
			//==text part==//
			keyboard_text : '.keyboard_text'
		}
	};

	//動態鍵盤產生
	function createMainKeyboard(obj){
		var html_body =	'<div class="keybord_location_frame"><div class="keyboard_frame">'
						+   '<a href="javascript:void(0);" class="btn_close"></a>'
						+ 	'<h3>已輸入字元：<span class="input_number">0</span>位</h3>'
							//英文字母鍵盤框架
						+ 	'<ul class="keyboard_word left_padding"></ul>'
							//數字與其他符號鍵盤框架
						+ 	'<ul class="keyboard_number right_padding"></ul>'
							//相關確認按鈕框架
						+ 	'<ul class="btn_maincheck">'
						+		'<li><button class="btn_caplock">大寫</button></li>'
						+		'<li><button class="btn_delete">退位</button></li>'
						+		'<li><button class="btn_clear">清空</button></li>'
						+		'<li><button class="btn_send">確認</button></li>'
						+ 	'</ul>'
						+ '</div></div>';
		if(typeof obj === 'object' && $(obj).length > 0){
			//empty清除內的子節點
			$(obj).empty().append(html_body);
			classObj.keyboardOpen(true); //create使用openFlag
		}
	}
	//動態鍵盤產生 end

	//==Main Start==//
	classObj.init(optionData); //reset
	//將mainObj變數指向classObj.optionSetList.mainObj變數
	var mainObj = classObj.optionSetList.mainObj;
	var keyboard_text = classObj.optionSetList.targetObj.keyboard_text;
	var obj = classObj.optionSetList.targetObj.inputNumberBox;
	createMainKeyboard(mainObj); //動態鍵盤產生
	//classObj.modifyStyle(); //==[Style調整]==//

	//==default event==//
	//==[大小寫]==//
	classObj.keyboardCaplockChange(true);
	$(mainObj).find(classObj.optionSetList.targetObj.caplockBtn).click(function(){
		classObj.keyboardCaplockChange();
	});

	//==[input event]==//
	var objList = {
		deleteBtn : '.keyboard_frame ul.btn_maincheck button.btn_delete',
		clearBtn : '.keyboard_frame ul.btn_maincheck button.btn_clear',
		sendBtn : '.keyboard_frame ul.btn_maincheck button.btn_send',
		closeBtn : '.keyboard_frame a.btn_close'
	}

	classObj.setInputFocus(classObj.optionSetList.inputObjSet);

	$(mainObj).find(objList.deleteBtn).click(function(){
		classObj.deleteInputText();
	});
	$(mainObj).find(objList.clearBtn).click(function(){
		var inputObj = $('input[name='+classObj.optionSetList.tranFocusName+']');
		if($(classObj.optionSetList.mainObj).css('display') === 'none'){
			return false; //動態鍵盤開啟才處理
		}
		if(typeof inputObj === 'undefined' || $(inputObj).length <= 0){
			return false;
		}
		$(inputObj).val("");
		classObj.getInputTextNumber();

		if(inputObj !== null){
			inputObj.focus();
		}
	});
	//send!
	$(mainObj).find(objList.sendBtn).click(function(){
		if($(classObj.optionSetList.mainObj).css('display') === 'none'){

			return false; //動態鍵盤開啟才處理
		}
		for (var i = 0; i < classObj.optionSetList.inputObjSet.length; i++) {
			console.log("inputObjSet",$(classObj.optionSetList.inputObjSet[i])[0].name)
			if(classObj.optionSetList.tranFocusName==$(classObj.optionSetList.inputObjSet[i])[0].name){
				if(i==classObj.optionSetList.inputObjSet.length-1){
					classObj.keyboardOpen();
					$(classObj.optionSetList.tranFocusName).blur();
					return false;
				}
				$(classObj.optionSetList.inputObjSet[i+1]).focus();
				classObj.optionSetList.tranFocusName = $(classObj.optionSetList.inputObjSet[i+1])[0].name;
				if(classObj.isIE8or9()){
					if($(classObj.optionSetList.inputObjSet[i+1])[0].type == 'password'){
						var ipt = document.getElementsByTagName('input');
						for(var l=0;l<ipt.length;l++){
							if(ipt[l].type=="password"){
								if(ipt[l].name == classObj.optionSetList.tranFocusName){
									if(classObj.optionSetList.chkId && classObj.optionSetList.tranFocusName == 'usrId'){
										ipt[l].focus();
									}else{
										ipt[l-1].focus();
									}
								}
							}
						}
					}
				}
				classObj.optionSetList.checkTF = false;
				return false;
			}
		}
	});
	$(mainObj).find(objList.closeBtn).click(function(){
		if($(classObj.optionSetList.mainObj).css('display') === 'none'){
			return false; //動態鍵盤開啟才處理
		}
		classObj.keyboardOpen();
	});
	// classObj.dragKeyboard(); //使用拖曳鍵盤功能
}
/**
 * default 執行
 **/
KeyboardClass.prototype.init = function(optionData) {
	//this代表呼叫此函數的物件，若無呼叫則是全域變數
	var classObj = this;
	//如果有物件就執行
	if(typeof optionData === 'object'){
		//==自動建立mainObj==//
		var obj_id = '_keyboardBoxAutoId';
		if(typeof optionData.mainObj === 'string'){
			//s=abc s.substr(0.1) = a ,s.substr(1) = abc
			var tmp_str = optionData.mainObj.substr(0,1);
			//#開頭的
			if(tmp_str === '#'){
				obj_id = optionData.mainObj.substr(1);
			//不是#、.開頭 且長度小魚等於0
			}else if(tmp_str !== '.' && $(optionData.mainObj).length <= 0){
				obj_id = optionData.mainObj;
			}
		}
		optionData.mainObj = '#'+obj_id;
		if($(optionData.mainObj).length <= 0){
			$('body').append('<div id="'+obj_id+'"></div>');
		}
		classObj.optionSetList.mainObj = $(optionData.mainObj);
		//建立點擊事件
		if(typeof optionData.openObj !== 'undefined' && $(optionData.openObj).length > 0){
			classObj.optionSetList.openObj = $(optionData.openObj);
			$(classObj.optionSetList.openObj).click(function(){
				classObj.keyboardOpen();
			});
		}
		classObj.optionSetList.openFlag = false;
		if(typeof optionData.openFlag !== 'undefined' && optionData.openFlag){
			classObj.optionSetList.openFlag = true;
		}
		classObj.optionSetList.caplockFlag = false;
		if(typeof optionData.caplockFlag !== 'undefined' && optionData.caplockFlag){
			classObj.optionSetList.caplockFlag = true;
		}
		//==input set==//
		if(typeof optionData.inputObj !== 'undefined' && $(optionData.inputObj).length > 0){
			classObj.optionSetList.inputObjSet = optionData.inputObj;
		}
		//==style set==//
		if(typeof optionData.styleData !== 'undefined'){
			classObj.optionSetList.styleData = optionData.styleData;
		}
	}
};
/**
 * 修改樣式
 **/
KeyboardClass.prototype.modifyStyle = function() {
	var classObj = this;
	var optionData = classObj.optionSetList.styleData;
	var boxList = classObj.optionSetList.targetObj;
	//==[keyboard_frame]==//
	if(typeof optionData.keyboard === 'object'){
		$(boxList.keyboardMainBox).css(optionData.keyboard);
	}
	//==[keyboard_word]==//
	if(typeof optionData.keyboard_word === 'object'){
		$(boxList.keyboardWordBox).css(optionData.keyboard_word);
	}

	//==[keyboard_number]==//
	if(typeof optionData.keyboard_number === 'object'){
		$(boxList.keyboardNumberBox).css(optionData.keyboard_number);
	}
}

/**
 * 物件打散
 **/
KeyboardClass.prototype.makeDataRandom = function(){
	var classObj = this;
	//==Main Data==//
	var keyboardData = {
		'numberCase' : ['0','1','2','3','4','5','6','7','8','9','.','_'],
		'upperCase' : ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
		'lowerCase' : ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
	};
	var tmpData = keyboardData;
	for (var i = tmpData.upperCase.length-1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var tmp = tmpData.upperCase[i];
		tmpData.upperCase[i] = tmpData.upperCase[j];
		tmpData.upperCase[j] = tmp;
		tmp = tmpData.lowerCase[i];
		tmpData.lowerCase[i] = tmpData.lowerCase[j];
		tmpData.lowerCase[j] = tmp;
	}
	for (var i = tmpData.numberCase.length-1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var tmp = tmpData.numberCase[i];
		tmpData.numberCase[i] = tmpData.numberCase[j];
		tmpData.numberCase[j] = tmp;
	}
	classObj.optionSetList.wordData = tmpData;
	return tmpData;
}

//------------------[動態鍵盤事件]------------------//
/**
 * 鍵盤開啟open!
 **/
KeyboardClass.prototype.keyboardOpen = function(create){
	var classObj = this;
	var obj = classObj.optionSetList.mainObj;
	var inputObj = $('input[name='+classObj.optionSetList.tranFocusName+']');
	// console.log(inputObj);
	var check = (create) ? classObj.optionSetList.openFlag : ($(obj).css('display') === 'none') ;
	if(!check){
		$(obj).css('display','none'); //隱藏動態鍵盤
		inputObj.blur();
	}else{
		$(obj).css('display','block');
		classObj.makeDataRandom(); //reset
		classObj.keyboardBtnCreate(); //重開啟時重新設定
		classObj.getInputTextNumber();
		// if(inputObj[0].value == '請輸入8至12位英數字'){
		// 	inputObj[0].value = '';
		// }
		inputObj.focus();
		if(classObj.isIE8or9()){
			var ipt = document.getElementsByTagName('input');
			for(var l=0;l<ipt.length;l++){
				if(classObj.optionSetList.tranFocusName == ipt[l].name){
					if(ipt[l].value != "" && (ipt[l].value == '請輸入圖形驗證碼'|| ipt[l].value == '請輸入身分證/統一編號')){
						ipt[l].value = "";
					}
				}
			}
		}
		if(classObj.isIE8or9()){
			var ipt = document.getElementsByTagName('input');
			for(var l=0;l<ipt.length;l++){
				if(ipt[l].type=="password"){
					if(ipt[l].name == classObj.optionSetList.tranFocusName){
						console.log(ipt[l].name);
						console.log(classObj.optionSetList.tranFocusName);
						console.log(classObj.optionSetList.chkId);
						if(classObj.optionSetList.chkId && classObj.optionSetList.tranFocusName == 'usrId'){
							ipt[l].focus();
						} else {
							ipt[l].style.display='inline-block';
							ipt[l-1].style.display='none';
							ipt[l].focus();
						}
					}
				}
			}
		}
		/*只針對個網登入(勾選顯示代號後，請將游標停在登入代號欄) 顯示代號新建後給予事件聆聽*/
		$('input[name=chk1]').click(function(){
//			if($(classObj.optionSetList.mainObj).css('display') === 'none'){
//
//				return false; //動態鍵盤開啟才處理
//			}
			classObj.optionSetList.tranFocusName = 'usrId';
			classObj.optionSetList.focusObj = $('input[name=usrId]');
			classObj.optionSetList.focusObj.focus();
			classObj.optionSetList.chkId = true;
			$('input[name=usrId]').each(function(){
				$(this).focus(function(){
					classObj.optionSetList.tranFocusName = $(this)[0].name;
					classObj.optionSetList.focusObj = $('input[name='+$(this)[0].name+']');
					updataKeyboard($(this));
				});
				$(this).change(function(){
					classObj.getInputTextNumber();
				});
				$(this).keyup(function(){
					if($(classObj.optionSetList.mainObj).css('display') === 'none'){
						return false;
					}

					var str_length = classObj.optionSetList.focusObj.val();
					$('input[name=chk1]').val(str_length);
					classObj.getInputTextNumber();

				});
			});
		});
		function updataKeyboard(target){
			var str_length = classObj.optionSetList.focusObj.val();
			$('input[name=chk1]').val(str_length);
			classObj.getInputTextNumber();
		}
		/*只針對個網登入(勾選顯示代號後，請將游標停在登入代號欄)_END*/
//		$('#'+classObj.optionSetList.tranFocusName).focus();
	}
}
/**
 * 鍵盤按鍵製作
 **/
KeyboardClass.prototype.keyboardBtnCreate = function(){
	var classObj = this;
	var data,obj;
	//==word==//
	obj = $(classObj.optionSetList.mainObj).find(classObj.optionSetList.targetObj.keyboardWordBox);
	data = (classObj.optionSetList.caplockFlag)
				? classObj.optionSetList.wordData['upperCase']
				: classObj.optionSetList.wordData['lowerCase'];
	if($(obj).length > 0){
		$(obj).empty();
		for(key in data){
			$(obj).append("<li><button>"+data[key]+"</button></li>");
		}
		$(obj).append('<li class="btn_space"><button>空白鍵</button></li>');
	}
	//==number==//
	obj = $(classObj.optionSetList.mainObj).find(classObj.optionSetList.targetObj.keyboardNumberBox);
	data = classObj.optionSetList.wordData['numberCase'];
	if($(obj).length > 0){
		$(obj).empty();
		for(key in data){
			$(obj).append("<li><button>"+data[key]+"</button></li>");
		}
	}

	//==event==//
	obj = $(classObj.optionSetList.mainObj).find(
		classObj.optionSetList.targetObj.keyboardWordBox+" li button "
		+" , "+
		classObj.optionSetList.targetObj.keyboardNumberBox+" li button "
	);
	$(obj).click(function(){
		var set_str = $(this).text();
		classObj.setInputText(set_str);
		classObj.optionSetList.focusObj.focus();
	});
	classObj.modifyStyle();
}
/**
 * 鍵盤英文轉換
 **/
KeyboardClass.prototype.keyboardCaplockChange = function(crate){
	var classObj = this;
	var inputObj = classObj.optionSetList.focusObj;
	var focusname = classObj.optionSetList.tranFocusName;
	var capsLock = false;
	if(!crate){
		classObj.optionSetList.caplockFlag = (classObj.optionSetList.caplockFlag) ? false : true;
	}
	classObj.keyboardBtnCreate();
	var obj = $(classObj.optionSetList.mainObj).find(classObj.optionSetList.targetObj.caplockBtn);
	if($(obj).length > 0){
		if(classObj.optionSetList.caplockFlag){
			$(obj).addClass('click');
			$(obj).text('小寫');
			capsLock = true;
		}else{
			$(obj).removeClass('click');
			$(obj).text('大寫');
			capsLock = false;
		}
	}
	if(inputObj !== null){
		inputObj.focus();
	}
}

//------------------[資料事件]------------------//

/**
 * input focus!偵測事件
 **/
KeyboardClass.prototype.setInputFocus = function(inputObj){
	var classObj = this;
	var keyboard_text = classObj.optionSetList.targetObj.keyboard_text;
	var obj = classObj.optionSetList.focusObj;
	if($(inputObj).length > 0){
		var i = 0;
		for(key in inputObj){
			var tmp_obj = inputObj[key];
			if(typeof tmp_obj === 'undefined' || $(tmp_obj).length <= 0){
				continue;
			}
			if($.inArray(tmp_obj,classObj.optionSetList.inputObj) > -1){
				continue; //have do
			}
			classObj.optionSetList.inputObj.push(tmp_obj);
			$(tmp_obj).each(function(){
				if(i===0 && !classObj.optionSetList.focusObj){
					i++;
					classObj.optionSetList.tranFocusName = $(tmp_obj)[0].name; //預設第一個focus
					classObj.optionSetList.focusObj = $(this); //預設第一個focus
				}
				$(this).focus(function(){

					if(classObj.isIE8or9()){
						var ipt = document.getElementsByTagName('input');
						for(var l=0;l<ipt.length;l++){
							if(ipt[l].type=="password"){
								if(ipt[l].name == classObj.optionSetList.tranFocusName){
									if(classObj.optionSetList.checkTF){
										if(classObj.optionSetList.tranFocusName!=$(this)[0].name && (ipt[l].value == '' || ipt[l].value == '' || ipt[l].value == '')){
											console.log(classObj.optionSetList.chkId);
											if(classObj.optionSetList.chkId && classObj.optionSetList.tranFocusName == 'usrId'){
											} else {
												ipt[l-1].style.display='inline-block';
												ipt[l].style.display='none';
											}
										}
									}
								}
							}
						}
					}
					classObj.optionSetList.checkTF = true;
					classObj.optionSetList.tranFocusName=$(this)[0].name;
					classObj.optionSetList.focusObj = $('input[name='+$(this)[0].name+']');
					updataKeyboard($(this));
					if(classObj.isIE8or9()){
						var ipt = document.getElementsByTagName('input');
						for(var l=0;l<ipt.length;l++){
							if(classObj.optionSetList.tranFocusName == ipt[l].name){
								if(ipt[l].type == 'text'){
									if(ipt[l].value == '請輸入圖形驗證碼'|| ipt[l].value == '請輸入身分證/統一編號' || ipt[l].value == '請輸入8至12位英數字'){
										ipt[l].value = "";
									}
								}
							}
						}
					}
				});
				$(this).change(function(){
					classObj.getInputTextNumber();
				});
				$(this).keyup(function(){
					if($(classObj.optionSetList.mainObj).css('display') === 'none'){
						return false;
					}
					if(classObj.optionSetList.focusObj == null ){
						return false;
					}
					var str_length = classObj.optionSetList.focusObj.val();
					$(inputObj).val(str_length);
					classObj.getInputTextNumber();
				});
			});
		} //for end
	}

	function updataKeyboard(target){
		var str_length = classObj.optionSetList.focusObj.val();
		$(inputObj).val(str_length);
		classObj.getInputTextNumber();
	}
}
/**
 * 取得輸入字元
 **/
KeyboardClass.prototype.getInputTextNumber = function(){
	var classObj = this;
	var obj = classObj.optionSetList.targetObj.inputNumberBox;
	var inputObj = $('input[name='+classObj.optionSetList.tranFocusName+']');
	var keyboard_text = classObj.optionSetList.targetObj.keyboard_text;

	// console.log("obj：",obj,"  inputObj:", inputObj.val()," keyboard_text:",keyboard_text)

	if(typeof obj === 'undefined' || $(obj).length <= 0){
		return false;
	}
	if($(classObj.optionSetList.mainObj).css('display') === 'none'){
		return false; //動態鍵盤開啟才處理
	}
	if(typeof inputObj === 'undefined' || $(inputObj).length <= 0){
		$(obj).empty().text(0);
		return false;
	}
	var str_length = $(inputObj).val().length;
	$(obj).empty().text(str_length);
	return str_length;
}
/**
 * input!
 **/
KeyboardClass.prototype.setInputText = function(set_str){
	var classObj = this;
	var inputObj = $('input[name='+classObj.optionSetList.tranFocusName+']');
	var keyboard_text = classObj.optionSetList.targetObj.keyboard_text;
	if($(classObj.optionSetList.mainObj).css('display') === 'none'){
		return false; //動態鍵盤開啟才處理
	}
	if(typeof set_str === 'undefined' || set_str.length <= 0){
		return false;
	}
	if(typeof inputObj === 'undefined' || $(inputObj).length <= 0){
		return false;
	}
	var str = $(inputObj).val();
	var check = false;
	for(key in classObj.optionSetList.wordData){
		if($.inArray(set_str,classObj.optionSetList.wordData[key]) > -1){
			check = true;
			break;
		}
	}
	if(set_str === "空白鍵"){
		set_str = " ";
		check = true;
	}

	if(classObj.isIE8or9()){
		var ipt = document.getElementsByTagName('input');
		for(var l=0;l<ipt.length;l++){
			if(ipt[l].type=="password"){
				if(ipt[l].name == classObj.optionSetList.tranFocusName){
					ipt[l].style.display='inline-block';
					ipt[l-1].style.display='none';
				}
			}
		}
	}
	if(check){
		if(classObj.getInputTextNumber() < inputObj[0].maxLength){
			$(inputObj).val(str+set_str);
		}
		classObj.getInputTextNumber();
	}
}
/**
 * 退位input
 **/
KeyboardClass.prototype.deleteInputText = function(){
	var classObj = this;
	var inputObj = $('input[name='+classObj.optionSetList.tranFocusName+']');
	var keyboard_text = classObj.optionSetList.targetObj.keyboard_text;
	if($(classObj.optionSetList.mainObj).css('display') === 'none'){
		return false; //動態鍵盤開啟才處理
	}
	if(typeof inputObj === 'undefined' || $(inputObj).length <= 0){
		return false;
	}
	var str = $(inputObj).val();
	$(inputObj).val(str.substr(0,str.length-1));
	classObj.getInputTextNumber();

	if(inputObj !== null){
		inputObj.focus();
	}
}

KeyboardClass.prototype.isIE8or9= function(create){
	var sAgent = navigator.userAgent.toUpperCase();
	if(sAgent.indexOf("MSIE") != -1){
		var browser=navigator.appName
		var b_version=navigator.appVersion
		var version=b_version.split(";");
		var trim_Version=version[1].replace(/[ ]/g,"");
		if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0")
		{
			return false;
		}
		else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0")
		{
			return false;
		}
		else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0")
		{
			return true;
		}
		else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0")
		{
			return true;
		} else {
			return false;
		}
		return false;
	}

}

KeyboardClass.prototype.dragKeyboard = function(){
	var dragapproved = false;
    var dragObj;
    var zIndex = 3;
    var offX,offY;
    document.onmousedown = beginDrag;
    document.onmouseup = function() {dragapproved = false};
    document.onmousemove = dragDrop;
    function dragDrop(evt) { //evt取得滑鼠座標
        if (dragapproved) {
        	console.log('2_S');
            var e = evt || window.event;
            console.log(e);
            dragObj.style.left = e.clientX - offX +297+ document.documentElement.scrollLeft + 'px';
            dragObj.style.top = e.clientY - offY - 3 + document.documentElement.scrollTop + 'px';
            console.log("e.clientX:"+e.clientX);
            console.log("e.clientY:"+e.clientY);
            console.log("offX:"+offX);
            console.log("offY:"+offY);
            console.log("document.documentElement.scrollLeft:"+document.documentElement.scrollLeft);
            console.log("document.documentElement.scrollTop:"+document.documentElement.scrollTop);
            console.log('2_E');
        }
    }
    function beginDrag(evt) { //evt取得滑鼠座標
        dragObj = window.event ? event.srcElement : evt.target;
        console.log('3_S');
        console.log(window.event);
        console.log(dragObj);
        if (dragapproved == false && dragObj.className.indexOf("frame") >= 0) {
            dragObj.style.zIndex = zIndex++;
            offX = window.event ? event.offsetX : evt.layerX;
            offY = window.event ? event.offsetY : evt.layerY;
            console.log("offX:"+offX);
            console.log("offY:"+offY);
            dragapproved = true;
        }
        if (dragapproved == false && dragObj.className.indexOf("comment") >= 0) {
            dragapproved = false;
        }
        console.log('3_E');
    }
}
