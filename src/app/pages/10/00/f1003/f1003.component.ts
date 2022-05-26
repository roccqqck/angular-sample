import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { F1003Service } from 'src/app/service/10/f1003.service';
import { API_ERRORCODE_C0006 } from 'src/app/shared/constants/api-errorcode.constants';
import { FUNC_TWO_STEP_0, FUNC_TWO_STEP_1, FUNC_TWO_STEP_2, FUNC_TXNSTATUS_ERROR, FUNC_TXNSTATUS_SUCCESS } from 'src/app/shared/constants/function.constants';
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
  STEP0=FUNC_TWO_STEP_0;
  STEP1=FUNC_TWO_STEP_1;
  STEP2=FUNC_TWO_STEP_2;


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    constructor
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  constructor(
    private f1003Service: F1003Service,
    private changeDectorRef: ChangeDetectorRef,
    private authService: AuthService,
  ) { }


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    init
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  ngOnInit(): void {
    //init f1003Service
    this.f1003Service.setStep(FUNC_TWO_STEP_1);
    this.f1003Service.setCustId(this.authService.getCustId());
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
          this.f1003Service.setTxnStatus(FUNC_TXNSTATUS_SUCCESS);
          //暫存資料到service
          this.f1003Service.setCustName(data.clientResponse.custName);
          this.f1003Service.setLastModifyDttm(convertStrToDateString(data.clientResponse.lastModifyDttm));
          this.f1003Service.setOldUsrId(data.clientResponse.usrId);
        }else{
          //ERROR
          this.f1003Service.setTxnStatus(FUNC_TXNSTATUS_ERROR)
          this.f1003Service.setError(data.error);

          if(data.error.code=API_ERRORCODE_C0006){
            this.f1003Service.setStep(FUNC_TWO_STEP_0);//交易限制頁(沒有交易權限)           
          }else{ 
            this.f1003Service.setStep(FUNC_TWO_STEP_2);//交易結果錯誤頁
          }
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
    this.f1003Service.setIsChangeNotSave(false);
    this.f1003Service.setIsLoading(true);
    this.f1003Service.changef1003().subscribe(
      (data) => {
        //畫面置頂
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        if (data.success == true) {
          //SUCCESS
          this.f1003Service.setTxnStatus(FUNC_TXNSTATUS_SUCCESS);
          this.f1003Service.setTransDttm(convertStrToDateString(data.clientResponse.transDttm));          
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        } else {
          //ERROR
          console.log("交易失敗:", data.error.message)
          this.f1003Service.setTxnStatus(FUNC_TXNSTATUS_ERROR);
          this.f1003Service.setError(data.error);
        }
        this.f1003Service.setIsLoading(false);
        this.f1003Service.setStep(value);
        //變化檢測>刷新畫面
        this.changeDectorRef.markForCheck();
        this.changeDectorRef.detectChanges();
      })
  }

  //======================彈跳視窗-canDeactivateGuard(提醒-twoBTN)======================
  subject = new Subject<boolean>();
  canDeactivate(): Observable<boolean>|boolean {
    console.log("f1003 canDeactivate",this.f1003Service.isChangeNotSave);
    if(this.f1003Service.isChangeNotSave==true){
      this.openGuardModal();
      return this.subject;
    }else{
      return true;
    }
  }

  showGuardModal:boolean=false
   /**
   * 開啟彈跳視窗
   */
  openGuardModal(){
    this.showGuardModal=true
  }
  /**
   * 取得彈跳視窗內按鈕的回傳訊息
   * @param obj 
   */
  handlenGuardModal(obj:{state:string,isOpen:boolean}){
    this.showGuardModal=obj.isOpen
    if(obj.state=="Y"){
      this.subject.next(true)
      console.log("確定")
    }else{
      this.subject.next(false)
      console.log("取消")
    }
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

  get isTxnError(){
    return this.f1003Service.getTxnStatus() == FUNC_TXNSTATUS_SUCCESS ? false : true;
  }

  get errorCode(){ return this.f1003Service.getError().code}
  get errorMessage(){ return this.f1003Service.getError().message}

}
