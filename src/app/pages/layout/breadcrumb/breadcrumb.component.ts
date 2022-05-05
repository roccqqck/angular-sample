import { MenuService } from './../../../service/menu/menu.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map, Observable } from 'rxjs';
import { menus } from 'src/app/conf/menu/side-menu';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs$!: Observable<any>;
  lang = "";
  menus!: any[] ;
  labelTW = ""
  labelEN = ""

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private menuService: MenuService) {

  }
  ngOnInit(): void {
    this.menus=this.getMenus();
    this.lang = this.getCurrentLanguage();
    this.breadcrumbs$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      distinctUntilChanged(),
      map(() => {
        let root: ActivatedRoute = this.activatedRoute.root;
        return this.createBreadcrumbs(root);
      })
    );
  }




  createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: any = []): any {
    const children = route.firstChild;

    if (!children) {
      return [...breadcrumbs];
    }

    const routeURL: string = children.snapshot.url
      .map((segment) => segment.path)
      .join('/');
    // const labelTW = children.snapshot.data['breadcrumbTW'];
    // const labelEN = children.snapshot.data['breadcrumbEN'];

    if (routeURL !== '') {
      url += `/${routeURL}`;
    }
    // console.log("麵包屑 url:", url, ' routeURL:', routeURL)

    //依路徑取得對應麵包屑語言
    this.menuTranslate(url, menus);
    // console.log('麵包屑翻譯', this.labelTW, this.labelEN)

    const breadcrumb = {
      labelTW: this.labelTW,
      labelEN: this.labelEN,
      params: children.snapshot.params,
      url: url,
    };

    return this.createBreadcrumbs(children, url, [...breadcrumbs, breadcrumb]);
  }

  //翻譯
  menuTranslate(url: string, menu: any): any {
    menu.map((value: { link: string; text: string; textEn: string; node: [] }) => {
      if (value.link === url) {
        // console.log("翻譯 link:", value.link, " url:", url, "翻譯", value.text, value.textEn)
        this.labelTW = value.text
        this.labelEN = value.textEn
      } else if (value.link + "/" + value.link.replace(/\//g, '') + "view" === url) {
        this.labelTW = this.labelTW + " - 總覽"
        this.labelEN = this.labelEN + " - Overview"
      } else {
        if (value.node) {
          return this.menuTranslate(url, value.node);
        }
      }
    })
  }

  getMenus(){
    return this.menuService.getMenuList();
  }

  //從URL取得當前語言
  getCurrentLanguage() {
    return this.menuService.getCurrentLanguage();
  };

}
