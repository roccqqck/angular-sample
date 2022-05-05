import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appToggleActive]'
})
export class ToggleActiveDirective {

  constructor(private renderer: Renderer2,private elRef:ElementRef) { }
  ngOnInit(): void {
    console.log('appToggleActive ngOnInit()');
    // this.isOpen=false;
  }
  @HostListener('click') toggle(){
    const el=this.elRef.nativeElement.parentNode
    if(el.classList.contains('active')){
      this.renderer.removeClass(el,'active')
    }else{
      this.renderer.addClass(el,'active')
    }
    
  }


}
