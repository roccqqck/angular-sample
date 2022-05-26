import { DynamicPadComponent } from './../../../../../shared/component/dynamic-pad/dynamic-pad.component';
import { DynamicPadService } from '../../../../../shared/component/dynamic-pad/service/dynamic-pad.service';
import { Component, Input, OnInit, ChangeDetectorRef, ViewChild, ComponentFactoryResolver, ViewContainerRef, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { userValidator } from 'src/app/shared/util/check/user-validator.directive';
import { F1005Service } from 'src/app/service/10/f1005.service';
import { countInt } from 'src/app/shared/util/common';
import { CryptoService } from 'src/app/service/shared/crypto.service';
import { FUNC_TWO_STEP_2 } from 'src/app/shared/constants/function.constants';


@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component implements OnInit {
  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    F1005 SSL交易密碼變更-變更頁 component-form1
    declare variable
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  @ViewChild(DynamicPadComponent, { read: ElementRef }) private dynamicPadElementRef!: ElementRef;
  @Output() nextEvent = new EventEmitter<number>();
  f1005Form!: FormGroup;
  isSubmit: boolean = false;



  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    constructor
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  constructor(
    private form: FormBuilder,//使用 FormBuilder 服務產生控制元件
    private f1005Service: F1005Service,
    public dynamicPadService: DynamicPadService,
    private cryptoService:CryptoService
  ) {}



  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    init
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  ngOnInit(): void {
    // console.log( B64_SHA1("88888888")+"=")
    this.f1005Form = this.form.group({
      oldSSL: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern("^[0-9]*$"),
          userValidator()
        ]
      ],
      newSSL: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern("^[0-9]*$"),
          userValidator()
        ]
      ],
      checkSSL: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern("^[0-9]*$"),
          userValidator()
        ]
      ],
    },
      { validators: [this.compareCheckSSL, this.compareNewSSL] }
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


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    customer validate
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  //檢核新SSL與確認SSL需相同
  compareCheckSSL: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newSSL = control.get('newSSL')?.value;
    const checkSSL = control.get('checkSSL')?.value;
    return (newSSL !== checkSSL && (newSSL!="" && checkSSL!="")) ? { isCompareNew: { value: true } } : null;
  };
  //檢查新舊SSL不能相同
  compareNewSSL: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newSSL = control.get('newSSL')?.value;
    const oldSSL = control.get('oldSSL')?.value;
    return (newSSL === oldSSL && (newSSL!="" && oldSSL!="")) ?  { isCompareOld: { value: true } } : null;
  };


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    submit & validate
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  onValidate() {
    this.isSubmit = true;
    if (
            //old
            this.oldSSLCtrl.errors?.['required'] ||
            this.oldSSLCtrl.errors?.['minlength'] ||
            this.oldSSLCtrl.errors?.['maxlength'] ||
            this.oldSSLCtrl.errors?.['pattern'] ||
            this.oldSSLCtrl.errors?.['continuous4Validator'] ||
            this.oldSSLCtrl.errors?.['increment4Validator'] ||
            this.oldSSLCtrl.errors?.['decrease4Validator'] ||
            //new
            this.newSSLCtrl.errors?.['required'] ||
            this.newSSLCtrl.errors?.['minlength'] ||
            this.newSSLCtrl.errors?.['maxlength'] ||
            this.newSSLCtrl.errors?.['pattern'] ||
            this.newSSLCtrl.errors?.['continuous4Validator'] ||
            this.newSSLCtrl.errors?.['increment4Validator'] ||
            this.newSSLCtrl.errors?.['decrease4Validator'] ||
            this.f1005Form.errors?.['isCompareOld'] ||
            //check
            this.checkSSLCtrl.errors?.['required'] ||
            this.checkSSLCtrl.errors?.['minlength'] ||
            this.checkSSLCtrl.errors?.['maxlength'] ||
            this.checkSSLCtrl.errors?.['pattern'] ||
            this.checkSSLCtrl.errors?.['continuous4Validator'] ||
            this.checkSSLCtrl.errors?.['increment4Validator'] ||
            this.checkSSLCtrl.errors?.['decrease4Validator'] ||
            this.f1005Form.errors?.['isCompareNew']
    ) {
      return false;
    } else {
      return true;
    }
  }

  //下一步
  goNext() {
    //欄位檢核
    const isValidate = this.onValidate();

    // 計算字母數量(大寫、小寫、數字) for error page display
    this.f1005Service.setCountIntOld(countInt(this.f1005Form.get('oldSSL')?.value));

    // 計算字母數量(大寫、小寫、數字)
    this.f1005Service.setCountInt(countInt(this.f1005Form.get('newSSL')?.value));

    //go to step 2
    if(true){//方便測試暫時不檢核

      // 檢核通過後，欄位加密
      this.f1005Service.setOldSSL(this.cryptoService.b64_sha1(this.f1005Form.get('oldSSL')?.value));
      this.f1005Service.setNewSSL(this.cryptoService.b64_sha1(this.f1005Form.get('newSSL')?.value));
      this.f1005Service.setCheckSSL(this.cryptoService.b64_sha1(this.f1005Form.get('checkSSL')?.value));

      this.nextEvent.emit(FUNC_TWO_STEP_2);
    }

  }


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    set() & get()
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/

  get form1Data() {
    return {
      custName: this.f1005Service.getCustName(),
      lastModifyDttm: this.f1005Service.getLastModifyDttm()
    }
  };


  //formControl
  get oldSSLCtrl() { return this.f1005Form.get('oldSSL')! as FormControl; }
  get newSSLCtrl() { return this.f1005Form.get('newSSL')! as FormControl; }
  get checkSSLCtrl() { return this.f1005Form.get('checkSSL')! as FormControl; }
  get f() { return this.f1005Form.controls; }
}


