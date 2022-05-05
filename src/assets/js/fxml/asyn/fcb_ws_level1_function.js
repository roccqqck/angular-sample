
function subSetPKCS11LibName()
{
	document.wssocketform.action.value = "subSetPKCS11LibName";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//set parameter
	WSDataObject.parameter[0] = document.wssocketform.P11LibName.value;
	WSDataObject.parameter[1] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = "";
	innerSetPKCS11LibName(WSDataObject);	
}

function subGetVersion()
{
	document.wssocketform.action.value = "subGetVersion";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//set parameter
	WSDataObject.parameter[0] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = document.wssocketform.WSVersion;
	WSDataObject.domData[1] = "";
	innerGetVersion(WSDataObject);	
}

function subCreatePkcs10()
{
	document.wssocketform.action.value = "subCreatePkcs10";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	WSDataObject.parameter[0] = document.wssocketform.CN.value;
	WSDataObject.parameter[1] = document.wssocketform.RSAKeyLen.value;
	WSDataObject.parameter[2] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = document.wssocketform.CSR;
	WSDataObject.domData[1] = "";
	//set parameter
	innerCreatePkcs10(WSDataObject);	
}

function subInstallCert()
{
	document.wssocketform.action.value = "subInstallCert";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//設定要傳到websocket的參數
	WSDataObject.parameter[0] = document.wssocketform.b64Cert.value;
	WSDataObject.parameter[1] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = "";
	//set parameter
	innerInstallCert(WSDataObject);	
}

function subTokenInitial()
{
	document.wssocketform.action.value = "subTokenInitial";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//設定要傳到websocket的參數
	WSDataObject.parameter[0] = document.wssocketform.P11LibName.value;
	WSDataObject.parameter[1] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = "";
	//set parameter
	innerTokenInitial(WSDataObject);	
}

function subDeleteTokenExpiredCertKey()
{
	document.wssocketform.action.value = "subDeleteTokenExpiredCertKey";
	//設定要傳到websocket的參數
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//YYYYMMDD
	WSDataObject.parameter[0] = document.wssocketform.ExpireDate.value;
	WSDataObject.parameter[1] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = "";
	//set parameter
	innerDeleteTokenExpiredCertKey(WSDataObject);	
}

function subDeleteTokenCertKeyByCN_SN()
{
	document.wssocketform.action.value = "subDeleteTokenCertKeyByCN_SN";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//設定要傳到websocket的參數
	WSDataObject.parameter[0] = document.wssocketform.CN.value;
	WSDataObject.parameter[1] = document.wssocketform.CertSerialNo.value;
	WSDataObject.parameter[2] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = "";
	//set parameter
	innerDeleteTokenCertKeyByCN_SN(WSDataObject);	
}

function subSetLanguage()
{
	document.wssocketform.action.value = "subSetLanguage";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//設定要傳到websocket的參數
	WSDataObject.parameter[0] = document.wssocketform.Language.value;
	WSDataObject.parameter[1] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = "";
	//set parameter
	innerSetLanguage(WSDataObject);			
}

function subSignEx()
{
	document.wssocketform.action.value = "subSignEx";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//設定要傳到websocket的參數
	WSDataObject.parameter[0] = document.wssocketform.b64IFX.value;
	WSDataObject.parameter[1] = document.wssocketform.b64Profile.value;
	WSDataObject.parameter[2] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = document.wssocketform.SignedData;
	WSDataObject.domData[1] = "";
	//set parameter
	innerSignEx(WSDataObject);	
}

function subSignEx_KB()
{
	document.wssocketform.action.value = "subSignEx_KB";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//設定要傳到websocket的參數
	WSDataObject.parameter[0] = document.wssocketform.b64IFX.value;
	WSDataObject.parameter[1] = document.wssocketform.b64Profile.value;
	WSDataObject.parameter[2] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = document.wssocketform.SignedData;
	WSDataObject.domData[1] = "";
	//set parameter
	innerSignEx_KB(WSDataObject);	
}

