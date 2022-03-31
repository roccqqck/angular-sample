import { DynamicPadService } from './../../../service/dynamicPad/dynamic-pad.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

declare var $: any
declare var jQuery: any;

@Component({
  selector: 'form-row-ssl',
  templateUrl: './form-row-ssl.component.html',
  styleUrls: ['./form-row-ssl.component.css']
})
export class FormRowSslComponent implements OnInit {

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


  constructor( public dynamicPadService:DynamicPadService) { }

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

}
