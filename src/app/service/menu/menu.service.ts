import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { menus } from 'src/app/conf/menu/side-menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
   menus: any[] = menus;
   currentMenu="";
   isOpen:boolean=false;

  constructor() {

    console.log("menuService start")
   }

  getMenuList(){
    // console.log("menuService 取得資料",menus)
    return menus;
  }

  getCurrentLanguage() {
    const lang = ['en', 'tw'];
    const currentLang = lang.find(l => new RegExp(`/${l}/`).test(window.location.pathname));
    if (!currentLang) {
      return 'tw';
    }
    return currentLang;
  };


  //取得方選單目前位置
  setCurrentMenu(menu: string){
    // console.log("service setCurrentMenu",menu )
    this.currentMenu=menu;
  }
  //依據上方選單顯示對應廁便選單
  getCurrentMenu(){
    // console.log("service getCurrentMenu",this.currentMenu)
    return  this.currentMenu;
  }

  setIsOpen(value:boolean){
    this.isOpen=value;
  }

  getIsOpen(){
    return this.isOpen;
  }


}


