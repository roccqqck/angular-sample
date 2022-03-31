import { SettingService } from 'src/app/service/setting/setting.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';

declare var $: any
declare var jQuery: any;
declare var KeyboardClass: any;


@Component({
  selector: 'form-row-input',
  templateUrl: './form-row-input.component.html',
  styleUrls: ['./form-row-input.component.css']
})
export class FormRowInputComponent implements OnInit {

  @Input() rowName = ""; //表單欄位名稱
  // @Input() rowValue=""; //表單欄位值
  @Input() id = "";   //表單控制ＩＤ
  @Input() form!: FormGroup; //表單控制群組
  @Input() isError!: boolean;  //判斷欄位值是否驗證錯誤,錯誤時以紅色顯示
  @Input() isRequired: boolean = false;  //預設非必填
  @Input() hasKeyboard: boolean = false; //預設不顯示虛擬動態鍵盤
  @Input() hasSwitch: boolean = false; //預設不顯示欄位 顯示/隱藏開關

  @ViewChild('inpiutKeyboard', { static: false }) inpiutKeyboardDOM!: ElementRef;

  inputType: string = "password" //html input type: text/password

  keyboardObj: any;  //動態鍵盤object
  keyboardTop: any;  //動態鍵盤x軸
  keyboardLeft: any; //動態鍵盤Y軸

  constructor() { }

  ngOnInit(): void {
  }

  //動態鍵盤輸入偵測＆套用formcontrol檢核
  ngDoCheck() {
    // console.log("ngdocheck")
    if (document.getElementById("id_" + this.id)) {
      if ((document.getElementById("id_" + this.id) as HTMLInputElement).value != this.form.controls[this.id].value) {
        // console.log("form-row ngOnInit", (document.getElementById("id_"+this.id)as HTMLInputElement).value)
        this.form.get(this.id)?.setValue((document.getElementById("id_" + this.id) as HTMLInputElement).value);
      }
    }

  }

  //顯示/隱藏字串
  onChange() {
    this.inputType = this.inputType == "text" ? "password" : "text";
  }


  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  //動態虛擬鍵盤 start
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

  openKeyboard() {
    // $('.keybord_location_frame').css('display','none')
    // console.log("判斷：", document.getElementById("keybord_" + this.id))
    if (document.getElementById("keyboard_" + this.id)) {
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
      openObj: '#keyboardOpen_' + this.id,
      caplockFlag: false,
      openFlag: true,
      inputObj:
        [
          '#id_' + this.id
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
    // (console.log("input keyboard DOM:", this.inpiutKeyboardDOM))
    // if(document.getElementsByClassName('keyboard_frame')){
    //      const keyboardDOM = document.getElementsByClassName('keyboard_frame')
    // console.log("keyboardDOM",keyboardDOM[0].clientWidth)
    // }
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
