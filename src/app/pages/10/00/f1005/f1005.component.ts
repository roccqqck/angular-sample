import { DynamicPadComponent } from './../../../../shared/component/dynamic-pad/dynamic-pad.component';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { F1005Service } from 'src/app/service/10/f1005.service';
import { convertStrToDateString } from 'src/app/shared/util/convertString';

@Component({
  selector: 'app-f1005',
  templateUrl: './f1005.component.html',
  styleUrls: ['./f1005.component.css']
})
export class F1005Component implements OnInit {
  @ViewChild('dynamicPad', { read: ViewContainerRef }) dynamicPad: any

  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    F1005 SSL交易密碼變更 component
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
    private f1005Service: F1005Service,
    private changeDectorRef: ChangeDetectorRef,

  ) { }


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    init
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  ngOnInit(): void {
  
    this.f1005Service.setStep(1);
    //get data from f1005Service
    this.getFormData();
  }

 
  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    call API
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/

  //QUERY SSL INFO
  getFormData() {
    this.f1005Service.setIsLoading(true);
    this.f1005Service.queryf1005().subscribe(
      (data) => {
        //畫面置頂
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });

        if (data.success == true) {
          //SUCCESS
          //暫存資料到service
          this.f1005Service.setCustName(data.clientResponse.custName);
          this.f1005Service.setLastModifyDttm(data.clientResponse.lastModifyDttm);
  
        } else {
          //ERROR or 沒有此交易權限
          this.f1005Service.setStep(0);
          this.f1005Service.setTxnStatus("error")
          this.f1005Service.setError(data.error);
          this.txnError=true
        }

        this.f1005Service.setIsLoading(false);
        //變化檢測>刷新畫面
        this.changeDectorRef.markForCheck();
        this.changeDectorRef.detectChanges();

      })
  }

  //MODIFY SSL INFO
  goStep2(value:number){
    this.f1005Service.setIsLoading(true);
    this.f1005Service.changef1005().subscribe(
      (data) => {
        if (data.success == true) {
          //SUCCESS
          this.f1005Service.setTxnStatus("success")
          this.f1005Service.setTransDttm(convertStrToDateString(data.clientResponse.transDttm));
          this.f1005Service.setStep(2);
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        } else {
          //ERROR
          console.log("交易失敗:", data.error.message)
          this.f1005Service.setTxnStatus("error")
          this.f1005Service.setError(data.error);
          this.txnError=true
        }
        this.f1005Service.setIsLoading(false);
        this.f1005Service.setStep(value);
        //變化檢測>刷新畫面
        this.changeDectorRef.markForCheck();
        this.changeDectorRef.detectChanges();
      })
  }

  

  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    set() & get()
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/

  getIsLoading(){
    return this.f1005Service.getIsLoading();
  }


  getStep() {
    return this.f1005Service.getStep();
  }



}
