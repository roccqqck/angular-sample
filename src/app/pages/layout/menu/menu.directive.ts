import { MenuService } from 'src/app/service/menu/menu.service';
import { Directive, HostBinding, HostListener, Renderer2, OnInit, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMenu]'
})
export class MenuDirective implements OnInit {
  constructor(private renderer: Renderer2,private elRef:ElementRef,private menuService:MenuService) { }

  ngOnInit(): void {
    console.log('MenuDirective ngOnInit()');
    // this.isOpen=false;
  }

  @HostListener('click') toggleOpen() {
    if (!document.body.classList.contains('on')) {
      this.renderer.addClass(document.body, 'on');
    }
    this.menuService.setIsOpen(true)

  }


}




@Directive({
  selector: '[appToggleMenu]'
})
export class ToggleMenuDirective implements OnInit {
  constructor(private renderer: Renderer2,private elRef:ElementRef,private menuService:MenuService) { }

  ngOnInit(): void {
    console.log('MenuDirective ngOnInit()');
    // this.isOpen=false;
  }

  @HostListener('click') toggleOpen() {
    if (this.menuService.getIsOpen() == true) {
      this.renderer.removeClass(document.body, 'on');
    } else {
      this.renderer.addClass(document.body, 'on');
    }
    this.menuService.setIsOpen(!this.menuService.getIsOpen())

  }


}
