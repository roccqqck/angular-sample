﻿﻿function MainCreatePKCS10(commonName) {
	if (commonName == '') {
		alert('請設定 Common Name 內容');
		return;
	}
	var useKeyLength = 2048;
	callbackIndex = 0;
	callbackFuncName[0] = "";
	
	if (ht_Sync_Plugin_Installed == true) {
		var strCSR = "";

		var cab_path = this.fbEnrollObj.FullPath;

		var etoken_dll = cab_path + "etoken.dll";
		this.fbEnrollObj.PKCS11LibName = etoken_dll;// document.thisform.P11Name.value;

		document.wssocketform.action.value = "subCreatePkcs10";
		strCSR = this.fbEnrollObj.createPkcs10(commonName, useKeyLength);
		if (strCSR.length == 0 && this.fbEnrollObj.LastErrorCode != 0) {
			showHelpMsg('', this.fbEnrollObj.LastErrorCode,
					this.fbEnrollObj.LastErrorStr);
			return;
		}
		document.wssocketform.CSR.value = strCSR;
		arrangeFunction();
	} else if (ht_WS_Installed == true) {
		setWSP11Lib();
		process_show();
		document.wssocketform.CN.value = commonName;
		document.wssocketform.RSAKeyLen.value = useKeyLength;
		wsCreatePkcs10();
	} else {
		//alert('偵測不到新舊元件');
	}
}

// funName ex: 簽章憑證匯入瀏覽器/加密憑證匯入瀏覽器
function MainInstallCert(certValue) {
	if (certValue == "") {
		alert("請設定 憑證內容");
		return -1;
	}
	callbackIndex = 0;
	callbackFuncName[0] = "";
	
	if (ht_Sync_Plugin_Installed == true) {
		var cab_path = this.fbEnrollObj.FullPath;
		// alert("cab_path = " + cab_path);
	
		var etoken_dll = cab_path + "etoken.dll";
	
		this.fbEnrollObj.PKCS11LibName = etoken_dll;// document.thisform.P11Name.value;
	
		document.wssocketform.action.value = "subInstallCert";
		var rtn = this.fbEnrollObj.installCert(certValue);
		if (rtn != 0) {
			document.wssocketform.rtn.value = this.fbEnrollObj.LastErrorCode;
			// alert(funName+"失敗，錯誤代碼:" + rtn);
//			showHelpMsg('', this.fbEnrollObj.LastErrorCode,
//					this.fbEnrollObj.LastErrorStr);
		}
		else{
			document.wssocketform.rtn.value = rtn;
		}
		arrangeFunction();
	} else if (ht_WS_Installed == true) {
		setWSP11Lib();
		process_show();
		document.wssocketform.b64Cert.value = certValue;
		wsInstallCert();
	} else {
		//alert('偵測不到新舊元件');
	}
}
/*
function MainDeleteTokenExpiredCertKey(expiredate) {
	
	callbackIndex = 0;
	callbackFuncName[0] = "";
	
	if (ht_Sync_Plugin_Installed == true) {
		var cab_path = this.FBEnrollObj.FullPath;
		// alert("cab_path = " + cab_path);
	
		var etoken_dll = cab_path + "etoken.dll";
	
		this.FBEnrollObj.PKCS11LibName = etoken_dll;// document.thisform.P11Name.value;
		var rtn = 0;
		rtn = this.FBEnrollObj.deleteTokenExpiredCertKey(expiredate);
		if (rtn != 0) {
			alert("失敗，錯誤代碼:" + rtn);
		}
		document.wssocketform.rtn.value = rtn;
		arrangeFunction();
		return;
	} else if (ht_WS_Installed == true) {
		process_show();
		document.wssocketform.ExpireDate.value = CertCN;
		wsDeleteTokenExpiredCertKey();
		return;
	} else {
		//alert('偵測不到新舊元件');
		return;
	}
}*/