function subB64Decode()
{
	document.wssocketform.action.value = "subB64Decode";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//set parameter
	WSDataObject.parameter[0] = document.wssocketform.B64EncodeData.value;
	WSDataObject.parameter[1] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = document.wssocketform.Data;
	innerB64Decode(WSDataObject);	
}

function subB64EncodeEx()
{
	document.wssocketform.action.value = "subB64EncodeEx";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//set parameter
	WSDataObject.parameter[0] = document.wssocketform.Data.value;
	WSDataObject.parameter[1] = 0;
	WSDataObject.parameter[2] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = document.wssocketform.B64EncodeData;
	innerB64EncodeEx(WSDataObject);	
}

function subB64EncodeEx1()
{
	document.wssocketform.action.value = "subB64EncodeEx1";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//set parameter
	WSDataObject.parameter[0] = document.wssocketform.Data1.value;
	WSDataObject.parameter[1] = 0;
	WSDataObject.parameter[2] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = document.wssocketform.b64IFX;
	innerB64EncodeEx(WSDataObject);	
}

function subB64EncodeEx2()
{
	document.wssocketform.action.value = "subB64EncodeEx2";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//set parameter
	WSDataObject.parameter[0] = document.wssocketform.Data2.value;
	WSDataObject.parameter[1] = 0;
	WSDataObject.parameter[2] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = document.wssocketform.b64Profile;
	innerB64EncodeEx(WSDataObject);	
}


function subGetTokenSN()
{
	document.wssocketform.action.value = "subGetTokenSN";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//設定要傳到websocket的參數
	WSDataObject.parameter[0] = document.wssocketform.P11LibName.value;
	WSDataObject.parameter[1] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = document.wssocketform.TokenSerialNo;
	WSDataObject.domData[1] = "";
	//set parameter
	innerGetTokenSN(WSDataObject);
}

function subTokenChangePIN()
{
	document.wssocketform.action.value = "subTokenChangePIN";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//assign parameter
	WSDataObject.parameter[0] = document.wssocketform.P11LibName.value;
	WSDataObject.parameter[1] = document.wssocketform.OldPass.value;
	WSDataObject.parameter[2] = document.wssocketform.NewPass.value;
	WSDataObject.parameter[3] = "";
	
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = "";
	//set parameter
	innerTokenChangePIN(WSDataObject);	
}

function subGetTokenInfo()
{
	document.wssocketform.action.value = "subGetTokenInfo";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//assign parameter
	WSDataObject.parameter[0] = document.wssocketform.P11LibName.value;
	WSDataObject.parameter[1] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = "";
	//set parameter
	innerGetTokenInfo(WSDataObject);	
}

function subGetTokenInfo()
{
	document.wssocketform.action.value = "subGetTokenInfo";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//assign parameter
	WSDataObject.parameter[0] = document.wssocketform.P11LibName.value;
	WSDataObject.parameter[1] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = "";
	//set parameter
	innerGetTokenInfo(WSDataObject);	
}

function subSelectCertificateEx()
{
	document.wssocketform.action.value = "subSelectCertificateEx";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//assign parameter
	WSDataObject.parameter[0] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = document.wssocketform.b64Cert;
	WSDataObject.domData[1] = document.wssocketform.CertSerialNo;
	WSDataObject.domData[2] = document.wssocketform.IssuerName;
	WSDataObject.domData[3] = document.wssocketform.SubjectName;
	WSDataObject.domData[4] = document.wssocketform.KeyUsage;
	WSDataObject.domData[5] = document.wssocketform.StartDate;
	WSDataObject.domData[6] = document.wssocketform.EndDate;
	WSDataObject.domData[7] = "";
	//set parameter
	innerSelectCertificateEx(WSDataObject);	
}

