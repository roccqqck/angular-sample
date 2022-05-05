import { Component, OnInit } from '@angular/core';
import { DownloadCSVService } from '../shared/component/download-csv/service/download-csv.service';
import {checkThenShowIcReader, listReaders,readerSelect } from '../shared/util/firstCardObject';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css','./main.component.en.css'],
})
export class MainComponent implements OnInit {

 

  constructor(    
    public downloadCSVService:DownloadCSVService
  ) { }

  ngOnInit(): void {
    (window as any).testConsole=this.testConsole();
    console.log("init checkThenShowIcReader")
  }


  testConsole(){

    return "test123";
  }

  handleTabChange(currentTab:string){
    console.log("currentTAB:"+currentTab)
  }

  //======================彈跳視窗1(提醒-twoBTN)======================

  showModal1:boolean=false
   /**
   * 開啟彈跳視窗
   */
  OpenModal1(){
    this.showModal1=true
  }
  /**
   * 取得彈跳視窗內按鈕的回傳訊息
   * @param obj 
   */
  handleModal1(obj:{state:string,isOpen:boolean}){
    this.showModal1=obj.isOpen
    if(obj.state=="Y"){
      console.log("確定")
    }else{
      console.log("取消")
    }
  }


  //======================彈跳視窗2(說明-oneBTN)======================

  showModal2:boolean=false
  /**
   * 開啟彈跳視窗
   */
  OpenModal2(){
    this.showModal2=true
  }
  /**
   * 取得彈跳視窗內按鈕的回傳訊息
   * @param obj 
   */
  handleModal2(obj:{state:string,isOpen:boolean}){
    this.showModal2=obj.isOpen
    if(obj.state=="Y"){
      console.log("確定")
    }else{
      console.log("取消")
    }
  }


  //======================彈跳視窗3(搜尋與選項)======================

  showModal3:boolean=false
  /**
   * 開啟彈跳視窗
   */
  OpenModal3(){
    this.showModal3=true
  }
  /**
   * 取得彈跳視窗內按鈕的回傳訊息
   * @param obj 
   */
  handleModal3(obj:{state:string,isOpen:boolean}){
    this.showModal3=obj.isOpen
    if(obj.state=="Y"){
      console.log("確定")
    }else{
      console.log("取消")
    }
  }
  //===============================================================
  

}
