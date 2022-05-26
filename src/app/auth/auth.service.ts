import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { delay, Observable, of, tap } from 'rxjs';
import { WebStorageService } from '../service/shared/web-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router :Router,
    private webStorageService:WebStorageService,
  ) { }
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  url: string = this.router.url;
  urlchannel:string="W"; //default channel W
  urltoken!:string;

  private token:string="";
  private custId:string="";
  private channel:string="";

  login() {
    //login api

    this.isLoggedIn=false;
    

  }



  logout(): void {
    this.isLoggedIn = false;
  }

  // getChannel(){
  //   this.activatedRoute.queryParams.subscribe(params =>{
  //     this.urlchannel= params['channel'];
  //     console.log("getChannel:",this.urlchannel)
  //     if(this.urlchannel){
  //       //有token存token到localstorage
  //       this.webStorageService.setLocalStorage("channel", this.urlchannel);
  //     }
  //   })
    
  //   return this.urlchannel;
  // }


  setToken(token:string){
    this.token = token;
  }
  setCustId(custId:string){
    this.custId = custId;
  }
  setChannel(channel:string){
    this.channel = channel;
  }

  getToken() { return this.token;}
  getCustId() { return this.custId;}
  getChannel() { return this.channel;}

}