function MainDeleteCertKeyCN_SN(CertCN, CertSN) {
	// 同樣的CN，將傳入此SN外之憑證刪除
	// 也就是留下傳入SN之憑證，其他相同CN的憑證會被刪除
	callbackIndex = 0;
	callbackFuncName[0] = "";
	
	if (ht_Sync_Plugin_Installed == true) {
		var cab_path = this.fbEnrollObj.FullPath;
		// alert("cab_path = " + cab_path);
	
		var etoken_dll = cab_path + "etoken.dll";
	
		this.fbEnrollObj.PKCS11LibName = etoken_dll;// document.thisform.P11Name.value;
		var rtn = 0;
		document.wssocketform.action.value = "subDeleteTokenCertKeyByCN_SN";
		rtn = this.fbEnrollObj.deleteTokenCertKeyByCN_SN(CertCN, CertSN);
		if (rtn != 0) {
			alert("失敗，錯誤代碼:" + rtn);
		}
		document.wssocketform.rtn.value = rtn;
		arrangeFunction();
	} else if (ht_WS_Installed == true) {
		setWSP11Lib();
		process_show();
		document.wssocketform.CN.value = CertCN;
		document.wssocketform.CertSerialNo.value = CertSN;
		wsDeleteTokenCertKeyByCN_SN();
	} else {
		//alert('偵測不到新舊元件');
	}
}
/*
function MainTokenInitial() {
	callbackIndex = 0;
	callbackFuncName[0] = "";
	
	if (ht_Sync_Plugin_Installed == true)
	{
		var etoken_dll = "";
	
		if (OSType == "Windows") {
			etoken_dll = "eToken.dll";
		} else if (OSType == "MacOSX") {
			etoken_dll = "/Library/FBTokenLib/libeToken.dylib";
		}
	
		// alert("etoken_dll=" + etoken_dll);
		var nRtn = this.xmlSig.TokenInitial(etoken_dll);
		document.wssocketform.rtn.value = nRtn;
		arrangeFunction();
		return;
	} else if (ht_WS_Installed == true) {
		process_show();
		wsTokenInitial();
		return;
	} else {
		//alert('偵測不到新舊元件');
		return;
	}
}*/

function MainGetTokenSN() {
	callbackIndex = 0;
	callbackFuncName[0] = "";
	if (ht_Sync_Plugin_Installed == true) {
		var etoken_dll = "";

		if (OSType == "Windows") {
			etoken_dll = "eToken.dll";
		} else if (OSType == "MacOSX") {
			etoken_dll = "/Library/FBTokenLib/libeToken.dylib";
		}

		document.wssocketform.action.value = "subGetTokenSN";
		var TokenSN = this.fbEnrollObj.GetTokenSN(etoken_dll);
		document.wssocketform.TokenSerialNo.value = TokenSN;
		arrangeFunction();
	} else if (ht_WS_Installed == true) {
		setWSP11Lib();
		process_show();
		wsGetTokenSN();
	} else {
		//alert('偵測不到新舊元件');
	}
}

function MainTokenChangePIN(oldPIN, newPIN) {
	callbackIndex = 0;
	callbackFuncName[0] = "";
	if (ht_Sync_Plugin_Installed == true) {
		var OLDPIN = oldPIN;
		var NEWPIN = newPIN;
		document.wssocketform.action.value = "subTokenChangePIN";
		var nRtn = this.fbibanktxnObj.TokenChangePIN(this.dllpath, OLDPIN, NEWPIN);
		document.wssocketform.rtn.value = nRtn;
		arrangeFunction();
		return;
	} else if (ht_WS_Installed == true) {
		setWSP11Lib();
		process_show();
		async = false;
		document.wssocketform.OldPass.value = oldPIN;
		document.wssocketform.NewPass.value = newPIN;
		wsTokenChangePIN();
	} else {
		//alert('偵測不到新舊元件');
	}
}

function MainGetTokenInfo() {
	
	callbackIndex = 0;
	callbackFuncName[0] = "";
	if (ht_Sync_Plugin_Installed == true) {

		document.wssocketform.action.value = "subGetTokenInfo";
		var nRtn = this.pkcs7SignObj.GetTokenInfo(this.dllpath);
		document.wssocketform.rtn.value = nRtn;
		arrangeFunction();
		return;
	} else if (ht_WS_Installed == true) {
		setWSP11Lib();
		process_show();
		wsGetTokenInfo();
	} else {
		//alert('偵測不到新舊元件');
	}
}

function MainGetVersion() {
	callbackIndex = 0;
	callbackFuncName[0] = "";
	if (ht_Sync_Plugin_Installed == true) {
		arrangeFunction();
	} else if (ht_WS_Installed == true) {
		setWSP11Lib();
		process_show();
		wsGetVersion();
	} else {
		//alert('偵測不到新舊元件');
	}
}

