import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { F1021Service } from 'src/app/service/10/f1021.service';
import { convertStrToDateString } from 'src/app/shared/util/convertString';

@Component({
  selector: 'app-f1021',
  templateUrl: './f1021.component.html',
  styleUrls: ['./f1021.component.css']
})
export class F1021Component implements OnInit {

  @ViewChild('dynamicPad', { read: ViewContainerRef }) dynamicPad: any

  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    F1021 存摺通提(取款)密碼變更 component
    declare variable
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  step!: Number;
  isLoading: boolean = false;
  txnError: boolean = false;
 
  form1Data!: { custName: string; lastModifyDttm: string; };



  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    constructor
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  constructor(
    private f1021Service: F1021Service,
    private changeDectorRef: ChangeDetectorRef,

  ) { }


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    init
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  ngOnInit(): void {
  
    this.f1021Service.setStep(1);
    //get data from f1021Service
    this.getFormData();
  }

 
  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    call API
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/

  //QUERY SSL INFO
  getFormData() {
    this.f1021Service.setIsLoading(true);
    this.f1021Service.queryf1021().subscribe(
      (data) => {
        //畫面置頂
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });

        if (data.success == true) {
          //SUCCESS
          //暫存資料到service
          this.f1021Service.setAccountList(data.clientResponse.accountList)
          this.f1021Service.setLastModifyDttm(data.clientResponse.lastModifyDttm);
          this.f1021Service.setLastModifyChannel(data.clientResponse.lastModifyChannel)
  
        } else {
          //沒有此交易權限
          this.f1021Service.setStep(0);
          this.f1021Service.setTxnStatus("error")
          this.f1021Service.setError(data.error);
          //判斷是否為錯誤訊息
          if(data.error.code=="6666"){
            this.txnError=true
          }
        }

        this.f1021Service.setIsLoading(false);
        //變化檢測>刷新畫面
        this.changeDectorRef.markForCheck();
        this.changeDectorRef.detectChanges();

      })
  }

  //MODIFY SSL INFO
  goStep2(value:number){
    this.f1021Service.setIsLoading(true);
    this.f1021Service.checkf1021().subscribe(
      (data) => {
        if (data.success == true) {
          //SUCCESS
          this.f1021Service.setTxnStatus("success")
          this.f1021Service.setStep(2);
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        } else {
          //ERROR
          console.log("交易失敗:", data.error.message)
          this.f1021Service.setTxnStatus("error")
          this.f1021Service.setError(data.error);
          this.txnError=true
        }
        this.f1021Service.setIsLoading(false);
        this.f1021Service.setStep(value);
        //變化檢測>刷新畫面
        this.changeDectorRef.markForCheck();
        this.changeDectorRef.detectChanges();
      })
  }


  goStep3(value:number){
    console.log("goStep3 value:",value)
    this.f1021Service.setIsLoading(true);
    this.f1021Service.changef1021().subscribe(
      (data) => {
        if (data.success == true) {
          //SUCCESS
          this.f1021Service.setTxnStatus("success")
          this.f1021Service.setTransDttm(data.clientResponse.transDttm);
          this.f1021Service.setAccount(data.clientResponse.account);
          this.f1021Service.setChannel(data.clientResponse.channel);
          this.f1021Service.setStep(3);
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        } else {
          //ERROR
          console.log("交易失敗:", data.error.message)
          this.f1021Service.setTxnStatus("error")
          this.f1021Service.setError(data.error);
          this.txnError=true
        }
        this.f1021Service.setIsLoading(false);
        this.f1021Service.setStep(value);
        //變化檢測>刷新畫面
        this.changeDectorRef.markForCheck();
        this.changeDectorRef.detectChanges();
      })
  }



  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    set() & get()
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/

  getIsLoading(){
    return this.f1021Service.getIsLoading();
  }


  getStep() {
    return this.f1021Service.getStep();
  }


}
