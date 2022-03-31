import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { f1003_query } from 'src/app/shared/model/f1003.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class F1003Service {

  step: number = 1;
  usrId!: string;
  usrIdTip!: string;

  //api
  custName!: string;
  lastModifyDttm!: string;
  oldUsrId!: string;


  APIURL: string = environment.APIURL_F10003;


  constructor(public http: HttpClient,private _router: Router) { }

  //查詢登入代號api(get data)
  queryf1003(): Observable<f1003_query> {
    return this.http.get<f1003_query>(this.APIURL, {}).pipe(
      tap((response) => {
        console.log("queryf1003", response);
        return response;
      }),
      // catchError(this.handleError)

    )
  }

  handleError(error: HttpErrorResponse): Observable<f1003_query> {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  //變更登入代號api





  setStep(step: number) {
    this.step = step;
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
  setLastModifyDttm(lastModifyDttm : string) {
    this.lastModifyDttm=lastModifyDttm;
  }
  setOldUsrId(oldUsrId:string) {
    this.oldUsrId=oldUsrId;
  }


  getStep() { return this.step; }

  getUsrId() { return this.usrId; }

  getUsrIdTip() { return this.usrIdTip; }

  getCustName() { return this.custName }

  getLastModifyDttm() { return this.lastModifyDttm; }

  getOldUsrId() { return this.oldUsrId; }

}
