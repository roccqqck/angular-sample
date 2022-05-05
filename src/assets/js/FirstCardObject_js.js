
//-------------------------------------------------------
var debugFlag = false;//true;// true => 顯示除錯訊息，false => 隱藏除錯訊息

//2代 & 2代 確認型讀卡機 ReaderName
var ALL_2nd_ReaderName = "Todos eCode Connectable 0,Todos eCode Connectable II 0,ACS ACR83U 0,CASTLES EZpad 0,ACS APG8201 0";
//1,5 代讀卡機 ReaderName
var ALL_1_5_ReaderName = "CASTLES MYPAD110 0";
var PCODE="2592";"2584";
var IFD_ID = "00799999";   // 端末設備代號
var jsCancelConfirm="5036";//抽拔確認畫面取消
var jsTimeoutConfirm="5037";//抽拔確認畫面逾時
var jsCancelTxn="69F0";
var jsNoSmartCard=-2146434967;
var root = "/" + location.pathname.split("/")[1];

var FirstBankObj="";
var osType = getOSType();
var ObjectType = getObjectType();
var browserType = getBrowserType();
var Xcsp = {};
debugMsg("ObjectType="+ObjectType);
if (ObjectType == "0"){ // Unknow OS or Unknow Browser
	alert("您使用的作業系統或瀏覽器不支援使用晶片卡元件")
	// top.$("#waringMsg .pop-content").text("您使用的作業系統或瀏覽器不支援使用晶片卡元件");
	// top.modal1.toggle();
	// console.log("您使用的作業系統或瀏覽器不支援使用晶片卡元件");
}

if (browserType != 11){//使用plugin
	//pluginInstalled('FCB-WebATM-plugin');
	// jQuery.getScript(root +"/include/FirstCardObjectNew.js", function() {
	// 	Xcsp = getXcsp();
	// });
	// alert("FirstCardObjectNew.js")
	jQuery.ajax({
		async:false,
		url:"./js/FirstCardObjectNew.js",
		dataType:"script",
		success:function() {
			Xcsp = getXcsp();
		}
	});
	FirstBankObj = "<object class='fly_away' id='Xcsp' classid='clsid:A6132015-5796-48B5-B776-16D009021D81' codebase='../cab/firstbank_ie64.cab#version=2,2,0,1' height='0' width='0' ></object>";
	document.write(FirstBankObj);
}else{
	if (ObjectType == "2"){// Win 64
		FirstBankObj = "<object class='fly_away' id='Xcsp' classid='clsid:A6132015-5796-48B5-B776-16D009021D81' codebase='../cab/firstbank_ie64.cab#version=2,2,0,1' height='0' width='0' ></object>";
	}else{ // Win 32
		FirstBankObj = "<object class='fly_away' id='Xcsp' classid='clsid:A6132015-5796-48B5-B776-16D009021D81' codebase='../cab/firstbank_ie32.cab#version=2,2,0,1' height='0' width='0' ></object>";
	}
	document.write(FirstBankObj);
	Xcsp = document.getElementById("Xcsp");
}
//------------------------------------------------------------------


//判斷是否有安裝plugin目前所需的plugin, 否則就重新下載安裝程式
//傳入參數可為string 或 string array一次查多個
//若為IE則直接跳過並return true;
function isPluginAvailOrFill(expectedPluginName,downloadPath) {
	try {
		js_ConnectDriver();
		Xcsp.GetComVersion();
		return true;//all required plugins have been installed.
	}catch (e){
		alert("無法使用晶片卡元件，請下載元件")
		// top.$("#waringMsg .pop-content").text("無法使用晶片卡元件，請下載元件");
		// top.modal1.toggle()
		var onclick = true;
		alert(downloadURI(root+"/cab/FCBATM-ActiveX.exe"))
		// top.$(".btn-comfirm").click(function () {
		// 	if(onclick){
		// 		if (browserType != 11){
	    // 			if (osType != "11" && osType!= "12"){
	    // 				downloadURI(root+"/cab/FCBATM_ServiceInstall.pkg");
	    // 			}else{
	    // 				downloadURI(root+"/cab/FCBATM_ServiceInstall.msi");
	    // 			}
	    // 		}else{
	    // 			downloadURI(root+"/cab/FCBATM-ActiveX.exe");
	    // 		}
		// 	}
		// 	onclick = false;
        // });
		//alert("無法使用晶片卡元件，請下載元件");
	}
}

function isAvailInArray(target,theArray){
	for(var i=0;i<theArray.length;i++){
		if(target==theArray[i])
			return true;
	}
	return false;
}



function debugMsg(msg){
	if (debugFlag){
		alert(msg)
		// top.$("#waringMsg .pop-content").text(msg);
		// top.modal1.toggle();
	}
}

//取得元件版號
function js_CheckComVersion(){
	msg(Xcsp.GetComVersion());
	return Xcsp.GetComVersion();
}

