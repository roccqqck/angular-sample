/* 
 * Copyright (c) 2016 HiTRUST Incorporated.All rights reserved.
 *
 * PKCS functions
 *
 * Modify History:
 * v1.00, 2007-05-10
 *  1) First release
 * v1.10, 2010/02/25, Jerry Chang
 *  1) 跨瀏覽器調整 , Safari, 調整embeded object,不設定height會有預設高度
 * V2.0 20140930
 *  1) 不使用CertDBClientObj
 *  2) 增加FBiBankTxn元件簽章功能函式
 * V3.0 2016/10/30, PeterLee
 *  1) 調整增加支援新安控元件支援
 * 		1. 不支援Windows及Mac之Plugins
 */ 
///////////////////////////////////////////////////////////////////////////////
//// ActiveX 元件宣告
var pkcs7SignObj;	// 簽章
var fbibanktxnObj;	// 交易簽章，憑證載具管理
var root = "/" + location.pathname.split("/")[1];
var objElemets={
		activex:{
			codebase:{
				pkcs7SignObj:" <object class='fly_away' classid='clsid:2CD1D011-1DC4-4EBC-B03E-67E3713DF5A3'              "
				    + "               codebase='../cab/FBPKCS7SignatureClientCOM.cab#Version=1,1304,1,1' height='0'  "
				    + "               id =P7SignatureClientObj></object>                          ",
				fbibanktxnObj:" <object class='fly_away' classid='clsid:478A696E-201A-4846-B07D-C35199EC3E5F'              "
				    + "               codebase='../cab/FBiBankTxn.cab#Version=1,1505,9,16' height='0'  "
				    + "               id ='FBiBankTxnObj'></object>                          "
			},
			nonCodebase:{
				pkcs7SignObj:" <object class='fly_away' classid='clsid:2CD1D011-1DC4-4EBC-B03E-67E3713DF5A3'              "
				    + "               height='0'  "
				    + "               id =P7SignatureClientObj></object>                          ",
				fbibanktxnObj:" <object class='fly_away' classid='clsid:478A696E-201A-4846-B07D-C35199EC3E5F'              "
				    + "               height='0'  "
				    + "               id =FBiBankTxnObj></object>                          "
			}
		},
		plugin:{},
		MAC:{
			fbwsMACObj :"<embed class='fly_away' id='FBiBankTxnObj' name='FBWSObj' "
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
	P7SignResult : "",		// PKCS7 簽章結果

	certificate : "",
	serialNumber : "",
	issuerName : "",
	subjectName : "",
	keyUsage : "",
	startDate : "",
	endDate : "",
	selectedCertLength : 2048,
	//BlockExpiredCert : true,
	//ShowExpiredCert : false,
	//SelectLatestCert :true,

	FullPath : "",
	PKCS11LibName : "",
	DetectedTokenPKCS11LibName : "",
	VERSION_str : "",

	LastErrorStr : "",		//函式回傳之錯誤代碼訊息
	LastErrorCode : 0,		//函式回傳之錯誤代碼

	init_FBiBankP11Obj : function()
	{
		if (window.XMLHttpRequest)
		{
			// code for IE7+, Firefox, Chrome, Opera, Safari
			FBiBankP11Obj.xmlhttp = new XMLHttpRequest();
			//FBiBankP11Obj.xmlhttp.overrideMimeType('text/plain');
		}
		else
		{
			return false;
		}

		FBiBankP11Obj.ibankxhr_url = "https://127.0.0.1:20558/FBiBankP11";
		FBiBankP11Obj.xmlhttp.onload = function(event){FBiBankP11Obj.recv_FBiBankP11Obj(event);};
		
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
		}catch(err){
			return undefined;
		}
		
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
	VERSION : function()
	{
		var VERSION_str = "VERSION||noparam"
		return FBiBankP11Obj.sendData_FBiBankP11Obj(VERSION_str); 
	},
	createPkcs10 : function(userCN, userKeyLength)
	{
		var createPkcs10_str = "createPkcs10||" + userCN + "||" + userKeyLength;
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
	GetTokenSN : function(P11DLL)
	{
        var GetTokenSN_str = "GetTokenSN||" + P11DLL;
		FBiBankP11Obj.sendData_FBiBankP11Obj(GetTokenSN_str);
		if(FBiBankP11Obj.LastErrorCode == 0)
			return FBiBankP11Obj.TokenSN_str;
		else
			return "";
    },
	GetTokenInfo : function(P11DLL)
	{
        var GetTokenInfo_str = "GetTokenInfo||" + P11DLL;
		return FBiBankP11Obj.sendData_FBiBankP11Obj(GetTokenInfo_str);
    },
    TokenInitial : function(P11DLL)
	{
        var TokenInitial_str = "TokenInitial||" + P11DLL;
        return FBiBankP11Obj.sendData_FBiBankP11Obj(TokenInitial_str);
    },
    TokenChangePIN : function(P11DLL, strOldPass, strNewPass)
	{
        var TokenChangePIN_str = "TokenChangePIN||" + P11DLL + "||" + strOldPass + "||" + strNewPass;
        return FBiBankP11Obj.sendData_FBiBankP11Obj(TokenChangePIN_str);
    },
	checkCertificateExpired : function(strExpireDate){
        var checkCertificateExpired_str = "checkCertificateExpired||" + strExpireDate;    
       	return FBiBankP11Obj.sendData_FBiBankP11Obj(checkCertificateExpired_str);
    },
	selectCertificate_Ex : function(strKeyUsage){
        var selectCertificate_Ex_str = "selectCertificate_Ex||" + strKeyUsage;
        return FBiBankP11Obj.sendData_FBiBankP11Obj(selectCertificate_Ex_str);
    },
	selectCertificateBySubjectCN : function(strSubjectCN){
        var selectCertificateBySubjectCN_str = "selectCertificateBySubjectCN||" + strSubjectCN;
        return FBiBankP11Obj.sendData_FBiBankP11Obj(selectCertificateBySubjectCN_str);
    },
	selectCertificateBySubjectCN_Ex : function(strSubjectCN, strKeyUsage){
        var selectCertificateBySubjectCN_Ex_str = "selectCertificateBySubjectCN_Ex||" + strSubjectCN + "||" + strKeyUsage;
        return FBiBankP11Obj.sendData_FBiBankP11Obj(selectCertificateBySubjectCN_Ex_str);
    },
	selectCertificateBySerialNum : function(strSerialNum){
        var selectCertificateBySerialNum_str = "selectCertificateBySerialNum||" + strSerialNum;
        return FBiBankP11Obj.sendData_FBiBankP11Obj(selectCertificateBySerialNum_str);
    },
	getSignedEnvelopByString : function()
	{
		var getSignedEnvelopByString_str = "getSignedEnvelopByString||noparam";
		FBiBankP11Obj.sendData_FBiBankP11Obj(getSignedEnvelopByString_str);	
		if(FBiBankP11Obj.LastErrorCode == 0)
			return FBiBankP11Obj.P7SignResult;
		else
			return "";
	},
	setDataContentByString : function(strDataContent)
	{
		var setDataContentByString_str = "setDataContentByString||" + strDataContent;
		return FBiBankP11Obj.sendData_FBiBankP11Obj(setDataContentByString_str); 
	},
	sign : function(strCert, strDigestMethod, strSignatureMethod){
        var sign_str = "sign||" + strCert + "||" + strDigestMethod + "||" + strSignatureMethod;
        return FBiBankP11Obj.sendData_FBiBankP11Obj(sign_str);
    },
	signIO : function(strP11DLL, strCert, strDigestMethod, strSignatureMethod){
        var signIO_str = "signIO||" + strP11DLL + "||" + strCert + "||" + strDigestMethod + "||" + strSignatureMethod;
    	return FBiBankP11Obj.sendData_FBiBankP11Obj(signIO_str);
    },
	PKCS7Sign : function(strCert, strDataContent, strDigestMethod, strSignatureMethod){
        var PKCS7Sign_str = "PKCS7Sign||" + strCert + "||" + strDataContent + "||" + strDigestMethod + "||" + strSignatureMethod;
        return FBiBankP11Obj.sendData_FBiBankP11Obj(PKCS7Sign_str);
    },
	PKCS7SignIO : function(strCert, strDataContent, strDigestMethod, strSignatureMethod){
        var PKCS7SignIO_str = "PKCS7SignIO||" + strCert + "||" + strDataContent + "||" + strDigestMethod + "||" + strSignatureMethod;
        return FBiBankP11Obj.sendData_FBiBankP11Obj(PKCS7SignIO_str);
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
		else if(strFuncName == "VERSION")
		{
			if(strRtn == "0")
			{
				FBiBankP11Obj.VERSION_str = retStringParts[2];
				FBiBankP11Obj.LastErrorStr = "";
				FBiBankP11Obj.LastErrorCode = 0;
				return FBiBankP11Obj.VERSION_str;
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
		else if(strFuncName == "GetTokenSN")
		{
			if(strRtn == "0")
			{
				FBiBankP11Obj.TokenSN_str = retStringParts[2];
				FBiBankP11Obj.LastErrorStr = "";
				FBiBankP11Obj.LastErrorCode = 0;
				return FBiBankP11Obj.TokenSN_str;	//若取得載具序號成功，回傳載具序號
			}
			else
			{
				FBiBankP11Obj.TokenSN_str = "";
				FBiBankP11Obj.LastErrorStr = retStringParts[2];
				FBiBankP11Obj.LastErrorCode = parseInt(strRtn);
				return "";						//若取得載具序號失敗，回傳空字串
			}
		}
		else if(strFuncName == "TokenInitial")
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
		else if(strFuncName == "TokenChangePIN")
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
		else if(strFuncName == "TokenUnLock")
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
		else if(strFuncName == "GetTokenInfo")
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
		else if(strFuncName == "checkCertificateExpired")
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
		else if(strFuncName == "selectCertificate_Ex")
		{
			if(strRtn == "0"){
                FBiBankP11Obj.certificate = retStringParts[2];
                FBiBankP11Obj.serialNumber = retStringParts[3];
                FBiBankP11Obj.issuerName = retStringParts[4];
                FBiBankP11Obj.subjectName = retStringParts[5];
                FBiBankP11Obj.keyUsage = retStringParts[6];
                FBiBankP11Obj.startDate = retStringParts[7];
                FBiBankP11Obj.endDate = retStringParts[8];
                FBiBankP11Obj.selectedCertLength = parseInt(retStringParts[9]);
               	return 0;                                     
            }
            else{
                FBiBankP11Obj.LastErrorStr = retStringParts[2];
				FBiBankP11Obj.LastErrorCode = parseInt(retStringParts[1]);
				return FBiBankP11Obj.LastErrorCode;
            }
		}
		else if(strFuncName == "selectCertificateBySubjectCN")
		{
			if(strRtn == "0"){
                FBiBankP11Obj.certificate = retStringParts[2];
                FBiBankP11Obj.serialNumber = retStringParts[3];
                FBiBankP11Obj.issuerName = retStringParts[4];
                FBiBankP11Obj.subjectName = retStringParts[5];
                FBiBankP11Obj.keyUsage = retStringParts[6];
                FBiBankP11Obj.startDate = retStringParts[7];
                FBiBankP11Obj.endDate = retStringParts[8];
                FBiBankP11Obj.selectedCertLength = parseInt(retStringParts[9]);
               	return 0;                                     
            }
            else{
                FBiBankP11Obj.LastErrorStr = retStringParts[2];
				FBiBankP11Obj.LastErrorCode = parseInt(retStringParts[1]);
				return FBiBankP11Obj.LastErrorCode;
            }
		}
		else if(strFuncName == "selectCertificateBySubjectCN_Ex")
		{
			if(strRtn == "0"){
                FBiBankP11Obj.certificate = retStringParts[2];
                FBiBankP11Obj.serialNumber = retStringParts[3];
                FBiBankP11Obj.issuerName = retStringParts[4];
                FBiBankP11Obj.subjectName = retStringParts[5];
                FBiBankP11Obj.keyUsage = retStringParts[6];
                FBiBankP11Obj.startDate = retStringParts[7];
                FBiBankP11Obj.endDate = retStringParts[8];
                FBiBankP11Obj.selectedCertLength = parseInt(retStringParts[9]);
               	return 0;                                     
            }
            else{
                FBiBankP11Obj.LastErrorStr = retStringParts[2];
				FBiBankP11Obj.LastErrorCode = parseInt(retStringParts[1]);
				return FBiBankP11Obj.LastErrorCode;
            }
		}
		else if(strFuncName == "selectCertificateBySerialNum")
		{
			if(strRtn == "0"){
                FBiBankP11Obj.certificate = retStringParts[2];
                FBiBankP11Obj.serialNumber = retStringParts[3];
                FBiBankP11Obj.issuerName = retStringParts[4];
                FBiBankP11Obj.subjectName = retStringParts[5];
                FBiBankP11Obj.keyUsage = retStringParts[6];
                FBiBankP11Obj.startDate = retStringParts[7];
                FBiBankP11Obj.endDate = retStringParts[8];
                FBiBankP11Obj.selectedCertLength = parseInt(retStringParts[9]);
               	return 0;                                     
            }
            else{
                FBiBankP11Obj.LastErrorStr = retStringParts[2];
				FBiBankP11Obj.LastErrorCode = parseInt(retStringParts[1]);
				return FBiBankP11Obj.LastErrorCode;
            }
		}
		else if(strFuncName == "getSignedEnvelopByString")
		{
			if(strRtn == "0")
			{
				FBiBankP11Obj.P7SignResult = retStringParts[2];
				FBiBankP11Obj.LastErrorStr = "";
				FBiBankP11Obj.LastErrorCode = 0;
				return FBiBankP11Obj.P7SignResult;
			}
			else
			{
				FBiBankP11Obj.LastErrorStr = retStringParts[2];
				FBiBankP11Obj.LastErrorCode = parseInt(retStringParts[1]);
				return "";
			}
		}
		else if(strFuncName == "setDataContentByString")
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
		else if(strFuncName == "sign")
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
		else if(strFuncName == "signIO")
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
		else if(strFuncName == "PKCS7Sign")
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
		else if(strFuncName == "PKCS7SignIO")
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
///////////////////////////////////////////////////////////////////////////////
//// FBiBankNT webserver socket 元件宣告
var FBiBankNTObj = 
{
	xmlhttp : null,			// FBiBankP11 webserver socket 使用之變數
	ibankxhr_url : "",		// 連線ibank url

	IP_MAC : "",
	inquirePlainData : "",
	inquireCipherData : "",
	convertTextToImage_result : "",
	GRD_text : "",

	VERSION : "",

	LastErrorStr : "",		//函式回傳之錯誤代碼訊息
	LastErrorCode : 0,		//函式回傳之錯誤代碼

	init_FBiBankNTObj : function()
	{
		if (window.XMLHttpRequest)
		{
			// code for IE7+, Firefox, Chrome, Opera, Safari
			FBiBankNTObj.xmlhttp = new XMLHttpRequest();
			//FBiBankNTObj.xmlhttp.overrideMimeType('text/plain');
		}
		else
		{
			return false;
		}

		FBiBankNTObj.ibankxhr_url = "https://127.0.0.1:20558/FBiBankNT";
		FBiBankNTObj.xmlhttp.onload = function(event){FBiBankNTObj.recv_FBiBankNTObj(event);};

		var init_status = FBiBankNTObj.sendData_FBiBankNTObj("FBWS_Echo");
		if(init_status == undefined)
		{
			return false;
		}
		var echo_result = FBiBankNTObj.xmlhttp.responseText;
		if(echo_result == "FBWS_ECHO_OK")
			return true;
		else 
			return false;
	},
	recv_FBiBankNTObj : function(event)
	{
		var retValue = FBiBankNTObj.getReturnData(FBiBankNTObj.xmlhttp.responseText);
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
	sendData_FBiBankNTObj : function(cmd_string)
	{
		//FBiBankP11Obj.xmlhttp.open("POST",ibankxhr_url,true);
		try{
			FBiBankNTObj.xmlhttp.open("POST",FBiBankNTObj.ibankxhr_url,false);
			FBiBankNTObj.xmlhttp.setRequestHeader("Content-Type", "text/plain");
			FBiBankNTObj.xmlhttp.send(cmd_string);
		}catch(err){
			return undefined;
		}
		
		return FBiBankNTObj.LastErrorCode;
	},
	///////////////////////
	setLanguage : function(lang)
	{
		var setLanguage_str = "setLanguage||" + lang;
		return FBiBankNTObj.sendData_FBiBankNTObj(setLanguage_str);
	},
	getIP_MAC : function()
	{
		var getIP_MAC_str = "getIP_MAC||none";
		FBiBankNTObj.sendData_FBiBankNTObj(getIP_MAC_str);
		if(FBiBankNTObj.LastErrorCode == 0)
			return FBiBankNTObj.IP_MAC;
		else
			return "";
	},
	inquireProtectionData : function(strTitle, strKeyValue, bShowDot)
	{
		var bstrTitle = strTitle;
        var bstrKeyValue = strKeyValue;
        var strShowDot;
	    if (bShowDot == true)
            strShowDot = "true";
        else                       
    		strShowDot = "false";
		
		var inquireProtectionData_str = "inquireProtectionData||" + bstrTitle + "||" + bstrKeyValue + "||" + strShowDot;
		return FBiBankNTObj.sendData_FBiBankNTObj(inquireProtectionData_str);
	},
	getProtectionDataPlain : function()
	{
		return FBiBankNTObj.inquirePlainData;
	},
	getProtectionDataCipher : function()
	{
		return FBiBankNTObj.inquireCipherData;
	},
	convertTextToImage : function(strInputText, strKeyValue,strTitle)
	{
		var bstrInputText = strInputText;
        var bstrKeyValue = strKeyValue;
        var bstrTitle = strTitle;
            
        var convertTextToImage_str = "convertTextToImage||" + bstrInputText + "||" + bstrKeyValue + "||" + bstrTitle;
		FBiBankNTObj.sendData_FBiBankNTObj(convertTextToImage_str);
		if(FBiBankNTObj.LastErrorCode == 0)
			return FBiBankNTObj.convertTextToImage_result;
		else
			return "";
	},
	CallGRD : function(Title, MaxLen)
	{
		var CallGRD_str = "CallGRD||" + Title + "||" + MaxLen;
		FBiBankNTObj.sendData_FBiBankNTObj(CallGRD_str);
		if(FBiBankNTObj.LastErrorCode == 0)
			return FBiBankNTObj.GRD_text;
		else
			return "";
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
		else if(strFuncName == "getIP_MAC")
		{
			if(strRtn == "0")
			{
				FBiBankNTObj.IP_MAC = retStringParts[2];
				FBiBankNTObj.LastErrorStr = "";
				FBiBankNTObj.LastErrorCode = 0;
				return FBiBankNTObj.IP_MAC;
			}
			else
			{
				FBiBankNTObj.LastErrorStr = retStringParts[2];
				FBiBankNTObj.LastErrorCode = parseInt(retStringParts[1]);
				return FBiBankNTObj.LastErrorCode;
			}
		}
		else if(strFuncName == "inquireProtectionData")
		{
			if(strRtn == "0")
			{
				FBiBankNTObj.inquirePlainData = retStringParts[2];
				FBiBankNTObj.inquireCipherData = retStringParts[3];
				FBiBankNTObj.LastErrorStr = "";
				FBiBankNTObj.LastErrorCode = 0;
				return 0;
			}
			else
			{
				FBiBankNTObj.LastErrorStr = retStringParts[2];
				FBiBankNTObj.LastErrorCode = parseInt(retStringParts[1]);
				return FBiBankNTObj.LastErrorCode;
			}
		}
		else if(strFuncName == "convertTextToImage")
		{
			if(strRtn == "0")
			{
				FBiBankNTObj.convertTextToImage_result = retStringParts[2];
				FBiBankNTObj.LastErrorStr = "";
				FBiBankNTObj.LastErrorCode = 0;
				return 0;
			}
			else
			{
				FBiBankNTObj.LastErrorStr = retStringParts[2];
				FBiBankNTObj.LastErrorCode = parseInt(retStringParts[1]);
				return FBiBankNTObj.LastErrorCode;
			}
		}
		else if(strFuncName == "CallGRD")
		{
			if(strRtn == "0")
			{
				FBiBankNTObj.GRD_text = retStringParts[2];
				FBiBankNTObj.LastErrorStr = "";
				FBiBankNTObj.LastErrorCode = 0;
				return 0;
			}
			else
			{
				FBiBankNTObj.LastErrorStr = retStringParts[2];
				FBiBankNTObj.LastErrorCode = parseInt(retStringParts[1]);
				return FBiBankNTObj.LastErrorCode;
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

	if( OS_Flag.indexOf("WOW64")>0 || OS_Flag.indexOf("Win32")>0 || OS_Flag.indexOf("Win64")>0 || OS_Flag.indexOf("Windows NT")>0)
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

//判斷是否已安裝元件，以及提示安裝(cab)
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
		//confirm("FBiBank元件未正常安裝!!");
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
function CheckFBWS_iBank()
{
	var bRcP11 = FBiBankP11Obj.init_FBiBankP11Obj();
	var bRcNT = FBiBankNTObj.init_FBiBankNTObj();
	if(bRcP11 == true && bRcNT == true)
		return true;
	else
		return false;
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
	5 -> MAC Safari with FBWS Plugins
 */
var componentType = 0;	//

var OSType = detectOS();
var iever = IeVersion();

// 判斷OS種類
if(OSType == "Windows")
{
	//先判斷瀏覽器是否是IE -> 看是否有安裝原ActiveX元件
	if(iever.IsIE == true)
	{
		pkcs7SignObj = objElemets.activex.nonCodebase.pkcs7SignObj;
		fbibanktxnObj = objElemets.activex.nonCodebase.fbibanktxnObj;
		document.write(pkcs7SignObj);
		document.write(fbibanktxnObj);

		var isAX = AXOrNull();//看是否有安裝原ActiveX元件
		if(isAX == false)//沒裝ActiveX元件
		{
			// IE8,9提示安裝ActiveX元件
//			if(iever.TrueVersion == '8' || iever.TrueVersion == '9')
			if(true)
			{
				componentType = 1;
				if(confirm('開始下載並安裝元件'))
				{
					// 以CAB方式安裝
					//pkcs7SignObj = objElemets.activex.codebase.pkcs7SignObj;
					//fbibanktxnObj = objElemets.activex.codebase.fbibanktxnObj;
					downloadURI(root + '/cab/iBankSetup.msi');
					//document.write(pkcs7SignObj);
					//document.write(fbibanktxnObj);
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
		var bRc = CheckFBWS_iBank();
		if(bRc == false)
		{
			if(confirm('開始下載並安裝網路銀行安控元件服務程式'))
			{
				downloadURI(root +  '/cab/FBWS_Setup.msi');
			}
			componentType = 2;
			FBiBankTxnObj = this.FBiBankP11Obj;
			P7SignatureClientObj = this.FBiBankNTObj;
		}
		else
		{
			// 已安裝且執行了FBWS，即使用FBWS
			componentType = 2;
			FBiBankTxnObj = this.FBiBankP11Obj;
			P7SignatureClientObj = this.FBiBankNTObj;
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
		P7SignatureClientObj = FBiBankTxnObj;
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
		var bRc = CheckFBWS_iBank();//測試FBWS是否可連通
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
			FBiBankTxnObj = this.FBiBankP11Obj;
			P7SignatureClientObj = this.FBiBankNTObj;
		}
	}
}

//////////////////////////////////////
//TODO - to PROD 需將DEBUG_FLAG設定為false
var DEBUG_FLAG = false; //true=>顯示debug msg 
//var p7Sign_ToknP11="";
var p7Sign_SignCertSN="";
var p7Sign_SignCertCN="";
var p7Sign_DataContent="";
var p7Sign_SignCert="";
var p7Sign_SignedStr="";
//var p7Sign_ConvBase64 = false;
var p7Sign_ShowHelpMsgSwitch = true;

var detectedP11Token = "";

function initFBiBankTxnObj()
{
	if(componentType == 1)	// 使用ActiveX元件
	{
		var etoken_dll = "etoken.dll";
		var cab_path = FBiBankTxnObj.FullPath;
		etoken_dll = cab_path + etoken_dll;
    	var p11_dll_path = "{" + etoken_dll + "}";
    
    	var rtn = FBiBankTxnObj.SetPKCS11LibNames(p11_dll_path);
    	if(rtn == 0)
    	{
			FBiBankTxnObj.PKCS11LibName = FBiBankTxnObj.DetectedTokenPKCS11LibName;
        	detectedP11Token = FBiBankTxnObj.DetectedTokenPKCS11LibName;
			return true;
    	}
		else
		{
			return false;
		}
	}
	// 新安控元件FBWS
	else if(componentType == 2 || componentType == 4)
	{
		var bRc = FBiBankP11Obj.init_FBiBankP11Obj();
		if(bRc == true)
		{
			if(OSType == "Windows")
				detectedP11Token = "etoken.dll";
			else if(OSType == "MacOSX")
				detectedP11Token = "libeToken.dylib";

			FBiBankTxnObj.SetPKCS11LibName(detectedP11Token);
		}
		else
		{
			return bRc;
		}
	}
	// MAC Safari 使用 plugins
	else if(componentType == 5)
	{
		// check plugins ok or Not
		// var isSafariPlugins = checkSafariPlugins();
		//if(isSafariPlugins == true)
		//{
			detectedP11Token = "libeToken.dylib";
			FBiBankTxnObj.SetPKCS11LibName(detectedP11Token);
		//}
	}
}

function getSignedPKCS7Str()
{
	// 確認Token是否插入,及做插拔動作
	var bRT = initFBiBankTxnObj();
	if(bRT == false)
	{
		return false;
	}
    
    if(detectedP11Token == "")
    {
        alert("請確認插入正確憑證載具!");
        return false;
    }
    
	//check to do something here
	if (p7Sign_DataContent == "")
	{
		alert("請輸入文件字串。");
		return false;
	}
	//alert("getSignedPKCS7Str() p7Sign_DataContent["+p7Sign_DataContent+"]");
	//
	if ((trtn = FBiBankTxnObj.setDataContentByString(p7Sign_DataContent)) != 0)
	{
		//showHelpMsg("建立文件字串", lRtn, P7SignatureClientObj.LastErrorStr);
		return false;
	}    

	// select certificate
	if (!SelectCertificate())
	{
		return false;
	}    

	//sign
    //var hash_sha = "SHA256";
    if ((trtn = FBiBankTxnObj.signIO(detectedP11Token,p7Sign_SignCert,"SHA256","RSA")) != 0)
	//if ((trtn = FBiBankTxnObj.PKCS7SignIO(p7Sign_SignCert,p7Sign_DataContent,"SHA256","RSA")) != 0)
	{
		showHelpMsg("使用者簽章", trtn, FBiBankTxnObj.LastErrorStr);
		return false;
	}

	//alert("sign ok");
	//get result
	var signedString = FBiBankTxnObj.getSignedEnvelopByString();
	if(signedString == "")
	{
		//alert("getSignedEnvelopByString empty");
		//alert("錯誤訊息:"+P7SignatureClientObj.LastErrorStr);
		showHelpMsg("使用者簽章", FBiBankTxnObj.LastErrorCode, FBiBankTxnObj.LastErrorStr);
		return false;
	}
    
	//alert(signedString);
	p7Sign_SignedStr = signedString;
	return true;
}

function getSignedPKCS7StrNOIO()
{
    var bRT = initFBiBankTxnObj();
	if(bRT == false)
	{
		return false;
	}
    
    if(detectedP11Token == "")
    {
        alert("請確認插入正確憑證載具!");
        return false;
    }
    
	//check to do something here
	if (p7Sign_DataContent == "")
	{
		alert("請輸入文件字串。");
		return false;
	}
	//alert("getSignedPKCS7Str() p7Sign_DataContent["+p7Sign_DataContent+"]");
	//
	if ((trtn = FBiBankTxnObj.setDataContentByString(p7Sign_DataContent)) != 0)
	{
		//showHelpMsg("建立文件字串", lRtn, P7SignatureClientObj.LastErrorStr);
		return false;
	}    

	// select certificate
	if (!SelectCertificate())
	{
		return false;
	}    

	//sign
    //var hash_sha = "SHA256";
    if ((trtn = FBiBankTxnObj.sign(p7Sign_SignCert,"SHA256","RSA")) != 0)
	//if ((trtn = FBiBankTxnObj.PKCS7Sign(p7Sign_SignCert,p7Sign_DataContent,"SHA256","RSA")) != 0)
	{
		showHelpMsg("使用者簽章", trtn, FBiBankTxnObj.LastErrorStr);
		return false;
	}

	//alert("sign ok");
	//get result
	var signedString = FBiBankTxnObj.getSignedEnvelopByString();
	if(signedString == "")
	{
		//alert("getSignedEnvelopByString empty");
		//alert("錯誤訊息:"+P7SignatureClientObj.LastErrorStr);
		showHelpMsg("使用者簽章", FBiBankTxnObj.LastErrorCode, FBiBankTxnObj.LastErrorStr);
		return false;
	}
    
	//alert(signedString);
	p7Sign_SignedStr = signedString;
	return true;
}

//var CERT_TYPE_ALL = 0;
//var CERT_TYPE_SIGN = 1;
//var CERT_TYPE_ENC = 2;

function SelectCertificate()
{
	var lRtn = 0;
	
	//選擇簽章憑證
	//modify by livia 2011/04/11 for 改以憑證序號挑選憑證
	//alert('p7Sign_SignCertSN:'+p7Sign_SignCertSN);
	//alert('p7Sign_SignCertCN:'+p7Sign_SignCertCN);
	if (p7Sign_SignCertSN != "")
	{
		if ((lRtn = FBiBankTxnObj.selectCertificateBySerialNum(p7Sign_SignCertSN)) !=0)
		{
			showHelpMsg("選擇憑證", lRtn, FBiBankTxnObj.LastErrorStr);
			//alert("無法選取簽章憑證，請確認憑證載具是否正確");
			return false;
		}
	}
	else if (p7Sign_SignCertCN != "")
	{
		if ((lRtn = FBiBankTxnObj.selectCertificateBySubjectCN(p7Sign_SignCertCN)) !=0)
		{
			showHelpMsg("選擇憑證", lRtn, FBiBankTxnObj.LastErrorStr);
			//alert("無法選取簽章憑證，請確認憑證載具是否正確");
			return false;
		}
	}
	else if ((lRtn = FBiBankTxnObj.selectCertificate_Ex(0)) !=0)
	//選擇簽章憑證
	{
		showHelpMsg("選擇憑證", lRtn, FBiBankTxnObj.LastErrorStr);
		//alert("無法選取簽章憑證，請確認憑證載具是否正確");
		return false;
	}
    
	p7Sign_SignCert = FBiBankTxnObj.certificate;
	//alert("SerialNumber:"+CertDBClientObj.SerialNumber);
	return true;
}

function debugMsg(msg)
{
	if (DEBUG_FLAG)
	{
		alert(msg);;      
	}
}

function showHelpMsg(operation, errCode, errMsg)
{
	//alert(operation);
	var msg;
	switch(errCode) 
	{
		case 1:
			msg = "[1]傳入參數錯誤(Parameter Error)";
			//msg += "\r\n";
			//msg += "系統訊息:"+errMsg;
			break;
		case 2:
			msg = "[2]請關閉瀏覽器重新操作";
			//msg += "\r\n";
			//msg += "系統訊息:"+errMsg;
			break;
		case 3:
			msg = "[3]功能處理錯誤(Operation Error)";
			//msg += "\r\n";
			//msg += "系統訊息:"+errMsg;
			break;
		case 4:
			msg = "[4]請確認是否已插入含有正確憑證之憑證載具，且作業系統中已註冊有該憑證";
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
                " 1. 憑證載具驅動程式有誤，請確認憑證載具驅動程式安裝是否正確\r\n" +
                " 2. 私密金鑰設為高安全性保護，而您未輸入正確密碼\r\n" +
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
		//
        //case 50:
		//	msg = '['+errCode+']憑證載具密碼錯誤！';
		//	break;
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
        //    
		case 99:
			msg = "[99]其他錯誤(Others)";
			//msg += "\r\n";
			//msg += "系統訊息:"+errMsg;
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
//MAC ADDRESS
function getMacAddress(rtnObj){
    var lRtn = 0;
	IP_MAC = P7SignatureClientObj.getIP_MAC();
	if((lRtn = P7SignatureClientObj.LastErrorCode) != 0){
	    alert("Get IP and MAC fail! Error code: " + lRtn)
	}else{
		//alert(IP_MAC);
		if(rtnObj) rtnObj.value = IP_MAC;
		else alert("Return doesn't defined!");
	}
	
}

//BHO
/*
 *下拉選單資料防BHO
 *title:元件畫面的主題名稱
 *kv:加密用key value
 *encObj:欲加密資料物件
 *rtnObj:加密後資料回傳用物件
*/
function convertText2Img(title, kv, encObj, rtnObj){	
	debugMsg("Arf debug - convertText2Img");
    var lRtn = 0;
    var cipherData ;
    var plain = encObj.value;
    var objType = document.getElementById(plain);
    /*==================
     * 若選擇約定轉入帳號,不需使用BHO元件
     */
    
    
    if(!('F'==objType.value)) { 
    	title = 'DONOTSHOWDIALOG';
    	return;
    }
    
    //增加判斷是否支援NPAPI元件
    //isSupportNPAPI(true);
    //debugMsg("keyValue=["+kv+"]");
	//debugMsg("Arf debug - this browser is IE ，use pkcs7SignObj");
    try{
    	cipherData = P7SignatureClientObj.convertTextToImage(plain, kv, title);
    }catch (e) {
        top.$("#waringMsg .pop-content").text("元件未正常安裝!!請重新執行交易並安裝元件");
    	top.modal1.toggle();
        return;
	}
	var lRtn = P7SignatureClientObj.LastErrorCode;
	if(lRtn!=0 && lRtn!=28){
    	//alert("ConvertTextToImage fail! Error code: " + lRtn);
    	top.$("#waringMsg .pop-content").text("ConvertTextToImage fail! Error code: " + lRtn);
		top.modal1.toggle();
		console.log("ConvertTextToImage fail! Error code: " + lRtn);
    	return;
	}else if(lRtn!=28){
	    if(cipherData==''){
	        //alert("請輸入正確的KeyValue。");
	    	top.$("#waringMsg .pop-content").text("請輸入正確的KeyValue。");
			top.modal1.toggle();
			console.log("請輸入正確的KeyValue。");
	        return;
	    }
	    debugMsg(title+':'+plain+'\r\n'+'加密值:'+cipherData);
	    rtnObj.value = cipherData;
	}else{
		encObj.selectedIndex = 0;
		rtnObj.value = '';
	}
    

}
/*
 *輸入欄位資料防BHO
 *title:元件畫面的主題名稱
 *kv:加密用key value
 *showDot:是否可輸入小數點
 *showObj:顯示資料用物件
 *rtnObj:加密後資料回傳用物件
*/
function getProtectionData(title, kv, showDot, showObj, rtnObj){
	debugMsg("Arf debug - getProtectionData");
    var lRtn = 0;
    var plainData;
    var cipherData;
    var lRtn = P7SignatureClientObj.inquireProtectionData(title, kv, showDot)
	if(lRtn!=0 && lRtn!=28){
	    //alert("getProtectionData fail! Error code: " + lRtn);
		if (typeof lRtn != "undefined" && lRtn != null) {
		    top.$("#waringMsg .pop-content").text("getProtectionData fail! Error code: " + lRtn);
			top.modal1.toggle();
		    return;
		}
	}else if (lRtn!=28){
	    plainData = P7SignatureClientObj.getProtectionDataPlain();
	    cipherData = P7SignatureClientObj.getProtectionDataCipher();
	    
	    //TODO:正式套需mark
	    //alert(title+':'+plainData+'\r\n'+'加密值:'+cipherData);//modify by Arf 2012/11/20
	    debugMsg(title+':'+plainData+'\r\n'+'加密值:'+cipherData);
	    showObj.value= plainData;
	    rtnObj.value = cipherData;
	}else{
        showObj.value= '';
        rtnObj.value = '';
	}
	
}

//GRD
/*
 *SSL密碼專用
 *rtnObj:回傳資料用物件
*/
function callGRDSsl(rtnObj){
    callGRD('SSL',12, rtnObj);
}
/*
 *OTP密碼專用
 *rtnObj:回傳資料用物件
*/
function callGRDOtp(rtnObj){
    callGRD('OTP',8, rtnObj);
}
/*
 *密碼輸入共用
 *title:元件畫面的主題名稱
 *rtnObj:回傳資料用物件
*/
function callGRD(title,len , rtnObj){
    var lRtn = 0;
    var rtn = P7SignatureClientObj.CallGRD(title,len);
    var lRtn = P7SignatureClientObj.LastErrorCode;
    if(lRtn!=0 && lRtn!=28){
        alert("callGRD fail! Error code: " + lRtn);
        top.$("#waringMsg .pop-content").text("callGRD fail! Error code: " + lRtn);
		top.modal1.toggle();
        return;
    }else if(lRtn!=28){
        rtnObj.value = rtn;
    }else{
        rtnObj.value = '';
    }
}