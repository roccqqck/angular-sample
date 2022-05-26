import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SecurityControlService } from '../security-control.service';

declare var AppBridge: any;
declare var $: any
declare var jQuery: any;
declare var KeyboardClass: any;
@Component({
  selector: 'security-one-touch',
  templateUrl: './one-touch.component.html',
  styleUrls: ['./one-touch.component.css']
})
export class OneTouchComponent implements OnInit {

  pushState:boolean=false //判斷是否點擊推播按鈕
  pushForm!:FormGroup;


  userAgent: any;
  isAndroid!: boolean;
  isiOS!: boolean;
  obj!: { key1: string; key2: boolean; key3: number; };

   //================================動態鍵盤=========================================
   @ViewChild('inpiutKeyboard', { static: false }) inpiutKeyboardDOM!: ElementRef;
   inputType: string = "text" //html input type: text/password
   keyboardObj: any;  //動態鍵盤object
   keyboardTop: any;  //動態鍵盤x軸
   keyboardLeft: any; //動態鍵盤Y軸
   //================================動態鍵盤=========================================
 

  constructor(
    private form: FormBuilder,//使用 FormBuilder 服務產生控制元件
    private securityControlService:SecurityControlService,
  ) { }

  ngOnInit(): void {
    //預設開啟閉眼功能
    this.inputType="password"

    this.pushForm = this.form.group({
      nbSecurity: ['', []]
    });

    //app native
    this.userAgent = ""
    this.userAgent = navigator.userAgent
    console.log("ngOnInit : useranget => ", this.userAgent);
    (window as any).android2Web=this.android2web;
    (window as any).web2android=this.web2android;

  }

  /**
   * 動態鍵盤輸入偵測＆套用formcontrol檢核
   */
   ngDoCheck() {
    // console.log("ngdocheck")
    if (document.getElementById("id_nbSecurity")) {
      if ((document.getElementById("id_nbSecurity") as HTMLInputElement).value != this.pushForm.controls['nbSecurity'].value) {
        // console.log("form-row ngOnInit", (document.getElementById("id_"+this.id)as HTMLInputElement).value)
        this.pushForm.get('nbSecurity')?.setValue((document.getElementById("id_nbSecurity") as HTMLInputElement).value);
      }
    }
  }

  /**
  * 顯示隱藏字串(閉眼/睜眼 功能)
  */
   onChange() {
    this.inputType = this.inputType == "text" ? "password" : "text";
  }

  /**
   * 推播，並開啟提醒彈跳視窗
   */
  pushInfo(){

    console.log("pushSTATE:",this.pushState);
    if(this.pushState==false){
      //e指通訊息發送
      this.securityControlService.setTxnData("Channel|5,交易類型|臺幣即時轉帳,轉出帳號後三碼|014,轉入帳號後三碼|495,金額|5000,交易序號|193221,交易簡碼|F0201");
      this.securityControlService.sendeMessage().subscribe(
      (data) => {
        if (data.success == true) {
          console.log("e指通發送成功", data)

        } else {
          console.log("e指通發送失敗",data)
        }

      })
    }
    this.pushState=!this.pushState;
    
    this.OpenModal();
  }


  /**
   * 測試e指通驗證
   */
  test(){
    this.securityControlService.setSeqNo('100')
    this.securityControlService.verifyEfinger().subscribe(
      (data) => {
        if (data.clientResponse.result == true) {
          console.log("e指通驗證成功", data)

        } else {
          console.log("e指通驗證失敗",data)
        }

      })
  }

  //======================彈跳視窗2(訊息推播提醒-oneBTN)======================
  showModal:boolean=false
  /**
   * 開啟彈跳視窗
   */
  OpenModal(){
    this.showModal=true
  }
  /**
   * 取得彈跳視窗內按鈕的回傳訊息
   * @param obj 
   */
  handleModal(obj:{state:string,isOpen:boolean}){
    this.showModal=obj.isOpen
    if(obj.state=="Y"){
      console.log("確定")
    }else{
      console.log("取消")
    }
  }


  //======================APP NATIVE BRIDGE======================
  /**
   * webview to native
   */
  web2android() {
    console.log(this.userAgent)
    const u = this.userAgent;
    this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU. +Mac OS X/);

    this.obj={
      key1:"ABC",
      key2:true,
      key3:456
    }
    console.log(this.obj);

    if (this.isiOS != true && this.isAndroid == true) {
      AppBridge.postMessage(JSON.stringify(this.obj))
      return;
    }

    if (this.isAndroid != true && this.isiOS == true){
      (window as any).webkit.messageHeadlers.AppBridge.postMessage(JSON.stringify(this.obj))
    }

  }

  /**
   * native to web
   */
  android2web(){

  }




  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  //動態虛擬鍵盤 start
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

  openKeyboard() {
    if (document.getElementById("keyboard_nbSecurity")) {
      // console.log("鍵盤已存在:", "#keyboard_" + this.id)
    } else {
      // console.log("鍵盤不存在 create", "#keybord_" + this.id)
      this.createKeyboard()
    }
  }
  createKeyboard() {
    this.getElemPos()
    console.log('動態鍵盤 init')
    this.keyboardObj = new KeyboardClass({
      // mainObj: '#keyboard_' + this.id,
      openObj: '#keyboardOpen_nbSecurity' ,
      caplockFlag: false,
      openFlag: true,
      inputObj:
        [
          '#id_nbSecurity'
        ],
      styleData: {
        keyboard: {
          // top: '50%',
          // left: '50%',
          top: this.keyboardTop,
          left: this.keyboardLeft,
        },
      }
    });
  }
  //取得元素位置
  getElemPos() {
    let obj = this.inpiutKeyboardDOM.nativeElement;
    var pos = { "top": 0, "left": 0 };
    if (obj.offsetParent) {
      while (obj.offsetParent) {
        pos.top += obj.offsetTop;
        pos.left += obj.offsetLeft;
        obj = obj.offsetParent;
      }
    } else if (obj.x) {
      pos.left += obj.x;
    } else if (obj.x) {
      pos.top += obj.y;
    }
  
    console.log(obj.scrollHeight)
    console.log(pos.top)
    this.keyboardTop = -(obj.scrollHeight - pos.top) + 60;
    console.log('top:', this.keyboardTop)
    this.keyboardLeft = obj.scrollWidth / 2 + 100;
    return { x: pos.left, y: pos.top };
  }
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  //動態虛擬鍵盤 end
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝



}
