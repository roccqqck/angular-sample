import { Component, OnInit } from '@angular/core';
import { ScriptService } from 'src/app/service/script/script.service';
import { SecurityControlService } from '../security-control.service';
declare var myToken:any,
            PKCS7SignIO:any,
            getSignedPKCS7Str:any,
            p7Sign_SignedStr:any,
            p7Sign_SignCertSN:any,
            p7Sign_DataContent:any;
@Component({
  selector: 'secuirty-fxml',
  templateUrl: './fxml.component.html',
  styleUrls: ['./fxml.component.css']
})
export class FXMLComponent implements OnInit {

  constructor(
    private securityControlService:SecurityControlService,
    private scriptService:ScriptService
  ) { }

  ngOnInit(): void {
    this.scriptService.load('fcb_ws_base','fcb_plugin_detect','fcb_plugin_msg','fcb_token_function','FBCertClient','PKCS7CodeMapping','PKCS7SignClient').then(data => {
      console.log('script loaded ', data);
      this.fxml();
    }).catch(error => console.log('script loaded error',error));
    
   
      
  }

  fxml(){
    // console.log("mytoken",myToken)
    //憑證序號(API查憑證序號)
    p7Sign_SignCertSN = "4EE9C8F2";//A1666666630
    // p7Sign_SignCertSN = "4EE96844";//A1231231230

    //簽章明文訊息(前端組 or API組完回傳)
    p7Sign_DataContent = "<CUST_ID>A1666666630</CUST_ID><TRNS_DATE>20220503</TRNS_DATE><BIRTHDAY>2017/06/06</BIRTHDAY><EMAIL>I079DB@FIRSTBANK.COM.TW</EMAIL>";
    this.securityControlService.setSignText(p7Sign_DataContent);
    //判斷憑證是否插入、輸入文件字串、SHA256+RSA(數位簽章)...等
    if (!getSignedPKCS7Str()) {
        console.log("getSignedPKCS7Str false")
        return;
    }
    console.log("getSignedPKCS7Str:success")
    //簽章後值
    console.log("p7Sign_SignedStr",p7Sign_SignedStr)
    this.securityControlService.setSign(p7Sign_SignedStr);
    
    //打API驗證FXML
    this.verifyFXML();
  }


  verifyFXML(){
    this.securityControlService.verifyFXML().subscribe(
      (data) => {
        if (data.success == true) {
          console.log("FXML驗證成功", data)

        } else {
          console.log("FXML驗證失敗",data)
        }

      })
  }

}
