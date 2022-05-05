/* 
 * Copyright (c) 2007 HiTRUST Incorporated.All rights reserved.
 *
 */ 
function getPKCS7ErrorMessage(errCode){
	var msg;
	switch(errCode){
		case 0:
			msg = "功能處理成功(OperationSucceed)";
			break;
		case 1:
			msg = "傳入參數錯誤(ParameterError)";
			break;
		case 2:
			msg = "記憶體不足(OutofMemory)";
			break;
		case 3:
			msg = "功能處理錯誤(OperationError)";
			break;
		case 4:
			msg = "憑證找不到(CertificatenotFound)";
			break;
		case 5:
			msg = "憑證或CRL格式錯誤(Certificate/CRLError)";
			break;
		case 6:
			msg = "憑證或CRL找不到簽發單位(IssuernotFound)";
			break;
		case 7:
			msg = "憑證或CRL驗證失敗(VerifyFailurebyIssuerPublicKey)";
			break;
		case 8:
			msg = "憑證或CRL過期(Expired)";
			break;
		case 9:
			msg = "憑證未登記(NotRegister)";
			break;
		case 10:
			msg = "憑證已暫禁(Suspend)";
			break;
		case 11:
			msg = "憑證已註銷(Canceled)";
			break;
		case 12:
			msg = "找不到對應的PublicKey(PublicKeynotFound)";
			break;
		case 13:
			msg = "找不到對應的PrivateKey(PrivateKeynotFound)";
			break;
		case 14:
			msg = "憑證的PublicKey與PrivateKey不相符(KeyPairnotMatch)";
			break;
		case 15:
			msg = "上載資料格式錯誤(UpdateDataFormatError)";
			break;
		case 16:
			msg = "下載資料格式錯誤(DownloadDataFormatError)";
			break;
		case 17:
			msg = "輸入資料格式錯誤(InputDataFormatError)";
			break;
		case 18:
			msg = "Template格式錯誤(TemplateFormatError)";
			break;
		case 19:
			msg = "資料(如XMLelement)找不到(DatanotFound)";
			break;
		case 20:
			msg = "檔案找不到(FilenotFound)";
			break;
		case 21:
			msg = "密碼(憑證申請密碼,憑證註銷密碼)錯誤(PasswordInvalid)";
			break;
		case 22:
			msg = "通訊錯誤(URLnotFoundornotResponsed)";
			break;
		case 23:
			msg = "亂碼化運算錯誤(CryptographicError)";
			break;
		case 24:
			msg = "金鑰型態錯誤(KeyTypeError)";
			break;
		case 25:
			msg = "演算法錯誤(AlgorithmError)";
			break;
		case 26:
			msg = "金鑰長度錯誤(KeyLengthError)";
			break;
		case 27:
			msg = "金鑰找不到(KeyIdnotFound)";
			break;
		case 28:
			msg = "使用者取消選擇憑證(KeyIdnotFound)";
			break;
		case 51:
			msg = "使用者密碼不合法(UserPinIllegal)";
			break;
		case 52:
			msg = "使用者密碼已鎖定(UserPinLocked)";
			break;
		case 53:
			msg = "圖形驗證碼輸入錯誤次數超過限制(GraphicVerificationerrorexceedLimit)";
			break;
		case 54:
			msg = "確認鈕點選錯誤次數超過限制(DynamicButtonerrorexceedLimit)";
			break;
		case 61:
			msg = "URL網址不合法(IllegalURL)";
			break;
		case 62:
			msg = "抽拔檢驗逾時(ManualInterventionTimeout)";
			break;
		case 63:
			msg = "載入憑證載具函式庫錯誤(TokenLibFail)";
			break;
		case 64:
			msg = "CR功能網站亂數驗證失敗";
			break;
		case 65:
			msg = "CR功能加密金鑰不同步";
			break;
		case 66:
			msg = "CR功能壓碼金鑰不同步";
			break;
		case 67:
			msg = "CR功能網站驗證失敗";
			break;
		case 70:
			msg = "取得IP、MAC錯誤(GetIP、MACFail)";
			break;
		case 99:
			msg = "其他錯誤(Others)";
			break;
		default:
			msg = "不明錯誤";
			//msg += "\r\n";
			//msg += "系統訊息:"+errMsg;
	}
	return "["+errCode+"]:"+msg;
}
