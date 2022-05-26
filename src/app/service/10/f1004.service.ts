import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { f1004_change, f1004_query } from 'src/app/shared/model/f1004.model';
import { API_F1004_GETUSRPD, API_F1004_MODIFYUSRPD, API_SETTING_HTTPOPTIONS } from 'src/app/shared/constants/api.constants'


@Injectable({
  providedIn: 'root'
})
export class F1004Service {

  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    F1004登入密碼變更
    declare variable
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/

  //STEP(default：1)
  step: number = 1;

  //TXN RESULT CONTROL
  isLoading:boolean=false;
  txnStatus!: string;//"success" or "error"
  error!: { code: string, message: string, details: [] }// if txnStatus=error,

  //DATA FROM FORM_INPUT
  oldPd!: string;
  newPd!: string;
  checkPd!: string;

  //DATA FROM API
  custName!: string;
  custId!: string;
  lastModifyDttm!: string;
  usrId!: string;
  transDttm!: string;


  //TXN RESULT TIP(for success,count newPd)
  countInt!: number;
  countLower!: number;
  countUpper!: number;
  //TXN RESULT TIP(for error,count oldPd)
  countIntOld!: number;
  countLowerOld!: number;
  countUpperOld!: number;

  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    constructor
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  constructor(
    public http: HttpClient
  ) { }



  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    post api
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/

  //查詢登入密碼api(get data)
  queryf1004(): Observable<f1004_query> {
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
    return this.http.post<f1004_query>( API_F1004_GETUSRPD, APIBODY, API_SETTING_HTTPOPTIONS ).pipe(
      tap((response) => {
        console.log("queryf1004", response);
        return response;
      })
    )
  }

  //登入代號變更
  changef1004(): Observable<f1004_change> {
    const APIBODY2 = {
      "header": {
        "additionalProp1": "test",
        "additionalProp2": "test",
        "additionalProp3": "test"
      },
      "body": {
        "custId": "A1231231230",
        "oldUsrPwd": this.getOldPd(),
        "newUsrPwd": this.getNewPd(),
        "chkUsrPwd": this.getCheckPd(),
        "loginWay": "w"
      }
    }
    return this.http.post<f1004_change>( API_F1004_MODIFYUSRPD, APIBODY2, API_SETTING_HTTPOPTIONS ).pipe(
      tap((response) => {
        console.log("changef1003", response);
        return response;
      }),
      // catchError(this.handleError)

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
  setTxnStatus(txnStatus: string) {
    this.txnStatus = txnStatus;
  }
  setError(error: any) {
    this.error = error;
  }
  setOldPd(oldPd: string) {
    this.oldPd = oldPd;
  }
  setNewPd(newPd: string) {
    this.newPd = newPd;
  }
  setCheckPd(checkPd: string) {
    this.checkPd = checkPd;
  }
  setCountInt(countInt: number) {
    this.countInt = countInt;
  }
  setCountLower(countLower: number) {
    this.countLower = countLower;
  }
  setCountUpper(countUpper: number) {
    this.countUpper = countUpper;
  }
  setCountIntOld(countIntOld: number) {
    this.countIntOld = countIntOld;
  }
  setCountLowerOld(countLowerOld: number) {
    this.countLowerOld = countLowerOld;
  }
  setCountUpperOld(countUpperOld: number) {
    this.countUpperOld = countUpperOld;
  }

  getStep() { return this.step; }

  getIsLoading() { return this.isLoading; }

  getTxnStatus() { return this.txnStatus; }

  getError() { return this.error; }

  getOldPd() { return this.oldPd; }

  getNewPd() { return this.newPd; }

  getCheckPd() { return this.checkPd }

  getCountInt() { return this.countInt; }

  getCountLower() { return this.countLower; }

  getCountUpper() { return this.countUpper; }

  getCountIntOld() { return this.countIntOld; }

  getCountLowerOld() { return this.countLowerOld; }

  getCountUpperOld() { return this.countUpperOld; }




}
