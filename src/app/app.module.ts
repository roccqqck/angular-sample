import { ComponentModule } from './shared/component/component.module';
import { LoginModule } from './pages/login/login.module';
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllComponent } from './all/all.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './pages/layout/footer/footer.component';
import { HeaderComponent } from './pages/layout/header/header.component';
import { MenuComponent } from './pages/layout/menu/menu.component';
import { SideMenuComponent } from './pages/layout/side-menu/side-menu.component';
import { SignInfoComponent } from './pages/layout/side-menu/sign-info/sign-info.component';
import { SideMenuListComponent } from './pages/layout/side-menu/side-menu-list/side-menu-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './service/login/login.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { F1003Module } from './pages/10/00/f1003/f1003.module';
import { F1004Module } from "./pages/10/00/f1004/f1004.module";
import { MainComponent } from './main/main.component';
import { c10Component } from './pages/10/c10.component';
import { ErrorInterceptor } from './shared/util/interceptor/error-interceptor';
import { BreadcrumbComponent } from './pages/layout/breadcrumb/breadcrumb.component';
import { SelectfontComponent } from './pages/layout/selectfont/selectfont.component';
import { C1000Component } from './pages/10/00/c1000.component';
import { MenuService } from './service/menu/menu.service';
import { SettingService } from './service/setting/setting.service';
import { F1005Module } from './pages/10/00/f1005/f1005.module';
import { DynamicPadService } from './shared/component/dynamic-pad/service/dynamic-pad.service';
import { FavoriteService } from './service/favorite/favorite.service';
import { DownloadCSVService } from './shared/component/download-csv/service/download-csv.service';
import { MenuDirective, ToggleMenuDirective } from './pages/layout/menu/menu.directive';
import { SelectfontDirective } from './pages/layout/selectfont/selectfont.directive';
import { SideMenuDirective } from './pages/layout/side-menu/side-menu.directive';
import { SecurityControlService } from './shared/component/securityControl/security-control.service';
import { SecurityControlModule } from './shared/component/securityControl/security-control.module';
import { F1002Component } from './pages/10/f1002/f1002.component';
import { F1021Module } from './pages/10/00/f1021/f1021.module';
import { ScriptService } from './service/script/script.service';
import { MaskNamePipe } from './shared/pipes/mask-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AllComponent,
    NotFoundComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    SideMenuComponent,
    SignInfoComponent,
    SideMenuListComponent,
    MainComponent,
    c10Component,
    BreadcrumbComponent,
    SelectfontComponent,
    C1000Component,
    MenuDirective,
    ToggleMenuDirective,
    SelectfontDirective,
    SideMenuDirective,
    F1002Component,
    MaskNamePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    F1003Module,
    F1004Module,
    F1005Module,
    F1021Module,
    LoginModule,
    ComponentModule,
    SecurityControlModule,
  ],
  providers: [
    Title,
    LoginService,
    MenuService,
    SettingService,
    DynamicPadService,
    FavoriteService,
    DownloadCSVService,
    SecurityControlService,
    ScriptService

    ,{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
