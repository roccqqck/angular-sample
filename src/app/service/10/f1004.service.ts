import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { f1004_query } from 'src/app/shared/model/f1004.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class F1004Service {


  step: number = 1;
  oldPd!: string;
  newPd!: string;
  checkPd!: string;

  //api
  custName!: string;
  custId!: string;
  lastModifyDttm!: string;
  usrId!: string;



  APIURL=environment.APIURL_F10004

  constructor(public http: HttpClient) { }


 //查詢登入密碼api(get data)
 queryf1004(): Observable<f1004_query> {
  return this.http.get<f1004_query>(this.APIURL, {}).pipe(
    tap((response) => {
      console.log("queryf1004", response);
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
  getCustName(){return this.custName;}
  getCustId(){return this.custId;}
  getLastModifyDttm() { return this.lastModifyDttm; }
  getUsrId() { return this.usrId; }






  setStep(step: number) {
    this.step = step;
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
  getStep() { return this.step; }

  getOldPd() { return this.oldPd; }

  getNewPd() { return this.newPd; }

  getCheckPd() { return this.checkPd }



}
