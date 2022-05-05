import { Component, Input, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { userValidator } from 'src/app/shared/util/check/user-validator.directive';
import { F1004Service } from 'src/app/service/10/f1004.service';
import { convertStrToDateString } from 'src/app/shared/util/convertString';
import { countInt, countLo, countUp } from 'src/app/shared/util/common';
import { CryptoService } from 'src/app/service/shared/crypto.service';


@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component implements OnInit {
  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    F1004登入密碼變更-變更頁 component-form1
    declare variable
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  @Output() nextEvent = new EventEmitter<number>();
  f1004Form!: FormGroup;
  isSubmit: boolean = false;


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    constructor
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  constructor(
    private form: FormBuilder,//使用 FormBuilder 服務產生控制元件
    private f1004Service: F1004Service,
    private changeDectorRef: ChangeDetectorRef,
    private cryptoService:CryptoService
  ) {

  }

  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    init
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  ngOnInit(): void {
    console.log( this.cryptoService.b64_sha1("A12312312301qaz2wsx"))
    this.f1004Form = this.form.group({
      oldPd: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern("^[a-zA-Z0-9]*$"),
          userValidator()
        ]
      ],
      newPd: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern("^[a-zA-Z0-9]*$"),
          userValidator()
        ]
      ],
      checkPd: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern("^[a-zA-Z0-9]*$"),
          userValidator()
        ]
      ],
    },
      { validators: [this.compareNewPd, this.compareOldPd] }
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

  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    customer validate
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  //檢核新Pwd與確認Pwd需相同
  compareNewPd: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newPd = control.get('newPd')?.value;
    const checkPd = control.get('checkPd')?.value;
    return newPd !== checkPd ? { isCompareNew: { value: true } } : null;
  };
  //檢核新舊Pwd不能相同
  compareOldPd: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newPd = control.get('newPd')?.value;
    const oldPd = control.get('oldPd')?.value;
    return newPd === oldPd ? { isCompareOld: { value: true } } : null;
  };

  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    submit & validate
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  onValidate() {
    this.isSubmit = true;
    if (
      //old
      this.oldPdCtrl.errors?.['required'] ||
      this.oldPdCtrl.errors?.['minlength'] ||
      this.oldPdCtrl.errors?.['maxlength'] ||
      this.oldPdCtrl.errors?.['pattern'] ||
      this.oldPdCtrl.errors?.['continuous4Validator'] ||
      this.oldPdCtrl.errors?.['increment4Validator'] ||
      this.oldPdCtrl.errors?.['decrease4Validator'] ||
      //new
      this.newPdCtrl.errors?.['required'] ||
      this.newPdCtrl.errors?.['minlength'] ||
      this.newPdCtrl.errors?.['maxlength'] ||
      this.newPdCtrl.errors?.['pattern'] ||
      this.newPdCtrl.errors?.['continuous4Validator'] ||
      this.newPdCtrl.errors?.['increment4Validator'] ||
      this.newPdCtrl.errors?.['decrease4Validator'] ||
      this.f1004Form.errors?.['isCompareOld'] ||
      //check
      this.checkPdCtrl.errors?.['required'] ||
      this.checkPdCtrl.errors?.['minlength'] ||
      this.checkPdCtrl.errors?.['maxlength'] ||
      this.checkPdCtrl.errors?.['pattern'] ||
      this.checkPdCtrl.errors?.['continuous4Validator'] ||
      this.checkPdCtrl.errors?.['increment4Validator'] ||
      this.checkPdCtrl.errors?.['decrease4Validator'] ||
      this.f1004Form.errors?.['isCompareNew']
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
    this.f1004Service.setCountIntOld(countInt(this.f1004Form.get('oldPd')?.value));
    this.f1004Service.setCountLowerOld(countLo(this.f1004Form.get('oldPd')?.value));
    this.f1004Service.setCountUpperOld(countUp(this.f1004Form.get('oldPd')?.value));

    // 計算字母數量(大寫、小寫、數字)
    this.f1004Service.setCountInt(countInt(this.f1004Form.get('newPd')?.value));
    this.f1004Service.setCountLower(countLo(this.f1004Form.get('newPd')?.value));
    this.f1004Service.setCountUpper(countUp(this.f1004Form.get('newPd')?.value));

    //debug
    console.log("字母數量NEW：",this.f1004Service.getCountInt(),this.f1004Service.getCountLower(),this.f1004Service.getCountUpper())
    console.log("字母數量OLD：",this.f1004Service.getCountIntOld(),this.f1004Service.getCountLowerOld(),this.f1004Service.getCountUpperOld())

    if (isValidate) {

      // 檢核通過後，欄位加密
      this.f1004Service.setOldPd(this.cryptoService.b64_sha1("A1231231230"+this.f1004Form.get('oldPd')?.value));
      this.f1004Service.setNewPd(this.cryptoService.b64_sha1("A1231231230"+this.f1004Form.get('newPd')?.value));
      this.f1004Service.setCheckPd(this.cryptoService.b64_sha1("A1231231230"+this.f1004Form.get('checkPd')?.value));


      this.nextEvent.emit(2);
    }
  }



  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    set() & get()
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  get form1Data() {
    return {
      custName: this.f1004Service.getCustName(),
      lastModifyDttm: this.f1004Service.getLastModifyDttm()
    }
  };


  //formControl
  get oldPdCtrl() { return this.f1004Form.get('oldPd')! as FormControl; }
  get newPdCtrl() { return this.f1004Form.get('newPd')! as FormControl; }
  get checkPdCtrl() { return this.f1004Form.get('checkPd')! as FormControl; }
  get f() { return this.f1004Form.controls; }
}
