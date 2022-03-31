import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from 'src/app/shared/component/component.module';
import { F1004Component } from './f1004.component';
import { Form1Component } from './form1/form1.component';
import { Form2Component } from './form2/form2.component';
import { F1004Service } from 'src/app/service/10/f1004.service';



@NgModule({
  declarations: [
    F1004Component,
    Form1Component,
    Form2Component
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentModule
  ],
  exports:[
    F1004Component
  ],
  providers:[F1004Service]
})
export class F1004Module { }
