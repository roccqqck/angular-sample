import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Output, Renderer2 } from '@angular/core';
/**
 *
 * 滾動事件監聽
 * @export
 * @class ScrollDirective
 */
@Directive({
  selector: '[scroll]'
})
export class ScrollDirective {
  ngOnInit(): void {
    console.log('ScrollDirective ngOnInit()');
  }

  constructor(private renderer: Renderer2,private elRef:ElementRef) { 
  }

  /**
   *回傳scroll結果
   *
   * @memberof ScrollDirective
   */
  @Output() scrollEvent = new EventEmitter();

  @HostListener('scroll',['$event']) onScroll($event:any){
    const el=$event.target
    console.log(" @HostListener('scroll',['$event'])",
    "scrollHeight",el.scrollHeight,
    "clientHeight",el.clientHeight,
    "scrollTop",el.scrollTop);
    if(el.scrollTop==0){
      console.log("到頂了!")
      this.scrollEvent.emit('top')
    }
    if(el.scrollHeight <=el.clientHeight+el.scrollTop){
      console.log("到底了!")
      this.scrollEvent.emit('bottom');
    }
   
  }
}
