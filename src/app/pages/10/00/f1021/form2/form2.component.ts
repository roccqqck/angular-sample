import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { F1021Service } from 'src/app/service/10/f1021.service';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component implements OnInit {
  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    F1021 存摺通提(取款)密碼變更-安控頁 component-form2
    declare variable
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  @Output() nextEvent = new EventEmitter<number>();



  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    constructor
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  constructor(private f1021Service: F1021Service) { }




  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    init
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  ngOnInit(): void {

  }


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    submit & validate
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  //下一步
  goBack() {
    console.log("回前頁")
    //欄位檢核
    // const isValidate = this.onValidate();

    //go to step 3
    if(true){//方便測試暫時不檢核

      // 檢核通過後，欄位加密
      this.f1021Service.setSelectAccount('');
      this.f1021Service.setNewWithdraw('');
      this.f1021Service.setCheckWithdraw('');

      this.nextEvent.emit(1);
    }

  }

  //下一步
  goNext() {
    console.log("安控驗證成功")
    //欄位檢核
    // const isValidate = this.onValidate();

    //go to step 3
    if(true){//方便測試暫時不檢核

      // 檢核通過後，欄位加密
      this.f1021Service.setSelectAccount('');
      this.f1021Service.setNewWithdraw('');
      this.f1021Service.setCheckWithdraw('');

      this.nextEvent.emit(3);
    }

  }



  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    set() & get()
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  getTxnStatus() {
    // console.log("F1005change 狀態:", this.f1021Service.getTxnStatus())
    return this.f1021Service.getTxnStatus();
  }

  get form2Data() {
    return {
      selectAccount: this.f1021Service.getSelectAccount(),
      widhdraw: this.f1021Service.getNewWithdraw()
    }
  };

  get errorMessage() {return this.f1021Service.getError();}


}
