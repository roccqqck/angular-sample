import { MenuService } from 'src/app/service/menu/menu.service';
import { PageMetaService } from './service/shared/page-meta.service';
import { Component, Inject } from '@angular/core';
import { WebStorageService } from './service/shared/web-storage.service';
import axios from 'axios';
import { SettingService } from './service/setting/setting.service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public constructor(
    @Inject(DOCUMENT) private document: Document,
    private PageMetaService: PageMetaService,
    private WebStorageService: WebStorageService){}

  ngOnInit(): void {
    this.PageMetaService.setTitle("iLeoBank");
    this.PageMetaService.addTag('第一銀行,FirstBank,iBank,iLeoBank,iLeo','', false);
    this.WebStorageService.setCookie("authToken","Test_Auth_Token");

    if(this.WebStorageService.getLocalStorage("channel") === "M" || this.WebStorageService.getLocalStorage("channel") === "L"){
      this.document.body.classList.add("mobileView");
      console.log('add mobileView')
    }else{
      this.document.body.classList.remove("mobileView");
      console.log('remove mobileView')
    }

  }

  title = "iLeoBank"

  print(){
    window.print();
  }

}
