import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
// import { url } from 'inspector';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError, retry, shareReplay, tap } from 'rxjs/operators';
import { Login } from 'src/app/shared/model/login.model';
import { environment } from 'src/environments/environment';




const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  })
};


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  results!: string;

  // APIURL="https://common-platform-apply.apps.devocp.firstbank.com.tw/common/createcaptcha";
  APIURL="/api/common/shared/v1/shared/createcaptcha";
  login!: Login;
  await: any;
  constructor(public http: HttpClient) {

  }

  run (){
    console.log("loginService run")
    // this.http.get(this.APIURL,{})
    // .subscribe(data=>console.log("登入service",data))

    // this.http.get(this.APIURL,{}).subscribe( res=>console.log("post方法",res))
  }

  getCaptchaImage(){
    // return this.http.get<Login>(this.APIURL,{}).subscribe( res=>res['clientResponse'].captchaImage
    // )
    // axios.post(this.APIURL).then(function(res){
    //   console.log(res.data);
    // })
    // console.log("service :" +this.http.get<Login>(this.APIURL))
   return   this.http.get<Login>(this.APIURL)
    // return this.results;
  }

  getCaptchaImageUrl():Observable<Login>{
    return this.http.post<Login>(this.APIURL,{}).pipe(
      tap((response) => {
        console.log("getCaptchaImageUrl",response);
        return response;
      })
    )
  }




}
function _api_URL(_api_URL: any) {
  throw new Error('Function not implemented.');
}