function subSelectCertificateBySubjectCN()
{
	document.wssocketform.action.value = "subSelectCertificateBySubjectCN";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//assign parameter
	WSDataObject.parameter[0] = document.wssocketform.CN.value;
	WSDataObject.parameter[1] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = document.wssocketform.b64Cert;
	WSDataObject.domData[1] = document.wssocketform.CertSerialNo;
	WSDataObject.domData[2] = document.wssocketform.IssuerName;
	WSDataObject.domData[3] = document.wssocketform.SubjectName;
	WSDataObject.domData[4] = document.wssocketform.KeyUsage;
	WSDataObject.domData[5] = document.wssocketform.StartDate;
	WSDataObject.domData[6] = document.wssocketform.EndDate;
	WSDataObject.domData[7] = "";
	//set parameter
	innerSelectCertificateBySubjectCN(WSDataObject);	
}

function subSelectCertificateBySerialNum()
{
	document.wssocketform.action.value = "subSelectCertificateBySerialNum";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//assign parameter
	WSDataObject.parameter[0] = document.wssocketform.CertSerialNo.value;
	WSDataObject.parameter[1] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = document.wssocketform.b64Cert;
	WSDataObject.domData[1] = document.wssocketform.CertSerialNo;
	WSDataObject.domData[2] = document.wssocketform.IssuerName;
	WSDataObject.domData[3] = document.wssocketform.SubjectName;
	WSDataObject.domData[4] = document.wssocketform.KeyUsage;
	WSDataObject.domData[5] = document.wssocketform.StartDate;
	WSDataObject.domData[6] = document.wssocketform.EndDate;
	WSDataObject.domData[7] = "";
	//set parameter
	innerSelectCertificateBySerialNum(WSDataObject);	
}

function subGetSignedEnvelopByString()
{
	document.wssocketform.action.value = "subGetSignedEnvelopByString";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//assign parameter
	WSDataObject.parameter[0] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = document.wssocketform.SignedData;
	WSDataObject.domData[1] = "";
	//set parameter
	innerGetSignedEnvelopByString(WSDataObject);	
}

function subSetDataContentByString()
{
	document.wssocketform.action.value = "subSetDataContentByString";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//assign parameter
	WSDataObject.parameter[0] = document.wssocketform.Data.value;
	WSDataObject.parameter[1] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = "";
	//set parameter
	innerSetDataContentByString(WSDataObject);	
}

function subPKCS7Sign()
{
	document.wssocketform.action.value = "subPKCS7Sign";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//assign parameter
	WSDataObject.parameter[0] = document.wssocketform.PersonID.value;
	WSDataObject.parameter[1] = document.wssocketform.b64Cert.value;
	WSDataObject.parameter[2] = document.wssocketform.Data.value;
	WSDataObject.parameter[3] = document.wssocketform.DigestMethod.value;
	WSDataObject.parameter[4] = document.wssocketform.SignatureMethod.value;
	WSDataObject.parameter[5] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = "";
	//set parameter
	innerPKCS7Sign(WSDataObject);	
}

function subPKCS7SignIO()
{
	document.wssocketform.action.value = "subPKCS7SignIO";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//assign parameter
	WSDataObject.parameter[0] = document.wssocketform.PersonID.value;
	WSDataObject.parameter[1] = document.wssocketform.b64Cert.value;
	WSDataObject.parameter[2] = document.wssocketform.Data.value;
	WSDataObject.parameter[3] = document.wssocketform.DigestMethod.value;
	WSDataObject.parameter[4] = document.wssocketform.SignatureMethod.value;
	WSDataObject.parameter[5] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = "";
	//set parameter
	innerPKCS7SignIO(WSDataObject);	
}

function subVAPKCS7Sign()
{
	document.wssocketform.action.value = "subVAPKCS7Sign";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//assign parameter
	WSDataObject.parameter[0] = document.wssocketform.P11LibName.value;
	WSDataObject.parameter[1] = document.wssocketform.PersonID.value;
	WSDataObject.parameter[2] = document.wssocketform.Data.value;
	WSDataObject.parameter[3] = document.wssocketform.DigestMethod.value;
	WSDataObject.parameter[4] = document.wssocketform.SignatureMethod.value;
	WSDataObject.parameter[5] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = document.wssocketform.SignedData;
	WSDataObject.domData[1] = "";
	//set parameter
	innerVAPKCS7Sign(WSDataObject);	
}

