import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ScriptService } from '../service/script/script.service';
import { CryptoService } from '../service/shared/crypto.service';
import { DownloadCSVService } from '../shared/component/download-csv/service/download-csv.service';
import {checkThenShowIcReader, listReaders,readerSelect } from '../shared/util/firstCardObject';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css','./main.component.en.css'],
})
export class MainComponent implements OnInit {

 

  constructor(    
    public downloadCSVService:DownloadCSVService,
    private scriptService:ScriptService,
    @Inject(DOCUMENT) private dom: Document,
    public cryptoService:CryptoService,
  ) { }

  ngOnInit(): void {
  

    (window as any).testConsole=this.testConsole();
    console.log("init checkThenShowIcReader")
  }


  testConsole(){

    return "test123";
  }

  handleTabChange(currentTab:string){
    console.log("currentTAB:"+currentTab);
  }

  //======================測試ID加密======================
  testId="";
  testIdCrypto="";

  copy(elementId:string){
    this.selectText(elementId);
    this.execCopy();
  }

  execCopy(){
    try{
      const copyStatus = this.dom.execCommand('copy');
      const message = copyStatus ? 'copied' : 'failed';
      console.log("execCopy",message);
    } catch(error){
      console.log(error);
    }
    window.getSelection()?.removeAllRanges();
  }

  selectText(selector:string):void{
    const element = this.dom.querySelector(selector);
    const isInputElement = element instanceof HTMLInputElement;
    const isTextAreaElement = element instanceof HTMLTextAreaElement;
    if(isInputElement || isTextAreaElement ){
      (element as HTMLInputElement).select();
      
    }else{
      let range = this.dom.createRange();
      range.selectNodeContents(element as HTMLInputElement);
      let selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }

  }

 //======================滾輪偵測(同意條款:滑到底部才能下一步)======================
 isReaded:boolean=false;
  handleScroll(status:string){
    console.log("scroll status:",status);
    if(status=='top'){
      console.log("滾到最上面了")
    }
    if(status=='bottom'){
      console.log("滾到最底了")
      this.isReaded=true;
    }
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
