import { Component, ContentChild, Directive, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef } from '@angular/core';






@Component({
  selector: 'app-sub-tabs',
  templateUrl: './sub-tabs.component.html',
  styleUrls: ['./sub-tabs.component.css']
})
export class SubTabsComponent implements OnInit {

  tabItems:any[]=[];
  @Input() tab1:string="";
  @Input() tab2:string="";
  @Input() tab3:string="";
  @Input() tab4:string="";
  @Output() tabChangeEvent = new EventEmitter<string>();



  currentTab:Number=1;// default display first tab

  constructor() { }

  ngOnInit(): void {
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
