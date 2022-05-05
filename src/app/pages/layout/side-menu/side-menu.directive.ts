import { MenuService } from 'src/app/service/menu/menu.service';
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSideMenu]'
})
export class SideMenuDirective {

  constructor(private renderer: Renderer2,private elRef:ElementRef,private menuService:MenuService) { }

  ngOnInit(): void {
    console.log('SideMenuDirective ngOnInit()', );
    // this.isOpen=false;
  }

  @HostListener('click') toggleOpen() {
    if (document.body.classList.contains('on')) {
      this.renderer.removeClass(document.body, 'on');
      this.menuService.setIsOpen(false);
    }
  }

}
