///最底層的單一call function, only send

//設定pkcs11 lib
function innerSetPKCS11LibName(objectData)
{
	var rtn;
	var funcString = "SetPKCS11LibName";
	try
	{
		setResult(socket_ws, funcString, objectData);
		var para0 = objectData.parameter[0];
		this.send(funcString + delimeterSymbol + para0);
	} catch(exception) {
		process_hide();
		alert('<p>Error' + exception);  
	}
}

//取得元件版本
function innerGetVersion(objectData)
{
	var rtn;
	var funcString = "VERSION";
	try
	{
		setResult(socket_ws, funcString, objectData);
		this.send(funcString + delimeterSymbol + 'none');
	} catch(exception) {
		process_hide();
		alert('<p>innerGetVersion' + exception);  
	}
}

//建csr
function innerCreatePkcs10(objectData)
{
	var rtn;
	var funcString = "createPkcs10";
	var sendData;
	try
	{
		setResult(socket_ws, funcString, objectData);
		var para0 = objectData.parameter[0];
		var para1 = objectData.parameter[1];
		sendData = funcString + delimeterSymbol + para0 + delimeterSymbol + para1;
		this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('innerCreatePkcs10 Error' + exception);
	}
}

//安裝憑證
function innerInstallCert(objectData)
{
	var rtn;
	var funcString = "installCert";
	var sendData;
	try
	{
		setResult(socket_ws, funcString, objectData);
		var para0 = objectData.parameter[0];
		sendData = funcString + delimeterSymbol + para0;
		this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('innerInstallCert Error' + exception);  		
	}	
}

function innerTokenInitial(objectData)
{
	var rtn;
	var funcString = "TokenInitial";
	var sendData;
	try
	{
		setResult(socket_ws, funcString, objectData);
		var para0 = objectData.parameter[0];
		sendData = funcString + delimeterSymbol + para0;
		this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('innerTokenInitial Error' + exception);  		
	}	
}

function innerDeleteTokenExpiredCertKey(objectData)
{
	var rtn;
	var funcString = "deleteTokenExpiredCertKey";
	var p11Name;
	var sendData;
	try
	{
		var para0 = objectData.parameter[0];
		sendData = funcString + delimeterSymbol + para0;
		setResult(socket_ws, funcString, objectData);
		rtn = this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('<p>innerDeleteTokenExpiredCertKey Error' + exception);  		
	}
}

function innerDeleteTokenCertKeyByCN_SN(objectData)
{
	var rtn;
	var funcString = "deleteTokenCertKeyByCN_SN";
	var p11Name;
	var sendData;
	try
	{
		var CN = objectData.parameter[0];
		var SN = objectData.parameter[1];
		sendData = funcString + delimeterSymbol + CN + delimeterSymbol + SN;
		setResult(socket_ws, funcString, objectData);
		rtn = this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('<p>innerDeleteTokenCertKeyByCN_SN Error' + exception);  		
	}
}
//設定語系
function innerSetLanguage(objectData)
{
	var rtn;
	var funcString = "setLanguage";
	var sendData;
	try
	{
		setResult(socket_ws, funcString, objectData);
		var para0 = objectData.parameter[0];
		sendData = funcString + delimeterSymbol + para0;
		this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('innersetLanguage Error' + exception);  		
	}	
}

function innerSignEx(objectData)
{
	var rtn;
	var funcString = "SignEx";
	var sendData;
	try
	{
		var b64IFX = objectData.parameter[0];
		var b64Profile = objectData.parameter[1];
		setResult(socket_ws, funcString, objectData);
		sendData = funcString + delimeterSymbol + b64IFX + delimeterSymbol + b64Profile;
		this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('<p>innerSignEx Error' + exception);  		
	}
}

