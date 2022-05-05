import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { ToggleActiveDirective } from './search-modal/toggle-active.directive';
import { AppModule } from 'src/app/app.module';



@NgModule({
  declarations: [
    ConfirmModalComponent,
    AlertModalComponent,
    SearchModalComponent,
    ToggleActiveDirective
  ],
  imports: [
    CommonModule,
    
  ],
  exports:[
    ConfirmModalComponent,
    AlertModalComponent,
    SearchModalComponent,
    ToggleActiveDirective
  ]
})
export class ModalModule { }
