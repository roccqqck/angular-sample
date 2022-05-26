import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskName'
})
export class MaskNamePipe implements PipeTransform {

  transform(text: string, masksign: string, ...args: unknown[]): string {

    let inputText = text;
    let inputMaskSign = masksign;

    if(inputMaskSign == ""){
      inputMaskSign = "〇";
    }

    if(inputText.length > 2){
      return inputText.slice(0,1) + inputMaskSign + inputText.slice(2);
    }else if(inputText.length == 2){
      return inputText.slice(0,1) + inputMaskSign;
    }else{
      return inputText;
    } 
  }

}
