import { ComponentModule } from 'src/app/shared/component/component.module';
import { SSLComponent } from './ssl/ssl.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceBindingComponent } from './device-binding/device-binding.component';
import { FXMLComponent } from './fxml/fxml.component';
import { OneTouchComponent } from './one-touch/one-touch.component';
import { OtpComponent } from './otp/otp.component';
import { CardComponent } from './card/card.component';
import { SecurityControlComponent } from './security-control.component';
import { DynamicPadService } from '../dynamic-pad/service/dynamic-pad.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecurityControlService } from './security-control.service';



@NgModule({
  declarations: [
    DeviceBindingComponent,
    FXMLComponent,
    OneTouchComponent,
    OtpComponent,
    SSLComponent,
    CardComponent,
    SecurityControlComponent,

  ],
  imports: [
    FormsModule,
    CommonModule,
    ComponentModule,
    ReactiveFormsModule
  ],
  exports:[
    SecurityControlComponent
  ],
  providers: [
    
  ]
})
export class SecurityControlModule { }
