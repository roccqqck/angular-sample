import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css']
})
export class SearchModalComponent implements OnInit {
  @Input()title!:string;
  @Input()btnOk!:string;
  @Input()btnCancel!:string;
  @Input()isOpen!:boolean;
  @Output() btnEvent = new EventEmitter<{state:string,isOpen:boolean}>();

  constructor(
    private renderer:Renderer2 
  ) { }

  ngOnInit(): void {
    this.renderer.setStyle(document.documentElement,'overflow','hidden');
    this.renderer.setStyle(document.body,'overflow','hidden');
  }

  handleOk(){
    this.isOpen=false;
    this.btnEvent.emit({state:'Y',isOpen:false})
    this.renderer.setStyle(document.documentElement,'overflow','auto');
    this.renderer.setStyle(document.body,'overflow','auto');
  }
  
  handleCancel(){
    this.isOpen=false;
    this.btnEvent.emit({state:'N',isOpen:false})
    this.renderer.setStyle(document.documentElement,'overflow','auto');
    this.renderer.setStyle(document.body,'overflow','auto');
  }

}
