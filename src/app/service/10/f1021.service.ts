import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Select2OptionData } from 'src/app/shared/component/ng-select2/ng-select2.interface';
import { f1005_change, f1005_query } from 'src/app/shared/model/f1005.model';
import { accountList, f1021_change, f1021_check, f1021_query } from 'src/app/shared/model/f1021.model';
import { checkThenShowIcReader, jsGetCardAccount, listReaders, readCardData, readerSelect } from 'src/app/shared/util/firstCardObject';
import { environment } from 'src/environments/environment';

declare var Xcsp:any,jsRtn:any,ReadCardData:any;
@Injectable({
  providedIn: 'root'
})
export class F1021Service {

  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    F1005 SSL交易密碼變更
    declare variable
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/

  //STEP(default：1 )
  step: number = 1;

  //TXN RESULT CONTROL
  isLoading:boolean=false;
  txnStatus!: string;//"success" or "error"
  error!: { code: string, message: string, details: [] }// if txnStatus=error,

  //DATA FROM FORM_INPUT
  selectAccount!: string;
  newWithdraw!: string;
  checkWithdraw!: string;

  //DATA FROM API
  //query
  accountList!: Array<accountList>;
  lastModifyDttm!:string;
  lastModifyChannel!:string;
  //update
  account!:string;
  transDttm!:string;
  channel!:string;

  
  //API URL
  APIURL = environment.APIURL_F10004
  APIURL_F1021_QUERY="http://localhost:4200/json/f1021query.json"
  APIURL_F1021_CHECK="http://localhost:4200/json/f1021check.json"
  APIURL_F1021_CHANGE="http://localhost:4200/json/f1021update.json"
 
  // APIURL_F10005_QUERY= "https:/customer-common-ibank.apps.devocp.firstbank.com.tw/api/customer/personal/v1/security/getssl"
  // APIURL_F10005_CHANGE="https:/customer-common-ibank.apps.devocp.firstbank.com.tw/api/customer/personal/v1/security/modifyssl"



    //TXN RESULT TIP(for success,count newSSL)
    countInt!: number;
    //TXN RESULT TIP(for error,count oldSSL)
    countIntOld!: number;


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    constructor
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  constructor(
    public http: HttpClient
  ) { }



  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    get API (for mac test)
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/

  //查詢登入密碼api(get data)
  queryf1021(): Observable<f1021_query> {
    return this.http.get<f1021_query>(this.APIURL_F1021_QUERY, {}).pipe(
      tap((response) => {
        console.log("queryf1021", response);
        return response;
      })
    )
  }

  checkf1021(): Observable<f1021_check> {
    return this.http.get<f1021_check>(this.APIURL_F1021_CHECK, {}).pipe(
      tap((response) => {
        console.log("queryf1021", response);
        return response;
      })
    )
  }

  changef1021(): Observable<f1021_change> {
    return this.http.get<f1021_change>(this.APIURL_F1021_CHANGE, {}).pipe(
      tap((response) => {
        console.log("queryf1021", response);
        return response;
      })
    )
  }



  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    post api
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/

  //查詢SSL密碼api(get data)
  // queryf1021(): Observable<f1005_query> {
  //   const APIBODY = {
  //     "header": {
  //       "additionalProp1": "test",
  //       "additionalProp2": "test",
  //       "additionalProp3": "test"
  //     },
  //     "body": {
  //       "custId": "A1231231230"
  //     }
  //   }
  //   return this.http.post<f1005_query>(this.APIURL_F10005_QUERY,APIBODY,this.httpOptions).pipe(
  //     tap((response) => {
  //       console.log("queryf1005", response);
  //       return response;
  //     })
  //   )
  // }

  // checkf1021(): Observable<f1005_change> {
  //   const APIBODY2 = {
  //     "header": {
  //       "additionalProp1": "test",
  //       "additionalProp2": "test",
  //       "additionalProp3": "test"
  //     },
  //     "body": {
  //       "custId": "A1231231230",
  //       "oldSSL": this.getOldSSL(),
  //       "newSSL": this.getNewSSL(),
  //       "chkSSL": this.getCheckSSL(),
  //       "loginWay": "w"
  //     }
  //   }
  //   return this.http.post<f1005_change>(this.APIURL_F10005_CHANGE,APIBODY2, this.httpOptions).pipe(
  //     tap((response) => {
  //       console.log("queryf1005", response);
  //       return response;
  //     })
  //   )
  // }

