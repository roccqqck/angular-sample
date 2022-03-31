
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FnTitleComponent } from './fn-title/fn-title.component';
import { FnStepComponent } from './fn-step/fn-step.component';
import { FormAttentionComponent } from './form-attention/form-attention.component';
import { FormRowInputComponent } from './form-row-input/form-row-input.component';
import { FormRowReadonlyComponent } from './form-row-readonly/form-row-readonly.component';
import { FormTitleComponent } from './form-title/form-title.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormSuccessComponent } from './form-success/form-success.component';
import { FormErrorComponent } from './form-error/form-error.component';
import { FormLoadingComponent } from './form-loading/form-loading.component';
import { DynamicPadComponent } from './dynamic-pad/dynamic-pad.component';
import { FormRowSslComponent } from './form-row-ssl/form-row-ssl.component';



@NgModule({
  declarations: [
    FnTitleComponent,
    FnStepComponent,
    FormAttentionComponent,
    FormRowInputComponent,
    FormRowReadonlyComponent,
    FormTitleComponent,
    FormSuccessComponent,
    FormErrorComponent,
    FormLoadingComponent,
    DynamicPadComponent,
    FormRowSslComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    FnTitleComponent,
    FnStepComponent,
    FormAttentionComponent,
    FormRowInputComponent,
    FormRowReadonlyComponent,
    FormTitleComponent,
    FormSuccessComponent,
    FormErrorComponent,
    FormLoadingComponent,
    DynamicPadComponent,
    FormRowSslComponent
  ]
})
export class ComponentModule { }