function innerSignEx_KB(objectData)
{
	var rtn;
	var funcString = "SignEx_KB";
	var sendData;
	try
	{
		var b64IFX = objectData.parameter[0];
		var b64Profile = objectData.parameter[1];
		setResult(socket_ws, funcString, objectData);
		sendData = funcString + delimeterSymbol + b64IFX + delimeterSymbol + b64Profile;
		this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('<p>innerSignEx Error' + exception);  		
	}
}

function innerB64Decode(objectData)
{
	var rtn;
	var funcString = "B64Decode";
	var sendData;
	try
	{
		setResult(socket_ws, funcString, objectData);
		var b64EncodeData = objectData.parameter[0];
		sendData = funcString + delimeterSymbol + b64EncodeData;
		this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('<p>innerB64Decode Error' + exception);  		
	}	
}

function innerB64EncodeEx(objectData)
{
	var rtn;
	var funcString = "B64EncodeEx";
	var sendData;
	try
	{
		setResult(socket_ws, funcString, objectData);
		var szInput = objectData.parameter[0];
		var nInput = objectData.parameter[1];
		sendData = funcString + delimeterSymbol + szInput + delimeterSymbol + nInput;
		this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('<p>innerB64EncodeEx Error' + exception);  		
	}	
}

function innerGetTokenSN(objectData)
{
	var rtn;
	var funcString = "GetTokenSN";
	var sendData;
	try
	{
		setResult(socket_ws, funcString, objectData);
		var P11DLL = objectData.parameter[0];
		sendData = funcString + delimeterSymbol + P11DLL;
		this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('<p>innerGetTokenSN Error' + exception);  		
	}	
}

function innerTokenChangePIN(objectData)
{
	var rtn;
	var funcString = "TokenChangePIN";
	var sendData;
	try
	{
		setResult(socket_ws, funcString, objectData);
		var P11DLL = objectData.parameter[0];
		var strOldPass = objectData.parameter[1];
		var strNewPass = objectData.parameter[2];
		sendData = funcString + delimeterSymbol + P11DLL + delimeterSymbol + strOldPass + delimeterSymbol + strNewPass;
		this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('<p>innerTokenChangePIN Error' + exception);  		
	}	
}

function innerGetTokenInfo(objectData)
{
	var rtn;
	var funcString = "GetTokenInfo";
	var sendData;
	try
	{
		setResult(socket_ws, funcString, objectData);
		var P11DLL = objectData.parameter[0];
		sendData = funcString + delimeterSymbol + P11DLL;
		this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('<p>innerGetTokenInfo Error' + exception);  		
	}	
}

function innerSelectCertificateEx(objectData)
{
	var rtn;
	var funcString = "selectCertificate_Ex";
	var sendData;
	try
	{
		setResult(socket_ws, funcString, objectData);
		sendData = funcString + delimeterSymbol + "1";
		this.send(sendData);
	}
	catch(exception)
	{
		alert('<p>innerSelectCertificateEx Error' + exception);  		
	}	
}

function innerSelectCertificateBySubjectCN(objectData)
{
	var rtn;
	var funcString = "selectCertificateBySubjectCN";
	var sendData;
	try
	{
		var CN = objectData.parameter[0];
		setResult(socket_ws, funcString, objectData);
		sendData = funcString + delimeterSymbol + CN;
		this.send(sendData);
	}
	catch(exception)
	{
		alert('<p>innerSelectCertificateBySubjectCN Error' + exception);  		
	}	
}

function innerSelectCertificateBySerialNum(objectData)
{
	var rtn;
	var funcString = "selectCertificateBySerialNum";
	var sendData;
	try
	{
		var Serial = objectData.parameter[0];
		setResult(socket_ws, funcString, objectData);
		sendData = funcString + delimeterSymbol + Serial;
		this.send(sendData);
	}
	catch(exception)
	{
		alert('<p>innerSelectCertificateBySerialNum Error' + exception);  		
	}	
}

function innerGetSignedEnvelopByString(objectData)
{
	var rtn;
	var funcString = "getSignedEnvelopByString";
	var sendData;
	try
	{
		setResult(socket_ws, funcString, objectData);
		sendData = funcString + delimeterSymbol + "noparam";
		this.send(sendData);
	}
	catch(exception)
	{
		alert('<p>innerGetSignedEnvelopByString Error' + exception);  		
	}	
}