  cardObservable(): Observable<any>{
    console.log('cardObservable start')
    checkThenShowIcReader();
    listReaders(document.getElementsByName('readerSelect')[0].children[0]);
    readerSelect(document.getElementsByName('readerSelect')[0].children[0]);

    this.DectetReader1(document.getElementsByName('readerSelect')[0].children[0]);
    // readCardData(document.getElementsByName('readerSelect')[0].children[0]);
    const account=jsGetCardAccount("0")
    let accountList: Array<Select2OptionData>=[]
    if(account != undefined){
       accountList=[{id:account,text:account}];
    }
   
    console.log("accountList",accountList);
    (document as any).formCard.payerAcctNo.value=account;

    if ((document as any).formCard.payerAcctNo.value.length == 0) {
      alert("取得卡片資訊失敗！")
    
    }
    console.log('cardObservable end')
    return of(accountList);

  
}
  DectetReader1(readerSelctObj:any){
	  if (readerSelctObj.options.length > 0){
		//選擇有插卡的讀卡機
      for(let i=0;i< readerSelctObj.options.length;i++){
        Xcsp.ReaderName = readerSelctObj.options[i].value;
        jsRtn = Xcsp.CheckCardInsert();

        if (Xcsp.ReaderInsert=="Y"){//Y:插卡，N:未插卡
          //晶片金融卡已插入讀卡機中
          readerSelctObj.selectedIndex = i;

          ReadCardData(readerSelctObj, '', null, false);//取得晶片卡中的資料
        }else{
          //讀卡機未插卡
          alert("讀卡機未插卡: "+Xcsp.ReaderName);
          //top.$("#waringMsg .pop-content").text("讀卡機未插卡: "+Xcsp.ReaderName);
          //top.modal1.toggle();
        }
      }
    }
  }
  


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    set() & get()
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/

  //API
  setAccountList(accountList: Array<accountList>){
    this.accountList=accountList;
  }
  setLastModifyDttm(lastModifyDttm:string){
    this.lastModifyDttm=lastModifyDttm;
  }
  setLastModifyChannel(lastModifyChannel:string){
    this.lastModifyChannel=lastModifyChannel;
  }
  setAccount(account:string){
    this.account=account;
  }
  setTransDttm(transDttm:string){
    this.transDttm=transDttm;
  }
  setChannel(channel:string){
    this.channel=channel;
  }

  getAccountList(){ return this.accountList; }
  getLastModifyDttm(){ return this.lastModifyDttm; }
  getLastModifyChannel(){ return this.lastModifyChannel; }
  getAccount(){ return this.account; }
  getTransDttm(){ return this.transDttm; }
  getChannel(){ return this.channel; }

  //FORM
  setStep(step: number) {
    this.step = step;
  }
  setIsLoading(isLoading:boolean){
    this.isLoading=isLoading;
  }
  setSelectAccount(selectAccount: string) {
    this.selectAccount = selectAccount;
  }
  setTxnStatus(txnStatus: string) {
    this.txnStatus = txnStatus;
  }
  setError(error: any) {
    this.error = error;
  }
  setNewWithdraw(newWithdraw: string) {
    this.newWithdraw = newWithdraw;
  }
  setCheckWithdraw(checkWithdraw: string) {
    this.checkWithdraw = checkWithdraw;
  }
  setCountInt(countInt: number) {
    this.countInt = countInt;
  }
  setCountIntOld(countIntOld: number) {
    this.countIntOld = countIntOld;
  }

  getStep() { return this.step; }

  getIsLoading() { return this.isLoading; }

  getTxnStatus() { return this.txnStatus; }

  getError() { return this.error; }

  getSelectAccount() { return this.selectAccount; }

  getNewWithdraw() { return this.newWithdraw; }

  getCheckWithdraw() { return this.checkWithdraw }

  getCountInt() { return this.countInt; }

  getCountIntOld() { return this.countIntOld; }
}
