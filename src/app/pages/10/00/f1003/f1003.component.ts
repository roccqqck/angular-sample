import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { F1003Service } from 'src/app/service/10/f1003.service';
import { convertStrToDateString } from 'src/app/shared/util/convertString';

@Component({
  selector: 'app-f1003',
  templateUrl: './f1003.component.html',
  styleUrls: ['./f1003.component.css']
})
export class F1003Component implements OnInit {

  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    F1003登入代號變更 component
    declare variable
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  step!: Number;
  isLoading: boolean = false;
  txnError: boolean = false;

  form1Data!: { custName: string; lastModifyDttm: string; oldUsrId: string; };



  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    constructor
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  constructor(
    private f1003Service: F1003Service,
    private changeDectorRef: ChangeDetectorRef
  ) { }


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    init
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  ngOnInit(): void {
    //init f1003Service
    this.f1003Service.setStep(1);
    //init get data from f1003Service
    this.getFormData();
  }


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    call API
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/

  //QUERY USRID INFO
  getFormData() {
    this.f1003Service.setIsLoading(true);
    this.f1003Service.queryf1003().subscribe(
      (data) => {
        //畫面置頂
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        if (data.success == true) {
          //SUCCESS
          //暫存資料到service
          this.f1003Service.setCustName(data.clientResponse.custName);
          this.f1003Service.setLastModifyDttm(convertStrToDateString(data.clientResponse.lastModifyDttm));
          this.f1003Service.setOldUsrId(data.clientResponse.usrId);
        }else{
          console.log("交易失敗:", data.error.message)
          this.f1003Service.setStep(2);//顯示交易結果
          this.f1003Service.setTxnStatus("error")
          this.f1003Service.setError(data.error);
          this.txnError=true
        }
       

        this.f1003Service.setIsLoading(false);

        //變化檢測>刷新畫面
        this.changeDectorRef.markForCheck();
        this.changeDectorRef.detectChanges();
      }
    )
  }

  //MODIFY USRID INFO
  goStep2(value: number) {
    this.f1003Service.setIsLoading(true);
    this.f1003Service.changef1003().subscribe(
      (data) => {
        if (data.success == true) {
          //SUCCESS
          this.f1003Service.setTxnStatus("success")
          this.f1003Service.setTransDttm(convertStrToDateString(data.clientResponse.transDttm));          
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        } else {
          //ERROR
          console.log("交易失敗:", data.error.message)
          this.f1003Service.setTxnStatus("error")
          this.f1003Service.setError(data.error);
          this.txnError=true
        }
        this.f1003Service.setIsLoading(false);
        this.f1003Service.setStep(value);
        //變化檢測>刷新畫面
        this.changeDectorRef.markForCheck();
        this.changeDectorRef.detectChanges();
      })
  }



  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    set() & get()
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/

  getIsLoading() {
    return this.f1003Service.getIsLoading();
  }

  getStep() {
    return this.f1003Service.getStep();
  }

}
