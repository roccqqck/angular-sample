import { SettingService } from './../../../service/setting/setting.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { of } from 'rxjs';
import { MenuService } from 'src/app/service/menu/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  lang = "";
  menus: any[] = [];
  url = "";
  constructor(
    private router: ActivatedRoute,
    private menuServer: MenuService,
    private settingService:SettingService
  ) {

  }

  ngOnInit(): void {
    this.menus = this.getMenus();
    this.lang = this.getCurrentLanguage();

  }
  ngDoCheck(){
    // console.log("ngdocheck")
    this.getRoute();

  }

  getRoute() {
    const routeURL = this.router.firstChild?.snapshot.url
      .map((segment) => segment.path)
      .join('/');
    if (routeURL !== '') {
      this.url = `/${routeURL}`;
    }
    // console.log("menu get route", this.url,this.router.firstChild)
    this.menuServer.setCurrentMenu(this.url);

  }

  //漢堡選單展開/收合
  // changeBtnMenu(){
  //   if(this.settingService.hasClass("body","on")){
  //     this.settingService.removeClass("body","on");
  //   }else{
  //     this.settingService.addClass("body","on");
  //   }
  // }

  //moblie open
  // openBtnMenu(){
  //   if( !this.settingService.hasClass("body","on")){
  //     this.settingService.addClass("body","on");
  //   }
  // }


  getMenus() {
    return this.menuServer.getMenuList();
  }

  getCurrentLanguage() {
    return this.menuServer.getCurrentLanguage();
  };

}
