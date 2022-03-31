import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CryptoService {

  constructor() { }

  public aesEncrypt(text: string) {
    const key = CryptoJS.enc.Utf8.parse(environment.AES_KEY);
    const iv = CryptoJS.enc.Utf8.parse(environment.AES_IV);
    const cipher = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    })
    return cipher.toString();
  }

  public aesDecrypt(text: string){
    const key = CryptoJS.enc.Utf8.parse(environment.AES_KEY);
    const iv = CryptoJS.enc.Utf8.parse(environment.AES_IV);
    const decrypt = CryptoJS.AES.decrypt(text, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    })
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }

}
