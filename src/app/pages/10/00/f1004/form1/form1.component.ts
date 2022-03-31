import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { userValidator } from 'src/app/shared/util/check/user-validator.directive';
import { F1004Service } from 'src/app/service/10/f1004.service';


@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component implements OnInit {


  form1Data = {
    custName: "",
    lastModifyDttm: ""
  };
  f1004Form!: FormGroup;
  isLoading: boolean = false;
  isSubmit: boolean = false;

  constructor(
    private form: FormBuilder,//使用 FormBuilder 服務產生控制元件
    private f1004Service: F1004Service,
    private changeDectorRef: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    //get data from f1004Service
    this.getFormData();
    this.f1004Form = this.form.group({
      oldPd: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern("^[a-zA-Z0-9][a-zA-Z0-9_]*[a-zA-Z0-9]$|^[a-zA-Z0-9]*$"),
          userValidator()
        ]
      ],
      newPd: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern("^[a-zA-Z0-9][a-zA-Z0-9_]*[a-zA-Z0-9]$|^[a-zA-Z0-9]*$"),
          userValidator()
        ]
      ],
      checkPd: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern("^[a-zA-Z0-9][a-zA-Z0-9_]*[a-zA-Z0-9]$|^[a-zA-Z0-9]*$"),
          userValidator()
        ]
      ],
    },
      { validators: [this.compareCheckPd, this.compareNewPd] }
    );


    this.f1004Form.get('oldPd')?.valueChanges.subscribe(
      (value) => {
        this.f1004Service.setOldPd(value);
      })
    this.f1004Form.get('newPd')?.valueChanges.subscribe(
      (value) => {
        this.f1004Service.setNewPd(value);
      })
    this.f1004Form.get('checkPd')?.valueChanges.subscribe(
      (value) => {
        this.f1004Service.setCheckPd(value);
      })
  }

  //自定義交叉驗證
  //新、檢查需相同
  compareCheckPd: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newPd = control.get('newPd')?.value;
    const checkPd = control.get('checkPd')?.value;
    return newPd === checkPd ? { isCompare1: { value: true } } : null;
  };
  //新、舊需相同
  compareNewPd: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newPd = control.get('newPd')?.value;
    const oldPd = control.get('oldPd')?.value;
    return newPd === oldPd ? { isCompare2: { value: true } } : null;
  };

  //表單送出時驗證
  onValidate() {
    this.isSubmit = true;
    if (this.oldPdCtrl.errors?.['required'] ||
      this.oldPdCtrl.errors?.['minlength'] ||
      this.oldPdCtrl.errors?.['maxlength'] ||
      this.oldPdCtrl.errors?.['pattern'] ||
      this.f1004Form.errors?.['isIdCompare'] ||
      this.f1004Form.errors?.['isCompare'] ||
      this.oldPdCtrl.errors?.['continuous4Validator'] ||
      this.oldPdCtrl.errors?.['increment4Validator'] ||
      this.oldPdCtrl.errors?.['decrease4Validator']) {
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
        this.f1004Service.setStep(2);
      }, 2000);
    }
  }

  //從servce，取得ＡＰＩ資料
  getFormData(){
    this.isLoading=true;
    console.log("form1 : getFormData() start")
    this.f1004Service.queryf1004().subscribe(
      (data)=>{
        console.log("form1 : getFormData() end")

        this.isLoading=false;
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        this.form1Data={
          custName: data.clientResponse.custName,
          lastModifyDttm: data.clientResponse.lastModifyDttm,
        }
        //暫存資料到service
        this.f1004Service.setCustName(data.clientResponse.custName);
        this.f1004Service.setLastModifyDttm(data.clientResponse.lastModifyDttm);

        //變化檢測>刷新畫面
        this.changeDectorRef.markForCheck();
        this.changeDectorRef.detectChanges();

      },(error)=>{
        this.isLoading=false;
      }

    )
  }





  //formControl
  get oldPdCtrl() { return this.f1004Form.get('oldPd')! as FormControl; }
  get newPdCtrl() { return this.f1004Form.get('newPd')! as FormControl; }
  get checkPdCtrl() { return this.f1004Form.get('checkPd')! as FormControl; }
  get f() { return this.f1004Form.controls; }
}
