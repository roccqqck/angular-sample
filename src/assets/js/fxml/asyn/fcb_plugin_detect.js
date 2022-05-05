//var PLUGIN_VERSION_NEWEST = "";
//var WINDOWS_PLUGIN_VERSION_NEWEST = "1.1711.08.12";
//var MAC_PLUGIN_VERSION_NEWEST = "1.1711.08.12";
var ht_Sync_Plugin_Installed = false;
var ht_WS_Installed = false;

var fbcertvaObj;
var fbEnrollObj;
var pkcs7SignObj; // 簽章
var fbibanktxnObj; // 交易簽章，憑證載具管理
var macClientObj;
var dllpath;
var root = "/" + location.pathname.split("/")[1];
var objElemets = {
	    activex: {
	        codebase: {
	            fbcertvaObj: " <object class='fly_away' classid='clsid:66B86E99-B84B-48DE-B081-052237DD60AD'" +
	                " codebase='../cab/FBCertVA.cab#Version=1,1603,28,1' height='0'" +
	                " id =FBCertVAObj></object>",
                fbEnrollObj: " <object class='fly_away' classid='clsid:1740CEC6-953A-472e-ADDF-1DD220BC50ED' " +
                	" codebase='../cab/FBEnroll.cab#Version=1,1409,24,2' height='0' " +
                	" id =FBEnrollObj></object>",
                pkcs7SignObj: " <object class='fly_away' classid='clsid:2CD1D011-1DC4-4EBC-B03E-67E3713DF5A3' " +
                	" codebase='../cab/FBPKCS7SignatureClientCOM.cab#Version=1,1304,1,1' height='0'  " +
                	" id =P7SignatureClientObj></object>",
	            fbibanktxnObj: " <object class='fly_away' classid='clsid:478A696E-201A-4846-B07D-C35199EC3E5F' " +
	                " codebase='../cab/FBiBankTxn.cab#Version=1,1505,9,16' height='0'  " +
	                " id ='FBiBankTxnObj'></object>",
    			macClientObj:"<OBJECT class='fly_away' classid='clsid:7CA530F5-D51F-4E60-9F32-47CD16128E98'"
					+ " codebase='../cab/FBMACCom.cab#Version=1,1305,30,1'"
					+ " height='0' id ='MACClientObj'></OBJECT>"
	        },
	        nonCodebase: {
	        	fbcertvaObj: " <object class='fly_away' classid='clsid:66B86E99-B84B-48DE-B081-052237DD60AD'              " +
                "               id =FBCertVAObj></object>                          ",
                fbEnrollObj: " <object class='fly_away' classid='clsid:1740CEC6-953A-472e-ADDF-1DD220BC50ED'              " +
                "               height='0'  " +
                "               id =FBEnrollObj></object>                          ",
                pkcs7SignObj: " <object class='fly_away' classid='clsid:2CD1D011-1DC4-4EBC-B03E-67E3713DF5A3'              " +
	                "               height='0'  " +
	                "               id =P7SignatureClientObj></object>                          ",
	            fbibanktxnObj: " <object class='fly_away' classid='clsid:478A696E-201A-4846-B07D-C35199EC3E5F'              " +
	                "               height='0'  " +
	                "               id =FBiBankTxnObj></object>                          ",
    			macClientObj:"<OBJECT class='fly_away' classid='clsid:7CA530F5-D51F-4E60-9F32-47CD16128E98'"
					+ " height='0' id ='MACClientObj'></OBJECT>"
	        }
	    }
	    /*plugin: {},
	     MAC: {
	    	fbcertvaObj: "<embed id='FBCertVAObj' name='FBWSObj' " +
	    		"style='LEFT: 10px; TOP: 0px; VISIBILITY: visible; width: 10px; height: 10px; background: red;' " +
	    		"pluginspage='../cab/FBWS_setup.pkg' " +
	    		"type='application/fbws-plugins' /> ",
            fbEnrollObj: "<embed id='FBEnrollObj' name='FBWSObj' " +
            	"style='LEFT: 10px; TOP: 0px; VISIBILITY: visible; width: 10px; height: 10px; background: red;' " +
            	"pluginspage='../cab/FBWS_setup.pkg' " +
            	"type='application/fbws-plugins' /> ",
            fbibanktxnObj: "<embed id='FBiBankTxnObj' name='FBWSObj' " +
            	"style='LEFT: 10px; TOP: 0px; VISIBILITY: visible; width: 10px; height: 10px; background: red;' " +
            	"pluginspage='../cab/FBWS_setup.pkg' " +
            	"type='application/fbws-plugins' /> "
	    } */
	};
