/* 
 * Copyright (c) 2016 HiTRUST Incorporated.All rights reserved.
 *
 * Enroll functions
 *
 * Modify History:
 * v1.00, 2007-05-10
 *  1) First release
 * v1.10, 2010/02/25, Jerry Chang
 *  1) 跨瀏覽器調整 , Safari, 調整embeded object,不設定height會有預設高度
 * V1.50 2014/09/25 Peter Lee
 *  1) 一銀個網憑證安控提升調整 調整HTEnroll to FBEnroll 
 * V2.0 2016/10/30, PeterLee
 *  1) 調整增加支援新安控元件支援
 * 		1. 不支援Windows及Mac之Plugins   
 */ 
///////////////////////////////////////////////////////////////////////////////
//// ActiveX 元件宣告
var fbEnrollObj;
var root = "/" + location.pathname.split("/")[1];
var objElemets={
		activex:{
			codebase:{
				fbEnrollObj:" <object class='fly_away' classid='clsid:1740CEC6-953A-472e-ADDF-1DD220BC50ED'              "
                        + "               codebase='../cab/FBEnroll.cab#Version=1,1409,24,2' height='0'  "
                        + "               id =FBEnrollObj></object>                          "
			},
			nonCodebase:{
				fbEnrollObj:" <object class='fly_away' classid='clsid:1740CEC6-953A-472e-ADDF-1DD220BC50ED'              "
				    + "               height='0'  "
				    + "               id =FBEnrollObj></object>                          "
			}
		},
		plugin:{},
		MAC:{
			fbwsMACObj :"<embed class='fly_away' id='FBEnrollObj' name='FBWSObj' "
        		+ "style='LEFT: 10px; TOP: 0px; VISIBILITY: visible; width: 10px; height: 10px; background: red;' "
       		 	+ "pluginspage='../cab/FBWS_Plugins_Setup.pkg' "
        		+ "type='application/fbws-plugins' /> "
		}
};

