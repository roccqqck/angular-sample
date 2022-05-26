import { Component, OnInit, Output,EventEmitter, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  @Input()title!:string;
  @Input()btnOk!:string;
  @Input()btnCancel!:string;
  @Input()isOpen!:boolean;
  @Input()isReaded:boolean =true;
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