// /////////////////////////////////////////////////////////////////////////////
// Method : verify(toBeVerifyXml, mode)
// Description: EXOM signedXML資料驗章
// Author : Rick Chen
// Date: : 2004.05.28
// /////////////////////////////////////////////////////////////////////////////
function MainVerify(toBeVerifyXml, mode) {
}
//單獨取憑證
function MainSelectCertificateEx()
{
	callbackIndex = 0;
	callbackFuncName[0] = "";
	
	if (ht_Sync_Plugin_Installed == true) {
		document.wssocketform.action.value = "subSelectCertificateEx";
		rtn = this.fbcertvaobj.selectCertificate_Ex(0);
		if (rtn != 0) {
			alert("失敗，錯誤代碼:" + rtn);
		}
		document.wssocketform.b64Cert.value = this.fbcertvaobj.certificate;
		document.wssocketform.rtn.value = rtn;
		arrangeFunction();
	} else if (ht_WS_Installed == true) {
		setWSP11Lib();
		process_show();
		wsSelectCertificateEx();
	} else {
		//alert('偵測不到新舊元件');
	}
}

//pkcs7sign的取得元件
function MainSelectCertificateBySubjectCN(commonName)
{
	callbackIndex = 0;
	callbackFuncName[0] = "";
	var rtn = 0;
	if (ht_Sync_Plugin_Installed == true) {
		if (OSType != "MacOSX"){
			rtn = this.fbcertvaObj.SetPKCS11LibNames(this.dllpath);
		}else{
			rtn = this.fbcertvaObj.SetPKCS11LibName(this.dllpath);
		}
		if (rtn != 0) {
            return false;
        }
		if (OSType != "MacOSX"){
			this.fbcertvaObj.PKCS11LibName = this.fbcertvaObj.DetectedTokenPKCS11LibName;
		}
		document.wssocketform.action.value = "subSelectCertificateBySubjectCN";
		rtn = this.fbcertvaobj.selectCertificateBySubjectCN(commonName);
		if (rtn != 0) {
			alert("失敗，錯誤代碼:" + rtn);
		}
		document.wssocketform.b64Cert.value = this.fbcertvaobj.certificate;
		document.wssocketform.rtn.value = rtn;
		arrangeFunction();
	} else if (ht_WS_Installed == true) {
		setWSP11Lib();
		document.wssocketform.CN.value = commonName;
		process_show();
		wsSelectCertificateBySubjectCN();
	} else {
		//alert('偵測不到新舊元件');
	}
}
//pkcs7sign的取得憑證
function MainSelectCertificateBySerialNum(certSerialNo)
{
	callbackIndex = 0;
	callbackFuncName[0] = "";
	
	if (ht_Sync_Plugin_Installed == true) {
		document.wssocketform.action.value = "subSelectCertificateBySerialNum";
		rtn = FBiBankTxnObj.selectCertificateBySerialNum(certSerialNo);
		if (rtn != 0) {
			alert("失敗，錯誤代碼:" + rtn);
		}
		document.wssocketform.b64Cert.value = this.fbibanktxnobj.certificate;
		document.wssocketform.rtn.value = rtn;
		arrangeFunction();
	} else if (ht_WS_Installed == true) {
		setWSP11Lib();
		document.wssocketform.CertSerialNo.value = certSerialNo;
		process_show();
		wsSelectCertificateBySerialNum();
	} else {
		//alert('偵測不到新舊元件');
	}
}

function MainGetSignedEnvelopByString()
{
	callbackIndex = 0;
	callbackFuncName[0] = "";
	
	if (ht_Sync_Plugin_Installed == true) {
		document.wssocketform.action.value = "subGetSignedEnvelopByString";
		document.wssocketform.SignedData.value = this.fbibanktxnobj.getSignedEnvelopByString();
		arrangeFunction();
	} else if (ht_WS_Installed == true) {
		setWSP11Lib();
		process_show();
		wsGetSignedEnvelopByString();
	} else {
		//alert('偵測不到新舊元件');
	}
}

