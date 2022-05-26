
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FnTitleComponent } from './fn-title/fn-title.component';
import { FnStepComponent } from './fn-step/fn-step.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicPadComponent } from './dynamic-pad/dynamic-pad.component';
import { DownloadCSVComponent } from './download-csv/download-csv.component';
import { FnGuidePageComponent } from './fn-guide-page/fn-guide-page.component';
import { SubTabsComponent } from './tab/sub-tabs/sub-tabs.component';
import { FormAttentionComponent } from './form/form-attention/form-attention.component';
import { FormErrorComponent } from './form/form-error/form-error.component';
import { FormLoadingComponent } from './form/form-loading/form-loading.component';
import { FormRowInputComponent } from './form/form-row-input/form-row-input.component';
import { FormRowReadonlyComponent } from './form/form-row-readonly/form-row-readonly.component';
import { FormRowSslComponent } from './form/form-row-ssl/form-row-ssl.component';
import { FormSuccessComponent } from './form/form-success/form-success.component';
import { FormTitleComponent } from './form/form-title/form-title.component';
import { ModalModule } from './modal/modal.module';
import { BtnTabsComponent } from './tab/btn-tabs/btn-tabs.component';
import { FormRowSelectComponent } from './form/form-row-select/form-row-select.component';
import { NgSelect2Module } from './ng-select2/ng-select2.module';
import { FnErrorPageComponent } from './fn-error-page/fn-error-page.component';




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
    FormRowSslComponent,
    DynamicPadComponent,
    DownloadCSVComponent,
    FnGuidePageComponent,
    SubTabsComponent,
    BtnTabsComponent,
    FormRowSelectComponent,
    FnErrorPageComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule,
    NgSelect2Module
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
    FormRowSslComponent,
    FnGuidePageComponent,
    SubTabsComponent,
    BtnTabsComponent,
    ModalModule,
    FormRowSelectComponent,
    NgSelect2Module,
    FnErrorPageComponent
  ]
})
export class ComponentModule { }
