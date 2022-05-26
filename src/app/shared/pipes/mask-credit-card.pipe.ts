import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskCreditCard'
})
export class MaskCreditCardPipe implements PipeTransform {

  transform(text: string, masksign: string, format: boolean): string {

    let inputText = text;
    let inputMaskSign = masksign;

    if(inputMaskSign == ""){
      inputMaskSign = '*'
    }

    if(inputText.length == 16){
      let maskText = inputText.slice(0,6) + inputMaskSign + inputMaskSign + inputMaskSign + inputMaskSign + inputMaskSign + inputMaskSign + inputText.slice(12,16);
      console.log("maskText",maskText)
      if(format){//需要格式化
        return maskText.slice(0,4) + "-" + maskText.slice(4,8) + "-" + maskText.slice(8,12) + "-" + maskText.slice(12,16);
      }else{
        return maskText;
      }
    }else if(inputText.length == 19){
      let maskText = inputText.slice(0,4) + inputText.slice(5,7) + inputMaskSign + inputMaskSign + inputMaskSign + inputMaskSign + inputMaskSign + inputMaskSign + inputText.slice(15,19);
      if(format){//需要格式化
        return maskText.slice(0,4) + "-" + maskText.slice(4,8) + "-" + maskText.slice(8,12) + "-" + maskText.slice(12,16);
      }else{
        return maskText;
      }
    }else{
      return inputText;
    }
  }

}