function innerSetDataContentByString(objectData)
{
	var rtn;
	var funcString = "setDataContentByString";
	var sendData;
	try
	{
		var strDataContent = objectData.parameter[0];
		setResult(socket_ws, funcString, objectData);
		sendData = funcString + delimeterSymbol + strDataContent;
		this.send(sendData);
	}
	catch(exception)
	{
		alert('<p>innerSetDataContentByString Error' + exception);  		
	}	
}

function innerPKCS7Sign(objectData)
{
	var rtn;
	var funcString = "PKCS7Sign";
	var sendData;
	try
	{
		var strPersonID = objectData.parameter[0];
		var strCert = objectData.parameter[1];
		var strDataContent = objectData.parameter[2];
		var strDigestMethod = objectData.parameter[3];
		var strSignatureMethod = objectData.parameter[4];
		setResult(socket_ws, funcString, objectData);
		sendData = funcString + delimeterSymbol 
			+ strPersonID + delimeterSymbol 
			+ strCert + delimeterSymbol
			+ strDataContent + delimeterSymbol
			+ strDigestMethod + delimeterSymbol
			+ strSignatureMethod
			;
		this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('<p>innerPKCS7Sign Error' + exception);  		
	}
}


function innerPKCS7SignIO(objectData)
{
	var rtn;
	var funcString = "PKCS7SignIO";
	var sendData;
	try
	{
		var strPersonID = objectData.parameter[0];
		var strCert = objectData.parameter[1];
		var strDataContent = objectData.parameter[2];
		var strDigestMethod = objectData.parameter[3];
		var strSignatureMethod = objectData.parameter[4];
		setResult(socket_ws, funcString, objectData);
		sendData = funcString + delimeterSymbol 
			+ strPersonID + delimeterSymbol 
			+ strCert + delimeterSymbol
			+ strDataContent + delimeterSymbol
			+ strDigestMethod + delimeterSymbol
			+ strSignatureMethod
			;
		this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('<p>innerPKCS7Sign Error' + exception);  		
	}
}

function innerVAPKCS7Sign(objectData)
{
	var rtn;
	var funcString = "VAPKCS7Sign";
	var sendData;
	try
	{
		var strP11DLL = objectData.parameter[0];
		var personid = objectData.parameter[1];
		var strDataContent = objectData.parameter[2];
		var strDigestMethod = objectData.parameter[3];
		var strSignatureMethod = objectData.parameter[4];
		setResult(socket_ws, funcString, objectData);
		sendData = funcString + delimeterSymbol 
			+ strP11DLL + delimeterSymbol 
			+ personid + delimeterSymbol
			+ strDataContent + delimeterSymbol
			+ strDigestMethod + delimeterSymbol
			+ strSignatureMethod
			;
		this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('<p>innerVAPKCS7Sign Error' + exception);  		
	}
}

function innerVAPKCS7SignIO(objectData)
{
	var rtn;
	var funcString = "VAPKCS7SignIO";
	var sendData;
	try
	{
		var strP11DLL = objectData.parameter[0];
		var strPersonID = objectData.parameter[1];
		var strDataContent = objectData.parameter[2];
		var strDigestMethod = objectData.parameter[3];
		var strSignatureMethod = objectData.parameter[4];
		setResult(socket_ws, funcString, objectData);
		sendData = funcString + delimeterSymbol 
			+ strP11DLL + delimeterSymbol 
			+ strPersonID + delimeterSymbol
			+ strDataContent + delimeterSymbol
			+ strDigestMethod + delimeterSymbol
			+ strSignatureMethod
			;
		this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('<p>innerVAPKCS7Sign Error' + exception);  		
	}
}

