import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllComponent } from './all/all.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { F1003Component } from './pages/f1003/f1003.component';
import { FooterComponent } from './pages/layout/footer/footer.component';
import { HeaderComponent } from './pages/layout/header/header.component';
import { MenuComponent } from './pages/layout/menu/menu.component';
import { SideMenuComponent } from './pages/layout/side-menu/side-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    AllComponent,
    NotFoundComponent,
    F1003Component,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    SideMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
