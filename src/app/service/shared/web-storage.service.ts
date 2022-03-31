import { Injectable } from '@angular/core';
import { CryptoService } from './crypto.service';
@Injectable({
  providedIn: 'root'
})
export class WebStorageService {

  constructor(private CryptoService: CryptoService) { }

  public setCookie(cookieName: string, cookieValue: string, cookieDeadTime?: string){
    let cookieString = "";
    if(cookieDeadTime){
      cookieString = cookieName + "=" + cookieValue + ";" + cookieDeadTime + ";path=/";
    }else{
      // let dt = new Date();
      // dt.setHours(23);
      // dt.setMinutes(59);
      // dt.setSeconds(59);
      // dt.setMilliseconds(59);
      // let expires = "expires=" + dt.toUTCString();

      let cookieHours = 12;//設定cookie存活小時數
      let date = new Date();
      date.setTime(date.getTime()+(cookieHours*60*60*1000));
      var expires = "; expires="+date.toUTCString();
      cookieString = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    }
    console.log("cookieString", cookieString);
    document.cookie = cookieString;

  }

  public getCookie(key: string){
    let name = key + "=";
    let decodeCookie = decodeURIComponent(document.cookie);
    let ca = decodeCookie.split(';');
    for(let i = 0; i< ca.length; i++){
      let c = ca[i];
      while(c.charAt(0) == '　'){
        c = c.substring(1);
      }
      if(c.indexOf(name) == 0){
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  public setLocalStorage(lsKey: string, lsValue: string){
    console.log("setLocalStorage [" + lsKey + "] ==> " + lsValue)
    let _aesValue = this.CryptoService.aesEncrypt(lsValue);
    localStorage.setItem(lsKey, _aesValue);

  }

  public getLocalStorage(lsKey: string){
    let _aesValue =  localStorage.getItem(lsKey);
    if(_aesValue){
      return this.CryptoService.aesDecrypt(_aesValue);
    }else{
      return "";
    }

  }

  public setSessionStorage(ssKey: string, ssValue: string){
    console.log("setSessionStorage [" + ssKey + "] ==> " + ssValue)
    let _aesValue = this.CryptoService.aesEncrypt(ssValue);
    sessionStorage.setItem(ssKey, _aesValue);
  }

  public getSessionStorage(ssKey: string){
    let _aesValue =  sessionStorage.getItem(ssKey);
    console.log("_aesValue ==> " , _aesValue)
    if(_aesValue){
      return this.CryptoService.aesDecrypt(_aesValue);
    }else{
      return "";
    }
  }
}