///////////////////////////////////////////////////////////////////////////////
//// FBiBankP11 webserver socket 元件宣告
var FBiBankP11Obj = 
{
	xmlhttp : null,			// FBiBankP11 webserver socket 使用之變數
	ibankxhr_url : "",		// 連線ibank url

	CSR_result : "",		// createPkcs10 回傳之結果
	TokenSN_str : "",		// GetTokenSN 回傳之結果

	FullPath : "",
	PKCS11LibName : "",
	DetectedTokenPKCS11LibName : "",
	VERSION : "",

	LastErrorStr : "",		//函式回傳之錯誤代碼訊息
	LastErrorCode : 0,		//函式回傳之錯誤代碼

	init_FBiBankP11Obj : function()
	{
		if (window.XMLHttpRequest)
		{
			// code for IE7+, Firefox, Chrome, Opera, Safari
			FBiBankP11Obj.xmlhttp = new XMLHttpRequest();
			FBiBankP11Obj.xmlhttp.overrideMimeType('text/plain');
		}
		else
		{
			return false;
		}

		FBiBankP11Obj.ibankxhr_url = "https://127.0.0.1:20558/FBiBankP11";
		FBiBankP11Obj.xmlhttp.onload = function(event){FBiBankP11Obj.recv_FBiBankP11Obj(event);};
		//FBiBankP11Obj.xmlhttp.onload = FBiBankP11Obj.getReturnData(FBiBankP11Obj.xmlhttp.responseText);

		var init_status = FBiBankP11Obj.sendData_FBiBankP11Obj("FBWS_Echo");
		if(init_status == undefined)
		{
			return false;
		}
		var echo_result = FBiBankP11Obj.xmlhttp.responseText;
		if(echo_result == "FBWS_ECHO_OK")
			return true;
		else 
			return false;
	},
	recv_FBiBankP11Obj : function(event)
	{
		var retValue = FBiBankP11Obj.getReturnData(FBiBankP11Obj.xmlhttp.responseText);
		if(retValue == "0")
		{
			//$("#myModal").modal('hide');
		}
		else
		{
			//alert("return Value="+retValue);
			//$("#myModal").modal('hide');
		}
	},
	sendData_FBiBankP11Obj : function(cmd_string)
	{
		//FBiBankP11Obj.xmlhttp.open("POST",ibankxhr_url,true);
		try{
			FBiBankP11Obj.xmlhttp.open("POST",FBiBankP11Obj.ibankxhr_url,false);
			FBiBankP11Obj.xmlhttp.setRequestHeader("Content-Type", "text/plain");
			FBiBankP11Obj.xmlhttp.send(cmd_string);
		}
		catch(err){
			return undefined;
		}
		// recv_FBeBankObj will handle xmlhttp.responseText
		return FBiBankP11Obj.LastErrorCode;
	},
	///////////////////////
	setLanguage : function(lang)
	{
		var setLanguage_str = "setLanguage||" + lang;
		return FBiBankP11Obj.sendData_FBiBankP11Obj(setLanguage_str);
	},
	SetPKCS11LibName :function(PKCS11DLL)
	{
		var setPKCS11LibName_str = "SetPKCS11LibName||" + PKCS11DLL;
		return FBiBankP11Obj.sendData_FBiBankP11Obj(setPKCS11LibName_str);
	},
	createPkcs10 : function(userCN, userKeyLength)
	{
		var createPkcs10_str = "createPkcs10||" + userCN + "||" + userKeyLength;
		//FBiBankP11Obj.ws_socket_di.send(createPkcs10_str);
		FBiBankP11Obj.sendData_FBiBankP11Obj(createPkcs10_str);
		if(FBiBankP11Obj.LastErrorCode == 0)
			return FBiBankP11Obj.CSR_result;
		else
			return "";
	},
	installCert : function(userCert)
	{
		var installCert_str = "installCert||" + userCert;
		return FBiBankP11Obj.sendData_FBiBankP11Obj(installCert_str);
	},
	deleteTokenCertKeyByCN_SN : function(certCN, certCSN)
	{
		var deleteTokenCertKeyByCN_SN_str = "deleteTokenCertKeyByCN_SN||" + certCN + "||" + certCSN;
		return FBiBankP11Obj.sendData_FBiBankP11Obj(deleteTokenCertKeyByCN_SN_str);
	},
	getReturnData : function(returnString)
	{
		//$("#myModal").modal('hide');
		var retStringParts = returnString.split("||");

		var strFuncName = retStringParts[0];
		var strRtn = retStringParts[1];

		if(strFuncName == "setLanguage")
		{
			if(strRtn == "0")
			{
				FBiBankP11Obj.LastErrorStr = "";
				FBiBankP11Obj.LastErrorCode = 0;
				return 0;
			}
			else
			{
				FBiBankP11Obj.LastErrorStr = retStringParts[2];
				FBiBankP11Obj.LastErrorCode = parseInt(retStringParts[1]);
				return FBiBankP11Obj.LastErrorCode;
			}
		}
		else if(strFuncName == "SetPKCS11LibName")
		{
			if(strRtn == "0")
			{
				FBiBankP11Obj.LastErrorStr = "";
				FBiBankP11Obj.LastErrorCode = 0;
				return 0;
			}
			else
			{
				FBiBankP11Obj.LastErrorStr = retStringParts[2];
				FBiBankP11Obj.LastErrorCode = parseInt(retStringParts[1]);
				return FBiBankP11Obj.LastErrorCode;
			}
		}
		else if(strFuncName == "createPkcs10")
		{
			if(strRtn == "0")
			{
				FBiBankP11Obj.CSR_result = retStringParts[2];
				FBiBankP11Obj.LastErrorStr = "";
				FBiBankP11Obj.LastErrorCode = 0;
				return FBiBankP11Obj.CSR_result;	//若產生CSR成功，回傳CSR
			}
			else
			{
				FBiBankP11Obj.CSR_result = "";
				FBiBankP11Obj.LastErrorStr = retStringParts[2];
				FBiBankP11Obj.LastErrorCode = parseInt(strRtn);
				return "";						//若產生CSR失敗，回傳空字串
			}
		}
		else if(strFuncName == "installCert")
		{
			if(strRtn == "0")
			{
				FBiBankP11Obj.LastErrorStr = "";
				FBiBankP11Obj.LastErrorCode = 0;
				return 0;
			}
			else
			{
				FBiBankP11Obj.LastErrorStr = retStringParts[2];
				FBiBankP11Obj.LastErrorCode = parseInt(retStringParts[1]);
				return FBiBankP11Obj.LastErrorCode;
			}
		}
		else if(strFuncName == "deleteTokenCertKeyByCN_SN")
		{
			if(strRtn == "0")
			{
				FBiBankP11Obj.LastErrorStr = "";
				FBiBankP11Obj.LastErrorCode = 0;
				return 0;
			}
			else
			{
				FBiBankP11Obj.LastErrorStr = retStringParts[2];
				FBiBankP11Obj.LastErrorCode = parseInt(retStringParts[1]);
				return FBiBankP11Obj.LastErrorCode;
			}
		}
	}
};
function detectIEVersion() 
{
    //Set defaults
    var value = {
        IsIE: false,
        TrueVersion: 0,
        ActingVersion: 0,
        CompatibilityMode: false
    };

    //Try to find the Trident version number
    var trident = navigator.userAgent.match(/Trident\/(\d+)/);
    if (trident) {
        value.IsIE = true;
        //Convert from the Trident version number to the IE version number
        value.TrueVersion = parseInt(trident[1], 10) + 4;
    }

    //Try to find the MSIE number
    var msie = navigator.userAgent.match(/MSIE (\d+)/);
    if (msie) {
        value.IsIE = true;
        //Find the IE version number from the user agent string
        value.ActingVersion = parseInt(msie[1]);
    } else {
        //Must be IE 11 in "edge" mode
        value.ActingVersion = value.TrueVersion;
    }

    //If we have both a Trident and MSIE version number, see if they're different
    if (value.IsIE && value.TrueVersion > 0 && value.ActingVersion > 0) {
        //In compatibility mode if the trident number doesn't match up with the MSIE number
        value.CompatibilityMode = value.TrueVersion != value.ActingVersion;
    }
    if (value.IsIE){
    	if (trident){
    		return value.TrueVersion;
    	}else{
    		return value.ActingVersion;
    	}
    }else{
        return value.IsIE;
    }
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
/**
 * detect IE and get version
 * returns version of IE or false, if browser is not Internet Explorer
 */
function IeVersion() 
{
    //Set defaults
    var value = {
        IsIE: false,
        TrueVersion: 0,
        ActingVersion: 0,
        CompatibilityMode: false
    };

    //Try to find the Trident version number
    var trident = navigator.userAgent.match(/Trident\/(\d+)/);
    if (trident) {
        value.IsIE = true;
        //Convert from the Trident version number to the IE version number
        value.TrueVersion = parseInt(trident[1], 10) + 4;
    }

    //Try to find the MSIE number
    var msie = navigator.userAgent.match(/MSIE (\d+)/);
    if (msie) {
        value.IsIE = true;
        //Find the IE version number from the user agent string
        value.ActingVersion = parseInt(msie[1]);
    } else {
        //Must be IE 11 in "edge" mode
        value.ActingVersion = value.TrueVersion;
    }

    //If we have both a Trident and MSIE version number, see if they're different
    if (value.IsIE && value.TrueVersion > 0 && value.ActingVersion > 0) {
        //In compatibility mode if the trident number doesn't match up with the MSIE number
        value.CompatibilityMode = value.TrueVersion != value.ActingVersion;
    }
    return value;
}

//判斷OS是否為Windows or MAC
function detectOS()
{
	var OS_Flag = navigator.userAgent;

	if( OS_Flag.indexOf("WOW64")>0 || OS_Flag.indexOf("Win32")>0 || OS_Flag.indexOf("Win64")>0 || OS_Flag.indexOf("Windows NT")>0 )
	{
		return "Windows";
	}
	else if( OS_Flag.indexOf("Intel Mac OS X")>0 )
	{
		return "MacOSX";
	}
}

function detectSafari()
{
	var ua = navigator.userAgent.toLowerCase(); 
	if (ua.indexOf('safari') != -1) 
	{ 
  		if (ua.indexOf('chrome') > -1) 
		{
    		//alert("1") // Chrome
			return false;
  		}
		else 
		{
    		//alert("2") // Safari
			return true;
  		}
	}

	return false;
}

//判斷是否已安裝元件
function AXOrNull() 
{
	try	
	{
		if ("undefined"==typeof(FBiBankTxnObj.FullPath))
		{
			/*
			pkcs7SignObj = objElemets.activex.codebase.pkcs7SignObj;
			fbibanktxnObj = objElemets.activex.codebase.fbibanktxnObj;
			if(confirm('開始下載並安裝元件'))
			{
				document.write(pkcs7SignObj);
				document.write(fbibanktxnObj);
			}
			*/
			return false;
		}
		else
		{
			return true;
		}
	}
	catch (ex)
	{
		return false;
	}
}

//判斷是否已安裝MAC FBWS plugins元件
function pluginInstalled4MAC_FBWS()
{
	var fbwsPlugin = false;
	if (navigator.mimeTypes && navigator.mimeTypes.length > 0)
    {
        var mime = navigator.mimeTypes['application/fbws-plugins'];
        if (typeof(mime)=="undefined")
        {
            fbwsPlugin = false;
            /*alert('尚未安裝FBWS元件,請先完成FBWS安裝並於安裝完成後重新開啟瀏覽器!');
            if(confirm('開始下載並安裝?')){
                window.location = '../cab/FBWS_Setup.pkg';
			}*/
        }
        else
        {
            fbwsPlugin = true;
        }
    }
	return fbwsPlugin;
}

// 測試FBWS是否可連通
function CheckFBWS_iBankP11()
{
	var bRcP11 = FBiBankP11Obj.init_FBiBankP11Obj();;
	if(bRcP11 == true)
		return true;
	else
		return false;
}

// 在windows，若未安裝ActiveX元件
// IE 8,9 -> 提示安裝ActiveX元件
// IE 10, 11及其他瀏覽器 -> 安裝使用新安控元件
// 在windows，若已安裝ActiveX元件
// IE 8,9,10,11 -> 使用ActiveX元件
// 其他瀏覽器 -> 安裝使用新安控元件

// 在MAC，-> 皆提示安裝新安控元件
/*
	0 -> 未定
	1 -> IE with ActiveX
	2 -> IE and other browser with FBWS
	4 -> MAC with FBWS
	5 -> MAC Safari with plugins
 */
var componentType = 0;	//

var OSType = detectOS();
var iever = IeVersion();

if(OSType == "Windows")
{
	//先判斷瀏覽器是否是IE -> 看是否有安裝原ActiveX元件
	if(iever.IsIE == true)
	{
		fbEnrollObj = objElemets.activex.nonCodebase.fbEnrollObj;
		document.write(fbEnrollObj);

		var isAX = AXOrNull();//看是否有安裝原ActiveX元件
		if(isAX == false)//沒裝ActiveX元件
		{
			// IE8,9提示安裝ActiveX元件
			if(iever.TrueVersion == '8' || iever.TrueVersion == '9')
			{
				componentType = 1;
				if(confirm('開始下載並安裝安控元件，安裝完畢後請重啟IE瀏覽器'))
				{
					// 以CAB方式安裝
					fbEnrollObj = objElemets.activex.codebase.fbEnrollObj;
					document.write(fbEnrollObj);
				}
			}
			// IE10,11 沒裝ActiveX元件 -> 後續確認有無安裝新安控元件程式FBWS
			else
			{
				componentType = 2;
			}
		}
		else //若有安裝了ActiveX元件，即使用ActiveX元件
		{
			componentType = 1;
		}
	}

	if(componentType != 1)
	{
		// IE10,11, Chrome, Firefox, Opera等瀏覽器如下述判斷
		// 判斷是否可以連線到FBWS
		var bRc = CheckFBWS_iBankP11();
		if(bRc == false)
		{
			console.log('htEnroll');
			if(confirm('開始下載並安裝網路銀行安控元件服務程式'))
			{
				downloadURI(root +  '/cab/FBWS_Setup.msi');
			}
			
			componentType = 2;
			FBEnrollObj = this.FBiBankP11Obj;
		}
		else
		{
			// 已安裝且執行了FBWS，即使用FBWS
			componentType = 2;
			FBEnrollObj = this.FBiBankP11Obj;
		}
	}	
}
else if(OSType == "MacOSX")
{
	//先判斷瀏覽器是否是Safari
	var isSafari = detectSafari();
	if(isSafari == true)	//是Safari，使用FBWS Plugins
	{
		componentType = 5;
		document.write(objElemets.MAC.fbwsMACObj);
		///
		var isFBWSPlugins = pluginInstalled4MAC_FBWS();
		if(isFBWSPlugins == false)
		{
			componentType = 5;
			if(confirm('開始下載並安裝網路銀行安控元件服務程式'))
			{
				downloadURI(root +  '/cab/FBWS_Plugins_Setup.pkg');
			}
		}
		else
		{
			//有安裝了FBWS Plugins，即使用FBWS Plugins
			componentType = 5;
		}
	}
	else	//是其他瀏覽器，使用FBWS
	{
		// 判斷是否可以連線到FBWS
		var bRc = CheckFBWS_iBankP11();//測試FBWS是否可連通
		if(bRc == false)	//無法連通
		{
			componentType = 4;
			if(confirm('開始下載並安裝網路銀行安控元件服務程式'))
			{
				downloadURI(root +  '/cab/FBWS_Setup.pkg');
			}
		}
		else	// 可連通
		{
			componentType = 4;
			FBEnrollObj = this.FBiBankP11Obj;
		}
	}
}

//////////////////////////////////////
function FBEnroll_createPKCS10(FBEnrollObj, commonName)
{
    var useKeyLength = 2048;
    var strCSR = "";
    
	if (commonName==''){
		alert('請設定 Common Name 內容');
		return '';
	}

	if(componentType == 1)	// 使用ActiveX元件
	{
		var cab_path = FBEnrollObj.FullPath;
    
        var etoken_dll = cab_path + "etoken.dll";
        FBEnrollObj.PKCS11LibName = etoken_dll;//document.thisform.P11Name.value;
        
        strCSR = FBEnrollObj.createPkcs10(commonName, useKeyLength);
		if(strCSR.length == 0)
		{
			showHelpMsg('', FBEnrollObj.LastErrorCode, FBEnrollObj.LastErrorStr);
		}
	}
	// 新安控元件FBWS
	else if(componentType == 2 || componentType == 4)
	{
		var bXHR_status = FBiBankP11Obj.init_FBiBankP11Obj();
		strCSR = FBiBankP11Obj.createPkcs10(commonName, useKeyLength);
		if(strCSR.length == 0)
		{
			showHelpMsg('', FBiBankP11Obj.LastErrorCode, FBiBankP11Obj.LastErrorStr);
		}
	}
	// MAC Safari 使用 plugins
	else if(componentType == 5)
	{
		strCSR = FBEnrollObj.createPkcs10(commonName, useKeyLength);
		if(strCSR.length == 0)
		{
			showHelpMsg('', FBEnrollObj.LastErrorCode, FBEnrollObj.LastErrorStr);
		}
	}

	return strCSR;
}

// funName ex: 簽章憑證匯入瀏覽器/加密憑證匯入瀏覽器
function FBEnroll_InstallCert(FBEnrollObj, certValue, funName) 
{
	if (certValue == "") 
	{
		alert("請設定 憑證內容");
		return -1;
	}
    
    if(componentType == 1)	// 使用ActiveX元件
    {
        var cab_path = FBEnrollObj.FullPath;
        //alert("cab_path = " + cab_path);
    
        var etoken_dll = cab_path + "etoken.dll";
    
        FBEnrollObj.PKCS11LibName = etoken_dll;//document.thisform.P11Name.value;
        //rtn = FBEnrollObj.LastErrorCode; 
        //if(rtn != 0)
        //{
        //    alert("設定PKCS#11模組錯誤:" + FBEnrollObj.LastErrorStr);
        //    return;
        //}

	    var rtn = FBEnrollObj.installCert(certValue);
	    if(rtn != 0) 
	    {
		    //alert(funName+"失敗，錯誤代碼:" + rtn);
	    	showHelpMsg('', rtn, FBEnrollObj.LastErrorStr);
	    }    
    }
    // 新安控元件FBWS
	else if(componentType == 2 || componentType == 4)
    {
        var bXHR_status = FBiBankP11Obj.init_FBiBankP11Obj();
	    var rtn = FBiBankP11Obj.installCert(certValue);
	    if(rtn != 0) 
	    {
            alert(funName+"失敗，錯誤代碼:" + rtn);
	    }            
    }
	// MAC Safari 使用 plugins
	else if(componentType == 5)
	{
		var rtn = FBEnrollObj.installCert(certValue);
	    if(rtn != 0) 
	    {
		    //alert(funName+"失敗，錯誤代碼:" + rtn);
	    	showHelpMsg('', rtn, FBEnrollObj.LastErrorStr);
	    } 
	}
    
	return rtn;
}

function FBEnroll_deleteCertKeyCN_SN(FBEnrollObj, CertCN, CertSN, funName)
{
    // 同樣的CN，將傳入此SN外之憑證刪除
    // 也就是留下傳入SN之憑證，其他相同CN的憑證會被刪除
    if(componentType == 1)	// 使用ActiveX元件
    {
        var cab_path = FBEnrollObj.FullPath;
        //alert("cab_path = " + cab_path);
    
        var etoken_dll = cab_path + "etoken.dll";
    
        FBEnrollObj.PKCS11LibName = etoken_dll;//document.thisform.P11Name.value;
        var rtn = 0;
        rtn = FBEnrollObj.deleteTokenCertKeyByCN_SN(CertCN, CertSN);
        if(rtn != 0) 
	    {
            alert(funName+"失敗，錯誤代碼:" + rtn);
	    }    
    }
    // 新安控元件FBWS
	else if(componentType == 2 || componentType == 4)
    {
        var bXHR_status = FBiBankP11Obj.init_FBiBankP11Obj();
        var rtn = FBiBankP11Obj.deleteTokenCertKeyByCN_SN(CertCN, CertSN);
        if(rtn != 0) 
	    {
            alert(funName+"失敗，錯誤代碼:" + rtn);
	    }
    }
	// MAC Safari 使用 plugins
	else if(componentType == 5)
	{
		var rtn = 0;
        rtn = FBEnrollObj.deleteTokenCertKeyByCN_SN(CertCN, CertSN);
        if(rtn != 0) 
	    {
            alert(funName+"失敗，錯誤代碼:" + rtn);
	    }  
	}
}

function showHelpMsg(operation, errCode, errMsg)
{
	//alert(operation);
	var msg;
	//alert(errCode);
	switch(errCode){
		case 0x201:
            msg = '['+errCode+']傳入參數錯誤';
			break;
        case 0x202:
            msg = '['+errCode+']記憶體配置錯誤';
			break;
        case 0x203:
             msg = '['+errCode+']資料格式錯誤';
			break;
        case 0x204:
            msg = '['+errCode+']操作錯誤';
			break;
        case 0x205:
            msg = '['+errCode+']呼叫程序順序錯誤錯誤';
			break;
        case 0x206:
            msg = '['+errCode+']操作逾時錯誤';
			break;
        case 0x207:
            msg = '['+errCode+']憑證載具密碼錯誤';
			break;
        case 0x208:
            msg = '['+errCode+']憑證載具密碼鎖住';
			break;
        case 0x209:
            msg = '['+errCode+']憑證載具密碼不合法';
			break;
        case 0x20A:
            msg = '['+errCode+']憑證載具功能操作錯誤';
			break;
        case 0x20B:
            msg = '['+errCode+']PKCS#11物件不存在';
			break;
        case 0x20C:
            msg = '['+errCode+']PKCS#11私鑰不存在';
			break;
        case 0x20D:
            msg = '['+errCode+']PKCS#11公鑰不存在';
			break;
        case 0x20E:
            msg = '['+errCode+']PKCS#11憑證不存在';
			break;
        case 0x20F:
            msg = '['+errCode+']多於一個PKCS#11物件';
			break;
        case 0x210:
            msg = '['+errCode+']憑證已被安裝';
			break;
        case 0x211:
            msg = '['+errCode+']憑證載具未插入, 請插入正確憑證載具eToken 5200';
			break;
        case 0x212:
            msg = '['+errCode+']偵測到多個憑證載具';
			break;
        case 0x213:
            msg = '['+errCode+']存取系統登錄樹錯誤';
			break;
        case 0x214:
            msg = '['+errCode+']取得IP MAC位址錯誤';
			break;
        case 0x215:
            msg = '['+errCode+']元件網址驗證錯誤';
			break;
        case 0x216:
            msg = '['+errCode+']憑證載具存取物件錯誤！';
			break;
        case 0x217:
            msg = '['+errCode+']使用者取消';
			break;
        case 0x218:
            msg = '['+errCode+']MS CAPI操作錯誤';
			break;
        case 0x219:
            msg = '['+errCode+']憑證已過期';
			break;
        case 0x21A:
            msg = '['+errCode+']安裝憑證時配對錯誤';
			break;
        case 0x21B:
            msg = '['+errCode+']檔案不存在';
			break;
        case 0x21C:
            msg = '['+errCode+']Challenge回應錯誤';
			break;
        case 0x21D:
            msg = '['+errCode+']WEB連線錯誤';
			break;
        case 0x21E:
            msg = '['+errCode+']元件網址驗證錯誤';
			break;
        case 0x21F:
            msg = '['+errCode+']憑證載具密碼不相同';
			break;
        case 0x220:
            msg = '['+errCode+']憑證載具密碼原密碼是空值';
			break;
        case 0x221:
            msg = '['+errCode+']憑證載具密碼新密碼是空值';
			break;
        case 0x222:
            msg = '['+errCode+']憑證載具密碼確認密碼是空值';
			break;
        case 0x230:
            msg = '['+errCode+']憑證載具密碼無效';
			break;
        case 0x231:
            msg = '['+errCode+']憑證載具密碼過期';
			break;
        case 0x232:
            msg = '['+errCode+']時間格式錯誤';
			break;
        case 0x233:
            msg = '['+errCode+']PKCS#11物件存在';
			break;
        case 0x234:
            msg = '['+errCode+']PKCS#11物件不存在';
			break;
        case 0x235:
            msg = '['+errCode+']配置記憶體空間不足';
			break;
        case 0x236:
            msg = '['+errCode+']不支援此PKCS#11模組';
			break;
        case 0x237:
            msg = '['+errCode+']PIN碼長度不符';
			break;
        case 0xFFF:
            msg = '['+errCode+']其他錯誤！';
			break;
        default:
		  msg = "不明錯誤";
		  //msg += "\r\n";
		  //msg += "系統訊息:"+errMsg;
    }
	
	if(operation!='')
		msg = operation + ':\r\n' + msg;
	
    top.$("#waringMsg .pop-content").text(msg);
	top.modal1.toggle();
//	return msg;
}
function downloadURI(url) {
	var elemiframe = document.createElement('iframe');
	elemiframe.style.display = "none";
	elemiframe.src = url;
	try {
		document.body.appendChild(elemiframe);
	}catch (e) {
		window.open(url);
	}
}