//原FBCertClient.js.PKCSSign
//VACertObj
function MainVASign(P11orCAPI, personID, data)
{
	var rtn = 0;
	if (data == "") {
        alert("請輸入文件字串");
        return false;
    }
    // 確認身分證字號
    if (personID.length != 10) {
        alert("請輸入10位身份證字號");
        return false;
    }
	
	callbackIndex = 0;
	callbackFuncName[0] = "";
	var dll = "";
	if (OSType == 'Windows')
		dll = "HiCOSPKCS11.dll";
	else
		dll = "libHicos_p11v1.dylib";
	
	if (ht_Sync_Plugin_Installed == true) {
		if ("P11" == P11orCAPI)
		{
			if (OSType != "MacOSX"){
				rtn = this.fbcertvaObj.SetPKCS11LibNames(this.dllpath);
			}else{
				rtn = this.fbcertvaObj.SetPKCS11LibName(this.dllpath);
			}
			if (rtn != 0) {
	            return false;
	        }
			if (OSType != "MacOSX"){
				this.fbcertvaObj.PKCS11LibName = this.fbcertvaObj.DetectedTokenPKCS11LibName;
			}
			rtn = this.fbcertvaObj.selectCertificate_Ex(0);
			if (rtn != 0) {
				showHelpMsg("選擇憑證", rtn, this.fbcertvaObj.LastErrorStr);
	            alert("無法選取自然人憑證，請確認自然人憑證晶片卡與讀卡機連線是否正確");
	            return false;
			}
		}
		else
		{
			this.fbcertvaObj.PKCS11LibName = '';
			rtn = this.fbcertvaObj.selectCertificateBySubjectCN(personID);
			if (rtn != 0) {
				showHelpMsg("選擇憑證", rtn, this.fbcertvaObj.LastErrorStr);
	            alert("無法選取簽章憑證，請確認憑證是否存在");
	            return false;
			}
		}
		
		var cert = this.fbcertvaObj.certificate;

		rtn = this.fbcertvaObj.PKCS7Sign(personID, cert, data, "SHA256", "RSA");
	    if (rtn != 0) {
	        showHelpMsg("使用者簽章", rtn, this.fbcertvaObj.LastErrorStr);
	        return false;
	    }
		document.wssocketform.action.value = "subVAPKCS7Sign";
		document.wssocketform.SignedData.value = this.fbcertvaObj.getSignedEnvelopByString();
		document.wssocketform.rtn.value = rtn;
		arrangeFunction();
	} else if (ht_WS_Installed == true) {
		document.wssocketform.PersonID.value = personID;
		document.wssocketform.Data.value = data;
		document.wssocketform.DigestMethod.value = "SHA256";
		document.wssocketform.SignatureMethod.value = "RSA";
		process_show();
		if ("P11" == P11orCAPI)
		{
			document.wssocketform.P11LibName.value = dll;
			wsGetSignedEnvelopByStringVAP11();
		}
		else
		{
			document.wssocketform.P11LibName.value = "";
			wsGetSignedEnvelopByStringVACAPI();
		}
	} else {
		//alert('偵測不到新舊元件');
	}
}

function MainPKCS7SignIO(certSerialNo, data)
{
	var rtn = 0;
	if (data == "") {
        alert("請輸入文件字串");
        return false;
    }
    
	callbackIndex = 0;
	callbackFuncName[0] = "";
	if(iever.IsIE != true){
		DetectAsyncWebSocket();
	}
	if (ht_Sync_Plugin_Installed == true) {
		
		if (OSType != "MacOSX"){
			rtn = this.fbibanktxnObj.SetPKCS11LibNames(this.dllpath);
		}else{
			rtn = this.fbibanktxnObj.SetPKCS11LibName(this.dllpath);
		}
		if (rtn != 0) {
			showHelpMsg('', rtn,'');
            return false;
        }
		if (OSType != "MacOSX"){
			this.fbibanktxnObj.PKCS11LibName = this.fbibanktxnObj.DetectedTokenPKCS11LibName;
		}
		rtn = this.fbibanktxnObj.setDataContentByString(data);

		if (rtn != 0){
			showHelpMsg('', rtn,'');
			return false;
		}
		if (certSerialNo != "")
		{
			rtn = this.fbibanktxnObj.selectCertificateBySerialNum(certSerialNo);
		}
		else
		{
			rtn = this.fbibanktxnObj.selectCertificate_Ex(0);
		}
		if (rtn != 0)
		{
			showHelpMsg("選擇憑證", rtn, this.fbibanktxnObj.LastErrorStr);
			return false;
		}
		
		var cert = this.fbibanktxnObj.certificate;
		
		rtn = this.fbibanktxnObj.signIO(this.dllpath, cert, "SHA256", "RSA");
	    if (rtn != 0) {
	        showHelpMsg("使用者簽章", rtn, this.fbibanktxnObj.LastErrorStr);
	        return false;
	    }
		document.wssocketform.action.value = "subGetSignedEnvelopByString";
		document.wssocketform.SignedData.value = this.fbibanktxnObj.getSignedEnvelopByString();
		document.wssocketform.rtn.value = rtn;
		arrangeFunction();
		return true;
	} else if (ht_WS_Installed == true) {
		setWSP11Lib();
		document.wssocketform.Data.value = data;
		document.wssocketform.DigestMethod.value = "SHA256";
		document.wssocketform.SignatureMethod.value = "RSA";
		process_show();
		if(certSerialNo != "")
		{
			document.wssocketform.CertSerialNo.value = certSerialNo;
			wsGetSignedEnvelopByStringPKCS7IO_CertSerialNum();
			return true;
		}
		else
		{
			document.wssocketform.CertSerialNo.value = "";
			wsGetSignedEnvelopByStringPKCS7IO_Ex();
		}
	} else {
		var url = window.location.href;
		if (confirmEnding(url,"020101.html")){
			if(iever.IsIE == true){
				if (confirm("元件未正常安裝!!請重新執行交易並安裝元件")) window.location = '0201.html';
			}
		}else{
	        top.$("#waringMsg .pop-content").text("元件未正常安裝!!請重新執行交易並安裝元件");
	    	top.modal1.toggle();
	    	return false;
    	}
	}
}

