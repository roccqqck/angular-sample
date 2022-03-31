import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { F1003Service } from 'src/app/service/10/f1003.service';
import { userValidator } from 'src/app/shared/util/check/user-validator.directive';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component implements OnInit {

  form1Data = {
    custName: "",
    lastModifyDttm: "",
    oldUsrId: ""
  };
  f1003Form!: FormGroup;
  isLoading: boolean = false;
  isSubmit: boolean = false;

  constructor(
    private form: FormBuilder,//使用 FormBuilder 服務產生控制元件
    private f1003Service: F1003Service,
    private changeDectorRef: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    //get data from f1003service
    this.getFormData();
    this.f1003Form = this.form.group({
      usrId: ['',
        [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
        Validators.pattern("^[a-zA-Z0-9][a-zA-Z0-9_]*[a-zA-Z0-9]$|^[a-zA-Z0-9]*$"),
        userValidator()
        ]
      ],
      usrIdTip: [''],
    },
      { validators: [this.compareOldUsrId, this.compareUsrTip] }
    );


    this.f1003Form.get('usrId')?.valueChanges.subscribe(
      (value) => {
        console.log('輸入usrId:', value, "表單控制", this.f1003Form.controls['usrId'].value);
        this.f1003Service.setUsrId(value);
      })
    this.f1003Form.get('usrIdTip')?.valueChanges.subscribe(
      (value) => {
        console.log('輸入usrIdTip:', value, "表單控制", this.f1003Form.controls['usrIdTip'].value);
        this.f1003Service.setUsrIdTip(value);
      })
  }

  //自定義交叉驗證
  compareOldUsrId: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const usrId = control.get('usrId')?.value;
    const oldUsrId = this.f1003Service?.getOldUsrId();
    return usrId === oldUsrId ? { isIdCompare: { value: usrId } } : null;
  };
  compareUsrTip: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const usrId = control.get('usrId')?.value;
    const usrIdTip = control.get('usrIdTip')?.value;
    return usrId === usrIdTip ? { isCompare: { value: usrId } } : null;
  };

  //表單送出時驗證
  onValidate() {
    this.isSubmit = true;
    if (this.usrIdCtrl.errors?.['required'] ||
      this.usrIdCtrl.errors?.['minlength'] ||
      this.usrIdCtrl.errors?.['maxlength'] ||
      this.usrIdCtrl.errors?.['pattern'] ||
      this.f1003Form.errors?.['isIdCompare'] ||
      this.f1003Form.errors?.['isCompare'] ||
      this.usrIdCtrl.errors?.['continuous4Validator'] ||
      this.usrIdCtrl.errors?.['increment4Validator'] ||
      this.usrIdCtrl.errors?.['decrease4Validator']) {
      return false;
    } else {
      return true;
    }
  }

  //下一步
  goNext() {
    //欄位檢核
    const isValidate = this.onValidate();
    //process
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    if (isValidate) {
      this.isLoading = true;
      //模擬打API等待時間
      setTimeout(() => {
        console.log("test Waited For: " + 3 + " seconds");
        this.isLoading = false;
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        this.f1003Service.setStep(2);
      }, 2000);
    }
  }

  //從servce，取得API資料
  getFormData() {
    this.isLoading = true;
    this.f1003Service.queryf1003().subscribe(
      (data) => {
        this.isLoading = false;
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        this.form1Data = {
          custName: data.clientResponse.custName,
          lastModifyDttm: data.clientResponse.lastModifyDttm,
          oldUsrId: data.clientResponse.usrId
        }
        //暫存資料到service
        this.f1003Service.setCustName(data.clientResponse.custName);
        this.f1003Service.setLastModifyDttm(data.clientResponse.lastModifyDttm);
        this.f1003Service.setOldUsrId(data.clientResponse.usrId);

        //變化檢測>刷新畫面
        this.changeDectorRef.markForCheck();
        this.changeDectorRef.detectChanges();

      }

    )
  }





  //formControl
  get usrIdCtrl() { return this.f1003Form.get('usrId')! as FormControl; }
  get usrIdTipCtrl() { return this.f1003Form.get('usrIdTip')! as FormControl; }
  get f() { return this.f1003Form.controls; }
}
