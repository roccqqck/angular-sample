import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { F1004Service } from 'src/app/service/10/f1004.service';
import { API_ERRORCODE_C0006 } from 'src/app/shared/constants/api-errorcode.constants';
import { FUNC_TWO_STEP_0, FUNC_TWO_STEP_1, FUNC_TWO_STEP_2, FUNC_TXNSTATUS_ERROR, FUNC_TXNSTATUS_SUCCESS } from 'src/app/shared/constants/function.constants';
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
  STEP0=FUNC_TWO_STEP_0;
  STEP1=FUNC_TWO_STEP_1;
  STEP2=FUNC_TWO_STEP_2;

  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    constructor
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  constructor(
    private f1004Service: F1004Service,
    private changeDectorRef: ChangeDetectorRef,
    private authService: AuthService
  ) { }
  
  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    init
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  ngOnInit(): void {
    //init
    this.f1004Service.setStep(FUNC_TWO_STEP_1);
    this.f1004Service.setCustId(this.authService.getCustId());
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
          this.f1004Service.setTxnStatus(FUNC_TXNSTATUS_SUCCESS);
          //暫存資料到service
          this.f1004Service.setCustName(data.clientResponse.custName);
          this.f1004Service.setLastModifyDttm(convertStrToDateString(data.clientResponse.lastModifyDttm));
        }else{
          //ERROR
          this.f1004Service.setTxnStatus(FUNC_TXNSTATUS_ERROR)
          this.f1004Service.setError(data.error);

          if(data.error.code=API_ERRORCODE_C0006){
            this.f1004Service.setStep(FUNC_TWO_STEP_0);//交易限制頁(沒有交易權限)           
          }else{ 
            this.f1004Service.setStep(FUNC_TWO_STEP_2);//交易結果錯誤頁
          }
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
        //畫面置頂
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        if (data.success == true) {
          //SUCCESS
          this.f1004Service.setTxnStatus(FUNC_TXNSTATUS_SUCCESS)
          this.f1004Service.setTransDttm(convertStrToDateString(data.clientResponse.transDttm));
        } else {
          //ERROR
          console.log("交易失敗:", data.error.message)
          this.f1004Service.setTxnStatus(FUNC_TXNSTATUS_ERROR)
          this.f1004Service.setError(data.error);
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

  get isTxnError(){
    return this.f1004Service.getTxnStatus() == FUNC_TXNSTATUS_SUCCESS ? false : true;
  }

  get errorCode(){ return this.f1004Service.getError().code}
  get errorMessage(){ return this.f1004Service.getError().message}

}
