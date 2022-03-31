import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { f1005_query } from 'src/app/shared/model/f1005.model';

@Injectable({
  providedIn: 'root'
})
export class F1005Service {

  step: number = 1;
  oldSSL!: string;
  newSSL!: string;
  checkSSL!: string;

  //api
  custName!: string;
  custId!: string;
  lastModifyDttm!: string;
  usrId!: string;

  APIURL=environment.APIURL_F10004

  constructor(public http: HttpClient) { }

  //查詢登入密碼api(get data)
  queryf1005(): Observable<f1005_query> {
    return this.http.get<f1005_query>(this.APIURL, {}).pipe(
      tap((response) => {
        console.log("queryf1005", response);
        return response;
      })
    )
  }
  //api
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
  getCustName() { return this.custName; }
  getCustId() { return this.custId; }
  getLastModifyDttm() { return this.lastModifyDttm; }
  getUsrId() { return this.usrId; }






  setStep(step: number) {
    this.step = step;
  }
  setOldSSL(oldSSL: string) {
    this.oldSSL = oldSSL;
  }
  setNewSSL(newSSL: string) {
    this.newSSL = newSSL;
  }
  setCheckSSL(checkSSL: string) {
    this.checkSSL = checkSSL;
  }
  getStep() { return this.step; }

  getOldSSL() { return this.oldSSL; }

  getNewSSL() { return this.newSSL; }

  getCheckSSL() { return this.checkSSL }

}
