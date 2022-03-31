import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn, FormControl } from '@angular/forms';

//檢核不可連續四個重覆
export const continuous4Validator: ValidatorFn = (control: AbstractControl) => {
  const fc = control.value
  const valuelength = fc.length - 3;
  // console.log("長度" + valuelength, fc)
  let isContinuous4 = false;
  let chi = ''
  console.log("continuous4Validator" + isContinuous4)
  for (let i = 0; i < valuelength; i++) {
    let tag = 1
    chi = fc.charAt(i);
    console.log("chi",chi);
    for (let j = i + 1; j < i + 4; j++) {
      if (chi == fc.charAt(j)) {
        console.log("chi2",chi)
        console.log("tag",tag)
        tag++
      }
    }
    if (tag >= 4) {
      isContinuous4 = true;
      return {
        continuous4Validator:{value:control.value}

      }
    }
  }
  return null;
};


@Directive({
  selector: '[appContinuous4Validator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: Continuous4ValidatorDirective, multi: true }]
})


export class Continuous4ValidatorDirective implements Validator {
  @Input('appContinuous4Validator') continuous4Valid = ''
  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.continuous4Valid ? continuous4Validator(control)
      : null;
  }
}





// export function continuous4Validator(fc: FormControl): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const valuelength=fc.value.length-3;
//     console.log("長度"+valuelength,fc.value)
//     let isContinuous4=false;
//     let chi=''
//     for(let i=0;i<valuelength;i++){
//       let tag=1
//       chi = fc.value.charAt(i);
//       for(let j=i+i;j<i+4;j++){
//         if(chi==fc.value.charAt(j)){
//           tag++
//         }
//       }
//       if(tag>=4){
//         isContinuous4=true;
//       }
//     }
//     console.log("continuous4Validator"+isContinuous4)
//     return isContinuous4 ? { continuous4Validator: { value: control.value } } : null;
//   };
// }
