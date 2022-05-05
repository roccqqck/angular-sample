import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

//檢核新資料不可與原資料相同
export function compareValidator(oldValue: String): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isCompare = control.value === oldValue;
    console.log("compareValidator"+isCompare)
    return isCompare ? { compareValidator: { value: control.value } } : null;
  };
}

@Directive({
  selector: '[appCompareValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CompareValidatorDirective, multi: true }]
})


export class CompareValidatorDirective implements Validator {
  @Input('appCompareValidator') compareValidator = ''
  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.compareValidator ? compareValidator(new String)(control)
      : null;
  }
}
