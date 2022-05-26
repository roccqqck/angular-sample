import { WebStorageService } from './../service/shared/web-storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private webStorageService: WebStorageService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
    const url: string = state.url;
    console.log("url:"+ url)

    const urlchannel = route.queryParams['channel'];
    if(urlchannel){
      //有token存token到localstorage
      this.webStorageService.setLocalStorage("channel", urlchannel);
    }


    //網址中取token
    const urltoken = route.queryParams['token'];
    if(urltoken){
      //有token存token到localstorage
      this.webStorageService.setLocalStorage("token", urltoken);
    }

    const accessToken = this.webStorageService.getLocalStorage("token");
    // console.log("accessToken", accessToken)

    //這邊看看是否要多驗證token有效性
    //...................
    //這邊看看是否要多驗證token有效性


    if(!accessToken){
      this.webStorageService.setSessionStorage("deeplink", url);
      // this.router.navigateByUrl('/login');
      this.router.navigate(['/login'],{
        queryParams:{
          return: state.url
        }
      })
      return false;
    }

    const deeplink = this.webStorageService.getSessionStorage("deeplink");
    if(deeplink){
      this.webStorageService.removeSessionStorage("deeplink");
      this.router.navigateByUrl(deeplink);
    }

    return true


    // console.log("登入狀態"+this.authService.isLoggedIn)
    // console.log("登入中")
    // this.authService.login()
    // console.log("登入結果："+this.authService.isLoggedIn)

    // return this.checkLogin(url);

  }

  checkLogin(url: string): true | UrlTree {
    if (this.authService.isLoggedIn) {
       return true; 
    }else{
      console.log("checkLogin isLoggedIn:",this.authService.isLoggedIn)
      // Store the attempted URL for redirecting
      this.authService.redirectUrl = url;
  
      // Redirect to the login page
      return this.router.parseUrl('/login');
    }
  }
}
