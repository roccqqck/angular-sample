function getXcsp(){
	var xcsp = {
		GetComVersion :function(){
			var str="a1=mth&a2=GetComVersion";
			var tmp=firstCardSend(str);
			if(tmp=="9999")
			 throw "連線失敗";
			return tmp;
		},
		DoInput:function(){
			var str="a1=mth&a2=DoInput";
			return firstCardSend(str);
		},
		SetCardActive:function(){
			var str="a1=mth&a2=SetCardActive";
			return firstCardSend(str);
		},	
		DoActiveTAC:function(){
			var str="a1=mth&a2=DoActiveTAC";
			return firstCardSend(str);
		},
		CheckCardActive:function(){
			var str="a1=mth&a2=CheckCardActive";
			return firstCardSend(str);
		},
		ConnectDriver:function(){
			var str="a1=mth&a2=ConnectDriver";
			var tmp=firstCardSend(str);
			if(tmp=="9999")
			 throw "連線失敗";
			return tmp;
		},			
		DisconnectDriver:function(){
			var str="a1=mth&a2=DisconnectDriver";
			var tmp=firstCardSend(str);
			if(tmp=="9999")
			 throw "連線失敗";
			return tmp;
		},				
		ListReadersName:function(){
			var str="a1=mth&a2=ListReadersName";
			return firstCardSend(str);
		},				
		CheckCardInsert:function(){
			var str="a1=mth&a2=CheckCardInsert";
			return firstCardSend(str);
		},				
		ConnectCard:function(){
			var str="a1=mth&a2=ConnectCard";
			var rec=firstCardSend(str);
			if(rec=="9999")
			 throw "連線失敗";		
			var sp=rec.split(",");
			if(sp[0]=="0")
			{
				window.sessionStorage["Token"] =sp[1];
			}
			return sp[0];
		},				
		DisconnectCard:function(){
			var str="a1=mth&a2=DisconnectCard";
			var ret=firstCardSend(str);
			if(ret=="9999")
			 throw "連線失敗";						
			window.sessionStorage["Token"]="undefined";
			return ret;
		},		
		CheckCardChange:function(){
			var str="a1=mth&a2=CheckCardChange";
			return firstCardSend(str);
		},		
		ReadBasicData:function(){
			var str="a1=mth&a2=ReadBasicData";
			return firstCardSend(str);
		},		
		ReadAuthInAcctNo:function(){
			var str="a1=mth&a2=ReadAuthInAcctNo";
			return firstCardSend(str);
		},	
		SetReaderType:function(s1){
			var str="a1=mth&a2=SetReaderType&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},	
		VerifyPIN:function(s1){
			var str="a1=mth&a2=VerifyPIN&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},	
		ChangePIN:function(s1,s2){
			var str="a1=mth&a2=ChangePIN&a3="+encodeURIComponent(s1)+"&a4="+encodeURIComponent(s2);
			return firstCardSend(str);
		},	
		DoLoginTAC:function(){
			var str="a1=mth&a2=DoLoginTAC";
			return firstCardSend(str);
		},	
		DoInquiryTAC:function(s1){
			var str="a1=mth&a2=DoInquiryTAC&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},		
		DoTransferTAC:function(s1){
			var str="a1=mth&a2=DoTransferTAC&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},		
		DoPayTaxTAC:function(s1){
			var str="a1=mth&a2=DoPayTaxTAC&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},			
		DoPayFeeTAC:function(s1){
			var str="a1=mth&a2=DoPayFeeTAC&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},			
		DoInsBorrowTAC:function(s1){
			var str="a1=mth&a2=DoInsBorrowTAC&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},			
		ReadTACLog:function(){
			var str="a1=mth&a2=ReadTACLog";
			return firstCardSend(str);
		},					
		GetAtmCode:function(s1){
			var str="a1=mth&a2=GetAtmCode&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},			
		DoPayMoneyTAC:function(s1){
			var str="a1=mth&a2=DoPayMoneyTAC&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},		
		DoNetbankTAC:function(s1){
			var str="a1=mth&a2=DoNetbankTAC&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},			
		
		// Get
		get Value () {
			var str="a1=get&a2=Value";
			return firstCardSend(str);
		},
		get ValueTAC () {
			var str="a1=get&a2=ValueTAC";
			return firstCardSend(str);
		},			
		get CardType() {
			var str="a1=get&a2=CardType";
			return firstCardSend(str);
		},			
		get CardIsActive() {
			var str="a1=get&a2=CardIsActive";
			return firstCardSend(str);
		},					
		get RandomNo() {
			var str="a1=get&a2=RandomNo";
			return firstCardSend(str);
		},				
		get MasterAccountNo() {
			var str="a1=get&a2=MasterAccountNo";
			return firstCardSend(str);
		},				
		get TACLog9() {
			var str="a1=get&a2=TACLog9";
			return firstCardSend(str);
		},			
		get TACLog8() {
			var str="a1=get&a2=TACLog8";
			return firstCardSend(str);
		},			
		get TACLog7() {
			var str="a1=get&a2=TACLog7";
			return firstCardSend(str);
		},		
		get TACLog6() {
			var str="a1=get&a2=TACLog6";
			return firstCardSend(str);
		},			
		get TACLog5() {
			var str="a1=get&a2=TACLog5";
			return firstCardSend(str);
		},			
		get TACLog4() {
			var str="a1=get&a2=TACLog4";
			return firstCardSend(str);
		},		
		get TACLog3() {
			var str="a1=get&a2=TACLog3";
			return firstCardSend(str);
		},
		get TACLog2() {
			var str="a1=get&a2=TACLog2";
			return firstCardSend(str);
		},
		get TACLog1() {
			var str="a1=get&a2=TACLog1";
			return firstCardSend(str);
		},
		get TACLog0() {
			var str="a1=get&a2=TACLog0";
			return firstCardSend(str);
		},
		get EncTAC() {
			var str="a1=get&a2=EncTAC";
			return firstCardSend(str);
		},
		get IccSeqNo() {
			var str="a1=get&a2=IccSeqNo";
			return firstCardSend(str);
		},
		get AccountCount() {
			var str="a1=get&a2=AccountCount";
			return firstCardSend(str);
		},
		get SessionTAC() {
			var str="a1=get&a2=SessionTAC";
			return firstCardSend(str);
		},
		get AuthInCount() {
			var str="a1=get&a2=AuthInCount";
			return firstCardSend(str);
		},
		get AuthInAccountNo7() {
			var str="a1=get&a2=AuthInAccountNo7";
			return firstCardSend(str);
		},
		get AuthInAccountNo6() {
			var str="a1=get&a2=AuthInAccountNo6";
			return firstCardSend(str);
		},
		get AuthInAccountNo5() {
			var str="a1=get&a2=AuthInAccountNo5";
			return firstCardSend(str);
		},
		get AuthInAccountNo4() {
			var str="a1=get&a2=AuthInAccountNo4";
			return firstCardSend(str);
		},
		get AuthInAccountNo3() {
			var str="a1=get&a2=AuthInAccountNo3";
			return firstCardSend(str);
		},
		get AuthInAccountNo2() {
			var str="a1=get&a2=AuthInAccountNo2";
			return firstCardSend(str);
		},
		get AuthInAccountNo1() {
			var str="a1=get&a2=AuthInAccountNo1";
			return firstCardSend(str);
		},
		get AuthInAccountNo0() {
			var str="a1=get&a2=AuthInAccountNo0";
			return firstCardSend(str);
		},	
		get AuthInBankNo7() {
			var str="a1=get&a2=AuthInBankNo7";
			return firstCardSend(str);
		},	
		get AuthInBankNo6() {
			var str="a1=get&a2=AuthInBankNo6";
			return firstCardSend(str);
		},
		get AuthInBankNo5() {
			var str="a1=get&a2=AuthInBankNo5";
			return firstCardSend(str);
		},
		get AuthInBankNo4() {
			var str="a1=get&a2=AuthInBankNo4";
			return firstCardSend(str);
		},
		get AuthInBankNo3() {
			var str="a1=get&a2=AuthInBankNo3";
			return firstCardSend(str);
		},
		get AuthInBankNo2() {
			var str="a1=get&a2=AuthInBankNo2";
			return firstCardSend(str);
		},
		get AuthInBankNo1() {
			var str="a1=get&a2=AuthInBankNo1";
			return firstCardSend(str);
		},
		get AuthInBankNo0() {
			var str="a1=get&a2=AuthInBankNo0";
			return firstCardSend(str);
		},
		get CardNo() {
			var str="a1=get&a2=CardNo";
			return firstCardSend(str);
		},
		get AccountNo7() {
			var str="a1=get&a2=AccountNo7";
			return firstCardSend(str);
		},
		get AccountNo6() {
			var str="a1=get&a2=AccountNo6";
			return firstCardSend(str);
		},
		get AccountNo5() {
			var str="a1=get&a2=AccountNo5";
			return firstCardSend(str);
		},
		get AccountNo4() {
			var str="a1=get&a2=AccountNo4";
			return firstCardSend(str);
		},
		get AccountNo3() {
			var str="a1=get&a2=AccountNo3";
			return firstCardSend(str);
		},
		get AccountNo2() {
			var str="a1=get&a2=AccountNo2";
			return firstCardSend(str);
		},
		get AccountNo1() {
			var str="a1=get&a2=AccountNo1";
			return firstCardSend(str);
		},
		get AccountNo0() {
			var str="a1=get&a2=AccountNo0";
			return firstCardSend(str);
		},
		get CardRemark() {
			var str="a1=get&a2=CardRemark";
			return firstCardSend(str);
		},
		get IssuerBankNo() {
			var str="a1=get&a2=IssuerBankNo";
			return firstCardSend(str);
		},
		get shSW12() {
			var str="a1=get&a2=shSW12";
			return firstCardSend(str);
		},
		get CardChange() {
			var str="a1=get&a2=CardChange";
			return firstCardSend(str);
		},
		get ReaderInsert() {
			var str="a1=get&a2=ReaderInsert";
			return firstCardSend(str);
		},
		get ReaderName() {
			var str="a1=get&a2=ReaderName";
			return firstCardSend(str);
		},
		get Reader9() {
			var str="a1=get&a2=Reader9";
			return firstCardSend(str);
		},			
		get Reader8() {
			var str="a1=get&a2=Reader8";
			return firstCardSend(str);
		},		
		get Reader7() {
			var str="a1=get&a2=Reader7";
			return firstCardSend(str);
		},		
		get Reader6() {
			var str="a1=get&a2=Reader6";
			return firstCardSend(str);
		},		
		get Reader5() {
			var str="a1=get&a2=Reader5";
			return firstCardSend(str);
		},		
		get Reader4() {
			var str="a1=get&a2=Reader4";
			return firstCardSend(str);
		},		
		get Reader3() {
			var str="a1=get&a2=Reader3";
			return firstCardSend(str);
		},		
		get Reader2() {
			var str="a1=get&a2=Reader2";
			return firstCardSend(str);
		},		
		get Reader1() {
			var str="a1=get&a2=Reader1";
			return firstCardSend(str);
		},		
		get Reader0() {
			var str="a1=get&a2=Reader0";
			return firstCardSend(str);
		},					
		get ReaderCount() {
			var str="a1=get&a2=ReaderCount";
			return firstCardSend(str);
		},				
		get ErrorInfo() {
			var str="a1=get&a2=ErrorInfo";
			var tmp=firstCardSend(str);
			if(tmp=="9999")
			 return "連線失敗";
			return tmp;
		},

		// set
		set fNewPin(s1) {
			var str="a1=set&a2=fNewPin&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},	
		set InAccountNoShow(s1) {
			var str="a1=set&a2=InAccountNoShow&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},				
		set Key(s1) {
			var str="a1=set&a2=Key&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},				
		set nono(s1) {
			var str="a1=set&a2=nono&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},					
		set MerchantId(s1) {
			var str="a1=set&a2=MerchantId&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},				
		set AccountName(s1) {
			var str="a1=set&a2=AccountName&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},				
		set Kind(s1) {
			var str="a1=set&a2=Kind&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},			
		set FeeType(s1) {
			var str="a1=set&a2=FeeType&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},			
		set FeeName(s1) {
			var str="a1=set&a2=FeeName&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},				
		set AgentBankNo(s1) {
			var str="a1=set&a2=AgentBankNo&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},					
		set InAccountNo(s1) {
			var str="a1=set&a2=InAccountNo&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},				
		set ServerDateTime(s1) {
			var str="a1=set&a2=ServerDateTime&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},				
		set InBankNo(s1) {
			var str="a1=set&a2=InBankNo&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},				
		set Amount(s1) {
			var str="a1=set&a2=Amount&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},					
		set AccountNo(s1) {
			var str="a1=set&a2=AccountNo&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},					
		set FdChkCode(s1) {
			var str="a1=set&a2=FdChkCode&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},				
		set PCode(s1) {
			var str="a1=set&a2=PCode&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},					
		set SessionKey(s1) {
			var str="a1=set&a2=SessionKey&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},					
		set ReaderType(s1) {
			var str="a1=set&a2=ReaderType&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},			
		set ReaderName(s1) {
			var str="a1=set&a2=ReaderName&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},				
		set TxnName(s1) {
			var str="a1=set&a2=TxnName&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},				
		set TxnType(s1) {
			var str="a1=set&a2=TxnType&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},				
		set Channel(s1) {
			var str="a1=set&a2=Channel&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		},
		set FdId(s1) {
			var str="a1=set&a2=FdId&a3="+encodeURIComponent(s1);
			return firstCardSend(str);
		}		
	};
	return xcsp;
}