function MainPKCS7SignNoIO(certSerialNo, data)
{
	var rtn = 0;
	if (data == "") {
        alert("請輸入文件字串");
        return false;
    }
    
	callbackIndex = 0;
	callbackFuncName[0] = "";
	
	if (ht_Sync_Plugin_Installed == true) {
		if (OSType != "MacOSX"){
			rtn = this.fbibanktxnObj.SetPKCS11LibNames(this.dllpath);
		}else{
			rtn = this.fbibanktxnObj.SetPKCS11LibName(this.dllpath);
		}
		if (rtn != 0) {
			showHelpMsg('', rtn,'');
            return false;
        }
		if (OSType != "MacOSX"){
			this.fbibanktxnObj.PKCS11LibName = this.fbibanktxnObj.DetectedTokenPKCS11LibName;
		}
		rtn = this.fbibanktxnObj.setDataContentByString(data);
		if (rtn != 0)
			return false;
		if (certSerialNo != "")
		{
			rtn = this.fbibanktxnObj.selectCertificateBySerialNum(certSerialNo);
		}
		else
		{
			rtn = this.fbibanktxnObj.selectCertificate_Ex(0);
		}
		if (rtn != 0)
		{
			showHelpMsg("選擇憑證", rtn, this.fbibanktxnObj.LastErrorStr);
			return false;
		}
		
		var cert = this.fbibanktxnObj.certificate;
		rtn = this.fbibanktxnObj.sign(cert, "SHA256", "RSA");
	    if (rtn != 0) {
	        showHelpMsg("使用者簽章", rtn, this.fbibanktxnObj.LastErrorStr);
	        return false;
	    }
		document.wssocketform.action.value = "subGetSignedEnvelopByString";
		document.wssocketform.SignedData.value = this.fbibanktxnObj.getSignedEnvelopByString();
		document.wssocketform.rtn.value = rtn;
		arrangeFunction();
	} else if (ht_WS_Installed == true) {
		setWSP11Lib();
		document.wssocketform.Data.value = data;
		document.wssocketform.CertSerialNo.value = certSerialNo;
		document.wssocketform.DigestMethod.value = "SHA256";
		document.wssocketform.SignatureMethod.value = "RSA";
		process_show();
		wsGetSignedEnvelopByStringPKCS7NoIO();
	} else {
        top.$("#waringMsg .pop-content").text("元件未正常安裝!!請重新執行交易並安裝元件");
    	top.modal1.toggle();
    	return false;
	}
}

///BHO
function MainGetIP_MAC()
{
	callbackIndex = 0;
	callbackFuncName[0] = "";
	
	if (ht_Sync_Plugin_Installed == true) {
		var rtn = 0;
		document.wssocketform.action.value = "subGetIP_MAC";
	    var IP_MAC = this.macClientObj.getIP_MAC();
	    rtn = this.macClientObj.LastErrorCode;
	    if (rtn != 0) {
	        alert("Get IP and MAC fail! Error code: " + rtn);
	    }
		document.wssocketform.IPMAC.value = IP_MAC;
		document.wssocketform.rtn.value = rtn;
		arrangeFunction();
	} else if (ht_WS_Installed == true) {
		setWSP11Lib();
		process_show();
		wsGetIP_MAC();
	} else {
		//alert('偵測不到新舊元件');
	}
}

