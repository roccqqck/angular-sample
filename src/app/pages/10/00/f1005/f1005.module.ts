import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from 'src/app/shared/component/component.module';
import { F1005Component } from './f1005.component';
import { Form1Component } from './form1/form1.component';
import { Form2Component } from './form2/form2.component';
import { F1005Service } from 'src/app/service/10/f1005.service';



@NgModule({
  declarations: [
    F1005Component,
    Form1Component,
    Form2Component,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentModule
  ],
  exports:[
    F1005Component
  ],
  providers:[F1005Service]
})
export class F1005Module { }
