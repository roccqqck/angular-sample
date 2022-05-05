var plugin_undefined = "您尚未下載安裝安控元件，請至：【憑證管理系統】→【安控設備管理】→【下載安控元件】執行安裝，謝謝！";
var ws_undefined = "安控元件連線失敗，請確認程式是否已執行或已安裝。";
var codemsg = new Array();
codemsg[codemsg.length] = new Array("-899", "記憶體不足");
codemsg[codemsg.length] = new Array("-900", "無法將傳進來的encoded binary ，轉成x509 cert structure");
codemsg[codemsg.length] = new Array("-901", "無法將憑證中的Subject encoded binary轉成x500的format");
codemsg[codemsg.length] = new Array("-902", "無法將憑證中的Issuer encoded binary轉成x500的format");
codemsg[codemsg.length] = new Array("-903", "在取得憑證的RFC822 (e-mail) Asn1 解碼發生錯誤");
codemsg[codemsg.length] = new Array("-904", "UNICODE 轉碼發生錯誤");
codemsg[codemsg.length] = new Array("-905", "傳進來的string 並非合法的X500 format string");
codemsg[codemsg.length] = new Array("-906", "開啟指定的憑證store 錯誤");
codemsg[codemsg.length] = new Array("-907", "無法在指定的cert store中找到指定的憑證, 請確認是否插入憑證");
codemsg[codemsg.length] = new Array("-908", "無法將傳進來的encoded binary ，轉成x509 cert structure");
codemsg[codemsg.length] = new Array("-909", "無法取得記錄憑證相對應私鑰的registry");
codemsg[codemsg.length] = new Array("-910", "無法開啟指定的CSP以及指定的Key Store");
codemsg[codemsg.length] = new Array("-911", "無法產生指定Hash Algorithm 的hash object");
codemsg[codemsg.length] = new Array("-912", "無法以指定的Hash Algorithm 來hash data");
codemsg[codemsg.length] = new Array("-913", "RSA簽章失敗");
codemsg[codemsg.length] = new Array("-914", "Import 一public key 到系統default 的csp中的指定key store 中");
codemsg[codemsg.length] = new Array("-915", "無效的public key handle");
codemsg[codemsg.length] = new Array("-916", "驗RSA簽章失敗");
codemsg[codemsg.length] = new Array("-917", "列舉系統中csp 的name發生錯誤");
codemsg[codemsg.length] = new Array("-918", "取得Hash後的結果錯誤");
codemsg[codemsg.length] = new Array("-919", "憑證中的NotBefore 大於目前系統的時間");
codemsg[codemsg.length] = new Array("-920", "系統目前的時間大於憑證中的NotAfter");
codemsg[codemsg.length] = new Array("-921", "無效的Cert handle");
codemsg[codemsg.length] = new Array("-922", "無法取得憑證的Key usgae 欄。可能是此憑證無此Extension");
codemsg[codemsg.length] = new Array("-923", "指定的憑證無法通過憑證鏈檢驗。可能是UCA，PCA，ROOT不存在系統的cert store，或用戶憑證效期不正確");
codemsg[codemsg.length] = new Array("-924", "檢查指定的憑證鏈時，發現local 的crl store中有此憑證。指定憑證己終止或撤消");
codemsg[codemsg.length] = new Array("-925", "指定的index大於該store中的憑證個數");
codemsg[codemsg.length] = new Array("-926", "無法取得指定store中的第index個憑證");
codemsg[codemsg.length] = new Array("-927", "無法取得crl distribute point。可能是此憑證無此extension");
codemsg[codemsg.length] = new Array("-928", "無法取得authorityInfoAccess。可能是此憑證無此extension");
codemsg[codemsg.length] = new Array("-929", "無法取得authorityKeyIdentifier。可能是此憑證無此extension");
codemsg[codemsg.length] = new Array("-930", "無法取得certificatePolicies。可能是此憑證無此extension");
codemsg[codemsg.length] = new Array("-931", "PKCS7-signed封包製作失敗");
codemsg[codemsg.length] = new Array("-932", "PKCS7-signed 封包檢驗失敗");
codemsg[codemsg.length] = new Array("-933", "PKCS-enveloped 封包製作失敗");
codemsg[codemsg.length] = new Array("-934", "PKCS-enveloped封包解密失敗");
codemsg[codemsg.length] = new Array("-935", "無法取得簽章者的憑證");
codemsg[codemsg.length] = new Array("-936", "無法取得接收者的憑證");
codemsg[codemsg.length] = new Array("-937", "無法製作先將PKCS-signed 後的封包當成 raw data再作成PKCS-enveloped封包");
codemsg[codemsg.length] = new Array("-938", "無法解開並檢驗上述的封包");
codemsg[codemsg.length] = new Array("-939", "無法以指定的字串, 導出一DES key");
codemsg[codemsg.length] = new Array("-940", "以導出的des key進行DES 運算失敗");
codemsg[codemsg.length] = new Array("-941", "準備的output buffer太小");
codemsg[codemsg.length] = new Array("-19000", "使用者按了選擇憑證dialog的取消button");
codemsg[codemsg.length] = new Array("-19001", "解密HideAp Url錯誤");
codemsg[codemsg.length] = new Array("-19002", "Binary<->Hex錯誤");
codemsg[codemsg.length] = new Array("-19003", "設定Des Key iv錯誤");
codemsg[codemsg.length] = new Array("-19004", "Allocate memory 錯誤");
codemsg[codemsg.length] = new Array("-19005", "錯誤的encoded cert");
codemsg[codemsg.length] = new Array("-19006", "無法取得subject");
codemsg[codemsg.length] = new Array("-19007", "無法取得issuer");
codemsg[codemsg.length] = new Array("-19008", "無法取得憑證rfc822"); 
codemsg[codemsg.length] = new Array("-19009", "Unicode <->big5轉換錯誤");
codemsg[codemsg.length] = new Array("-19010", "傳進來的X.500格式錯誤");
codemsg[codemsg.length] = new Array("-19011", "開啟Cert Store錯誤");
codemsg[codemsg.length] = new Array("-19012", "無法取得指定憑證");
codemsg[codemsg.length] = new Array("-19013", "由encoded cert轉成CAPI Cert structure 錯誤");
codemsg[codemsg.length] = new Array("-19014", "取得憑證與private key link值錯誤");
codemsg[codemsg.length] = new Array("-19015", "開啟CSP container錯誤");
codemsg[codemsg.length] = new Array("-19016", "Initial hash object錯誤");
codemsg[codemsg.length] = new Array("-19017", "Hash 運算錯誤");
codemsg[codemsg.length] = new Array("-19018", "Pkcs#1 簽章錯誤");
codemsg[codemsg.length] = new Array("-19019", "無法import public key");
codemsg[codemsg.length] = new Array("-19020", "無效的key handle");
codemsg[codemsg.length] = new Array("-19021", "PKCS#1簽章值不對");
codemsg[codemsg.length] = new Array("-19022", "列舉系統中CSP錯誤");
codemsg[codemsg.length] = new Array("-19023", "無法取得hash 值");
codemsg[codemsg.length] = new Array("-19024", "憑證尚未生效");
codemsg[codemsg.length] = new Array("-19025", "憑證己過期");
codemsg[codemsg.length] = new Array("-19026", "無效的憑證handle");
codemsg[codemsg.length] = new Array("-19027", "無法取得憑證Key usage");
codemsg[codemsg.length] = new Array("-19028", "憑證鏈有誤。有可能是過期、UCA/PCA無法找到、或憑證被中止。");
codemsg[codemsg.length] = new Array("-19029", "憑證己被中止");
codemsg[codemsg.length] = new Array("-19030", "錯誤的憑證index");
codemsg[codemsg.length] = new Array("-19031", "無法取得Cert Store中第n個憑證");
codemsg[codemsg.length] = new Array("-19032", "無法取得 CRL_DIST_POINT");
codemsg[codemsg.length] = new Array("-19033", "無法取得authorityInfoAccess");
codemsg[codemsg.length] = new Array("-19034", "無法取得authorityKeyIdentifier");
codemsg[codemsg.length] = new Array("-19035", "無法取得憑證policy 欄位");
codemsg[codemsg.length] = new Array("-19036", "無法製作PKCS#7簽章訊息");
codemsg[codemsg.length] = new Array("-19037", "無法檢驗PKCS#7簽章訊息");
codemsg[codemsg.length] = new Array("-19038", "無法製作PKCS#7加密訊息");
codemsg[codemsg.length] = new Array("-19039", "無法解開PKCS#7加密訊息");
codemsg[codemsg.length] = new Array("-19040", "無法取得簽章者憑證");
codemsg[codemsg.length] = new Array("-19041", "無法取得接收者憑證");
codemsg[codemsg.length] = new Array("-19042", "Sign 後Enc PKCS#7訊息錯誤");
codemsg[codemsg.length] = new Array("-19043", "Open 後verify PKCS#7訊息錯誤");
codemsg[codemsg.length] = new Array("-19044", "導出Symmetric key 錯誤");
codemsg[codemsg.length] = new Array("-19045", "Symmetric key 的加解密錯誤");
codemsg[codemsg.length] = new Array("-19046", "Allocated Buffer size不足");
codemsg[codemsg.length] = new Array("-19047", "計算編碼後的訊息長度錯誤");
codemsg[codemsg.length] = new Array("-19048", "簽章後加密訊息發生錯誤");
codemsg[codemsg.length] = new Array("-19049", "PKCS#7-signed訊息欄位編解碼操作錯誤");
codemsg[codemsg.length] = new Array("-19050", "取得PKCS#7 signed訊息欄位錯誤");
codemsg[codemsg.length] = new Array("-19051", "產生3DES key 錯誤");
codemsg[codemsg.length] = new Array("-19052", "設定3DES key initial vector錯誤。");
codemsg[codemsg.length] = new Array("-19053", "產生random number錯誤");
codemsg[codemsg.length] = new Array("-19054", "Import exponential key 錯誤");
codemsg[codemsg.length] = new Array("-19055", "加密symmetric key 錯誤");
codemsg[codemsg.length] = new Array("-19056", "Import 3DES key 錯誤");
codemsg[codemsg.length] = new Array("-19057", "Export 3DES key 錯誤");
codemsg[codemsg.length] = new Array("-19058", "PKCS#7訊息Decode錯誤");
codemsg[codemsg.length] = new Array("-19059", "PKCS#7 訊息編解碼失敗");
codemsg[codemsg.length] = new Array("-19060", "PKCS#7 訊息欄位取得失敗");
codemsg[codemsg.length] = new Array("-19061", "編碼整個cert chain 的sequence 錯誤");
codemsg[codemsg.length] = new Array("-19062", "無法認定為SMIME");
codemsg[codemsg.length] = new Array("-19063", "Filter 特定條件的憑證錯誤");
codemsg[codemsg.length] = new Array("-19064", "無效的憑證handle");
codemsg[codemsg.length] = new Array("-19065", "驗SMIME時，簽章者憑證email與信件From欄中的email不符");
codemsg[codemsg.length] = new Array("-19066", "extension中的policy是critical。Not implemented");
codemsg[codemsg.length] = new Array("-19067", "Enhanced Key Usage不適用email。Not implemented");
codemsg[codemsg.length] = new Array("-19068", "接收者email list格式錯誤應以『;』為分格字元。");
codemsg[codemsg.length] = new Array("-19069", "CAPI Store中無法找到寄信人的憑證");
codemsg[codemsg.length] = new Array("-19070", "載入憑證到CAPI Store錯誤");
codemsg[codemsg.length] = new Array("-19071", "Base64 編解碼錯誤");
codemsg[codemsg.length] = new Array("-19072", "有加密者的憑證無法取得或使用者無法從多張中決定(按了Cancel button)。");
codemsg[codemsg.length] = new Array("-19073", "");
codemsg[codemsg.length] = new Array("-19074", "encode CRL 格式錯誤");
codemsg[codemsg.length] = new Array("-19075", "無法在系統中找到CRL簽發者憑證");
codemsg[codemsg.length] = new Array("-19076", "CRL簽章無法被檢驗");
codemsg[codemsg.length] = new Array("-19077", "載入到CRL到系統中失敗");
codemsg[codemsg.length] = new Array("-19078", "無法取得憑證中文姓名");
codemsg[codemsg.length] = new Array("-19079", "無法取得憑證Basic Constraint Extension值");
codemsg[codemsg.length] = new Array("-19080", "");
codemsg[codemsg.length] = new Array("-19081", "Base64 編解碼錯誤");
codemsg[codemsg.length] = new Array("-19082", "Base64 編解碼錯誤");