function MainInquireProtectionData(title, kv, showDot)
{
	callbackIndex = 0;
	callbackFuncName[0] = "";
	if(iever.IsIE != true) {
		DetectAsyncWebSocket4NTD();
	}

	if (ht_Sync_Plugin_Installed == true) {
		var rtn = 0;
	    var plainData;
	    var cipherData;
		document.wssocketform.action.value = "subInquireProtectionData";
	    var rtn = this.pkcs7SignObj.inquireProtectionData(title, kv, showDot);
		if (typeof rtn=="string"){
			rtn = parseInt(rtn);
		}

	    if (rtn != 0 && rtn != 28) {
	        top.$("#waringMsg .pop-content").text("getProtectionData fail! Error code: " + rtn);
	        top.modal1.toggle();
	    } else if (rtn == 28) {
	        plainData = "";
	        cipherData = "";
	    } else {
	        plainData = this.pkcs7SignObj.getProtectionDataPlain();
	        cipherData = this.pkcs7SignObj.getProtectionDataCipher();
	    }
	    document.wssocketform.BHOPlain.value = plainData;
		document.wssocketform.BHOCipher.value = cipherData;
		document.wssocketform.rtn.value = rtn;
		arrangeFunction();
	} else if (ht_WS_Installed == true) {
		setWSP11Lib();
		process_show();
		document.wssocketform.BHOTitle.value = title;
		document.wssocketform.BHOKeyValue.value = kv;
		document.wssocketform.BHOShowDot.value = showDot;
		wsInquireProtectionData();
	} else {
		//alert('偵測不到新舊元件');
	}
}

function MainConvertText2Img(title, kv, obj)
{
	callbackIndex = 0;
	callbackFuncName[0] = "";
	var data = obj.value;
    var objType = document.getElementById(data);
    /*==================
     * 若選擇約定轉入帳號,不需使用BHO元件
     */
    if(!('F'==objType.value)) { 
    	title = 'DONOTSHOWDIALOG';
    	return;
    }
    if(iever.IsIE != true) {
    	DetectAsyncWebSocket4NTD();
    }
	if (ht_Sync_Plugin_Installed == true) {
		var rtn = 0;
	    var plainData;
	    var cipherData;
		document.wssocketform.action.value = "subConvertTextToImage";
	    var cipherData = this.pkcs7SignObj.convertTextToImage(data, kv, title);
	    rtn = this.pkcs7SignObj.LastErrorCode;
	    if (rtn != 0 && rtn != 28) {
	    	 top.$("#waringMsg .pop-content").text("ConvertTextToImage fail! Error code: " + rtn);
	         top.modal1.toggle();
	    } else if (rtn != 28) {
	    	if (cipherData == '') {
	            //alert("請輸入正確的KeyValue。");
	            top.$("#waringMsg .pop-content").text("請輸入正確的KeyValue。");
	            top.modal1.toggle();
	            //console.log("請輸入正確的KeyValue。");
	        }
	    } else {
	    	;
	    }
	    document.wssocketform.BHOImage.value = cipherData;
		document.wssocketform.rtn.value = rtn;
		arrangeFunction();
		return;
	} else if (ht_WS_Installed == true) {
		setWSP11Lib();
		process_show();
		document.wssocketform.BHOPlain.value = data;
		document.wssocketform.BHOKeyValue.value = kv;
		document.wssocketform.BHOTitle.value = title;
		wsConvertTextToImage();
		return;
	} else {
		//alert('偵測不到新舊元件');
		return;
	}
}