function innerSign(objectData)
{
	var rtn;
	var funcString = "sign";
	var sendData;
	try
	{
		var strCert = objectData.parameter[0];
		var strDigestMethod = objectData.parameter[1];
		var strSignatureMethod = objectData.parameter[2];
		setResult(socket_ws, funcString, objectData);
		sendData = funcString + delimeterSymbol + strCert + delimeterSymbol + strDigestMethod + delimeterSymbol + strSignatureMethod;
		this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('<p>innerSign Error' + exception);  		
	}
}

function innerSignIO(objectData)
{
	var rtn;
	var funcString = "signIO";
	var sendData;
	try
	{
		var strP11DLL = objectData.parameter[0];
		var strCert = objectData.parameter[1];
		var strDigestMethod = objectData.parameter[2];
		var strSignatureMethod = objectData.parameter[3];
		setResult(socket_ws, funcString, objectData);
		sendData = funcString + delimeterSymbol + strP11DLL + delimeterSymbol + strCert + delimeterSymbol + strDigestMethod + delimeterSymbol + strSignatureMethod;
		this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('<p>innerSignIO Error' + exception);  		
	}
}

function innerGetIP_MAC(objectData)
{
	var rtn;
	var funcString = "getIP_MAC";
	var sendData;
	try
	{
		var strP11DLL = objectData.parameter[0];
		var strCert = objectData.parameter[1];
		var strDigestMethod = objectData.parameter[2];
		var strSignatureMethod = objectData.parameter[3];
		setResult(socket_ws, funcString, objectData);
		sendData = funcString + delimeterSymbol + "none";
		this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('<p>innerGetIP_MAC Error' + exception);  		
	}
}

function innerInquireProtectionData(objectData)
{
	var rtn;
	var funcString = "inquireProtectionData";
	var sendData;
	try
	{
		var strTitle = objectData.parameter[0];
		var strKeyValue = objectData.parameter[1];
		var bShowDot = objectData.parameter[2];
		setResult(socket_ws, funcString, objectData);
		sendData = funcString + delimeterSymbol + strTitle + delimeterSymbol + strKeyValue + delimeterSymbol + bShowDot;
		this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('<p>innerInquireProtectionData Error' + exception);  		
	}
}
/*
function innerGetProtectionDataPlain(objectData)
{
	var rtn;
	var funcString = "getProtectionDataPlain";
	var sendData;
	try
	{
		setResult(socket_ws, funcString, objectData);
		sendData = funcString + delimeterSymbol + "none";
		this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('<p>innerGetProtectionDataPlain Error' + exception);  		
	}
}

function innerGetProtectionDataCipher(objectData)
{
	var rtn;
	var funcString = "getProtectionDataCipher";
	var sendData;
	try
	{
		setResult(socket_ws, funcString, objectData);
		sendData = funcString + delimeterSymbol + "none";
		this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('<p>innerGetProtectionDataCipher Error' + exception);  		
	}
}*/

function innerConvertTextToImage(objectData)
{
	var rtn;
	var funcString = "convertTextToImage";
	var sendData;
	try
	{
		var strInputText = objectData.parameter[0];
		var strKeyValue = objectData.parameter[1];
		var strTitle = objectData.parameter[2];
		setResult(socket_ws, funcString, objectData);
		sendData = funcString + delimeterSymbol + strInputText
			+ delimeterSymbol + strKeyValue
			+ delimeterSymbol + strTitle
		;
		this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('<p>innerConvertTextToImage Error' + exception);  		
	}
}

function innerCallGRD(objectData)
{
	var rtn;
	var funcString = "CallGRD";
	var sendData;
	try
	{
		var Title = objectData.parameter[0];
		var MaxLen = objectData.parameter[1];
		setResult(socket_ws, funcString, objectData);
		sendData = funcString + delimeterSymbol + Title
			+ delimeterSymbol + MaxLen
		;
		this.send(sendData);
	}
	catch(exception)
	{
		process_hide();
		alert('<p>innerCallGRD Error' + exception);  		
	}
}