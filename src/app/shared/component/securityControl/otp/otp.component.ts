import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CaptchaService } from 'src/app/service/captcha/captcha.service';
import { DynamicPadComponent } from '../../dynamic-pad/dynamic-pad.component';
import { DynamicPadService } from '../../dynamic-pad/service/dynamic-pad.service';
import { SecurityControlService } from '../security-control.service';

@Component({
  selector: 'security-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  inputType: string = "password" //html input type: text/password
  @ViewChild(DynamicPadComponent, { read: ElementRef }) private dynamicPadElementRef!: ElementRef;
  otpForm!: FormGroup;
  captchaImage!:any;
  isLoading!: boolean;

  
  constructor(
    private form: FormBuilder,//使用 FormBuilder 服務產生控制元件
    public dynamicPadService: DynamicPadService,
    private captchaService:CaptchaService,
    private changeDectorRef:ChangeDetectorRef,
    private securityControlService:SecurityControlService
  ) { }

  ngOnInit(): void {
    this.getCaptchImage();

    this.otpForm = this.form.group({
      otpSecurity:['',[]],
      otpCaptcha:['',[]]
    });
    this.otpForm.get('otpSecurity')?.valueChanges.subscribe(
      (value)=>{
        this.securityControlService.setOtpValue(value);
        console.log(value)
      }
    )
    this.otpForm.get('otpCaptcha')?.valueChanges.subscribe(
      (value)=>{
        this.securityControlService.setOtpValue(value);
        console.log(value)
      }
    )
  }

  ngAfterViewInit() {
    this.dynamicPadService.navElement = this.dynamicPadElementRef.nativeElement;
  }

  ngDoCheck() {
    // console.log("ngdocheck")
    if (document.getElementById("otpSecurity")) {
      if ((document.getElementById("otpSecurity") as HTMLInputElement).value != this.otpForm.controls["otpSecurity"].value) {
        this.otpForm.get("otpSecurity")?.setValue((document.getElementById("otpSecurity") as HTMLInputElement).value);
        this.securityControlService.setOtpValue(this.otpForm.get("otpSecurity")?.value)
      }
    }
  }


   //顯示/隱藏字串
   onChange() {
    this.inputType = this.inputType == "text" ? "password" : "text";
  }

  getCaptchImage(){
    this.isLoading=true;
    this.captchaService.getCaptcha().subscribe(
      (data)=>{
        console.log("取得圖形驗證碼資料:",data)
        this.isLoading=false;
        this.captchaImage= data.clientResponse.captchaImage;

        //變化檢測>刷新畫面
        this.changeDectorRef.markForCheck();
        this.changeDectorRef.detectChanges();

      }

    )
  }


}
