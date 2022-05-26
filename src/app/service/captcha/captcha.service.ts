import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { captcha } from 'src/app/shared/model/captcha.model';
import { API_COMMON_CREATECAPTCHA, API_SETTING_HTTPOPTIONS } from 'src/app/shared/constants/api.constants'


@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  APIURL: string = "/api/common/shared/v1/shared/createcaptcha";


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


  constructor(
    public http: HttpClient
  ) { }



  //取得圖形驗證碼
  getCaptcha(): Observable<captcha> {
    return this.http.post<captcha>(API_COMMON_CREATECAPTCHA, this.APIBODY, API_SETTING_HTTPOPTIONS).pipe(
      tap((response) => {
        console.log("getCaptcha", response);
        return response;
      }),
      // catchError(this.handleError)
    )
  }
}
