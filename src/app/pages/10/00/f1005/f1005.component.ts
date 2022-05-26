import { DynamicPadComponent } from './../../../../shared/component/dynamic-pad/dynamic-pad.component';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { F1005Service } from 'src/app/service/10/f1005.service';
import { convertStrToDateString } from 'src/app/shared/util/convertString';
import { AuthService } from 'src/app/auth/auth.service';
import { FUNC_TWO_STEP_0, FUNC_TWO_STEP_1, FUNC_TWO_STEP_2, FUNC_TXNSTATUS_ERROR, FUNC_TXNSTATUS_SUCCESS } from 'src/app/shared/constants/function.constants';
import { API_ERRORCODE_C0006 } from 'src/app/shared/constants/api-errorcode.constants';

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
  STEP0=FUNC_TWO_STEP_0;
  STEP1=FUNC_TWO_STEP_1;
  STEP2=FUNC_TWO_STEP_2;

  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    constructor
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  constructor(
    private f1005Service: F1005Service,
    private changeDectorRef: ChangeDetectorRef,
    private authService: AuthService
  ) { }


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    init
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  ngOnInit(): void {
    //init
    this.f1005Service.setStep(FUNC_TWO_STEP_1);
    this.f1005Service.setCustId(this.authService.getCustId());
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
          this.f1005Service.setTxnStatus(FUNC_TXNSTATUS_SUCCESS);
          //暫存資料到service
          this.f1005Service.setCustName(data.clientResponse.custName);
          this.f1005Service.setLastModifyDttm(data.clientResponse.lastModifyDttm);
  
        } else {
          //ERROR
          this.f1005Service.setTxnStatus(FUNC_TXNSTATUS_ERROR);
          this.f1005Service.setError(data.error);
  
          if(data.error.code=API_ERRORCODE_C0006){
            this.f1005Service.setStep(FUNC_TWO_STEP_0);//交易限制頁(沒有交易權限)           
          }else{ 
            this.f1005Service.setStep(FUNC_TWO_STEP_2);//交易結果錯誤頁
          }
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
        //畫面置頂
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        if (data.success == true) {
          //SUCCESS
          this.f1005Service.setTxnStatus(FUNC_TXNSTATUS_SUCCESS)
          this.f1005Service.setTransDttm(convertStrToDateString(data.clientResponse.transDttm));
        } else {
          //ERROR
          console.log("交易失敗:", data.error.message)
          this.f1005Service.setTxnStatus(FUNC_TXNSTATUS_ERROR)
          this.f1005Service.setError(data.error);
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

  get isTxnError(){
    return this.f1005Service.getTxnStatus() == FUNC_TXNSTATUS_SUCCESS ? false : true;
  }

  get errorCode(){ return this.f1005Service.getError().code}
  get errorMessage(){ return this.f1005Service.getError().message}


}
