import { SecurityControlService } from './security-control.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NumberFormatStyle } from '@angular/common';

@Component({
  selector: 'app-security-control',
  templateUrl: './security-control.component.html',
  styleUrls: ['./security-control.component.css']
})
export class SecurityControlComponent implements OnInit {

  @Input() disableList:Array<string>=[''];
  currentSecurity: string="";

  constructor(
    private securityControlService: SecurityControlService,
    private changeDectorRef: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
    this.getFormData();

  }

  /**
   * 取得安控資訊(各安控狀態)
   */
  getFormData() {
    // this.securityControlService.setIsLoading(true);
    this.securityControlService.queryAllSecurity().subscribe(
      (data) => {
        //畫面置頂
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });

        if (data.success == true) {
          console.log("取得安控資訊", data)
          //SUCCESS
          //暫存資料到service
          this.securityControlService.setSslStatus(data.clientResponse.sslStatus);
          this.securityControlService.setDeviceBindingStatus(data.clientResponse.efingerStatus);
          this.securityControlService.setOneTouchStatus(data.clientResponse.efingerStatus)
          this.securityControlService.setCardStatus("");
          this.securityControlService.setFxmlStatus(data.clientResponse.fxmlStatus);
          this.securityControlService.setOtpStatus(data.clientResponse.otpStatus)

        } else {
          //ERROR or 沒有此交易權限
          // this.f1005Service.setStep(0);
          // this.f1005Service.setIsLoading(false);
        }

        // this.f1005Service.setIsLoading(false);
        //變化檢測>刷新畫面
        this.changeDectorRef.markForCheck();
        this.changeDectorRef.detectChanges();

      })
  }

  /**
   * 組安控按鈕class(判斷是否為當前安控&是否有安控權限)
   * @param sec 
   * @returns 安控按鈕class
   */
  getBtnClass(sec: string) {
    
    let c=""
    if (this.getCurrentSecurity() == sec && this.getSecstatus(sec)){
      c +="active "
    }
    if(!this.getSecstatus(sec)){
      c+="disabled "
    }
    return c;

  }


  /**
   * 查詢安控是否有權限
   * @param sec 
   * @returns 安控權限(true/false)
   */
  getSecstatus(sec: string) {

    switch (sec) {
      case "card": return this.securityStatus.card; break;
      case "deviceBinding": return this.securityStatus.deviceBinding; break;
      case "fxml": return this.securityStatus.fxml; break;
      case "oneTouch": return this.securityStatus.oneTouch; break;
      case "otp": return this.securityStatus.otp; break;
      case "ssl": return this.securityStatus.ssl; break;
      default: return false;
    }

  }

  /**
   * 判斷安控狀態(true/false)
   */
  get securityStatus() {
    return {
      card: this.securityControlService.getCardStatus() == ("4" || "5") 
            ? this.isDisabled('card')? false: true 
            : false,
      deviceBinding: this.securityControlService.getDeviceBindingStatus() == ("2" || "3")
            ? this.isDisabled('deviceBinding')? false: true  
            : false,
      fxml: this.securityControlService.getFxmlStatus() == ("4" || "5") 
            ? this.isDisabled('fxml')? false: true  
            : false,
      oneTouch: this.securityControlService.getOneTouchStatus() == ("1" || "3") 
            ? this.isDisabled('oneTouch')? false: true  
            : false,
      otp: this.securityControlService.getOtpStatus() == ("4" || "5") 
            ? this.isDisabled('otp')? false: true  
            : false,
      ssl: this.securityControlService.getSslStatus() == ("4" || "5") 
            ? this.isDisabled('ssl')? false: true  
            : false

    }
  }

  /**
   * 程式判斷是否disable安控按鈕
   * @param sec 
   * @returns 
   */
  isDisabled(sec:string){
    if((this.disableList.find((item)=>item.toString()==sec)) == undefined ) {
      return false;
    }else{
      return true;
    }
  }

  /**
   * 
   * @returns 取得當前選中的安控 from securityControlService
   */
  getCurrentSecurity() {
    console.log()
    return this.securityControlService.getCurrentSecurity();
  }

  /**
   * 將當前選中安控儲存在securityControlService
   * @param current 
   */
  setCurrentSecurity(current: string) {
    console.log("切換安控按鈕 ：", current)
    this.securityControlService.setCurrentSecurity(current);
    //變化檢測>刷新畫面
    this.changeDectorRef.markForCheck();
    this.changeDectorRef.detectChanges();
    console.log("securityCurrent：", this.securityControlService.getCurrentSecurity())
  }


}