///////////////////////////////////////////////////////////////////////////////
/**
 * detect IE
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
/*
    //Try to find the Trident version number
    var trident = navigator.userAgent.match(/Trident\/(\d+)/);
    if (trident) {
        value.IsIE = true;
        //Convert from the Trident version number to the IE version number
        value.TrueVersion = parseInt(trident[1], 10) + 4;
    }
*/
    //Try to find the MSIE number
    var msie = navigator.userAgent.match(/MSIE (\d+)/);
    if (msie) {
        value.IsIE = true;
        //Find the IE version number from the user agent string
        value.ActingVersion = parseInt(msie[1]);
    } else {
    	 if ((window.MSInputMethodContext && document.documentMode)){
    		 value.IsIE = true;
    	 }
        //Must be IE 11 in "edge" mode
        value.ActingVersion = value.TrueVersion;
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
    		return false;
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
    else
    {
        return "UnSupported";
    }
}
//判斷是否已安裝ActiveX元件
function isAX_OK() 
{
    try    
    {
    	var currentURL = document.URL;
    	if(strEndsWith(currentURL,"57Moica.html")){//數位存款自然人憑證
    		if (FBCertVAObj.FullPath == undefined){
                return false;
    		}
    	}else{
            if (FBEnrollObj.FullPath == undefined){
                return false;
            }

            if (FBiBankTxnObj.FullPath == undefined){
                return false;
            }
    	}

        return true;
    }
    catch (ex)
    {
        return false;
    }

}
//判斷是否已安裝MAC old plugins元件
// function pluginInstalled4MAC()
// {
//     var isPlugin = false;
//     if (navigator.mimeTypes && navigator.mimeTypes.length > 0)
//     {
//         var mimeFBTxn = navigator.mimeTypes['application/fbtxn-plugin'];//application/FBTxn-plugin
// 		var mimeFBeBankEnroll = navigator.mimeTypes['application/fbebankenroll-plugin'];//application/FBeBankEnroll-plugin

//         if (typeof(mimeFBTxn)=="undefined" || typeof(mimeFBeBankEnroll)=="undefined")
//         {
//             isPlugin = false;
//             /*alert('尚未安裝plugin元件,請先完成plugin安裝並於安裝完成後重新開啟瀏覽器!');
//             if(confirm('開始下載並安裝?')){
//                 window.location = '../cab/FBeBank.pkg';
//             }*/
//         }
//         else
//         {
//             isPlugin = true;
//         }
//     }
//     return isPlugin;
// }
//判斷是否已安裝MAC FBWS plugins元件
// function pluginInstalled4MAC_FBWS()
// {
//     var fbwsPlugin = false;
//     if (navigator.mimeTypes && navigator.mimeTypes.length > 0)
//     {
//         var mime = navigator.mimeTypes['application/fbws-plugins'];
//         if (typeof(mime)=="undefined")
//         {
//             fbwsPlugin = false;
//             /*alert('尚未安裝FBWS元件,請先完成FBWS安裝並於安裝完成後重新開啟瀏覽器!');
//             if(confirm('開始下載並安裝?')){
//                 window.location = '../cab/FBWS_Setup.pkg';
//             }*/
//         }
//         else
//         {
//             fbwsPlugin = true;
//         }
//     }
//     return fbwsPlugin;
// }
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
    2 -> IE and other browser with FBWS
    //3 -> MAC Safari with Old Plugins
    4 -> MAC with FBWS
    //5 -> MAC Safari with New Plugins
 */