function getErrorMsg(ErrorCode,ErrorInfo){
	var ret = "";
	switch(ErrorCode){
		case 1016: ret = "本元件僅提供本行使用,如果您版本有誤請至登入頁面重新下載新版元件!";break;
		case 5001: ret = "未安裝讀卡機驅動程式"; break;
		case 5002: ret = "未接讀卡機"; break;
		case 5003: ret = "驅動程式已連結"; break;
		case 5004: ret = "非法使用安控元件"; break;
		case 5011: ret = "驅動程式未連結"; break;
		case 5012: ret = "無此讀卡機"; break;
		case 5013: ret = "晶片金融卡未插入"; break;
		case 5014: ret = "若您使用Windows系統透過Google Chrome版本97(含)以上與Microsoft Edge版本98(含)以上瀏覽器將暫時無法使用第e個網，<a style=\"color:red;\" href=\"#\" onclick=\"javascript:window.open('https://eatm.firstbank.com.tw/chrome_edge.zip')\">請\"按此\"立即下載</a>，將檔案進行解壓縮後運行程式並重新開機後即可使用第e個網服務。<br>(若您為MAC OS系統用戶請更換Safari瀏覽器使用第e個網)"; break; 
		case 5021: ret = "未連結卡片"; break;
		case 5031: ret = "密碼錯誤，若錯誤超過三次，金融卡將會被鎖卡"; break;
		case 5032: ret = "你的晶片卡密碼已被鎖住，請與發卡銀行聯絡！"; break;
		case 5033: ret = "密碼尚未驗證"; break;
		case 5034: ret = "非本行的伺服器"; break;
		case 5035: ret = "卡片已抽換或移除，請重新登入"; break;
		case 5036: ret = "使用者取消"; break;
		case 5037: ret = "使用者確認逾時"; break;
		case 5038: ret = "無此帳號"; break;
		case 5041: ret = "讀卡機名稱不合法"; break;
		case 5042: ret = "讀卡機型態不合法"; break;
		case 5043: ret = "SessionKey不合法"; break;
		case 5044: ret = "端末設備代號不合法"; break;
		case 5045: ret = "端末設備查核碼不合法"; break;
		case 5046: ret = "帳戶不合法"; break;
		case 5047: ret = "交易代號不合法"; break;
		case 5048: ret = "代理行代號不合法"; break;
		case 5049: ret = "轉入行代號不合法"; break;
		case 5050: ret = "轉入行帳號不合法"; break;
		case 5051: ret = "金額不合法"; break;
		case 5052: ret = "伺服器日期時間不合法"; break;
		case 5053: ret = "繳費類別不合法"; break;
		case 5054: ret = "繳費名稱不合法"; break;
		case 5055: ret = "種類不合法"; break;
		case 5056: ret = "專戶名稱不合法"; break;
		case 5057: ret = "特約商店代號不合法"; break;
		case 5058: ret = "5058 開卡密碼驗證失敗"; break;
		case 9999: ret = "連線失敗"; break;

		case "1016": ret = "本元件僅提供本行使用,如果您版本有誤請至登入頁面重新下載新版元件!";break;
		case "5001": ret = "未安裝讀卡機驅動程式"; break;
		case "5002": ret = "未接讀卡機"; break;
		case "5003": ret = "驅動程式已連結"; break;
		case "5004": ret = "非法使用安控元件"; break;
		case "5011": ret = "驅動程式未連結"; break;
		case "5012": ret = "無此讀卡機"; break;
		case "5013": ret = "晶片金融卡未插入"; break;
		case "5014": ret = "若您使用Windows系統透過Google Chrome版本97(含)以上與Microsoft Edge版本98(含)以上瀏覽器將暫時無法使用第e個網，<a style=\"color:red;\" href=\"#\" onclick=\"javascript:window.open('https://eatm.firstbank.com.tw/chrome_edge.zip')\">請\"按此\"立即下載</a>，將檔案進行解壓縮後運行程式並重新開機後即可使用第e個網服務。<br>(若您為MAC OS系統用戶請更換Safari瀏覽器使用第e個網)"; break; 
		case "5021": ret = "未連結卡片"; break;
		case "5031": ret = "密碼錯誤，若錯誤超過三次，金融卡將會被鎖卡"; break;
		case "5032": ret = "你的晶片卡密碼已被鎖住，請與發卡銀行聯絡！"; break;
		case "5033": ret = "密碼尚未驗證"; break;
		case "5034": ret = "非本行的伺服器"; break;
		case "5035": ret = "卡片已抽換或移除，請重新登入"; break;
		case "5036": ret = "使用者取消"; break;
		case "5037": ret = "使用者確認逾時"; break;
		case "5038": ret = "無此帳號"; break;
		case "5041": ret = "讀卡機名稱不合法"; break;
		case "5042": ret = "讀卡機型態不合法"; break;
		case "5043": ret = "SessionKey不合法"; break;
		case "5044": ret = "端末設備代號不合法"; break;
		case "5045": ret = "端末設備查核碼不合法"; break;
		case "5046": ret = "帳戶不合法"; break;
		case "5047": ret = "交易代號不合法"; break;
		case "5048": ret = "代理行代號不合法"; break;
		case "5049": ret = "轉入行代號不合法"; break;
		case "5050": ret = "轉入行帳號不合法"; break;
		case "5051": ret = "金額不合法"; break;
		case "5052": ret = "伺服器日期時間不合法"; break;
		case "5053": ret = "繳費類別不合法"; break;
		case "5054": ret = "繳費名稱不合法"; break;
		case "5055": ret = "種類不合法"; break;
		case "5056": ret = "專戶名稱不合法"; break;
		case "5057": ret = "特約商店代號不合法"; break;
		case "5058": ret = "5058 開卡密碼驗證失敗"; break;
		case "9999": ret = "連線失敗"; break;

		default:	ret = "系統功能有誤,請洽本行。" + "錯誤代碼:" + ErrorCode + "，錯誤訊息:" + ErrorInfo;	break;
	}
	return ret;
}

