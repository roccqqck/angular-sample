///////////////////////////////////////////////////////////////////////////////
//// ActiveX 元件宣告
var fbcertvaObj;
var root = "/" + location.pathname.split("/")[1];
var objElemets={
		activex:{
			codebase:{
				fbcertvaObj:" <object classid='clsid:66B86E99-B84B-48DE-B081-052237DD60AD' class='fly_away'              "
    				+ "               codebase='/NetBank/cab/FBCertVA.cab#Version=1,1603,28,1' height='0'  "
    				+ "               id =FBCertVAObj></object>                          "
			},
			nonCodebase:{
				fbcertvaObj:" <object classid='clsid:66B86E99-B84B-48DE-B081-052237DD60AD' class='fly_away'             "
    				+ "               id =FBCertVAObj></object>                          "
			}
		},
		plugin:{},
		MAC:{
			fbwsMACObj :"<embed id='FBCertVAObj' name='FBWSObj' class='fly_away'"
        		+ "style='LEFT: 10px; TOP: 0px; VISIBILITY: visible; width: 10px; height: 10px; background: red;' "
       		 	+ "pluginspage='../cab/FBWS_Plugins_Setup.pkg' "
        		+ "type='application/fbws-plugins' /> "
		}
};

///////////////////////////////////////////////////////////////////////////////
//// FBiBankPVA webserver socket 元件宣告
var FBiBankVAObj = 
{
    xmlhttp : null,            // FBiBankVA webserver socket 使用之變數
    ibankxhr_url : "",        // 連線ibank url

    TokenSN_str : "",        // GetTokenSN 回傳之結果
    P7SignResult : "",        // PKCS7 簽章結果

    certificate : "",
    serialNumber : "",
    issuerName : "",
    subjectName : "",
    keyUsage : "",
    startDate : "",
    endDate : "",
    selectedCertLength : 2048,

    FullPath : "",
    PKCS11LibName : "",
    DetectedTokenPKCS11LibName : "",
    VERSION_str : "",

    LastErrorStr : "",        //函式回傳之錯誤代碼訊息
    LastErrorCode : 0,        //函式回傳之錯誤代碼

    init_FBiBankVAObj : function()
    {
        if (window.XMLHttpRequest)
        {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            FBiBankVAObj.xmlhttp = new XMLHttpRequest();
            //FBiBankVAObj.xmlhttp.overrideMimeType('text/plain');
        }
        else
        {
            return false;
        }

        FBiBankVAObj.ibankxhr_url = "https://127.0.0.1:20558/FBiBankVA";
        FBiBankVAObj.xmlhttp.onload = function(event){FBiBankVAObj.recv_FBiBankVAObj(event);};

        var init_status = FBiBankVAObj.sendData_FBiBankVAObj("FBWS_Echo");
        if(init_status == undefined)
        {
            return false;
        }

        var echo_result = FBiBankVAObj.xmlhttp.responseText;
        if(init_status == undefined)
        {
            return false;
        }
        var echo_result = FBiBankVAObj.xmlhttp.responseText;
        if(echo_result == "FBWS_ECHO_OK")
            return true;
        else 
            return false;
    },
    recv_FBiBankVAObj : function(event)
    {
        var retValue = FBiBankVAObj.getReturnData(FBiBankVAObj.xmlhttp.responseText);
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
    sendData_FBiBankVAObj : function(cmd_string)
    {
        //FBiBankVAObj.xmlhttp.open("POST",ibankxhr_url,true);
        try{
            FBiBankVAObj.xmlhttp.open("POST",FBiBankVAObj.ibankxhr_url,false);
            FBiBankVAObj.xmlhttp.setRequestHeader("Content-Type", "text/plain");
            FBiBankVAObj.xmlhttp.send(cmd_string);
        }catch(err){
            return undefined;
        }
        
        return FBiBankVAObj.LastErrorCode;
    },
    ///////////////////////
    setLanguage : function(lang)
    {
        var setLanguage_str = "setLanguage||" + lang;
        return FBiBankVAObj.sendData_FBiBankVAObj(setLanguage_str);
    },
    SetPKCS11LibName :function(PKCS11DLL)
    {
        var setPKCS11LibName_str = "SetPKCS11LibName||" + PKCS11DLL;
        return FBiBankVAObj.sendData_FBiBankVAObj(setPKCS11LibName_str);
    },
    VERSION : function()
    {
        var VERSION_str = "VERSION||noparam"
        return FBiBankVAObj.sendData_FBiBankVAObj(VERSION_str); 
    },
    GetTokenSN : function(P11DLL)
    {
        var GetTokenSN_str = "GetTokenSN||" + P11DLL;
        FBiBankVAObj.sendData_FBiBankVAObj(GetTokenSN_str);
        if(FBiBankVAObj.LastErrorCode == 0)
            return FBiBankVAObj.TokenSN_str;
        else
            return "";
    },
    selectCertificateBySubjectCN : function(strSubjectCN){
        var selectCertificateBySubjectCN_str = "selectCertificateBySubjectCN||" + strSubjectCN;
        return FBiBankVAObj.sendData_FBiBankVAObj(selectCertificateBySubjectCN_str);
    },
    selectCertificate_Ex : function(strKeyUsage){
        var selectCertificate_Ex_str = "selectCertificate_Ex||" + strKeyUsage;
        return FBiBankVAObj.sendData_FBiBankVAObj(selectCertificate_Ex_str);
    },
    selectCertificateBySubjectCN_Ex : function(strSubjectCN, strKeyUsage){
        var selectCertificateBySubjectCN_Ex_str = "selectCertificateBySubjectCN_Ex||" + strSubjectCN + "||" + strKeyUsage;
        return FBiBankVAObj.sendData_FBiBankVAObj(selectCertificateBySubjectCN_Ex_str);
    },
    getSignedEnvelopByString : function()
    {
        var getSignedEnvelopByString_str = "getSignedEnvelopByString||noparam";
        FBiBankVAObj.sendData_FBiBankVAObj(getSignedEnvelopByString_str);    
        if(FBiBankVAObj.LastErrorCode == 0)
            return FBiBankVAObj.P7SignResult;
        else
            return "";
    },
    setDataContentByString : function(strDataContent)
    {
        var setDataContentByString_str = "setDataContentByString||" + strDataContent;
        return FBiBankVAObj.sendData_FBiBankVAObj(setDataContentByString_str); 
    },
    VAPKCS7Sign : function(strP11DLL, strPersonID, strDataContent, strDigestMethod, strSignatureMethod){
        var VAPKCS7Sign_str = "VAPKCS7Sign||" + strP11DLL + "||" + strPersonID + "||" + strDataContent + "||" + strDigestMethod + "||" + strSignatureMethod;
        return FBiBankVAObj.sendData_FBiBankVAObj(VAPKCS7Sign_str);
    },
    VAPKCS7SignIO : function(strP11DLL, strPersonID, strDataContent, strDigestMethod, strSignatureMethod){
        var VAPKCS7SignIO_str = "VAPKCS7SignIO||" + strP11DLL + "||" + strPersonID + "||" + strDataContent + "||" + strDigestMethod + "||" + strSignatureMethod;
        return FBiBankVAObj.sendData_FBiBankVAObj(VAPKCS7SignIO_str);
    },
    PKCS7Sign : function(strPersonID, strCert, strDataContent, strDigestMethod, strSignatureMethod){
        var PKCS7Sign_str = "PKCS7Sign||" + strPersonID + "||" + strCert + "||" + strDataContent + "||" + strDigestMethod + "||" + strSignatureMethod;
        return FBiBankVAObj.sendData_FBiBankVAObj(PKCS7Sign_str);
    },
    PKCS7SignIO : function(strPersonID, strCert, strDataContent, strDigestMethod, strSignatureMethod){
        var PKCS7SignIO_str = "PKCS7SignIO||" + strPersonID + "||" + strCert + "||" + strDataContent + "||" + strDigestMethod + "||" + strSignatureMethod;
        return FBiBankVAObj.sendData_FBiBankVAObj(PKCS7SignIO_str);
    },
    getReturnData : function(returnString)
    {
        var retStringParts = returnString.split("||");

        var strFuncName = retStringParts[0];
        var strRtn = retStringParts[1];

        if(strFuncName == "setLanguage")
        {
            return 0;
        }
        else if(strFuncName == "SetPKCS11LibName")
        {
            if(strRtn == "0")
            {
                FBiBankVAObj.LastErrorStr = "";
                FBiBankVAObj.LastErrorCode = 0;
                return 0;
            }
            else
            {
                FBiBankVAObj.LastErrorStr = retStringParts[2];
                FBiBankVAObj.LastErrorCode = parseInt(retStringParts[1]);
                return FBiBankVAObj.LastErrorCode;
            }
        }
        else if(strFuncName == "VERSION")
        {
            if(strRtn == "0")
            {
                FBiBankVAObj.VERSION_str = retStringParts[2];
                FBiBankVAObj.LastErrorStr = "";
                FBiBankVAObj.LastErrorCode = 0;
                return FBiBankVAObj.VERSION_str;
            }
            else
            {
                FBiBankVAObj.LastErrorStr = retStringParts[2];
                FBiBankVAObj.LastErrorCode = parseInt(retStringParts[1]);
                return FBiBankVAObj.LastErrorCode;
            }
        }
        else if(strFuncName == "GetTokenSN")
        {
            if(strRtn == "0")
            {
                FBiBankVAObj.TokenSN_str = retStringParts[2];
                FBiBankVAObj.LastErrorStr = "";
                FBiBankVAObj.LastErrorCode = 0;
                return FBiBankVAObj.TokenSN_str;    //若取得載具序號成功，回傳載具序號
            }
            else
            {
                FBiBankVAObj.TokenSN_str = "";
                FBiBankVAObj.LastErrorStr = retStringParts[2];
                FBiBankVAObj.LastErrorCode = parseInt(strRtn);
                return "";                        //若取得載具序號失敗，回傳空字串
            }
        }
        else if(strFuncName == "selectCertificate_Ex")
        {
            if(strRtn == "0"){
                FBiBankVAObj.certificate = retStringParts[2];
                FBiBankVAObj.serialNumber = retStringParts[3];
                FBiBankVAObj.issuerName = retStringParts[4];
                FBiBankVAObj.subjectName = retStringParts[5];
                FBiBankVAObj.keyUsage = retStringParts[6];
                FBiBankVAObj.startDate = retStringParts[7];
                FBiBankVAObj.endDate = retStringParts[8];
                FBiBankVAObj.selectedCertLength = parseInt(retStringParts[9]);
                FBiBankVAObj.LastErrorCode = parseInt(strRtn);
                   return 0;                                     
            }
            else{
                FBiBankVAObj.LastErrorStr = retStringParts[2];
                FBiBankVAObj.LastErrorCode = parseInt(retStringParts[1]);
                return FBiBankVAObj.LastErrorCode;
            }
        }
        else if(strFuncName == "selectCertificateBySubjectCN")
        {
            if(strRtn == "0"){
                FBiBankVAObj.certificate = retStringParts[2];
                FBiBankVAObj.serialNumber = retStringParts[3];
                FBiBankVAObj.issuerName = retStringParts[4];
                FBiBankVAObj.subjectName = retStringParts[5];
                FBiBankVAObj.keyUsage = retStringParts[6];
                FBiBankVAObj.startDate = retStringParts[7];
                FBiBankVAObj.endDate = retStringParts[8];
                FBiBankVAObj.selectedCertLength = parseInt(retStringParts[9]);
                FBiBankVAObj.LastErrorCode = parseInt(strRtn);
                   return 0;                                     
            }
            else{
                FBiBankVAObj.LastErrorStr = retStringParts[2];
                FBiBankVAObj.LastErrorCode = parseInt(retStringParts[1]);
                return FBiBankVAObj.LastErrorCode;
            }
        }
        else if(strFuncName == "selectCertificateBySubjectCN_Ex")
        {
            if(strRtn == "0"){
                FBiBankVAObj.certificate = retStringParts[2];
                FBiBankVAObj.serialNumber = retStringParts[3];
                FBiBankVAObj.issuerName = retStringParts[4];
                FBiBankVAObj.subjectName = retStringParts[5];
                FBiBankVAObj.keyUsage = retStringParts[6];
                FBiBankVAObj.startDate = retStringParts[7];
                FBiBankVAObj.endDate = retStringParts[8];
                FBiBankVAObj.selectedCertLength = parseInt(retStringParts[9]);
                FBiBankVAObj.LastErrorCode = parseInt(strRtn);
                   return 0;                                     
            }
            else{
                FBiBankVAObj.LastErrorStr = retStringParts[2];
                FBiBankVAObj.LastErrorCode = parseInt(retStringParts[1]);
                return FBiBankVAObj.LastErrorCode;
            }
        }
        else if(strFuncName == "getSignedEnvelopByString")
        {
            if(strRtn == "0")
            {
                FBiBankVAObj.P7SignResult = retStringParts[2];
                FBiBankVAObj.LastErrorStr = "";
                FBiBankVAObj.LastErrorCode = 0;
                return FBiBankVAObj.P7SignResult;
            }
            else
            {
                FBiBankVAObj.LastErrorStr = retStringParts[2];
                FBiBankVAObj.LastErrorCode = parseInt(retStringParts[1]);
                return "";
            }
        }
        else if(strFuncName == "setDataContentByString")
        {
            if(strRtn == "0")
            {
                FBiBankVAObj.LastErrorStr = "";
                FBiBankVAObj.LastErrorCode = 0;
                return 0;
            }
            else
            {
                FBiBankVAObj.LastErrorStr = retStringParts[2];
                FBiBankVAObj.LastErrorCode = parseInt(retStringParts[1]);
                return FBiBankVAObj.LastErrorCode;
            }
        }
        else if(strFuncName == "VAPKCS7Sign")
        {
            if(strRtn == "0")
            {
                FBiBankVAObj.LastErrorStr = "";
                FBiBankVAObj.LastErrorCode = 0;
                return 0;
            }
            else
            {
                FBiBankVAObj.LastErrorStr = retStringParts[2];
                FBiBankVAObj.LastErrorCode = parseInt(retStringParts[1]);
                return FBiBankVAObj.LastErrorCode;
            }
        }
        else if(strFuncName == "VAPKCS7SignIO")
        {
            if(strRtn == "0")
            {
                FBiBankVAObj.LastErrorStr = "";
                FBiBankVAObj.LastErrorCode = 0;
                return 0;
            }
            else
            {
                FBiBankVAObj.LastErrorStr = retStringParts[2];
                FBiBankVAObj.LastErrorCode = parseInt(retStringParts[1]);
                return FBiBankVAObj.LastErrorCode;
            }
        }
        else if(strFuncName == "PKCS7Sign")
        {
            if(strRtn == "0")
            {
                FBiBankVAObj.LastErrorStr = "";
                FBiBankVAObj.LastErrorCode = 0;
                return 0;
            }
            else
            {
                FBiBankVAObj.LastErrorStr = retStringParts[2];
                FBiBankVAObj.LastErrorCode = parseInt(retStringParts[1]);
                return FBiBankVAObj.LastErrorCode;
            }
        }
        else if(strFuncName == "PKCS7SignIO")
        {
            if(strRtn == "0")
            {
                FBiBankVAObj.LastErrorStr = "";
                FBiBankVAObj.LastErrorCode = 0;
                return 0;
            }
            else
            {
                FBiBankVAObj.LastErrorStr = retStringParts[2];
                FBiBankVAObj.LastErrorCode = parseInt(retStringParts[1]);
                return FBiBankVAObj.LastErrorCode;
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

function paddingLeft(str, len)
{
    if(str.length >= len)
        return str;
    else
        return paddingLeft('0' + str, len);
}

function detectMACOSVer()
{
    var _platform = navigator.platform;
    var _userAgent = navigator.userAgent;
    var osVersion = "";
    
    switch(_platform)
    {
        case "MacIntel":
          osVersion = /Mac OS X (10[\.\_\d]+)/.exec(_userAgent)[1];
          break;
        default:
				  osVersion = "";      
    }
    
    osVersion = osVersion.split("_");
    if(osVersion.length == 1)
    {
        //為了firefox
        osVersion = osVersion[0].split(".");
    }
    
    var res = "";
	if (osVersion.length == 2)
		var res = parseInt(osVersion[0] * 1000000) + parseInt(osVersion[1] * 1000);
	else if (osVersion.length == 3)
		var res = parseInt(osVersion[0] * 1000000) + parseInt(osVersion[1] * 1000) + parseInt(osVersion[2]);
	return res;
}

//判斷是否已安裝元件
function AXOrNull() 
{
    try    
    {
        if ("undefined"==typeof(FBCertVAObj.FullPath))
        {
            /*fbcertvaObj = objElemets.activex.codebase.fbcertvaObj;
            if(confirm('開始下載並安裝元件'))
            {
                document.write(fbcertvaObj);
            }*/
            return false;
        }
        else
        {
            return true;
        }
    }
    catch (ex)
    {
        confirm("FBCertVA元件未正常安裝!!");
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
function CheckFBWS_iBankVA()
{
    var bRcVA = FBiBankVAObj.init_FBiBankVAObj();
    if(bRcVA == true)
        return true;
    else
        return false;
}

//===============================================
// 在windows，若未安裝ActiveX元件
// IE 8,9,10,11 -> 提示安裝使用新安控元件
// 其他瀏覽器 -> 安裝使用新安控元件
// 在windows，若已安裝ActiveX元件
// IE 8,9,10,11 -> 使用ActiveX元件
// 其他瀏覽器 -> 安裝使用新安控元件
//===============================================
// 在MAC，若未安裝Plugins元件
// -> 提示安裝新安控元件
// 在MAC，若已安裝Plugins元件
// Safari -> 使用Plugins元件
// 其他瀏覽器 -> 安裝使用新安控元件
/*
    0 -> 未定
    1 -> IE with ActiveX
    2 -> other browser with FBWS
    //3 -> MAC Safari with Old Plugins
    4 -> MAC with FBWS
    5 -> MAC Safari with New Plugins
 */
var componentType = 0;    //

var OSType = detectOS();
var iever = IeVersion();

if(OSType == "Windows")
{
    //先判斷瀏覽器是否是IE -> 看是否有安裝原ActiveX元件
    if(iever.IsIE == true)
    {
        fbcertvaObj = objElemets.activex.nonCodebase.fbcertvaObj;
        document.write(fbcertvaObj);

        var isAX = AXOrNull();//看是否有安裝原ActiveX元件
        if(isAX == false)//沒裝ActiveX元件
        {
            //IE 7,8,9,10,11 -> 提示安裝ActiveX元件
	          if(iever.IsIE == true)
            {
                componentType = 1;
                if(confirm('開始下載並安裝安控元件，安裝完畢後請重啟IE瀏覽器'))
                {
                    // 以CAB方式安裝
                    fbcertvaObj = objElemets.activex.codebase.fbcertvaObj;
                    document.write(fbcertvaObj);
                }
            }
            else  // iever.IsIE == false --> 其他瀏覽器 --> 使用新安控元件
            {
                componentType = 2;
            }
        }
        else  //若有安裝了ActiveX元件，即使用ActiveX元件
        {
            componentType = 1;
        }
    }

    if(componentType != 1)
    {
        // Chrome, Firefox, Opera等瀏覽器如下述判斷
        // 判斷是否可以連線到FBWS
        var bRc = CheckFBWS_iBankVA();
        if(bRc == false)
        {
            console.log('fbcertva');
            if(confirm('開始下載並安裝網路銀行安控元件服務程式'))
            {
                downloadURI(root +  '/cab/FBWS_Setup.msi');
            }
            
            componentType = 2;
            FBCertVAObj = this.FBiBankVAObj;
        }
        else
        {
            // 已安裝且執行了FBWS，即使用FBWS
            componentType = 2;
            FBCertVAObj = this.FBiBankVAObj;
        }
    }
}
else if(OSType == "MacOSX")
{
    //先判斷瀏覽器是否是Safari
    var isSafari = detectSafari();
    if(isSafari == true)    //是Safari，使用FBWS Plugins
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
                //downloadURI(root +  '/cab/FBWS_Setup.pkg');
                downloadURI(root +  '/cab/FBWS_Plugins_Setup.pkg');
            }
        }
        else
        {
            //有安裝了FBWS Plugins，即使用FBWS Plugins
            componentType = 5;
        }
    }
    else    //是其他瀏覽器，使用FBWS
    {
		// 判斷是否可以連線到FBWS
		var bRc = CheckFBWS_iBankVA();//測試FBWS是否可連通
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
            FBCertVAObj = this.FBiBankVAObj;
		}
    }
}

//////////////////////////////////////

////

var detectedP11Token = "";
var p7Sign_ShowHelpMsgSwitch = true;

function initFBCertVAObj(P11orCAPI)
{
    if(componentType == 1)    // 使用ActiveX元件
    {
        // FBCertVAObj Obj be installed
        if(typeof(FBCertVAObj) == "object")
        {
            if((FBCertVAObj.object == null) )
            {
                alert("安控元件未正常安裝!!");
                return "";  
            }
        }
        if(P11orCAPI == "P11")
        {
            var hicospkcs11_dll = "HiCOSPKCS11.dll";
            var cab_path = FBCertVAObj.FullPath;
            hicospkcs11_dll = cab_path + hicospkcs11_dll;
            var rtn = FBCertVAObj.SetPKCS11LibNames(hicospkcs11_dll);
            if(rtn == 0)
            {
                detectedP11Token = FBCertVAObj.DetectedTokenPKCS11LibName;
                //alert(detectedP11Token);
                FBCertVAObj.PKCS11LibName = detectedP11Token;
            }   
            return "P11";
        }
        else    
        {
            FBCertVAObj.PKCS11LibName = ""; //use MS CAPI
            return "CAPI";
        }
    }
    // 新安控元件FBWS
    else if(componentType == 2 || componentType == 4)    
    {
        var bRc = FBiBankVAObj.init_FBiBankVAObj();
        if(bRc == true)
        {
            if(P11orCAPI == "P11")
            {
                if(OSType == "Windows")
                    detectedP11Token = "HiCOSPKCS11.dll";
                else
                    detectedP11Token = "/Library/FBTokenLib/libHicos_p11v1.dylib";

                FBiBankVAObj.SetPKCS11LibName(detectedP11Token);
                return "P11";
            }
            else
            {
                return "CAPI";
            }
        }
        else
        {
            alert("安控元件未正常安裝!!");
            return "";
        }
    }
    // MAC Safari 使用 plugins
    else if(componentType == 5)
    {
        // check plugins ok or Not
        // var isSafariPlugins = checkSafariPlugins();
        //if(isSafariPlugins == true)
        //{
            if(P11orCAPI == "P11")
            {
                if(OSType == "Windows")
                    detectedP11Token = "HiCOSPKCS11.dll";
                else
                    detectedP11Token = "/Library/FBTokenLib/libHicos_p11v1.dylib";

                FBCertVAObj.SetPKCS11LibName(detectedP11Token);
                return "P11";
            }
            else
            {
                return "CAPI";
            }
        //}
        //else
        //{
        //    alert("安控元件未正常安裝!!");
        //    return "";
        //}
    }
}

var p7Sign_DataContent="";   //要簽章的內容
var p7Sign_SignCert="";      //簽章者憑證
var p7Sign_SignedStr="";     //PKCS7簽章結果

function PKCS7Sign(P11orCAPI,personID, dataContent, digestMethod, signatureMethod)
{
      var p11_or_capi = initFBCertVAObj(P11orCAPI);
      var lRtn = 0;
      if(p11_or_capi == "")
    {
         //alert("請確認元件安裝完成!");
         return false;
    }  
      // 確認要簽章的資料
      p7Sign_DataContent = dataContent;     
      if (p7Sign_DataContent == "")
      {
         //alert("請輸入文件字串");
         return false;
      }  
      // 確認身分證字號
      if(personID.length != 10 )
      {
         alert("請輸入10位身份證字號");
         return false;
      }  
      if(p11_or_capi == "P11")
      {
         if(detectedP11Token == "")
         {
            alert("請確認插入正確憑證載具!");
            return false;
         }       
         //  選擇憑證
         //if(detectedP11Token.indexOf("HiCOSPKCS11.dll") != -1)
         //{
            // 自然人憑證,選擇簽章憑證
            if ((lRtn = FBCertVAObj.selectCertificate_Ex(1)) !=0)
            {
                 showHelpMsg("選擇憑證", lRtn, FBCertVAObj.LastErrorStr);
                 alert("無法選取自然人憑證，請確認自然人憑證晶片卡與讀卡機連線是否正確");
                 return false;
            }
         //}
      }
      else // CAPI
      {
         //  選擇憑證
         if ((lRtn = FBCertVAObj.selectCertificateBySubjectCN(personID)) !=0)
         {
            showHelpMsg("選擇憑證", lRtn, FBCertVAObj.LastErrorStr);
            alert("無法選取簽章憑證，請確認憑證是否存在");
            return false;
         }    
      }  
      p7Sign_SignCert = FBCertVAObj.certificate;   
      // 憑證簽章 
      // 正常版不抽拔-->PKCS7Sign , 要拔插-->PKCS7SignIO
      lRtn = FBCertVAObj.PKCS7Sign(personID, p7Sign_SignCert, p7Sign_DataContent, digestMethod, signatureMethod);
      //lRtn = FBCertVAObj.PKCS7SignIO(personID, p7Sign_SignCert, p7Sign_DataContent, digestMethod, signatureMethod);
      if(lRtn != 0)
      {
        showHelpMsg("使用者簽章", lRtn, FBCertVAObj.LastErrorStr);
        return false;    
      }  
      var signedString = FBCertVAObj.getSignedEnvelopByString();
    if(signedString == "")
    {
        showHelpMsg("使用者簽章", FBCertVAObj.LastErrorCode, FBCertVAObj.LastErrorStr);
        return false;
    } 
      p7Sign_SignedStr = signedString;  
      return true;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
function showHelpMsg(operation, errCode, errMsg)
{
    //alert(operation);
    var msg;
    switch(errCode) 
    {
        case 1:
            msg = "[1]傳入參數錯誤(Parameter Error)";
            msg += "\r\n";
            msg += "系統訊息:"+errMsg;
            break;
        case 2:
            msg = "[2]請關閉IE瀏覽器重新操作";
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
            break;
        case 3:
            msg = "[3]功能處理錯誤(Operation Error)";
            msg += "\r\n";
            msg += "系統訊息:"+errMsg;
            break;
        case 4:
            msg = "[4]請確認是否已插入含有正確憑證之憑證載具，或IE中已註冊有該憑證";
            break;
        case 5:
            msg = "[5]憑證或CRL格式錯誤(Certificate/CRL Error)";
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
            break;
        case 6:
            msg = "[6]憑證或CRL找不到簽發單位(Issuer not Found)";
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
            break;
        case 7:
            msg = "[7]憑證或CRL驗證失敗(Verify Failure by Issuer Public Key)";
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
            break;
        case 8:
            msg = "[8]憑證已過期(Expired)";
            break;
        case 9:
            msg = "[9]憑證未登記(Not Register)";
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
            break;
        case 10:
            msg = "[10]憑證已暫禁(Suspend)";
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
            break;
        case 11:
            msg = "[11]憑證已註銷(Canceled)";
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
            break;
        case 12:
            msg = "[12]找不到對應的Public Key (Public Key not Found)";
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
            break;
        case 13:
            msg = "[13]找不到對應的Private Key (Private Key not Found)";
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
            break;
        case 14:
            msg = "[14]憑證的Public Key與Private Key不相符(Key Pair not Match)";
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
            break;
        case 15:
            msg = "[15]上載資料格式錯誤(Update Data Format Error)";
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
            break;
        case 16:
            msg = "[16]下載資料格式錯誤(Download Data Format Error)";
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
            break;
        case 17:
            msg = "[17]輸入資料格式錯誤(Input Data Format Error)";
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
            break;
        case 18:
            msg = "[18]Template格式錯誤(Template Format Error)";
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
            break;
        case 19:
            msg = "[19]資料(如XML element)找不到(Data not Found)";
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
            break;
        case 20:
            msg = "[20]檔案找不到(File not Found)";
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
            break;
        case 21:
            msg = "[21]卡片密碼錯誤(Password Invalid)";
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
            break;
        case 22:
            msg = "[22]通訊錯誤(URL not Found or not Responsed)";
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
            //return "[22]通訊錯誤(URL not Found or not Responsed)";
        case 23:
            msg = "[23]無法正確使用您的數位憑證。\r\n" +
                       "有下列可能原因：\r\n" +
                       " 1. 憑證載具驅動程式有誤，請確認憑證載具驅動程式安裝是否正確\r\n"
                       " 2. 請確認憑證載具是否插妥，或自然人憑證晶片卡是否插入正確之讀卡機中\r\n"
                       " 3. 私密金鑰設為高安全性保護，而您未輸入正確密碼\r\n" +
                       "      當系統提示時，請輸入保護私密金鑰的正確密碼。"
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
            break;
        case 24:
            msg = "[24]金鑰型態錯誤(Key Type Error)";
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
            break;
        case 25:
            msg = "[25]演算法錯誤(Algorithm Error)";
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
            break;
        case 26:
            msg = "[26]金鑰長度錯誤(Key Length Error)";
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
            break;
        case 27:
            msg = "[27]金鑰找不到(Key Id not Found)";
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
            break;
        case 28:
            msg = "[28]使用者取消(User Cancel)";
            break;
        case 50:
            msg = "[50]使用者載具密碼不正確(User Token PIN is incorrect)";
            break;            
        case 51:
            msg = "[51]使用者載具密碼不合法(User Token PIN is illegal)";
            break;    
        case 52:
            msg = "[52]使用者載具密碼被鎖住(User Token PIN is locked)";
            break;
        case 53:
            msg = "[53]圖形驗證碼不正確(GRD Code  is illegal)";
            break;
        case 54:
            msg = "[54]動態密碼不正確(Dynamic PIN is illegal)";
            break;                                    
        case 55:
            msg = "[55]使用者載具未插入(User Token not found)";
            break;
        case 61:
            msg = "[61]元件網址驗證失敗(User ActiveX URL is illegal)";
            break;            
        case 62:
            msg = "[62]使用者載具插拔逾時(User Token Plug in-out timeout)";
            break;
        case 63:
            msg = "[63]使用者載具數目太多(User Token is too many)\r\n" + 
                  "   請拔出所有載具後，再插入交易用之載具重新進行交易" ;
            break;
        case 64:
            msg = "[64]載入載具函式庫失敗(Load Token Library failed)";
            break;            
        case 65:
            msg = "[65]初始化載具失敗(Initialize Token failed)";
            break;
        case 71:
            msg = "[71]取得使用者電腦之IP與MAC位址失敗(Get User PC IP and MAC address failed)";
            break;            
        case 99:
            msg = "[99]其他錯誤(Others)";
            msg += "\r\n";
            msg += "系統訊息:"+errMsg;
            break;
        default:
            msg = "不明錯誤";
            //msg += "\r\n";
            //msg += "系統訊息:"+errMsg;
    }
    if(operation != "")
        msg = operation + "\r\n" + msg;

    if(p7Sign_ShowHelpMsgSwitch)
        alert(msg);
    return msg;
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