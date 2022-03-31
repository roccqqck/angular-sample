import { MenuService } from './../../../../service/menu/menu.service';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RouterLinkActive, RouterState } from '@angular/router';
import { SettingService } from 'src/app/service/setting/setting.service';

@Component({
  selector: 'app-side-menu-list',
  templateUrl: './side-menu-list.component.html',
  styleUrls: ['./side-menu-list.component.css']
})
export class SideMenuListComponent implements OnInit {
  lang = "";
  menus: any[] = [];
  currentMenu = "";
  constructor(
    private router: Router,
    private menuServer: MenuService,
    private settingService: SettingService) {
    // router info
    const state: RouterState = router.routerState;
    const root: ActivatedRoute = state.root;
    const child = root.firstChild;
    console.log(state)
      ;
  }
  ngOnInit(): void {
    this.menus = this.getMenus();
    this.lang = this.getCurrentLanguage();
  }
  getMenus() {
    return this.menuServer.getMenuList();
  }

  getCurrentLanguage() {
    return this.menuServer.getCurrentLanguage();
  };

  getCurrentMenu() {
    return this.menuServer.getCurrentMenu();
    // console.log("get current menu", this.currentMenu)
  }


  //漢堡選單展開/收合
  closeBtnMenu() {
    if (this.settingService.hasClass("body", "on")) {
      this.settingService.removeClass("body", "on");
    }
  }

}