var componentType = 0;    //

var OSType = detectOS();
var iever = IeVersion();

//判斷是否已安裝ActiveX or mac plugin元件
if(OSType == "Windows")
{
    //IE 7,8,9,10,11 -> 提示安裝ActiveX元件
    if(iever.IsIE == true)
    {
		document.write(objElemets.activex.nonCodebase.fbcertvaObj);
		document.write(objElemets.activex.nonCodebase.fbEnrollObj);
		document.write(objElemets.activex.nonCodebase.pkcs7SignObj);
		document.write(objElemets.activex.nonCodebase.fbibanktxnObj);
		document.write(objElemets.activex.nonCodebase.macClientObj);
        
        var isAX = isAX_OK();
        if(isAX == false)    // 未安裝ActiveX元件
        {
			componentType = 1;
			if(confirm('開始下載並安裝網路銀行安控元件服務程式'))
			{
				downloadURI(root + '/cab/iBankSetup.msi');
			}
        }
        else //若有安裝了ActiveX元件，即使用ActiveX元件
        {
        	ht_Sync_Plugin_Installed = true;
            componentType = 1;
        }
    }
    else    // iever.IsIE == false --> 其他瀏覽器 --> 使用新安控元件
    {
        componentType = 2;
    }
}
else if(OSType == "MacOSX")
{
    /* //在MAC，若已安裝原Plugins元件，Safari -> 使用原Plugins元件
    //                                        否則即使用FBWS Plugins元件
    var isSafari = detectSafari();
    if(isSafari == true)    // Safari
    {
		document.write(objElemets.MAC.fbcertvaObj);
		document.write(objElemets.MAC.fbEnrollObj);
		document.write(objElemets.MAC.fbibanktxnObj);

        var isPlugins = pluginInstalled4MAC_FBWS();// 確認是否有安裝FBTxn Plugins元件
        if(isPlugins == true)	//有裝mac plugin就使用mac plugin 
        {
        	ht_Sync_Plugin_Installed = true;
        	componentType = 3;
        }
        else	//沒裝就去偵測是否有裝mac FBWS_Plugin
        {
    		componentType = 5;
			if(confirm('開始下載並安裝網路銀行安控元件服務程式'))
			{
				downloadURI(root + '/cab/FBWS_Plugins_Setup.pkg');
			}
        }
    }
    else	//不是Safari就直接當做沒舊元件 
    	componentType = 4;*/
    // 20220221 因Safari已不支援np plugins，所以直接使用多瀏覽器元件，不再設定npapi plugins
    componentType = 4;
}
//判斷是否有裝WebSocket的元件
function DetectAsyncWebSocket()    
{
	init_ht_ws(); 
    componentType = 2;
	if (ws_socket_exist == false)
	{
		ht_WS_Installed = false;
		if(confirm('開始下載並安裝網路銀行安控元件服務程式'))
		{
			if(OSType == "Windows"){
				downloadURI(root + '/cab/FBWS_Setup.msi');
			}else{
				downloadURI(root + '/cab/FBWS_Setup.pkg');
			}
		}
	}
	else
		ht_WS_Installed = true;
	//console.log('Async dectect finished,' + ht_WS_Installed);
}
//判斷是否有裝WebSocket的元件(臺幣轉帳--選擇非約定帳戶時, 僅偵測元件是否啟用, 但不提示下載)
function DetectAsyncWebSocket4NTD()    
{
	init_ht_ws(); 
    componentType = 2;
	if (ws_socket_exist == false)
	{
		ht_WS_Installed = false;
	}
	else
		ht_WS_Installed = true;
}

function setWSP11Lib()
{
	if (OSType == 'Windows')
    	document.wssocketform.P11LibName.value = "etoken.dll";
	else
    	document.wssocketform.P11LibName.value = "libeToken.dylib";
}

function strEndsWith(str, suffix) {
    return str.match(suffix+"$")==suffix;
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