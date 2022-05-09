import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskName'
})
export class MaskNamePipe implements PipeTransform {

  transform(text: string, mask: string, ...args: unknown[]): string {
    if(text.length > 2){
      return text.slice(0,1) + mask + text.slice(2);
    } else{
      return text;
    } 
  }

}
