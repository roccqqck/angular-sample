import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CryptoService {

  constructor() { }

  
  // **************************************************************
  //  AES
  // **************************************************************

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

  // **************************************************************
  //  資料加密標準(Data Encryption Standard):對稱密鑰加密
  //  DES(des、triple des)
  // **************************************************************

  /**
   * DES encrypt
   * @param text 
   * @param key 
   * @returns 
   */
  public desEncrypt(text: string, key:string) {
   
    const cipher = CryptoJS.DES.encrypt(text, key)
    return cipher.toString();
  }

  /**
   * DES decrypt
   * @param encryptText 
   * @param key 
   * @returns 
   */
  public desDecrypt(encryptText: string, key:string){

    const decrypt = CryptoJS.AES.decrypt(encryptText, key)
    return decrypt.toString();
  }

  /**
   * 3DES encrypt
   * @param text 
   * @param key 
   * @returns 
   */
  public tripleDesEncrypt(text: string, key:string) {
   
    const cipher = CryptoJS.TripleDES.encrypt(text, key)
    return cipher.toString();
  }

  /**
   * 3DES decrypt
   * @param encryptText 
   * @param key 
   * @returns 
   */
  public tripleDesDecrypt(encryptText: string, key:string){

    const decrypt = CryptoJS.TripleDES.decrypt(encryptText, key)
    return decrypt.toString();
  }

  // **************************************************************
  //  HASH(sha1、sha256、sha512)
  // **************************************************************

  /**
   * SHA1
   * @param text 
   * @returns 
   */
  public sha1(text: string) {
    const hash = CryptoJS.SHA1(text);
    return hash.toString();
  }

  /**
   * SHA256
   * @param text 
   * @returns 
   */
  public sha256(text: string){
    const hash = CryptoJS.SHA256(text);
    return hash.toString();
  }

  /**
   * SHA512
   * @param text 
   * @returns 
   */
  public sha512(text: string){
    const hash = CryptoJS.SHA512(text);
    return hash.toString();
  }

  // **************************************************************
  //  Base64
  // **************************************************************

  /**
   * any to Base64
   * @param text 
   * @returns 
   */
  public base64(text: any){
    return text.toString(CryptoJS.enc.Base64);
  }

  /**
   * SHA1 and return Base64
   * @param text 
   * @returns 
   */
  public b64_sha1(text: string){
    const hash = CryptoJS.SHA1(text);
    return hash.toString(CryptoJS.enc.Base64);
  }

  /**
   * SHA256 and return Base64
   * @param text 
   * @returns 
   */
     public b64_sha256(text: string){
      const hash = CryptoJS.SHA256(text);
      return hash.toString(CryptoJS.enc.Base64);
    }

    /**
   * SHA512 and return Base64
   * @param text 
   * @returns 
   */
     public b64_sha512(text: string){
      const hash = CryptoJS.SHA512(text);
      return hash.toString(CryptoJS.enc.Base64);
    }

 





}
