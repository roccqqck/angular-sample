import { ComponentModule } from '../../../../shared/component/component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { F1003Component } from './f1003.component';
import { Form1Component } from './form1/form1.component';
import { Form2Component } from './form2/form2.component';
import { ReactiveFormsModule } from '@angular/forms';
import { F1003Service } from 'src/app/service/10/f1003.service';




@NgModule({
  declarations: [
    F1003Component,
    Form1Component,
    Form2Component

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentModule
  ],
  exports:[
    F1003Component
  ],
  providers:[F1003Service]
})
export class F1003Module { }
