import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn, FormControl } from '@angular/forms';

//檢核不可連續四個遞增連號
export const increment4Validator: ValidatorFn = (control: AbstractControl) => {
  const fc = control.value
  const valuelength = fc.length - 3;
  // console.log("長度" + valuelength, fc)
  let isIncrement4 = false;
  let chi = ''
  console.log("increment4Validator" + isIncrement4)
  for (let i = 0; i < valuelength; i++) {
    let tag = 1
    for (let j = i ; j < i + 4; j++) {
      let fisrtASCII = fc.charCodeAt(j);
      let nextASCII = fc.charCodeAt(j + 1) - 1;
      if (fisrtASCII === nextASCII){
        tag++;
      }
    }
    if (tag >= 4) {
      isIncrement4 = true;
      return {
        increment4Validator: { value: control.value }
      }
    }
  }
  return null;
};


@Directive({
  selector: '[appIncrement4Validator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: Increment4ValidatorDirective, multi: true }]
})


export class Increment4ValidatorDirective implements Validator {
  @Input('appIncrement4Validator') continuous4Valid = ''
  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.continuous4Valid ? increment4Validator(control)
      : null;
  }
}