function MainCallGRD(title, length)
{
	callbackIndex = 0;
	callbackFuncName[0] = "";
	
	if (ht_Sync_Plugin_Installed == true) {
		var rtn = 0;
	    var backObj;

		document.wssocketform.action.value = "subCallGRD";
	    backObj = this.pkcs7SignObj.CallGRD(title, length);
	    rtn = this.pkcs7SignObj.LastErrorCode;
	    if (rtn != 0 && rtn != 28) {
	    	alert("callGRD fail! Error code: " + rtn);
	        top.$("#waringMsg .pop-content").text("callGRD fail! Error code: " + rtn);
	        top.modal1.toggle();
	    } else if (rtn != 28) {
	    	document.wssocketform.BHOGRD.value = backObj;
	    } else {
	    	;
	    }
		document.wssocketform.rtn.value = rtn;
		arrangeFunction();
	} else if (ht_WS_Installed == true) {
		setWSP11Lib();
		process_show();
		document.wssocketform.BHOTitle.value = title;
		document.wssocketform.BHOMaxLength.value = length;
		wsCallGRD();
	} else {
		//alert('偵測不到新舊元件');
	}
}
// /////////////////////////////////////////////////////////////////////////////
// Class : certObj
// Description: certObj class for ecom sign and verify
// Author : Rick Chen
// Date: : 2004.05.28
// /////////////////////////////
// 調整支援ActiveX及Websockets版本
// Author : Peter Lee
// Date : 2016/10/31
// /////////////////////////////////////////////////////////////////////////////
function certObj() {
	this.base64XmlData = "";
	this.base64XmlScope = "";
	this.base64SignedXmlData = "";
	this.xmlData = "";
	this.xmlScope = "";
	this.signedXmlData = "";

	this.CSR_result = "";
	this.TokenSN_str = "";
	this.VERSION_str = "";

	//判斷是否有裝舊元件(使用同步式寫法)
	if (ht_Sync_Plugin_Installed == true)
	{
		if (componentType == 1)	//windows activex
		{
			this.fbcertvaObj = FBCertVAObj;
			this.fbEnrollObj = FBEnrollObj;
			this.pkcs7SignObj = P7SignatureClientObj;
			this.fbibanktxnObj = FBiBankTxnObj;
			this.macClientObj = MACClientObj;
			var etoken_dll = "etoken.dll";
			var cab_path = this.fbibanktxnObj.FullPath;
			etoken_dll = cab_path + etoken_dll;
			this.dllpath = etoken_dll;
		}
		else if (componentType == 3)//mac plugin
		{
			this.fbcertvaObj = FBCertVAObj;
			this.fbEnrollObj = FBEnrollObj;
			this.pkcs7SignObj = FBiBankTxnObj;
			this.fbibanktxnObj = FBiBankTxnObj;
			this.macClientObj = FBiBankTxnObj;
			this.dllpath = "/Library/FBTokenLib/libeToken.dylib";
		}
	}
	else
	{
		if(OSType == "Windows")
		{
		    //IE 7,8,9,10,11 -> 提示安裝ActiveX元件
		    if(iever.IsIE == true)
		    {
		    	//alert('請安裝activex元件');
		    }
		    else
	    	{
				DetectAsyncWebSocket();
	    	}
		}
		else if (OSType == "MacOSX")
		{
    		DetectAsyncWebSocket();
		}
		else
		{
	        top.$("#waringMsg .pop-content").text("不支援的作業系統");
	    	top.modal1.toggle();
		}
	}

	//function宣告
//	this.sign = MainSign;
	this.verify = MainVerify;
	this.FBEnroll_createPKCS10 = MainCreatePKCS10;
	this.FBEnroll_InstallCert = MainInstallCert;
	this.FBEnroll_deleteCertKeyCN_SN = MainDeleteCertKeyCN_SN;
//	this.FBEnroll_deleteTokenExpiredCertKey = MainDeleteTokenExpiredCertKey;
//	this.TokenInitial = MainTokenInitial;
	this.GetTokenSN = MainGetTokenSN;
	this.TokenChangePIN = MainTokenChangePIN;
	this.GetTokenInfo = MainGetTokenInfo;
	this.GetVersion = MainGetVersion;
//	this.selectCertificate_Ex = MainSelectCertificateEx;
//	this.selectCertificateBySubjectCN = MainSelectCertificateByCertCN;
	this.VASign = MainVASign;
	this.PKCS7SignIO = MainPKCS7SignIO;
	this.PKCS7SignNoIO = MainPKCS7SignNoIO;
	this.GetMacIP = MainGetIP_MAC;
	this.InquireProtectionData = MainInquireProtectionData;
	this.ConvertText2Img = MainConvertText2Img;
	this.CallGRD = MainCallGRD;
//	this.getSignedEnvelopByString = MainGetSignedEnvelopByString;
//	this.setDataContentByString = MainSetDataContentByString;
	
	
}
function confirmEnding(fullstr, endstr) {
	return (fullstr.substr(-endstr.length) === endstr) ? true : false;
}
var myToken = new certObj();