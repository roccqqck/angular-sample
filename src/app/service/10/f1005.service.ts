import { f1005_change } from './../../shared/model/f1005.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { f1005_query } from 'src/app/shared/model/f1005.model';
import { API_F1005_GETSSL, API_F1005_MODIFYSSL, API_SETTING_HTTPOPTIONS } from 'src/app/shared/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class F1005Service {

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
  oldSSL!: string;
  newSSL!: string;
  checkSSL!: string;

  //DATA FROM API
  custName!: string;
  custId!: string;
  lastModifyDttm!: string;
  usrId!: string;
  transDttm!: string;


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
  // queryf1005(): Observable<f1005_query> {
  //   return this.http.get<f1005_query>(this.APIURL_F10005_QUERY, {}).pipe(
  //     tap((response) => {
  //       console.log("queryf1005", response);
  //       return response;
  //     })
  //   )
  // }

  // changef1005(): Observable<f1005_change> {
  //   return this.http.get<f1005_change>(this.APIURL_F10005_CHANGE, {}).pipe(
  //     tap((response) => {
  //       console.log("queryf1005", response);
  //       return response;
  //     })
  //   )
  // }



  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    post api
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/

  //查詢SSL密碼api(get data)
  queryf1005(): Observable<f1005_query> {
    const APIBODY = {
      "header": {
        "additionalProp1": "test",
        "additionalProp2": "test",
        "additionalProp3": "test"
      },
      "body": {
        "custId": this.getCustId()
      }
    }
    return this.http.post<f1005_query>( API_F1005_GETSSL, APIBODY, API_SETTING_HTTPOPTIONS ).pipe(
      tap((response) => {
        console.log("queryf1005", response);
        return response;
      })
    )
  }

  changef1005(): Observable<f1005_change> {
    const APIBODY2 = {
      "header": {
        "additionalProp1": "test",
        "additionalProp2": "test",
        "additionalProp3": "test"
      },
      "body": {
        "custId":  this.getCustId(),
        "oldSSL": this.getOldSSL(),
        "newSSL": this.getNewSSL(),
        "chkSSL": this.getCheckSSL(),
        "loginWay": "w"
      }
    }
    return this.http.post<f1005_change>( API_F1005_MODIFYSSL, APIBODY2, API_SETTING_HTTPOPTIONS ).pipe(
      tap((response) => {
        console.log("queryf1005", response);
        return response;
      })
    )
  }

  

  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    set() & get()
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/

  //API
  setCustName(custName: string) {
    this.custName = custName;
  }
  setCustId(custId: string) {
    this.custId = custId;
  }
  setLastModifyDttm(lastModifyDttm: string) {
    this.lastModifyDttm = lastModifyDttm;
  }
  setUsrId(usrId: string) {
    this.usrId = usrId;
  }
  setTransDttm(transDttm: string) {
    this.transDttm = transDttm;
  }
  getCustName() { return this.custName; }

  getCustId() { return this.custId; }

  getLastModifyDttm() { return this.lastModifyDttm; }

  getUsrId() { return this.usrId; }

  getTransDttm() { return this.transDttm; }



  //FORM
  setStep(step: number) {
    this.step = step;
  }
  setIsLoading(isLoading:boolean){
    this.isLoading=isLoading;
  }
  setOldSSL(oldSSL: string) {
    this.oldSSL = oldSSL;
  }
  setTxnStatus(txnStatus: string) {
    this.txnStatus = txnStatus;
  }
  setError(error: any) {
    this.error = error;
  }
  setNewSSL(newSSL: string) {
    this.newSSL = newSSL;
  }
  setCheckSSL(checkSSL: string) {
    this.checkSSL = checkSSL;
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

  getOldSSL() { return this.oldSSL; }

  getNewSSL() { return this.newSSL; }

  getCheckSSL() { return this.checkSSL }

  getCountInt() { return this.countInt; }

  getCountIntOld() { return this.countIntOld; }

}
