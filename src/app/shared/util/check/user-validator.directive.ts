import { NgPlural } from '@angular/common';
import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn, FormControl } from '@angular/forms';



// export const userValidator: ValidatorFn = (control: AbstractControl) => {
//   const fc = control.value
//   const valuelength = fc.length - 3;

//   const isContinuous4 = continuous4Validator(fc, valuelength);//檢核不可連續四個重複
//   const isIncrement4V = increment4Validator(fc, valuelength);//檢核不可連續四個遞增連號
//   const isDecrease4 = decrease4Validator(fc, valuelength);//檢核不可連續四個遞增連號

//   if (isContinuous4) {
//     return isContinuous4;
//   } else if (isIncrement4V) {
//     return isIncrement4V;
//   } else if (isDecrease4) {
//     return isDecrease4;
//   }

//   //success
//   return null;
// };



export function userValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const fc = control.value
    const valuelength = fc.length - 3;

    const isContinuous4 = continuous4Validator(fc, valuelength);//檢核不可連續四個重複
    const isIncrement4V = increment4Validator(fc, valuelength);//檢核不可連續四個遞增連號
    const isDecrease4 = decrease4Validator(fc, valuelength);//檢核不可連續四個遞增連號


    // sequence check
    if (isContinuous4) {
      return isContinuous4;
    } else if (isIncrement4V) {
      return isIncrement4V;
    } else if (isDecrease4) {
      return isDecrease4;
    } else {
      return null;
    }
  };
}

@Directive({
  selector: '[appUserValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: UserValidatorDirective, multi: true }]
})


export class UserValidatorDirective implements Validator {
  @Input('appUserValidator') continuous4Valid = ''
  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.continuous4Valid ? userValidator()
      : null;
  }

}

// ======================================================================================
// userValidator
// ======================================================================================
//不可連續四個重複
function continuous4Validator(fc: String, valuelength: number) {
  let chi = ''
  // console.log("continuous4Validator" + isContinuous4)
  for (let i = 0; i < valuelength; i++) {
    let tag = 1
    chi = fc.charAt(i);
    // console.log("chi", chi);
    for (let j = i + 1; j < i + 4; j++) {
      if (chi == fc.charAt(j)) {
        // console.log("chi2", chi)
        // console.log("tag", tag)
        tag++
      }
    }
    if (tag >= 4) {
      return {
        continuous4Validator: { value: fc }

      }
    }
  }
  return null;
}
// ======================================================================================
//不可連續四個遞增連號
function increment4Validator(fc: String, valuelength: number) {
  let chi = ''
  // console.log("increment4Validator" + isIncrement4)
  for (let i = 0; i < valuelength; i++) {
    let tag = 1
    for (let j = i; j < i + 4; j++) {
      let fisrtASCII = fc.charCodeAt(j);
      let nextASCII = fc.charCodeAt(j + 1) - 1;
      if (fisrtASCII === nextASCII) {
        tag++;
      }
    }
    if (tag >= 4) {
      return {
        increment4Validator: { value: fc }
      }
    }
  }
  return null;
}
// ======================================================================================
//檢核不可連續四個遞減連號
function decrease4Validator(fc: String, valuelength: number) {
  for (let i = 0; i < valuelength; i++) {
    let tag = 1;
    for (let j = i; j < i + 4; j++) {
      let fisrtASCII = fc.charCodeAt(j);
      let nextASCII = fc.charCodeAt(j + 1) + 1;
      if (fisrtASCII == nextASCII) {
        tag++
      }
    }
    if (tag >= 4) {
      return {
        decrease4Validator: { value: fc }
      }
    }
  }
  return null;
}







