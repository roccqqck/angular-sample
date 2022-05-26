import { F1002Component } from './pages/10/f1002/f1002.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AllComponent } from './all/all.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F1003Component } from './pages/10/00/f1003/f1003.component'
import { AuthGuard } from './auth/auth.guard';
import { c10Component } from './pages/10/c10.component';
import { F1004Component } from './pages/10/00/f1004/f1004.component';
import { C1000Component } from './pages/10/00/c1000.component';
import { c10ViewComponent } from './pages/10/c10-view.component';
import { c1000ViewComponent } from './pages/10/00/c1000-view.component';
import { F1005Component } from './pages/10/00/f1005/f1005.component';
import { F1021Component } from './pages/10/00/f1021/f1021.component';
import { CanDeactivateGuard } from './auth/can-deactivateGuard.service';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'main', component: MainComponent },
  { path: 'all', component: AllComponent },
  { path: 'all2', component: AllComponent },
  { path: 'login', component: LoginComponent },//測試簡易登入
  {//帳戶總覽
    path: '01', component: c10Component,//帳戶總覽<router-outlet>
    children: [
      { path: '', redirectTo: '01view', pathMatch: 'full' },//導至default
      { path: '01view', component: c10ViewComponent },//-view
      {
        path: '00', component: C1000Component,//<router-outlet>
        children: [
          { path: '', redirectTo: '0100view', pathMatch: 'full' },//導至default
          { path: '0100view', component: c1000ViewComponent },
          { path: 'f1003', component: F1003Component, canActivate: [AuthGuard] },
          { path: 'f1004', component: F1004Component },
        ],
      },
    ],
  },
  {//臺幣服務
    path: '02', component: c10Component,//帳戶總覽<router-outlet>
    children: [
      { path: '', redirectTo: '02view', pathMatch: 'full' },//導至default
      { path: '02view', component: c10ViewComponent },//-view
      {
        path: '00', component: C1000Component,//<router-outlet>
        children: [
          { path: '', redirectTo: '0200view', pathMatch: 'full' },//導至default
          { path: '0200view', component: c1000ViewComponent },
          { path: 'f1003', component: F1003Component, canActivate: [AuthGuard] },
          { path: 'f1004', component: F1004Component },
        ],
      },
    ],
  },
  {//黃金存摺
    path: '15', component: c10Component,//帳戶總覽<router-outlet>
    children: [
      { path: '', redirectTo: '15view', pathMatch: 'full' },//導至default
      { path: '15view', component: c10ViewComponent },//-view
      {
        path: '00', component: C1000Component,//<router-outlet>
        children: [
          { path: '', redirectTo: '1500view', pathMatch: 'full' },//導至default
          { path: '1500view', component: c1000ViewComponent },
          { path: 'f1003', component: F1003Component, canActivate: [AuthGuard] },
          { path: 'f1004', component: F1004Component },
        ],
      },
    ],
  },
  {
    path: '10', component: c10Component,//個人化服務<router-outlet>
    children: [
      { path: '', redirectTo: '10view', pathMatch: 'full' },//導至default
      { path: '10view', component: c10ViewComponent },//個人化服務-view
      {
        path: '00', component: C1000Component,//個人化服務>安全設定<router-outlet>
        children: [
          { path: '', redirectTo: '1000view', pathMatch: 'full' },//導至default
          { path: '1000view', component: c1000ViewComponent },//個人化服務>安全設定-view
          { path: 'f1003', component: F1003Component ,canDeactivate:[CanDeactivateGuard]},//個人化服務>安全設定>登入代號變更
          { path: 'f1004', component: F1004Component },//個人化服務>安全設定>登入密碼變更
          { path: 'f1005', component: F1005Component },//個人化服務>安全設定>SSL交易密碼變更
          { path: 'f1021', component: F1021Component },//個人化服務>安全設定>存摺通提(取款)密碼變更

        ],
      },
      { path: 'f1002', component: F1002Component, pathMatch: 'full', canActivate: [AuthGuard],
        children: [
          { path: '00', component: F1002Component },//個人化服務>變更基本資料
        ]
      }
    ],
  },
  { path: 'PageNotFound', component: NotFoundComponent },
  { path: '**', redirectTo: 'PageNotFound' },// 萬用路徑，路由沒有比對到，永遠會執行
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true, scrollPositionRestoration: 'enabled',onSameUrlNavigation:'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
