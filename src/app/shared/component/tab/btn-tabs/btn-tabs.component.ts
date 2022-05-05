import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { select2Init } from 'src/app/shared/util/common';

@Component({
  selector: 'app-btn-tabs',
  templateUrl: './btn-tabs.component.html',
  styleUrls: ['./btn-tabs.component.css']
})
export class BtnTabsComponent implements OnInit {

  tabItems:any[]=[];
  @Input() tab1:string="";
  @Input() tab2:string="";
  @Input() tab3:string="";
  @Input() tab4:string="";
  @Output() tabChangeEvent = new EventEmitter<string>();




  currentTab:Number=1;// default display first tab


  constructor() { }

  ngOnInit(): void {
    select2Init();
    if(this.tab1 !==""){
      this.tabItems.push(this.tab1);
    }
    if(this.tab2 !==""){
      this.tabItems.push(this.tab2);
    }
    if(this.tab3 !==""){
      this.tabItems.push(this.tab3);
    }
    if(this.tab4 !==""){
      this.tabItems.push(this.tab4);
    }
  }

  getTabClass(){
    switch(this.tabItems.length){
      case 3:{
        return "threeItems"
      }
      case 4:{
        return "fourItems"
      }
      default:{
        return ""
      }
    }
  }


  getCurrentTab(){
    return this.currentTab;
  }

  handleChangeTab(currentTab:Number){
    this.currentTab=currentTab;
    this.tabChangeEvent.emit("tab"+currentTab);
  }


}
