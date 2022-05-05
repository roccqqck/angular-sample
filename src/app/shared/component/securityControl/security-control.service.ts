import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { security_efinger, security_fxml, security_query, send_efinger } from '../../model/security.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityControlService {

  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    安控共用元件
    declare variable
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  success!: boolean;

  currentSecurity:string="";

  cardStatus!: string;
  deviceBindingStatus!: string;
  fxmlStatus!: string;
  oneTouchStatus!: string;
  otpStatus!: string;
  sslStatus!: string;

  //ssl
  sslValue!: string;
  otpValue!: string;
  otpCaptcha!: string;

  //efinger
  txnData!:string;
  seqNo!:string;

  //fxml
  sign!: string;
  signText!:string;



  //API URL
  APIURL_SECURITY_QUERY="https://security-common-ibank.apps.devocp.firstbank.com.tw/api/security/securityinfo/v1/status/getallsecurity"
  APIURL_SECURITY_SSL="https://security-common-ibank.apps.devocp.firstbank.com.tw/api/security/securityauth/v1/ssl/getssl"
  APIURL_SECURITY_SENDMESSAGE="https://security-common-ibank.apps.devocp.firstbank.com.tw/api/security/securityauth/v1/efinger/sendmessage"
  APIURL_SECURITY_ONETOUCH="https://security-common-ibank.apps.devocp.firstbank.com.tw/api/security/securityauth/v1/efinger/verifyefinger"
  APIURL_SECURITY_DEVICEBINDING="https://security-common-ibank.apps.devocp.firstbank.com.tw/api/security/securityauth/v1/efinger/verifyefinger"
  APIURL_SECURITY_OTP="https://security-common-ibank.apps.devocp.firstbank.com.tw/api/security/securityauth/v1/otp/verifyotp"
  APIURL_SECURITY_FXML="https://security-common-ibank.apps.devocp.firstbank.com.tw/api/security/securityauth/v1/fxml/verifyfxml"

  //POST HEADER OPTION
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'test'
    })
  };




  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    constructor
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  constructor(
    public http: HttpClient
  ) { }



  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    get api
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  /**
   * 查詢登入密碼api(get data)
   * @returns
   */
  // getAllSecurity(): Observable<security_query> {
  //   return this.http.get<security_query>("http://localhost:4200/json/getallsecurity.json", {}).pipe(
  //     tap((response) => {
  //       console.log("queryf1005", response);
  //       return response;
  //     })
  //   )
  // }

   /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    post api
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  /**
   * 取得各安控狀態
   * @returns
   */
  queryAllSecurity(): Observable<security_query> {
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
    return this.http.post<security_query>(this.APIURL_SECURITY_QUERY,APIBODY,this.httpOptions).pipe(
      tap((response) => {
        console.log("getAllSecurity()", response);
        return response;
      })
    )
  }


  /**
   * 驗證SSL密碼
   * @returns
   */
   verifySSL(): Observable<security_query> {
    const APIBODY = {
      "header": {
        "additionalProp1": "test",
        "additionalProp2": "test",
        "additionalProp3": "test"
      },
      "body": {
        "custId": "A1231231230",
        "ssl":this.getSslValue()
      }
    }
    return this.http.post<security_query>(this.APIURL_SECURITY_SSL,APIBODY,this.httpOptions).pipe(
      tap((response) => {
        console.log("getAllSecurity()", response);
        return response;
      })
    )
  }

  /**
   * 發送訊息(e指通/裝置綁定)
   * @returns 
   */
  sendeMessage(): Observable<send_efinger> {
    const APIBODY = {
      "header": {
        "additionalProp1": "test",
        "additionalProp2": "test",
        "additionalProp3": "test"
      },
      "body": {
        "custId": "A1231231230",
        "txnData":this.getTxnData(),
      }
    }
    return this.http.post<send_efinger>(this.APIURL_SECURITY_SENDMESSAGE,APIBODY,this.httpOptions).pipe(
      tap((response) => {
        console.log("verifyFXML()", response);
        return response;
      })
    )
  }

  /**
   * 驗證e指通/裝置綁定
   * @returns
   */
     verifyEfinger(): Observable<security_efinger> {
      const APIBODY = {
        "header": {
          "additionalProp1": "test",
          "additionalProp2": "test",
          "additionalProp3": "test"
        },
        "body": {
          "custId": "A1231231230",
          "seqNo":this.getSeqNo(),
          
        }
      }
      return this.http.post<security_efinger>(this.APIURL_SECURITY_ONETOUCH,APIBODY,this.httpOptions).pipe(
        tap((response) => {
          console.log("verifyEfinger()", response);
          return response;
        })
      )
    }
  

  /**
   * 驗證FXML(電子憑證)
   * @returns
   */
  verifyFXML(): Observable<security_fxml> {
    const APIBODY = {
      "header": {
        "additionalProp1": "test",
        "additionalProp2": "test",
        "additionalProp3": "test"
      },
      "body": {
        "custId": "A1231231230",
        "sign":this.getSign(),
        "signText":this.getSignText()
      }
    }
    return this.http.post<security_fxml>(this.APIURL_SECURITY_FXML,APIBODY,this.httpOptions).pipe(
      tap((response) => {
        console.log("verifyFXML()", response);
        return response;
      })
    )
  }


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    set() & get()
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/


  setSuccess(success: boolean) {
    this.success = success;
  }
  setDeviceBindingStatus(status: string) {
    this.deviceBindingStatus = status;
  }
  setFxmlStatus(status: string) {
    this.fxmlStatus = status;
  }
  setOneTouchStatus(status: string) {
    this.oneTouchStatus = status;
  }
  setOtpStatus(status: string) {
    this.otpStatus = status;
  }
  setSslStatus(status: string) {
    this.sslStatus = status;
  }
  setCardStatus(status: string) {
    this.cardStatus = status;
  }

  setCurrentSecurity(current:string){
    this.currentSecurity=current;
  }

  setSslValue(value:string){
    this.sslValue=value;
  }
  setOtpValue(value:string){
    this.otpValue=value;
  }
  setOtpCaptcha(value:string){
    this.otpCaptcha=value;
  }
  setSign(value:string){
    this.sign=value;
  }
  setSignText(value:string){
    this.signText=value;
  }
  setTxnData(value:string){
    this.txnData=value;
  }
  setSeqNo(value:string){
    this.seqNo=value;
  }


  getSuccess() { return this.success; }

  getCardStatus() { return this.cardStatus; }

  getDeviceBindingStatus() { return this.deviceBindingStatus; }

  getFxmlStatus() { return this.fxmlStatus; }

  getOneTouchStatus() { return this.oneTouchStatus; }

  getOtpStatus() { return this.otpStatus; }

  getSslStatus() { return this.sslStatus; }

  getCurrentSecurity() {return this.currentSecurity; }

  getSslValue() { return this.sslValue; }

  getOtpValue() { return this.otpValue; }

  getOtpCaptcha() { return this.otpCaptcha; }

  getSign() { return this.sign; }

  getSignText() { return this.signText; }

  getTxnData() { return this.txnData; }

  getSeqNo() { return this.seqNo; }



}
