import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSelectfont]'
})
export class SelectfontDirective {
  // @HostBinding('class.on')isOpen: boolean=false;


  constructor(private renderer: Renderer2,private elRef:ElementRef) { }


  @HostListener('click') selectFontSize() {
    console.log( this.elRef.nativeElement.textContent)
    console.log(this.elRef.nativeElement.parentNode.parentNode)
    console.log(this.elRef.nativeElement.value)

    //設定字體大小
    const el=this.elRef.nativeElement
    el.parentNode.parentNode.firstChild.childNodes[1].textContent=el.textContent;
    this.renderer.setStyle(document.documentElement,'font-size',el.value+'px');

    // if (this.isOpen == true) {
    //   this.renderer.removeClass(document.body, 'on');
    // } else {
    //   this.renderer.addClass(document.body, 'on');
    // }
    // this.isOpen = !this.isOpen;
    // console.log('MenuDirective', ' isOpen:', this.isOpen);

  }


}
