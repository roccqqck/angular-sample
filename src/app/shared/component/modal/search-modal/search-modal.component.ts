import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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