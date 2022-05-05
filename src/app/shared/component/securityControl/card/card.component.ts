import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select2Init } from 'src/app/shared/util/common';
import { checkThenShowIcReader, listReaders, readerSelect, readCardData, jsGetCardAccount, verifyPIN } from 'src/app/shared/util/firstCardObject';
import { DynamicPadComponent } from '../../dynamic-pad/dynamic-pad.component';
import { DynamicPadService } from '../../dynamic-pad/service/dynamic-pad.service';
import { SecurityControlService } from '../security-control.service';

declare var $: any;
@Component({
  selector: 'security-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  inputType: string = "password" //html input type: text/password
  @ViewChild(DynamicPadComponent, { read: ElementRef }) private dynamicPadElementRef!: ElementRef;
  cardForm!: FormGroup;

  constructor(
    private form: FormBuilder,//使用 FormBuilder 服務產生控制元件
    public dynamicPadService: DynamicPadService,
    private securityControlService: SecurityControlService
  ) { }

  ngOnInit(): void {


    checkThenShowIcReader()
    listReaders(document.getElementsByName('readerSelect')[0].children[0])
    readerSelect(document.getElementsByName('readerSelect')[0].children[0])

    this.cardForm = this.form.group({
      cardSecurity: ['', []]
    });

    ////改從動態鍵盤輸入
    // this.cardForm.get('cardSecurity')?.valueChanges.subscribe(
    //   (value) => {
    //     this.securityControlService.setSslValue(value);
    //     console.log(value)
    //   }
    // )

    select2Init();
  }

  /**
   * VIEW初始化後，取得動態鍵盤元素
   */
  ngAfterViewInit() {
    this.dynamicPadService.navElement = this.dynamicPadElementRef.nativeElement;
  }

  /**
   * 檢查輸入欄位與formControls的值是否相符，不符則更新資料(用於表單欄位驗證)
   */
  ngDoCheck() {
    if (document.getElementById("cardSecurity")) {
      if ((document.getElementById("cardSecurity") as HTMLInputElement).value != this.cardForm.controls["cardSecurity"].value) {
        // console.log("form-row ngOnInit", (document.getElementById("id_"+this.id)as HTMLInputElement).value)
        this.cardForm.get("cardSecurity")?.setValue((document.getElementById("cardSecurity") as HTMLInputElement).value);
        // this.securityControlService.setSslValue(B64_SHA1(this.sslForm.get("sslSecurity")?.value))
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
   * 送出晶片卡驗證資料
   * @returns 
   */
  sendCard() {
    readCardData(document.getElementsByName('readerSelect')[0].children[0]);
    (document as any).form1.payerAcctNo.value=jsGetCardAccount("0")
    console.log("取得晶片卡帳號：", jsGetCardAccount("0"),(document as any).form1.payerAcctNo.value)
    if ((document as any).form1.payerAcctNo.value.length == 0) {
      alert("取得卡片資訊失敗！")
      return
    }
    console.log(  "讀卡機名稱",  $("select.select2").val())
    // console.log( "密碼",this.cardForm.get("cardSecurity")?.value)
    console.log( verifyPIN( $("select.select2").val()) )

  }


}
