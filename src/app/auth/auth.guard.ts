import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
    const url: string = state.url;
    console.log("url:"+ url)
    console.log("登入狀態"+this.authService.isLoggedIn)
    console.log("登入中")
    this.authService.login()
    console.log("登入成功："+this.authService.isLoggedIn)

    return this.checkLogin(url);

  }

  checkLogin(url: string): true | UrlTree {
    if (this.authService.isLoggedIn) { return true; }
    console.log(this.authService.isLoggedIn)
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Redirect to the login page
    return this.router.parseUrl('/login');

  }
}
