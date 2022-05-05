import { CaptchaService } from './../../service/captcha/captcha.service';
import { Login } from '../../shared/model/login.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { userValidator } from 'src/app/shared/util/check/user-validator.directive';
import { firstValueFrom, Observable, Subscription, tap } from 'rxjs';
import { LoginService } from 'src/app/service/login/login.service';
import { captcha } from 'src/app/shared/model/captcha.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isLoading!: boolean;

  // captcha$!:Observable<Login>;
  captchaImage="";


  constructor(private form: FormBuilder,
    public captchaService:CaptchaService,
    private changeDectorRef:ChangeDetectorRef
    ) {

  }



   ngOnInit():void {
    this.getCaptchImage();

    this.loginForm = this.form.group({
      custId:[
        '',
        [Validators.required]
      ],
      usrId: [
        '',
        [Validators.required,
        // Validators.minLength(8),
        // Validators.maxLength(12),
        // Validators.pattern("^[a-zA-Z0-9][a-zA-Z0-9_]*[a-zA-Z0-9]$|^[a-zA-Z0-9]*$"),
        // userValidator("USER0002", ""),//第二個變數判斷要比對的功能
        ]
      ],//內建驗證器
      usrPwd: [
        '',
        [Validators.required,]
      ],
      verifyCode:[
        '',
        [Validators.required]
      ]
    })
  }




   //取得圖形驗證碼
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


  get custId() {return this.loginForm.get('custId')! as FormControl;}
  get usrId() { return this.loginForm.get('usrId')! as FormControl; }
  get usrPwd() { return this.loginForm.get('usrPwd')! as FormControl; }
  get verifyCode() { return this.loginForm.get('verifyCode')! as FormControl; }

}
