import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { F1003Service } from 'src/app/service/10/f1003.service';
import { FUNC_TWO_STEP_2 } from 'src/app/shared/constants/function.constants';
import { userValidator } from 'src/app/shared/util/check/user-validator.directive';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component implements OnInit {
  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    F1003登入代號變更-變更頁 component-form1
    declare variable
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  @Output() nextEvent = new EventEmitter<number>();
  f1003Form!: FormGroup;
  isSubmit: boolean = false;


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    constructor
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  constructor(
    private form: FormBuilder,//使用 FormBuilder 服務產生控制元件
    private f1003Service: F1003Service,
  ) { }


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    init
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  ngOnInit(): void {

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
        // console.log('輸入usrId:', value, "表單控制", this.f1003Form.controls['usrId'].value);
        this.f1003Service.setUsrId(value);
      })
    this.f1003Form.get('usrIdTip')?.valueChanges.subscribe(
      (value) => {
        // console.log('輸入usrIdTip:', value, "表單控制", this.f1003Form.controls['usrIdTip'].value);
        this.f1003Service.setUsrIdTip(value);
      })

  }

  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    customer validate
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  //檢核新舊usrId不能相同
  compareOldUsrId: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const usrId = control.get('usrId')?.value;
    const oldUsrId = this.f1003Service?.getOldUsrId();
    return usrId === oldUsrId ? { isIdCompare: { value: usrId } } : null;
  };
  //檢核usrId提示不能與usrId相同
  compareUsrTip: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const usrId = control.get('usrId')?.value;
    const usrIdTip = control.get('usrIdTip')?.value;
    return usrId === usrIdTip ? { isCompare: { value: usrId } } : null;
  };


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    submit & validate
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
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

    if (isValidate) {
      this.nextEvent.emit(FUNC_TWO_STEP_2);
    }
  }


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    set() & get()
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/

  get form1Data() {
    return {
      custName: this.f1003Service.getCustName(),
      oldUsrId: this.f1003Service.getOldUsrId(),
      lastModifyDttm: this.f1003Service.getLastModifyDttm()
    }
  };


  //formControl
  get usrIdCtrl() { return this.f1003Form.get('usrId')! as FormControl; }
  get usrIdTipCtrl() { return this.f1003Form.get('usrIdTip')! as FormControl; }
  get f() { return this.f1003Form.controls; }
}
