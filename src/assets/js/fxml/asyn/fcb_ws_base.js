﻿var pos = 0;
var delimeterSymbol = "||";

var varName = [];
var callbackFuncName = [];
var callbackIndex = 0;
var socket_di;
var dataForSign = [];
var iToSignCount = 0;
var signedData = [];
var iSignedCount = 0;

var async = true;

//Browser Detect
var BrowserDetect_WS = {
	detectWS: function(){
		if(window.WebSocket){
			//alert("This Browser support WebSocket");
			//document.getElementById("ws_support").textContent = "This Browser support WebSocket";
		}else{
			//alert("This Browser don't support WebSocket");
			//document.getElementById("ws_support").textContent = "This Browser don't support WebSocket";
		}
	},
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
		this.MacOSVersion = this.searchMacOSVersion(this.OS, navigator.userAgent)
		|| 100100100;
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	searchMacOSVersion: function (os, nAgt) {
		var osVersion = "";
		switch (os) {
			case 'Mac':
				osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
				break;
			default:
				osVersion = "";
		}
		osVersion = osVersion.split("_");
		if (osVersion.length == 1)
		{
			//為了Mac Firefox, 他是用.分隔
			osVersion = osVersion[0].split(".");
		}
		if (osVersion.length == 2)
			var res = parseInt(osVersion[0] * 1000000) + parseInt(osVersion[1] * 1000);
		else if (osVersion.length == 3)
			var res = parseInt(osVersion[0] * 1000000) + parseInt(osVersion[1] * 1000) + parseInt(osVersion[2]);
		return res;
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.userAgent,
			subString: "OPR",
			versionSearch: "OPR/",
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{	// Internet Explorer 10/11
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Internet Explorer",
			versionSearch: "rv"
		},
		{	// Microsoft Edge
			string: navigator.userAgent,
			subString: "Edge",
			versionSearch: "Edge/",
			identity: "Microsoft Edge"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.userAgent,
			subString: "iPhone",
			identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]
};

BrowserDetect_WS.init();
BrowserDetect_WS.detectWS();

//////////////////////////////////////////////////
/* BrowserDetect came from http://www.quirksmode.org/js/detect.html */
var pos = 0;
var delimeterSymbol = "||";
var msgPart;

var dataForSign = [];
var iToSignCount = 0;
var signedData = [];
var iSignedCount = 0;

var socket_on = false;//false = close, true = on
var ws_socket_exist = false;

var socket_ws = {
	xmlhttp : null,			// FBeBank webserver socket 使用之變數
	ebankxhr_url : "https://127.0.0.1:20558/FBiBank"		// 連線ebank url
};

var WSDataObject = {
	//function list, store all available function name
	//call these functions one by one
	cbFuncName: [],
	//根據上述callbackFunction所使用的要傳輸的參數
	parameter:[],
	//put variable name in this list, 
	domData:[],
	//other element?
	data: ""
};

var formStruct = {
	domArray: []
};

//socket 關閉時呼叫的顯示處理
function socket_close()
{
	socket_on = false;
	//domData.domArray[0].style.backgroundColor = "#ff4040";
	//domData.domArray[1].textContent = " websocket connection CLOSED ";
}
//socket 開啟時呼叫的顯示處理
function socket_open()
{
	socket_on = true;
	//domData.domArray[0].style.backgroundColor = "#40ff40";
	//domData.domArray[1].textContent = " websocket connection opened ";
}

//顯示處理中畫面的func
function process_show()
{
	//$("#processDialog").show();
	try{
		$('input[type="submit"]').attr('disabled','disabled');
		$('input[type="text"]').attr('disabled','disabled');
		$('input[type="button"]').attr('disabled','disabled');
		if ($("a", parent.document.length))
		{
			$('input[type="submit"]', parent.document).attr('disabled','disabled');
			$('input[type="button"]', parent.document).attr('disabled','disabled');
			$("a", parent.document).css("pointer-events","none");
		}

		if ($("a", parent.parent.document.length))
		{
			$('input[type="submit"]', parent.parent.document).attr('disabled','disabled');
			$('input[type="button"]', parent.parent.document).attr('disabled','disabled');
			$("a", parent.parent.document).css("pointer-events","none");
		}
		
		$("a").css("pointer-events","none");
	}catch(e){}
}
//隱藏處理中畫面的func
function process_hide()
{
	//$("#processDialog").hide();
	try{
		$('input[type="submit"]').removeAttr('disabled');
		$('input[type="text"]').removeAttr('disabled');
		$('input[type="button"]').removeAttr('disabled');
		if ($("a", parent.document.length))
		{
			$('input[type="submit"]', parent.document).removeAttr('disabled');
			$('input[type="button"]', parent.document).removeAttr('disabled');
			$("a", parent.document).css("pointer-events","auto");
		}
		if ($("a", parent.parent.document.length))
		{
			$('input[type="submit"]', parent.parent.document).removeAttr('disabled');
			$('input[type="button"]', parent.parent.document).removeAttr('disabled');
			$("a", parent.parent.document).css("pointer-events","auto");
		}
		$("a").css("pointer-events","auto");
	}catch (e) {}
}

//偵測websocket是否存在
function init_ht_ws()
{
	if (window.XMLHttpRequest)
	{
		// Create the XHR object.
		socket_ws.xmlhttp = new XMLHttpRequest();

		if(socket_ws.xmlhttp==null)
		{
			ws_socket_exist = false;
		}
		else
		{
			
			try
			{
				socket_ws.xmlhttp.open("POST",socket_ws.ebankxhr_url,false);
				socket_ws.xmlhttp.setRequestHeader("Content-Type", "text/plain");
				socket_ws.xmlhttp.send('FBWS_Echo');
			}
			catch(err)
			{
				//console.log(err);
			}
			
			var echo_result = socket_ws.xmlhttp.responseText;
			if(echo_result == "FBWS_ECHO_OK")
				ws_socket_exist = true;
			else 
				ws_socket_exist = false;
		}
	}
	else
	{
		ws_socket_exist = false;
	}
}

function setResult(WSObject, functionName, objectData)
{
	try {
		WSObject.xmlhttp.onload = function (event) {
			var retValue = rtnProcess(WSObject.xmlhttp.responseText, functionName, objectData.domData, objectData.cbFuncName[0], objectData.cbFuncName[1]);
			if(retValue != "0")
			{
				process_hide();
			}
		} 
	} catch(exception) {
		alert('<p>Error' + exception);  
	}
}

//處理回傳資料的副程式
//messageData:從元件回傳的結果
//functionName:呼叫WebSocket時傳輸的命令名稱
//domName:接收從Websocket處理完成的資料,是dom名稱
//callSuccess:return 0所呼叫的function
//callFain:return 不為0所呼叫的function

function rtnProcess(messageData, functionName, domName, callSuccess, callFail)
{
	var msgCount = 0;
	try
	{
		msgPart = messageData.split("||");
		if(msgPart[0] == functionName)
		{
			document.wssocketform.rtn.value = msgPart[1];
			if(msgPart[1] != "0")
			{
				callFail(msgPart);
			}
			else
			{
				msgCount = msgPart.length;
				if(msgCount > 2)
				{
					for(var i = 2; i < msgCount; i++)
					{
						domName[i - 2].value = msgPart[i];	
					}
				}
				if(callSuccess)
					callSuccess();
			}
		}
		else
		{
			var msgPart1 = messageData.split(">>")[1];
			if (msgPart1 != " User Cancel"){
				callFail(msgPart);
			}
		}
	} catch(exception) {
		alert('<p>Error' + exception); 
		callFail(exception);
	}
	
	return msgPart[1];
}

this.send = function (message)
{
	try
	{
		socket_ws.xmlhttp.open("POST",socket_ws.ebankxhr_url,true);
		socket_ws.xmlhttp.setRequestHeader("Content-Type", "text/plain");
		socket_ws.xmlhttp.send(message);
	}
	catch(err)
	{
		//console.log(err);
	}
}


function getErrorMSG()
{
	callbackIndex = 0;
	callbackFuncName[0] = "";
	subgetErrorMSG();
}

function arrangeFunction()
{
	//這個callback function純粹只是把index往下移一個
	//如果是要單獨做的話,每個callback都要設定下一個function
	//如果有任何處理邏輯可以寫在這裡,判斷成功或失敗後再往下一個callbackFuncName走
	if(callbackFuncName[callbackIndex])
	{
		do_ht_job();
		callbackFuncName[callbackIndex]();
		callbackIndex++;
	}
	else
	{
		process_hide();
		do_ht_job();
	}
}

//成功或失敗都改成到do_ht_job裡去解決
function failFunction(fieldName)
{
	callbackIndex = 0;
	//alert("call " + fieldName[0] + "fail, " + "return code is " + fieldName[1] + ", return message is " + fieldName[2]);
	showHelpMsg(fieldName[0],fieldName[1],fieldName[2]);
	document.wssocketform.rtn.value = parseInt(fieldName[1]);
	process_hide();
	do_ht_job();
}