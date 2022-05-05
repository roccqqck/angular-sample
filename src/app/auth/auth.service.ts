import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  login() {
    //login api
    console.log('  login ')
    this.isLoggedIn=true;
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