function subVAPKCS7SignIO()
{
	document.wssocketform.action.value = "subVAPKCS7SignIO";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//assign parameter
	WSDataObject.parameter[0] = document.wssocketform.P11LibName.value;
	WSDataObject.parameter[1] = document.wssocketform.PersonID.value;
	WSDataObject.parameter[2] = document.wssocketform.Data.value;
	WSDataObject.parameter[3] = document.wssocketform.DigestMethod.value;
	WSDataObject.parameter[4] = document.wssocketform.SignatureMethod.value;
	WSDataObject.parameter[5] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = document.wssocketform.SignedData;
	WSDataObject.domData[1] = "";
	//set parameter
	innerVAPKCS7SignIO(WSDataObject);	
}

function subSign()
{
	document.wssocketform.action.value = "subSign";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//assign parameter
	WSDataObject.parameter[0] = document.wssocketform.b64Cert.value;
	WSDataObject.parameter[1] = document.wssocketform.DigestMethod.value;
	WSDataObject.parameter[2] = document.wssocketform.SignatureMethod.value;
	WSDataObject.parameter[3] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = "";
	WSDataObject.domData[1] = "";
	//set parameter
	innerSign(WSDataObject);	
}

function subSignIO()
{
	document.wssocketform.action.value = "subSignIO";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//assign parameter
	WSDataObject.parameter[0] = document.wssocketform.P11LibName.value;
	WSDataObject.parameter[1] = document.wssocketform.b64Cert.value;
	WSDataObject.parameter[2] = document.wssocketform.DigestMethod.value;
	WSDataObject.parameter[3] = document.wssocketform.SignatureMethod.value;
	WSDataObject.parameter[4] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = "";
	WSDataObject.domData[1] = "";
	//set parameter
	innerSignIO(WSDataObject);	
}

function subGetIP_MAC()
{
	document.wssocketform.action.value = "subGetIP_MAC";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//assign parameter
	WSDataObject.parameter[0] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = document.wssocketform.IPMAC;
	WSDataObject.domData[1] = "";
	//set parameter
	innerGetIP_MAC(WSDataObject);	
}

function subInquireProtectionData()
{
	document.wssocketform.action.value = "subInquireProtectionData";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//assign parameter
	WSDataObject.parameter[0] = document.wssocketform.BHOTitle.value;
	WSDataObject.parameter[1] = document.wssocketform.BHOKeyValue.value;
	WSDataObject.parameter[2] = document.wssocketform.BHOShowDot.value;
	WSDataObject.parameter[3] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = document.wssocketform.BHOPlain;
	WSDataObject.domData[1] = document.wssocketform.BHOCipher;
	WSDataObject.domData[2] = "";
	//set parameter
	innerInquireProtectionData(WSDataObject);	
}

function subConvertTextToImage()
{
	document.wssocketform.action.value = "subConvertTextToImage";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//assign parameter
	WSDataObject.parameter[0] = document.wssocketform.BHOPlain.value;
	WSDataObject.parameter[1] = document.wssocketform.BHOKeyValue.value;
	WSDataObject.parameter[2] = document.wssocketform.BHOTitle.value;
	WSDataObject.parameter[3] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = document.wssocketform.BHOImage;
	WSDataObject.domData[1] = "";
	//set parameter
	innerConvertTextToImage(WSDataObject);	
}

function subCallGRD(objectData)
{
	document.wssocketform.action.value = "subCallGRD";
	//define next functon call
	WSDataObject.cbFuncName[0] = function(){arrangeFunction();};
	//define fail functon call
	WSDataObject.cbFuncName[1] = failFunction;
	//assign parameter
	WSDataObject.parameter[0] = document.wssocketform.BHOTitle.value;
	WSDataObject.parameter[1] = document.wssocketform.BHOMaxLength.value;
	WSDataObject.parameter[2] = "";
	//第一個function需要接收值的變數
	WSDataObject.domData[0] = document.wssocketform.BHOGRD;
	WSDataObject.domData[1] = "";
	//set parameter
	innerCallGRD(WSDataObject);	
}