//連接driver
function js_ConnectDriver(){

	try{
	//debugMsg("before js_DisConnectCard()...");
		//Xcsp.js_DisConnectCard();
	//debugMsg("before DisconnectDriver()...");
		Xcsp.DisconnectDriver();
	}catch(e){
		debugMsg(e);
	}

	var ret = Xcsp.ConnectDriver();
	//debugMsg("Xcsp.ConnectDriver()=" + ret);//1

	if (ret != 0){
		//debugMsg(getErrorMsg(ret , Xcsp.ErrorInfo));
		//alert(ret+"讀卡機連線失敗,請先裝妥讀卡機,並重新登入");
		console.log("connect driver err-" + ret);
		if (ret == 5014 || ret == "5014") {			
			jsMsgString="錯誤代碼:"+ jsRtn + "-" + getErrorMsg(ret,Xcsp.ErrorInfo);
			top.$("#htmlAlertMsg #htmlAlertMsgContent").html(jsMsgString);
			top.modalHtmlAlert.toggle();
		} else {			
			top.$("#waringMsg .pop-content").text(ret+"讀卡機連線失敗,請先裝妥讀卡機,並重新登入");
			top.modal1.toggle();
		}
		//top.$("#waringMsg .pop-content").text(ret+"讀卡機連線失敗,請先裝妥讀卡機,並重新登入");
		//top.modal1.toggle();
		console.log(ret+"讀卡機連線失敗,請先裝妥讀卡機,並重新登入");
	}
}

function EndFirstCardObj(){
	try{
		//Xcsp.DisconnectCard();
		//Xcsp.DisconnectDriver();
		js_DisConnectCard();
		js_DisConnectDriver();
	}
	catch(e){ }
}

function js_DisConnectDriver(){
	var ret = Xcsp.DisconnectDriver();
	//debugMsg("Xcsp.DisconnectDriver()=" + ret);
}

function js_DisConnectCard(){
	var ret = Xcsp.DisconnectCard();
	//debugMsg("Xcsp.DisconnectCard()=" + ret);
}

function ListReaders(readerSelctObj){
	var IsCancel=false;
	var jsSuccess = true;

	js_ConnectDriver();

	do{
		jsRtn=Xcsp.ListReadersName();//列出讀卡機

		// if (jsRtn != 0){
		// 	alert(jsRtn+"請檢查讀卡機是否接好,並已安裝好讀卡機驅動程式,請按確定重新交易或按取消放棄付款作業!");
		// }

		if(Xcsp.ReaderCount<=0){
			jsSuccess=false;
			jsMsgString="請檢查讀卡機是否接好,並已安裝好讀卡機驅動程式,請按確定重新讀取或按取消選擇其他作業方式!";
			console.log(jsMsgString);
			if(confirm(jsMsgString)){
				//IsCancel=true;
			}else{
				IsCancel=true;
				jsSuccess=false;
				//NoReaderCancelTxn();
			}
		}else{
			jsSuccess=true;
		}

	}while(Xcsp.ReaderCount<=0 && IsCancel==false)

	debugMsg("Xcsp.ReaderCount=" + Xcsp.ReaderCount);

	var reader,jsOptionItem;
	//顯示讀卡機
	for(i=0;i<Xcsp.ReaderCount;i++){
		eval("reader = Xcsp.Reader"+i+";");
		console.log("Reader["+i+"]="+reader);

		jsOptionItem = document.createElement("OPTION");
		jsOptionItem.text = reader;
		jsOptionItem.value = reader;
		console.log("ListReaders reader:",reader)
		readerSelctObj.options[i]=jsOptionItem;


	}
}

function ReaderSelect(readerSelctObj){
	var readerName = readerSelctObj.value;
	if ("2"==getReaderType(readerName)){
		document.getElementById("pinCodeInputBlock").style.display="none";
	}
}

//function 說明：
//傳入參數	readerSelctObj => form 中顯示crad reader 的下拉式選單，
//			   若有接上多台讀卡機，會自動選擇第一台有插入卡片的讀卡機
//          accountSelectObj => form 中顯示 account No 的下拉式選單
//          inAccountSelectObj => form 中顯示 約定轉入帳號 的下拉式選單
function DectetReader(readerSelctObj, accountSelectObj, inAccountSelectObj){
	//isSupportNPAPI(true);
	ListReaders(readerSelctObj);

	var isInsertCard = false;
	if (readerSelctObj.options.length > 0){
		//選擇有插卡的讀卡機
		for(i=0;i< readerSelctObj.options.length;i++){
			Xcsp.ReaderName = readerSelctObj.options[i].value;
			jsRtn = Xcsp.CheckCardInsert();

		   if (Xcsp.ReaderInsert=="Y"){//Y:插卡，N:未插卡
				//晶片金融卡已插入讀卡機中
				readerSelctObj.selectedIndex = i;

				ReadCardData(readerSelctObj, accountSelectObj, inAccountSelectObj, true);//取得晶片卡中的資料
			}else{
				//讀卡機未插卡
				console.log("讀卡機未插卡: "+Xcsp.ReaderName);
				//top.$("#waringMsg .pop-content").text("讀卡機未插卡: "+Xcsp.ReaderName);
				//top.modal1.toggle();
			}
		}
	}
	//ReaderSelect(readerSelctObj);
	//debugMsg("Xcsp.DisconnectCard()=" +Xcsp.DisconnectCard());
}

