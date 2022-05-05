import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';

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
  @Output() btnEvent = new EventEmitter<{state:string,isOpen:boolean}>();

  constructor() { }

  ngOnInit(): void {
  }

  handleOk(){
    this.isOpen=false;
    this.btnEvent.emit({state:'Y',isOpen:false})
    
  }
  
  handleCancel(){
    this.isOpen=false;
    this.btnEvent.emit({state:'N',isOpen:false})
    
  }

}
