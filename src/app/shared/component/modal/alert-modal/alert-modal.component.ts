import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {
  @Input()title!:string;
  @Input()btnOk!:string;
  // @Input()btnCancel!:string;
  @Input()isOpen!:boolean;
  @Output() btnEvent = new EventEmitter<{state:string,isOpen:boolean}>();

  constructor() { }

  ngOnInit(): void {
  }

  handleOk(){
    this.isOpen=false;
    this.btnEvent.emit({state:'Y',isOpen:false})
    
  }
  

}
