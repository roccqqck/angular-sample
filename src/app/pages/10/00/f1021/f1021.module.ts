import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { F1021Component } from './f1021.component';
import { Form1Component } from './form1/form1.component';
import { Form2Component } from './form2/form2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from 'src/app/shared/component/component.module';
import { F1005Service } from 'src/app/service/10/f1005.service';
import { Form3Component } from './form3/form3.component';
import { SecurityControlModule } from 'src/app/shared/component/securityControl/security-control.module';



@NgModule({
  declarations: [
    F1021Component,
    Form1Component,
    Form2Component,
    Form3Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentModule,
    SecurityControlModule
  ],
  exports:[
    F1021Component
  ],
  providers:[F1005Service]
})
export class F1021Module { }
