import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AllComponent } from './all/all.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {F1003Component} from './pages/f1003/f1003.component'

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'main', component: MainComponent},
  {path: 'all', component: AllComponent},
  {path: 'all2', component: AllComponent},
  {path: 'f1003', component: F1003Component},
  {path: 'PageNotFound', component: NotFoundComponent},
  {path: '**', redirectTo: 'PageNotFound'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
