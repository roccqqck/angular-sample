//這一層放一些連續動作, 但是中間不用做其他邏輯的事情
//function start
function wsSetPKCS11LibName()
{
	callbackIndex = 0;
	callbackFuncName[0] = "";
	
	subSetPKCS11LibName();
}

function wsGetVersion()
{
	callbackIndex = 0;
	callbackFuncName[0] = "";
	
	subGetVersion();
}

function wsCreatePkcs10()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subCreatePkcs10();};
	callbackFuncName[1] = "";
	
	subGetVersion();
}

function wsInstallCert()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subGetTokenSN();};
	callbackFuncName[1] = function(){subInstallCert();};
	callbackFuncName[2] = "";
	
	subGetVersion();
}

function wsTokenInitial()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subTokenInitial();};
	callbackFuncName[1] = "";
	
	subGetVersion();
}

function wsDeleteTokenExpiredCertKey()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subDeleteTokenExpiredCertKey();};
	callbackFuncName[1] = "";
	
	subGetVersion();
}

function wsDeleteTokenCertKeyByCN_SN()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subDeleteTokenCertKeyByCN_SN();};
	callbackFuncName[1] = "";
	
	subGetVersion();
}

function wsSetLanguage()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subSetLanguage();};
	callbackFuncName[1] = "";
	
	subGetVersion();
}

function wsSignEx()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subB64EncodeEx1();};
	callbackFuncName[1] = function(){subB64EncodeEx2();};
	callbackFuncName[2] = function(){subSignEx();};
	callbackFuncName[3] = "";
	
	subGetVersion();
}

function wsSignEx_KB()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subSignEx_KB();};
	callbackFuncName[1] = "";
	
	subGetVersion();
}

function wsB64Decode()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subB64Decode();};
	callbackFuncName[1] = "";
	
	subGetVersion();
}

function wsB64EncodeEx()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subB64EncodeEx();};
	callbackFuncName[1] = "";
	
	subGetVersion();
}

function wsGetTokenSN()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subGetTokenSN();};
	callbackFuncName[1] = "";
	
	subGetVersion();
}

function wsTokenChangePIN()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subTokenChangePIN();};
	callbackFuncName[1] = "";
	
	subGetVersion();
}

function wsGetTokenInfo()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subGetTokenInfo();};
	callbackFuncName[1] = "";
	
	subGetVersion();
}

function wsSelectCertificateEx()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subSelectCertificateEx();};
	callbackFuncName[1] = "";
	
	subGetVersion();
}

function wsSelectCertificateBySubjectCN()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subSelectCertificateBySubjectCN();};
	callbackFuncName[1] = "";
	
	subGetVersion();
}

function wsSelectCertificateBySerialNum()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subSelectCertificateBySerialNum();};
	callbackFuncName[1] = "";
	
	subGetVersion();
}
/*
原型, 
function wsGetSignedEnvelopByString()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subGetSignedEnvelopByString();};
	callbackFuncName[1] = "";
	
	subGetVersion();
}
*/

function wsSetDataContentByString()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subSetDataContentByString();};
	callbackFuncName[1] = "";
	
	subGetVersion();
}

function wsPKCS7Sign()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subPKCS7Sign();};
	callbackFuncName[1] = "";
	subSetPKCS11LibName();
}

function wsPKCS7SignIO()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subPKCS7SignIO();};
	callbackFuncName[1] = "";
	
	subSetPKCS11LibName();
}

function wsVAPKCS7Sign()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subVAPKCS7Sign();};
	callbackFuncName[1] = "";
	
	subSetPKCS11LibName();
}

function wsVAPKCS7SignIO()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subVAPKCS7SignIO();};
	callbackFuncName[1] = "";
	
	subSetPKCS11LibName();
}

function wsSign()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subSign();};
	callbackFuncName[1] = "";
	
	subSetPKCS11LibName();
}

function wsSignIO()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subSignIO();};
	callbackFuncName[1] = "";
	
	subSetPKCS11LibName();
}

function wsGetIP_MAC()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subGetIP_MAC();};
	callbackFuncName[1] = "";
	
	subGetVersion();
}

function wsInquireProtectionData()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subInquireProtectionData();};
	callbackFuncName[1] = "";
	
	subGetVersion();
}

function wsConvertTextToImage()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subConvertTextToImage();};
	callbackFuncName[1] = "";
	
	subGetVersion();
}

function wsCallGRD()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subCallGRD();};
	callbackFuncName[1] = "";
	
	subGetVersion();
}

function wsGetSignedEnvelopByStringVAP11()
{
	callbackIndex = 0;
	callbackFuncName[0] = "";
	
	subVAPKCS7Sign();
}

function wsGetSignedEnvelopByStringVACAPI()
{
	callbackIndex = 0;
	callbackFuncName[0] = "";
	
	subVAPKCS7Sign();
}

function wsGetSignedEnvelopByStringPKCS7IO_Ex()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subSetPKCS11LibName();};
	callbackFuncName[1] = function(){subSetDataContentByString();};
	callbackFuncName[2] = function(){subSelectCertificateEx();};
	callbackFuncName[3] = function(){subSignIO();};
	callbackFuncName[4] = function(){subGetSignedEnvelopByString();};
	callbackFuncName[5] = "";
	
	subGetVersion();
}

function wsGetSignedEnvelopByStringPKCS7IO_CertSerialNum()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subSetPKCS11LibName();};
	callbackFuncName[1] = function(){subSetDataContentByString();};
	callbackFuncName[2] = function(){subSelectCertificateBySerialNum();};
	callbackFuncName[3] = function(){subSignIO();};
	callbackFuncName[4] = function(){subGetSignedEnvelopByString();};
	callbackFuncName[5] = "";
	
	subGetVersion();
}

function wsGetSignedEnvelopByStringPKCS7NoIO()
{
	callbackIndex = 0;
	callbackFuncName[0] = function(){subSetPKCS11LibName();};
	callbackFuncName[1] = function(){subSetDataContentByString();};
	callbackFuncName[2] = function(){subSelectCertificateBySerialNum();};
	callbackFuncName[3] = function(){subSign();};
	callbackFuncName[4] = function(){subGetSignedEnvelopByString();};
	callbackFuncName[5] = "";
	
	subSetPKCS11LibName();
}