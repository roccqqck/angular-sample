import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { f1003_query,f1003_change } from 'src/app/shared/model/f1003.model';


@Injectable({
  providedIn: 'root'
})
export class F1003Service {

  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    F1003登入代號變更
    declare variable
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/

  //STEP(default：1)
  step: number = 1;

  //TXN RESULT CONTROL
  isLoading:boolean=false;
  txnStatus!: string;//"success" or "error"
  error!: { code: string, message: string, details: [] }// if txnStatus=error,

  //DATA FROM FORM_INPUT
  usrId!: string;
  usrIdTip!: string;

  //DATA FROM API
  custName!: string;
  lastModifyDttm!: string;
  oldUsrId!: string;
  transDttm!: string;

  //API URL
  APIURL: string = environment.APIURL_F10003;
  APIURL2: string = "https:/customer-common-ibank.apps.devocp.firstbank.com.tw/api/customer/personal/v1/security/modifyusrid"

  //POST HEADER OPTION
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer test'
    })
  };


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    constructor
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  constructor(
    public http: HttpClient,
  ) { }




  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    post api
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/

  //查詢登入代號
  queryf1003(): Observable<f1003_query> {
    const APIBODY = {
      "header": {
        "additionalProp1": "test",
        "additionalProp2": "test",
        "additionalProp3": "test"
      },
      "body": {
        "custId": "A1231231230"
      }
    }
    return this.http.post<f1003_query>(this.APIURL, APIBODY, this.httpOptions).pipe(
      tap((response) => {
        console.log("queryf1003", response);
        return response;
      }),
      // catchError(this.handleError)

    )
  }

  //登入代號變更
  changef1003(): Observable<f1003_change> {
    const APIBODY2 = {
      "header": {
        "additionalProp1": "test",
        "additionalProp2": "test",
        "additionalProp3": "test"
      },
      "body": {
        "custId": "A1231231230",
        "oldUsrId": this.getOldUsrId(),
        "newUsrId": this.getUsrId(),
        "usrIdTip": this.getUsrIdTip(),
        "loginWay": "w"
      }
    }
    return this.http.post<f1003_change>(this.APIURL2, APIBODY2, this.httpOptions).pipe(
      tap((response) => {
        console.log("changef1003", response);
        return response;
      }),
      // catchError(this.handleError)

    )
  }


  //錯誤處理，改從error-interceptor處理
  // handleError(error: HttpErrorResponse): Observable<f1003_query> {
  //   if (error.status === 0) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // }

  //變更登入代號api

  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    set() & get()
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/

  setStep(step: number) {
    this.step = step;
  }
  setIsLoading(isLoading:boolean){
    this.isLoading=isLoading;
  }
  setUsrId(usrId: string) {
    this.usrId = usrId;
  }
  setUsrIdTip(usrIdTip: string) {
    this.usrIdTip = usrIdTip;
  }
  setCustName(custName: string) {
    this.custName = custName;
  }
  setLastModifyDttm(lastModifyDttm: string) {
    this.lastModifyDttm = lastModifyDttm;
  }
  setOldUsrId(oldUsrId: string) {
    this.oldUsrId = oldUsrId;
  }
  setTransDttm(transDttm: string) {
    this.transDttm = transDttm;
  }
  setTxnStatus(txnStatus: string) {
    this.txnStatus = txnStatus;
  }
  setError(error: any) {
    this.error = error;
  }


  getStep() { return this.step; }

  getIsLoading() { return this.isLoading; }

  getUsrId() { return this.usrId; }

  getUsrIdTip() { return this.usrIdTip; }

  getCustName() { return this.custName }

  getLastModifyDttm() { return this.lastModifyDttm; }

  getOldUsrId() { return this.oldUsrId; }

  getTransDttm() { return this.transDttm; }

  getTxnStatus() { return this.txnStatus; }

  getError() { return this.error; }

}
