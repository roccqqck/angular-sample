import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { F1004Service } from 'src/app/service/10/f1004.service';
import { convertStrToDateString } from 'src/app/shared/util/convertString';

@Component({
  selector: 'app-f1004',
  templateUrl: './f1004.component.html',
  styleUrls: ['./f1004.component.css']
})
export class F1004Component implements OnInit {

   /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    F1004登入密碼變更 component
    declare variable
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  step!:Number;
  isLoading: boolean = false;
  txnError:boolean=false;

  form1Data!: { custName: string; lastModifyDttm: string; };

  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    constructor
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  constructor(
    private f1004Service: F1004Service,
    private changeDectorRef: ChangeDetectorRef
  ) { }
  
  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    init
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  ngOnInit(): void {
    //init
    this.f1004Service.setStep(1);
    //init f1004Service
    this.getFormData();
    
  }


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    call API
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/

  //QUERY PWD　INFO
  getFormData(){
    this.f1004Service.setIsLoading(true);
    this.f1004Service.queryf1004().subscribe(
      (data)=>{
        //畫面置頂
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        
        if (data.success == true) {
          //SUCCESS
          //暫存資料到service
          this.f1004Service.setCustName(data.clientResponse.custName);
          this.f1004Service.setLastModifyDttm(convertStrToDateString(data.clientResponse.lastModifyDttm));
        }else{
          //ERROR
          console.log("交易失敗:", data.error.message)
          this.f1004Service.setStep(2)
          this.f1004Service.setTxnStatus("error")
          this.f1004Service.setError(data.error);
          this.txnError=true
        }

        this.f1004Service.setIsLoading(false);

        //變化檢測>刷新畫面
        this.changeDectorRef.markForCheck();
        this.changeDectorRef.detectChanges();
      }
    )
  }

  //MODIFY PWD INFO
  goStep2(value: number) {
    this.f1004Service.setIsLoading(true);
    this.f1004Service.changef1004().subscribe(
      (data) => {
        if (data.success == true) {
          //SUCCESS
          this.f1004Service.setTxnStatus("success")
          this.f1004Service.setTransDttm(convertStrToDateString(data.clientResponse.transDttm));          
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        } else {
          //ERROR
          console.log("交易失敗:", data.error.message)
          this.f1004Service.setTxnStatus("error")
          this.f1004Service.setError(data.error);
          this.txnError=true
        }
        this.f1004Service.setIsLoading(false);
        this.f1004Service.setStep(value);
        //變化檢測>刷新畫面
        this.changeDectorRef.markForCheck();
        this.changeDectorRef.detectChanges();
      })
  }


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    set() & get()
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  
  getIsLoading() {
    return this.f1004Service.getIsLoading();
  }
  
  getStep(){
    return this.f1004Service.getStep();
  }



}
