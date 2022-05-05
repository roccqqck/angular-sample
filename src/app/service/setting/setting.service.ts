import { WebStorageService } from './../shared/web-storage.service';
import { Inject, Injectable, QueryList } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  fontSize="16px"

  constructor(@Inject(DOCUMENT) private document:any) { }


  setCss(element: any, attribute: string | number, value: any) {
    this.document.querySelector(element).style[attribute] = value;
  }

  addClass(element: any, c: string | number){
    this.document.querySelector(element).classList.add(c);
  }

  removeClass(element: any, c: string | number){
    this.document.querySelector(element).classList.remove(c);
  }

  hasClass(element: any, c: string | number){
    return this.document.querySelector(element).classList.contains(c);
  }

  //設定文字大小
  setSelectFontText(text:string){
    console.log("設定文字大小 bbbb")
    this.document.getElementById('selectFont').firstChild.childNodes[1].textContent=text;
  }
  getFontSize(){
    return this.fontSize;
  }

}
