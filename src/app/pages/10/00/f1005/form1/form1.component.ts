import { DynamicPadComponent } from './../../../../../shared/component/dynamic-pad/dynamic-pad.component';
import { DynamicPadService } from './../../../../../service/dynamicPad/dynamic-pad.service';
import { Component, Input, OnInit, ChangeDetectorRef, ViewChild, ComponentFactoryResolver, ViewContainerRef, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { userValidator } from 'src/app/shared/util/check/user-validator.directive';
import { F1005Service } from 'src/app/service/10/f1005.service';


@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component implements OnInit {
  @ViewChild(DynamicPadComponent, { read: ElementRef }) private dynamicPadElementRef!: ElementRef;


  form1Data = {
    custName: "",
    lastModifyDttm: ""
  };
  f1005Form!: FormGroup;
  isLoading: boolean = false;
  isSubmit: boolean = false;

  constructor(
    private form: FormBuilder,//使用 FormBuilder 服務產生控制元件
    private f1005Service: F1005Service,
    private changeDectorRef: ChangeDetectorRef,
    public dynamicPadService: DynamicPadService,
  ) {

  }

  ngOnInit(): void {


    //get data from f1004Service
    this.getFormData();
    this.f1005Form = this.form.group({
      oldSSL: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern("^[a-zA-Z0-9][a-zA-Z0-9_]*[a-zA-Z0-9]$|^[a-zA-Z0-9]*$"),
          userValidator()
        ]
      ],
      newSSL: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern("^[a-zA-Z0-9][a-zA-Z0-9_]*[a-zA-Z0-9]$|^[a-zA-Z0-9]*$"),
          userValidator()
        ]
      ],
      checkSSL: ['',
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


    this.f1005Form.get('oldSSL')?.valueChanges.subscribe(
      (value) => {
        this.f1005Service.setOldSSL(value);
      })
    this.f1005Form.get('newSSL')?.valueChanges.subscribe(
      (value) => {
        this.f1005Service.setNewSSL(value);
      })
    this.f1005Form.get('checkSSL')?.valueChanges.subscribe(
      (value) => {
        this.f1005Service.setCheckSSL(value);
      })

  }

  ngAfterViewInit() {
    this.dynamicPadService.navElement = this.dynamicPadElementRef.nativeElement;
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
    if (this.oldSSLCtrl.errors?.['required'] ||
      this.oldSSLCtrl.errors?.['minlength'] ||
      this.oldSSLCtrl.errors?.['maxlength'] ||
      this.oldSSLCtrl.errors?.['pattern'] ||
      this.f1005Form.errors?.['isIdCompare'] ||
      this.f1005Form.errors?.['isCompare'] ||
      this.oldSSLCtrl.errors?.['continuous4Validator'] ||
      this.oldSSLCtrl.errors?.['increment4Validator'] ||
      this.oldSSLCtrl.errors?.['decrease4Validator']) {
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
        this.f1005Service.setStep(2);
      }, 2000);
    }
  }

  //從servce，取得ＡＰＩ資料
  getFormData() {
    this.isLoading = true;
    console.log("form1 : getFormData() start")
    this.f1005Service.queryf1005().subscribe(
      (data) => {
        console.log("form1 : getFormData() end")

        this.isLoading = false;
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        this.form1Data = {
          custName: data.clientResponse.custName,
          lastModifyDttm: data.clientResponse.lastModifyDttm,
        }
        //暫存資料到service
        this.f1005Service.setCustName(data.clientResponse.custName);
        this.f1005Service.setLastModifyDttm(data.clientResponse.lastModifyDttm);

        //變化檢測>刷新畫面
        this.changeDectorRef.markForCheck();
        this.changeDectorRef.detectChanges();

      }, (error) => {
        this.isLoading = false;
      }

    )
  }




  //formControl
  get oldSSLCtrl() { return this.f1005Form.get('oldSSL')! as FormControl; }
  get newSSLCtrl() { return this.f1005Form.get('newSSL')! as FormControl; }
  get checkSSLCtrl() { return this.f1005Form.get('checkSSL')! as FormControl; }
  get f() { return this.f1005Form.controls; }
}
