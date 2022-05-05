import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

declare var $: any
declare var jQuery: any;
declare var KeyboardClass: any;
@Component({
  selector: 'secuirty-device-binding',
  templateUrl: './device-binding.component.html',
  styleUrls: ['./device-binding.component.css']
})
export class DeviceBindingComponent implements OnInit {

  pushState:boolean=false //判斷是否點擊推播按鈕
  pushForm!:FormGroup;


  //================================動態鍵盤=========================================
  @ViewChild('inpiutKeyboard', { static: false }) inpiutKeyboardDOM!: ElementRef;
  inputType: string = "text" //html input type: text/password
  keyboardObj: any;  //動態鍵盤object
  keyboardTop: any;  //動態鍵盤x軸
  keyboardLeft: any; //動態鍵盤Y軸
  //================================動態鍵盤=========================================

  constructor(
    private form: FormBuilder,//使用 FormBuilder 服務產生控制元件
  ) { }

  ngOnInit(): void {
    //預設開啟閉眼功能
    this.inputType="password"

    this.pushForm = this.form.group({
      nbSecurity: ['', []]
    });
    
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
    this.pushState=!this.pushState;
    //poccess push...
    this.OpenModal();
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
