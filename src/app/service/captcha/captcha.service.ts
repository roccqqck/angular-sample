import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { captcha } from 'src/app/shared/model/captcha.model';


@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  APIURL: string = environment.APIURL_CAPTCHA;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  APIBODY = {
    "header": {
      "additionalProp1": "test",
      "additionalProp2": "test",
      "additionalProp3": "test"
    },
    "body": {
      "commonToken": "test"
    }
  }


  constructor(public http: HttpClient) { }



  //取得圖形驗證碼
  getCaptcha(): Observable<captcha> {
    return this.http.post<captcha>(this.APIURL, this.APIBODY, this.httpOptions).pipe(
      tap((response) => {
        console.log("getCaptcha", response);
        return response;
      }),
      // catchError(this.handleError)
    )
  }
}