function isInsertCard(readerSelctObj){
	//debugMsg("step 1 ["+readerSelctObj.options[readerSelctObj.selectedIndex].value+"]");
	Xcsp.ReaderName = readerSelctObj.options[readerSelctObj.selectedIndex].value;

	//------ 判斷是否有插入卡片 ------
	var jsRtn = Xcsp.CheckCardInsert();
	debugMsg("Xcsp.CheckCardInsert() return ："+jsRtn);
	//Note by Arf ：TMD，奇怪的API，不論是否有插卡，都是回應0 ，需判斷 ReaderInsert =='Y' 才是有插卡

	/*if ((jsRtn != 0)){
		//window.alert("讀取晶片卡資料有誤!,錯誤代碼"+jsRtn);
		debugMsg(getErrorMsg(jsRtn,Xcsp.ErrorInfo));
	}*/

	if (Xcsp.ReaderInsert == 'Y'){
		return true;
	}else{
		jsMsgString = "請先插入晶片金融卡,再按確定繼續!!";

		if(confirm("請先插入晶片金融卡,再按確定繼續!!")){
			Xcsp.ReaderName = readerSelctObj.options[readerSelctObj.selectedIndex].value;
			jsRtn = Xcsp.CheckCardInsert();//再確認一次
			if (Xcsp.ReaderInsert=="Y"){
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}
}

function js_ConnectCard(){

	var jsRtn = Xcsp.ConnectCard();//連接卡片

	if ((jsRtn != 0)){//
		// alert("讀取晶片卡資料有誤!,錯誤代碼"+jsRtn);
		// top.$("#waringMsg .pop-content").text("讀取晶片卡資料有誤!,錯誤代碼"+jsRtn);
		// top.modal1.toggle();
		console.log("Xcsp.ConnectCard() error!! : "+getErrorMsg(jsRtn,Xcsp.ErrorInfo));
		if (jsRtn == 5014 || jsRtn == "5014") {
			jsMsgString="錯誤代碼:"+ jsRtn + "-" + getErrorMsg(jsRtn,Xcsp.ErrorInfo);
		} else {
			jsMsgString="晶片卡無法連結,錯誤代碼:"+jsRtn+",請重新插卡,再試一次!";
		}
		alert(jsMsgString);
		// top.$("#waringMsg .pop-content").text(jsMsgString);
		// top.modal1.toggle();
		//return "-1";//未插入卡片
		return false;
	}

	return true;
}

//return -1 => 未插入卡片
function ReadCardData(readerSelctObj, accountSelectObj, inAccountSelectObj, showFlag){
	var jsRtn, jsOptionItem;
	var jsIsSelfBankCard;
	var jsAccountNo;
	//debugMsg("step 1 ["+readerSelctObj.options[readerSelctObj.selectedIndex].value+"]");
	//Xcsp.ReaderName = readerSelctObj.options[readerSelctObj.selectedIndex].value;
	if ( isInsertCard(readerSelctObj) ){
	js_ConnectDriver();
	var connectCard = js_ConnectCard(); //檢查是否有連到卡片
	//console.log("connectCard: "+connectCard);
		//------ 連接卡片 ------
		if (connectCard){
			//------ 讀取卡片中的資料 ------
			js_ReadBasicData(accountSelectObj, inAccountSelectObj, showFlag);
			return "0";
		}else{
			EndFirstCardObj();
			return "-1";//未插入卡片
		}
	}
	EndFirstCardObj();
	return "-1";//未插入卡片
}

function js_ReadBasicData(accountSelectObj, inAccountSelectObj, showFlag){
	var jsRtn, jsOptionItem;
	jsRtn = Xcsp.ReadBasicData();
	if ((jsRtn != 0)){
		//window.alert("讀取晶片卡資料有誤!,錯誤代碼"+jsRtn)
		alert(getErrorMsg(jsRtn,Xcsp.ErrorInfo));
		// top.$("#waringMsg .pop-content").text(getErrorMsg(jsRtn,Xcsp.ErrorInfo));
		// top.modal1.toggle();
		return;
	}else{

		if (showFlag){//showFlag==true才顯示帳號選單
			//getCardData();//取得備註、身份證字號、發卡行代號
            var j = 0;
	        if(inAccountSelectObj==null){//基金交易觸發onchange事件用
	            jsOptionItem = document.createElement("OPTION");
	            jsOptionItem.text = '--請選擇--';
	            jsOptionItem.value = '';
	            accountSelectObj.options[0] = jsOptionItem;
	            j = 1;
	        }
			for(i=0;i<=Xcsp.AccountCount-1;i++){
				jsOptionItem = document.createElement("OPTION");

				eval("jsAccountNo = Xcsp.AccountNo"+i);
				if(jsAccountNo!="                "){
					//jsOptionItem = document.createElement("OPTION")
					eval("jsBuffer = Xcsp.AccountNo"+i+";");//所有連接至PC的讀卡機名稱，以陣列形式傳回

					if(jsBuffer!=0 && jsBuffer!="0000000000000000" && jsBuffer!=""){
						jsBuffer = jsBuffer.substring(5);//因元件回傳的帳號皆為16碼，所以只取後11碼
						jsOptionItem.text = jsBuffer;
						jsOptionItem.value = jsBuffer;
					//if(jsOptionItem.value.length!=0 && jsOptionItem.value!="0000000000000000" && jsOptionItem.value!=""){
						accountSelectObj.options[i+j]=jsOptionItem;
					}
				}

			}

			if(accountSelectObj.options.length > 0){
				accountSelectObj.selectedIndex = 0
				//加主帳號
				//document.forms["form1"].naMasterAccountNo.value=accountSelectObj.options[0].value;
			}
		}

		//取得&設定卡片內的約定帳號
		if(inAccountSelectObj!=null){
			//需在呼叫的頁面增加<div id='text_field'><div></div></div>
	        updateInAccount(inAccountSelectObj);
		}
	}
}

//更新約定轉入帳號
function updateInAccount(inAccountSelectObj){
    jsRtn = Xcsp.ReadAuthInAcctNo();
    while(inAccountSelectObj.length > 1) {
    	inAccountSelectObj.remove(inAccountSelectObj.length-1);
    }

    var authInAccountNo = '';
    var bankid = '';
    if ((jsRtn != 0)){
        alert(getErrorMsg(jsRtn, Xcsp.ErrorInfo));
        // top.$("#waringMsg .pop-content").text(getErrorMsg(jsRtn,Xcsp.ErrorInfo));
		// top.modal1.toggle();
        return;
    }else{
	    var obj = document.getElementById('text_field');
	    obj.innerHTML = '';

	    for(var i=0; i<Xcsp.AuthInCount; i++){
            eval("bankid = Xcsp.AuthInBankNo"+i);
            eval("authInAccountNo = Xcsp.AuthInAccountNo"+i);
            bankid = bankid.substring(0, 3);

	        var options = document.createElement('option');
	        var acnt = '';
	        if(bankid == '007'){
	            acnt = authInAccountNo.substring(authInAccountNo.length-11);
	        }else{
	            acnt = authInAccountNo.substring(authInAccountNo.length-16);
	        }
	        var text = document.createTextNode('約定 ' + bankid + ' ' + acnt);
	        options.appendChild(text);
	        options.setAttribute("value", acnt);
	        options.setAttribute("doChange", "appendMail('');setTrnsInAcnt('B','"+bankid+"','"+acnt+"')");
	        inAccountSelectObj.appendChild(options);

	        //20130201 added by AJ - 約定轉入不顯示防BHO確認畫面
	        var div = document.createElement('div');
	        var input = document.createElement('input');
	        input.type = 'hidden';
	        input.id = acnt;
	        input.value = 'B';
	        div.appendChild(input);
	        obj.appendChild(div);
	    }
    }

}

//for Arf Test
function getCardData(){

	document.forms["form1"].naCardRemark.value = Xcsp.CardRemark;//晶片卡備註欄
	document.forms["form1"].naIdNo.value = Xcsp.MasterAccountNo;//AccountNo: X(16) / ID No: somebank //身分證字號
	document.forms["form1"].naIssuerBankNo.value = Xcsp.IssuerBankNo;//發卡行代號

	var jsIssuerBankId = document.forms["form1"].naIssuerBankNo.value;
	var jsAgentBankId = document.forms["form1"].naAgentBankId.value;
	if(jsIssuerBankId.indexOf(jsAgentBankId)!=-1){
		 document.forms["form1"].naIsSelfBankCard.value="Y";
	}else{
		 document.forms["form1"].naIsSelfBankCard.value="N";
	}

debugMsg("Xcsp.AccountCount="+Xcsp.AccountCount);
	document.forms["form1"].naCardNo.value = Xcsp.CardNo;//讀出卡片號碼
	document.forms["form1"].naAllAccountCount.value = Xcsp.AccountCount;
}

function js_getCardAccount(){
	//alert(Xcsp.AccountCount);
	//alert("Xcsp.AccountNo : "+Xcsp.AccountNo);
	//alert("jsAccountNo:"+ jsAccountNo);
	// 不知道傳i進來要做什麼
	//if (i>Xcsp.AccountCount){

	//}else{
	//	return eval("jsAccountNo = Xcsp.AccountNo"+i);
	//}
	var jsRtn, jsOptionItem;
	jsRtn = Xcsp.ReadBasicData();
	if ((jsRtn != 0)){
		alert(getErrorMsg(jsRtn,Xcsp.ErrorInfo));
		// top.$("#waringMsg .pop-content").text(getErrorMsg(jsRtn,Xcsp.ErrorInfo));
		// top.modal1.toggle();
		return;
	}else{
		return eval("jsAccountNo = Xcsp.AccountNo"+0);
	}

}

//取得讀卡機 type
// 1=>一代機
// 3=>1.5代機
// 2=>二代機、二代確認型
function getReaderType(readerName){
	var jsRtn2nd=-1;
	var jsRtn1_5=-1;
	var ReaderType='1';//預設讀卡機為一代讀卡機

	jsRtn2nd=ALL_2nd_ReaderName.indexOf(readerName,0);
	jsRtn1_5=ALL_1_5_ReaderName.indexOf(readerName,0);

	if(jsRtn2nd!=-1){
		ReaderType='2';
	}

	if(jsRtn1_5!=-1){
		ReaderType='3';
	}

	return ReaderType;
}

//秀等待訊息
//<DIV ID="MSGBody" name="MSGBody"></DIV>
function ShowWaitMsg(){
	var TempHTML;
	TempHTML = "<BR><table width='500' border='0' cellpadding='0' cellspacing='0' align='center'><tr>";
	TempHTML += "<td valign='middle' class='' align='center'><H2><strong> 交易進行中，請稍候...</strong><H2></td></tr></table>";
	document.getElementById("MSGBody").innerHTML = TempHTML;
}
//秀二代機密碼輸入提示訊息
function Show2ndReaderMsg(){
	var TempHTML;
	TempHTML = "<BR><table width='500' border='0' cellpadding='0' cellspacing='0' align='center'><tr>";
	TempHTML += "<td valign='middle' class='' align='center'><H2><strong> 請從二代讀卡機的鍵盤上輸入晶片卡密碼</strong><H2></td></tr></table>";
	document.getElementById("MSGBody").innerHTML = TempHTML;

	//return;
}


function SetReaderType(readerType){
	debugMsg("readerType=["+readerType+"]");
	Xcsp.SetReaderType(readerType);

	if (("1" == readerType) || ("3" == readerType) ){//一代機、1.5代機 ，使用者由browser 輸入PIN code
		document.getElementById("cardSecurity").style.display = "";
	}else{//二代機
		document.getElementById("cardSecurity").style.display = "none";
	}
}

function VerifyPIN(formName,ReaderName){

	var jsRtn;
	var jsErrCode;
	var jsPassword;
	var jsMsgString;
	var jsSelectReaderName;

	js_ConnectDriver();//因為可能有換頁，重新連接讀卡機&卡片

	Xcsp.ReaderName = ReaderName;
	if (!js_ConnectCard()){
		return false;
	}

	var readerType = getReaderType(ReaderName);

	SetReaderType(readerType);
	jsPassword = document.forms[formName].cardSecurity.value;
	if ("2" == readerType){ //二代機
		ShowWaitMsg();
		//Show2ndReaderMsg();//秀二代機密碼輸入提示訊息
		delay();//延遲
		//SetReaderType();
		jsErrCode = Transfer(formName,"");//二代讀卡機不用傳入PinCode

		//二代機取消交易判斷,中途拔卡判斷,//抽拔確認畫面取消,//抽拔確認畫面逾時
		if(jsErrCode==jsCancelTxn || jsErrCode==jsNoSmartCard || jsErrCode==jsCancelConfirm || jsErrCode==jsTimeoutConfirm){
			CancelTxn();
			return false;
		}else{
			//20090603押碼錯誤不要往回傳
			if(jsErrCode==0){
				//ShowWaitMsg();
				disableDoc();
				//document.getElementById("idCancel").style.display="none";//20110801
				sec=300;
				//document.forms[formName].naPageStatus.value="N";
				//document.forms[formName].pinPwd.value="";//naPIN驗證過後就清掉,不用往回送，20090603二代機沒輸出該欄位
				//document.forms[formName].submit();
				return true;
			}//if(jsErrCode==0)
		}
	}else{//非二代機
debugMsg("Arf debug - 非二代機");
		if (jsPassword.length < 6 || jsPassword.length >12){
			alert("請輸入6-12位數字的密碼!!")
			// top.$("#waringMsg .pop-content").text("請輸入6-12位數字的密碼!!");
			// top.modal1.toggle();
			return false;
		}else{
			Xcsp.ReaderName = ReaderName; //jsSelectReaderName;
			jsRtn = Xcsp.VerifyPIN(jsPassword);
	//debugMsg("Arf debug - after Xcsp.VerifyPIN jsRtn=["+jsRtn+"]");
			if (jsRtn != 0){

				if(jsRtn==jsNoSmartCard){
					alert("晶片卡已被拔出，取消交易，請重新進入")
					// top.$("#waringMsg .pop-content").text("晶片卡已被拔出，取消交易，請重新進入");
					// top.modal1.toggle();
					//CancelTxn();
				}else{
					//IsCloseWindow=true;
					alert(getErrorMsg(jsRtn,Xcsp.ErrorInfo))
					// top.$("#waringMsg .pop-content").text(getErrorMsg(jsRtn,Xcsp.ErrorInfo));
					// top.modal1.toggle();
				}
				return false;
			}else{
				ShowWaitMsg();
				jsErrCode = Transfer(formName,jsPassword);

				//抽拔確認畫面取消,//抽拔確認畫面逾時
				if(jsErrCode==jsCancelConfirm||jsErrCode==jsTimeoutConfirm){
					CancelTxn();//使用者取消交易
					document.getElementById("MSGBody").innerHTML = '';
					return false;
				}else if(jsErrCode==9999){
					return false;
				}else{
					//20090603押碼錯誤不要往回傳
					if(jsErrCode==0){
						//ShowWaitMsg();
						disableDoc();
						//document.getElementById("idCancel").style.display="none";//20110801
						sec=300;
					debugMsg("Arf debug  before submit");
						//document.forms[formName].pinPwd.value="";//naPIN驗證過後就清掉,不用往回送
						//document.forms[formName].submit();
						return true;
					}//if(jsErrCode==0)
				}//end if(jsErrCode==jsCancelConfirm||jsErrCode==jsTimeoutConfirm)
				return true;
			}//end if (jsRtn != 0)
			return true;
		}
		return true;
	}
}


/*
1.交易代號（2584 ）（4Bytes ）	=> PCode
2.轉帳金額（14Bytes ）			=> Amount
3.轉入帳號（16Bytes ）			=> InAccountNo
4.轉出帳號（16Bytes ）			=> AccountNo
5.端末設備代號（8Bytes ）		=> FdId
6.端末設備查核碼（8Bytes ）		=> FdChkCode
7.交易日期時間（14Bytes ）		=> ServerDateTime
*/
function Transfer(formName,pinCode){
debugMsg("Transfer start...");
	var jsRtn;

	var jsFepSeqNo = document.forms[formName].txTrnsSeq.value;

	document.forms[formName].terminalCheckSum.value = getFdChkCode(formName);//端末設備檢查碼 //"NB411524";//
	document.forms[formName].transDT.value = getTodayDT();//交易時間 //"20130506144320";//
	//轉入銀行代號
	//Xcsp.InBankNo = "";//jsInBankNo.substring(0,8);

	Xcsp.PCode = PCODE;//交易代號

	//Xcsp.SessionKey = "<%=com.hitrust.netbank.util.WebATMObjectUtil.getEncSessionKey()%>"; //"ATM8723350643292";//Session Key
	Xcsp.SessionKey = "3A45778DD0F331DB2B406EFCC1F1F724"; //"ATM8723350643292";//Session Key
	Xcsp.FdId = IFD_ID;//端末設備代號
//debugMsg("document.forms[formName].terminalCheckSum.value=["+document.forms[formName].terminalCheckSum.value+"]");
	Xcsp.FdChkCode = document.forms[formName].terminalCheckSum.value;//getFdChkCode(formName);//端末設備查核碼
	Xcsp.AccountNo = document.forms[formName].payerAcctNo.value;//轉出帳號
	Xcsp.Channel = "01";
	Xcsp.TxnType = "1";
	Xcsp.ServerDateTime = document.forms[formName].transDT.value;
	Xcsp.TxnName = document.forms[formName].TxnName.value;//"please input data";

//debugMsg("sessionKey=[<%=com.hitrust.netbank.util.WebATMObjectUtil.getEncSessionKey()%>]");
//debugMsg("FdId=["+IFD_ID+"]");
//debugMsg("FdChkCode=["+document.forms[formName].terminalCheckSum.value+"]");
//debugMsg("AccountNo=["+document.forms[formName].payerAcctNo.value+"]");
//debugMsg("ServerDateTime=["+document.forms[formName].transDT.value+"]");


	//Xcsp.Amount = "";//交易金額
	//Xcsp.InAccountNo = "";//轉入帳號
debugMsg("before Xcsp.DoNetbankTAC ...");
	jsRtn = Xcsp.DoNetbankTAC(pinCode);
debugMsg("after Xcsp.DoNetbankTAC , jsRtn=["+jsRtn+"]");
	if (jsRtn != 0){

		//抽拔確認畫面取消
		if(jsRtn==jsCancelConfirm){
			alert("使用者取消交易")
			// top.$("#waringMsg .pop-content").text("使用者取消交易");
			// top.modal1.toggle();
			return jsRtn;
		}

		//抽拔確認畫面逾時取消
 		if(jsRtn==jsTimeoutConfirm){
			alert("逾時未抽插卡片，取消交易")
			// top.$("#waringMsg .pop-content").text("逾時未抽插卡片，取消交易");
			// top.modal1.toggle();
			return jsRtn;
		}

		//中途拔卡判斷
	    if(jsRtn==jsNoSmartCard){
			alert("晶片卡已被拔出，取消交易，請由特店重新進入")
			// top.$("#waringMsg .pop-content").text("晶片卡已被拔出，取消交易，請由特店重新進入");
			// top.modal1.toggle();
			return jsRtn;
		}
		alert("DoNetbankTAC error... "+getErrorMsg(jsRtn,Xcsp.ErrorInfo))
		// top.$("#waringMsg .pop-content").text("DoNetbankTAC error... "+getErrorMsg(jsRtn,Xcsp.ErrorInfo));
		// top.modal1.toggle();
	}else{

		document.forms[formName].tac.value = Xcsp.EncTAC;
		document.forms[formName].chipCardTxSeqNo.value = Xcsp.IccSeqNo; //產生tac之後的晶片卡交易序號
		document.forms[formName].chipCardMemo.value = Xcsp.CardRemark;//晶片卡備註
debugMsg("Arf debug - tac = ["+document.forms[formName].tac.value+"]");
		Xcsp.ReadTACLog();
//debugMsg("Arf debug - TACLog0 = ["+Xcsp.TACLog0+"]");//最新的一筆 TACLog
	}

	 return jsRtn;
}

//產生端末設備查核碼
function getFdChkCode(formName){
	//產生規則：一銀卡片：NB+2位卡號+後四位交易主序號NNNN

	var cardNo	= Xcsp.CardNo;
	var cardRemark = Xcsp.CardRemark;
debugMsg("cardNo=["+cardNo+"]");
debugMsg("CardRemark=["+Xcsp.CardRemark+"]");

	cardNo		= cardRemark.substring(22,24);//cardNo.substring(cardNo.length-2);

	var seq		= document.forms[formName].txTrnsSeq.value;
	seq			= seq.substring(seq.length-4);

	debugMsg("getFdChkCode return=[NB]-[" + cardNo +"]-["+ seq+"]");
	return "NB" + cardNo + seq;
}

function delay(){
	setTimeout("delay()", 1000);
}

function CancelTxn(){
	EndFirstCardObj();
}

function disableDoc(){
  	/*if(document.layers) document.captureEvents(Event.CLICK||Event.DBLCLICK||Event.KEYUP||Event.KEYDOWN){
  		document.onkeydown=doNothing();
  		document.onkeyup=doNothing();
  		document.onclick=doNothing();
  		document.ondblclick=doNothing();
	}*/
}

function doNothing(e){
	return false;
}
//清暘新元件區
var ports=[8007,9007,443];

function firstCardPost(str)
{
	var resp="";
	var isOK=false;
	var URL="";
	var tport="";
	var sess=false;
	var firstport=1;
	var maxjj=1;
	var userAgent = navigator.userAgent;
	var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") < 1 ;
	if(isSafari)
	{
		maxjj=5;
	}
	try
	{
		for(iii=0;iii<ports.length;iii++)
		{
			try
			{
				var xhr = new XMLHttpRequest();
				var str2="&Token="+window.sessionStorage["Token"] ;
				if(typeof window.sessionStorage["Port"] !== 'undefined' && sess==false)
				{
					tport=window.sessionStorage["Port"];
					sess=true;
					iii--;
				}
				else
				{
					tport=ports[iii];
				}

				var str3="";
				for(jj=0;jj<maxjj;jj++)
				{
					URL="https://127.0.0.1:"+tport+"/WebATM?"+str+str2+str3;
					try
					{
						xhr.open("POST", URL, false);
						xhr.send(null);
						resp=xhr.responseText;
						xhr=null;
						isOK=true;
						window.sessionStorage["Port"]=tport;
						break;
					}
					catch(err) {
						str3="&reTry=1";
						// alert(err.message);
					}
				}
				if(isOK)
					break;
			}
			catch(err) {
				resp=err.message;
			}
		}
		if(isOK==true)
		{
		  resp="0||"+resp
		}
		else
		{
			resp="-1||"+resp

		}
		return resp;
	}

	catch(err) {
}
}
function firstCardSend(str)
{

	var ret="";
	try
	{
		ret=firstCardPost(str);

		var sp=ret.split("||");
		if(sp[0]!="0")
		{
			return "9999";
		}
		return sp[1];
	}

	catch(err) {

	}
}
function downloadURI(url) {
	var elemiframe = document.createElement('iframe');
	elemiframe.style.display = "none";
	elemiframe.src = url;
	try{
		document.body.appendChild(elemiframe);
	}catch(e){
		window.open(url);
	}
}


function getTodayDT(){
  var today = new Date();
  var year = today.getFullYear().toString();
  var mnth = (100 + today.getMonth() + 1 ).toString().substr(1);
  var date = (100 + today.getDate()).toString().substr(1);
  var h = (100 + today.getHours()).toString().substr(1);
  var m = (100 + today.getMinutes()).toString().substr(1);
  var s = (100 + today.getSeconds()).toString().substr(1);
  return year + mnth + date + h + m + s
}


/**
 * OsType：
 *  11 => Win32
 *  12 => Win64
 *  21 => Mac OS X 10.4
 *  22 => Mac OS X 10.5
 *  23 => Mac OS X 10.6
 *  24 => Mac OS X 10.7
 *  25 => Mac OS X 10.8
 *  31 => Linux i686
 *  41 => Unknow
 */
 function getOSType(){
    var jsOsType ="41";
    var _platform = navigator.platform;
    var _userAgent = navigator.userAgent;
    switch(_platform){
        case "Win32":
           jsOsType="11";
           //retFlag = true;
		   return jsOsType;
           break;
        case "Win64":
           jsOsType="12";
           return jsOsType;
           //retFlag = true;
           break;
        case "MacIntel"://
            if ((_userAgent.indexOf("Mac OS X 10.4")!= -1) || (_userAgent.indexOf("Mac OS X 10_4")!= -1)){
               jsOsType="21";
            }
            if ((_userAgent.indexOf("Mac OS X 10.5")!= -1) || (_userAgent.indexOf("Mac OS X 10_5")!= -1)){
               jsOsType="22";
            }
            if ((_userAgent.indexOf("Mac OS X 10.6")!= -1) || (_userAgent.indexOf("Mac OS X 10_6")!= -1)){
                jsOsType="23";
            }
            if ((_userAgent.indexOf("Mac OS X 10.7")!= -1) || (_userAgent.indexOf("Mac OS X 10_7")!= -1)){
                jsOsType="24";
            }
            if ((_userAgent.indexOf("Mac OS X 10.8")!= -1) || (_userAgent.indexOf("Mac OS X 10_8")!= -1)){
                jsOsType="25";
            }
            break;
        case "Linux i686":
            jsOsType="31";
            break;
        default:
            jsOsType="41";
            break;
        }
	return jsOsType;
}


//判斷該用哪個類型的元件
/*
return： 1 => WIN32
		 2 => WIN64
		 3 => Plugin
		 0 => Unknow
*/
function getObjectType(){

	var bType = getBrowserType();
	var oType = getOSType();

//alert("bType=" + bType + " , oType="+oType);	

	//Unknown
	if ((oType == 41 ) || (bType == 41)) {
		return "0";
	}
	//Win 32
	if ((oType == 11) && (bType == 11)){
		return "1"; // Win 32
	}else if ((oType == 12) && (bType == 11)){
		return "2"; // Win 64
	}else{
		return "3"; // Plugin
	}
}


//判斷Browser是否為IE
/*
BrowserType：
11 => Microsoft Internet Explorer
21 => Firefox
22 => Chrome
23 => Safari
24 => Opera
41 => Unknow
*/
function getBrowserType(){
    var jsBrowserType="41";
    var _appName = navigator.appName;
    var _userAgent=navigator.userAgent;
    
    var retFlag=false;  
    
    switch(_appName){
        case "Microsoft Internet Explorer":
            jsBrowserType="11";
            retFlag = true;
            break;
        case "Netscape":
            if (_userAgent.indexOf("Firefox")!= -1){
                jsBrowserType="21";
            }
            if (_userAgent.indexOf("Chrome")!= -1){
                jsBrowserType="22";
            }
            if (_userAgent.indexOf("Safari")!= -1){
                jsBrowserType="23";
            }
            break;
        case "Opera":
            jsBrowserType="24";
            break;
        default:
            jsBrowserType="41";
            break;
    }
    //alert("Arf debug - jsBrowserType="+jsBrowserType+" \t retFlag="+retFlag);
    if (jsBrowserType=="41"){
        //alert("本系統未支援您的瀏覽器類型_appName:<"+_appName+"> _userAgent:<"+_userAgent+">");
        return jsBrowserType;
    }
    return jsBrowserType;
}