function errcode2Msg(errcode)
{
    for (var i = 0; i < codemsg.length; i++)
    {
        if (codemsg[i][0] == String(errcode))
        {
            return "[" + codemsg[i][0] + "]-簽章錯誤:"+ codemsg[i][1];
        }
    }
    return "[" + errcode + "]-簽章錯誤: 未定義錯誤!!!";
}

function showHelpMsg(operation, errCode, errMsg)
{
	//alert(operation);
	var msg;
	if (typeof errCode=="string"){
		errCode = parseInt(errCode);
	}
	//alert(errCode);
	switch(errCode){
	case 1:
        msg = "[1]傳入參數錯誤(Parameter Error)";
        msg += "\r\n";
        msg += "系統訊息:" + errMsg;
        break;
    case 2:
        msg = "[2]請關閉瀏覽器重新操作";
        //msg += "\r\n";
        //msg += "系統訊息:"+errMsg;
        break;
    case 3:
        msg = "[3]功能處理錯誤(Operation Error)";
        msg += "\r\n";
        msg += "系統訊息:" + errMsg;
        break;
    case 4:
        msg = "[4]請確認是否已插入含有正確憑證之憑證載具，或作業系統中已註冊有該憑證";
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
            "   請拔出所有載具後，再插入交易用之載具重新進行交易";
        break;
    case 64:
        msg = "[64]載入載具函式庫失敗(Load Token Library failed)";
        break;
    case 65:
        msg = "[65]初始化載具失敗(Initialize Token failed)";
        break;
    case 66:
        msg = "[66]命令格式錯誤";
        break;
    case 71:
        msg = "[71]取得使用者電腦之IP與MAC位址失敗(Get User PC IP and MAC address failed)";
        break;
    case 99:
        msg = "[99]其他錯誤(Others)";
        msg += "\r\n";
        msg += "系統訊息:" + errMsg;
        break;
    case 0x201:
        msg = '[' + errCode + ']傳入參數錯誤';
        break;
    case 0x202:
        msg = '[' + errCode + ']記憶體配置錯誤';
        break;
    case 0x203:
        msg = '[' + errCode + ']資料格式錯誤';
        break;
    case 0x204:
        msg = '[' + errCode + ']操作錯誤';
        break;
    case 0x205:
        msg = '[' + errCode + ']呼叫程序順序錯誤錯誤';
        break;
    case 0x206:
        msg = '[' + errCode + ']操作逾時錯誤';
        break;
    case 0x207:
        msg = '[' + errCode + ']憑證載具密碼錯誤';
        break;
    case 0x208:
        msg = '[' + errCode + ']憑證載具密碼鎖住';
        break;
    case 0x209:
        msg = '[' + errCode + ']憑證載具密碼不合法';
        break;
    case 0x20A:
        msg = '[' + errCode + ']憑證載具功能操作錯誤';
        break;
    case 0x20B:
        msg = '[' + errCode + ']PKCS#11物件不存在';
        break;
    case 0x20C:
        msg = '[' + errCode + ']PKCS#11私鑰不存在';
        break;
    case 0x20D:
        msg = '[' + errCode + ']PKCS#11公鑰不存在';
        break;
    case 0x20E:
        msg = '[' + errCode + ']PKCS#11憑證不存在';
        break;
    case 0x20F:
        msg = '[' + errCode + ']多於一個PKCS#11物件';
        break;
    case 0x210:
        msg = '[' + errCode + ']憑證已被安裝';
        break;
    case 0x211:
        msg = '[' + errCode + ']憑證載具未插入, 請插入正確憑證載具eToken';
        break;
    case 0x212:
        msg = '[' + errCode + ']偵測到多個憑證載具';
        break;
    case 0x213:
        msg = '[' + errCode + ']存取系統登錄樹錯誤';
        break;
    case 0x214:
        msg = '[' + errCode + ']取得IP MAC位址錯誤';
        break;
    case 0x215:
        msg = '[' + errCode + ']元件網址驗證錯誤';
        break;
    case 0x216:
        msg = '[' + errCode + ']憑證載具存取物件錯誤！';
        break;
    case 0x217:
        msg = '[' + errCode + ']使用者取消';
        break;
    case 0x218:
        msg = '[' + errCode + ']MS CAPI操作錯誤';
        break;
    case 0x219:
        msg = '[' + errCode + ']憑證已過期';
        break;
    case 0x21A:
        msg = '[' + errCode + ']安裝憑證時配對錯誤';
        break;
    case 0x21B:
        msg = '[' + errCode + ']檔案不存在';
        break;
    case 0x21C:
        msg = '[' + errCode + ']Challenge回應錯誤';
        break;
    case 0x21D:
        msg = '[' + errCode + ']WEB連線錯誤';
        break;
    case 0x21E:
        msg = '[' + errCode + ']元件網址驗證錯誤';
        break;
    case 0x21F:
        msg = '[' + errCode + ']憑證載具密碼不相同';
        break;
    case 0x220:
        msg = '[' + errCode + ']憑證載具密碼原密碼是空值';
        break;
    case 0x221:
        msg = '[' + errCode + ']憑證載具密碼新密碼是空值';
        break;
    case 0x222:
        msg = '[' + errCode + ']憑證載具密碼確認密碼是空值';
        break;
    case 0x230:
        msg = '[' + errCode + ']憑證載具密碼無效';
        break;
    case 0x231:
        msg = '[' + errCode + ']憑證載具密碼過期';
        break;
    case 0x232:
        msg = '[' + errCode + ']時間格式錯誤';
        break;
    case 0x233:
        msg = '[' + errCode + ']PKCS#11物件存在';
        break;
    case 0x234:
        msg = '[' + errCode + ']PKCS#11物件不存在';
        break;
    case 0x235:
        msg = '[' + errCode + ']配置記憶體空間不足';
        break;
    case 0x236:
        msg = '[' + errCode + ']不支援此PKCS#11模組';
        break;
    case 0x237:
        msg = '[' + errCode + ']PIN碼長度不符';
        break;
    case 0xFFF:
        msg = '[' + errCode + ']其他錯誤！';
        break;
    case 513:
        msg = '[' + errCode + ']傳入參數錯誤';
        break;
    case 514:
        msg = '[' + errCode + ']記憶體配置錯誤';
        break;
    case 515:
        msg = '[' + errCode + ']資料格式錯誤';
        break;
    case 516:
        msg = '[' + errCode + ']操作錯誤';
        break;
    case 517:
        msg = '[' + errCode + ']呼叫程序順序錯誤錯誤';
        break;
    case 518:
        msg = '[' + errCode + ']操作逾時錯誤';
        break;
    case 519:
        msg = '[' + errCode + ']憑證載具密碼錯誤';
        break;
    case 520:
        msg = '[' + errCode + ']憑證載具密碼鎖住';
        break;
    case 521:
        msg = '[' + errCode + ']憑證載具密碼不合法';
        break;
    case 522:
        msg = '[' + errCode + ']憑證載具功能操作錯誤';
        break;
    case 523:
        msg = '[' + errCode + ']PKCS#11物件不存在';
        break;
    case 524:
        msg = '[' + errCode + ']PKCS#11私鑰不存在';
        break;
    case 525:
        msg = '[' + errCode + ']PKCS#11公鑰不存在';
        break;
    case 526:
        msg = '[' + errCode + ']PKCS#11憑證不存在';
        break;
    case 527:
        msg = '[' + errCode + ']多於一個PKCS#11物件';
        break;
    case 528:
        msg = '[' + errCode + ']憑證已被安裝';
        break;
    case 529:
        msg = '[' + errCode + ']憑證載具未插入, 請插入正確憑證載具eToken';
        break;
    case 530:
        msg = '[' + errCode + ']偵測到多個憑證載具';
        break;
    case 531:
        msg = '[' + errCode + ']存取系統登錄樹錯誤';
        break;
    case 532:
        msg = '[' + errCode + ']取得IP MAC位址錯誤';
        break;
    case 533:
        msg = '[' + errCode + ']元件網址驗證錯誤';
        break;
    case 534:
        msg = '[' + errCode + ']憑證載具存取物件錯誤！';
        break;
    case 535:
        msg = '[' + errCode + ']使用者取消';
        break;
    case 536:
        msg = '[' + errCode + ']MS CAPI操作錯誤';
        break;
    case 537:
        msg = '[' + errCode + ']憑證已過期';
        break;
    case 538:
        msg = '[' + errCode + ']安裝憑證時配對錯誤';
        break;
    case 539:
        msg = '[' + errCode + ']檔案不存在';
        break;
    case 540:
        msg = '[' + errCode + ']Challenge回應錯誤';
        break;
    case 541:
        msg = '[' + errCode + ']WEB連線錯誤';
        break;
    case 542:
        msg = '[' + errCode + ']元件網址驗證錯誤';
        break;
    case 543:
        msg = '[' + errCode + ']憑證載具密碼不相同';
        break;
    case 544:
        msg = '[' + errCode + ']憑證載具密碼原密碼是空值';
        break;
    case 545:
        msg = '[' + errCode + ']憑證載具密碼新密碼是空值';
        break;
    case 546:
        msg = '[' + errCode + ']憑證載具密碼確認密碼是空值';
        break;
    case 547:
        msg = '[' + errCode + ']憑證載具密碼無效';
        break;
    case 548:
        msg = '[' + errCode + ']憑證載具密碼過期';
        break;
    case 549:
        msg = '[' + errCode + ']時間格式錯誤';
        break;
    case 550:
        msg = '[' + errCode + ']PKCS#11物件存在';
        break;
    case 551:
        msg = '[' + errCode + ']PKCS#11物件不存在';
        break;
    case 552:
        msg = '[' + errCode + ']配置記憶體空間不足';
        break;
    case 553:
        msg = '[' + errCode + ']不支援此PKCS#11模組';
        break;
    case 554:
        msg = '[' + errCode + ']PIN碼長度不符';
        break;
    case 4095:
        msg = '[' + errCode + ']其他錯誤！';
        break;
    default:
        msg = "不明錯誤("+errCode+")";
        //msg += "\r\n";
        //msg += "系統訊息:"+errMsg;
    }
	
	if(operation!='')
		msg = operation + ':\r\n' + msg;
	alert(msg);
	// top.$("#waringMsg .pop-content").text(msg);
	// top.modal1.toggle();
	return msg;
}