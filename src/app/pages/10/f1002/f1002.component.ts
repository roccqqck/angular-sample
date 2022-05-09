import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { F1002Service } from 'src/app/service/10/f1002.service';
import { getcustinfo } from 'src/app/shared/model/customer-common-ibank/customer/v1/personal/getcustinfo';
@Component({
  selector: 'app-f1002',
  templateUrl: './f1002.component.html',
  styleUrls: ['./f1002.component.css']
})
export class F1002Component implements OnInit {

  test: object = {};
  custId = "";
  isLoading: boolean = false;
  functionItem: number = 1;
  // **************
  // api reponse

  // 基本資料
  apiR_name: string = ""; //戶名
  apiR_nickName: string = ""; //暱稱
  apiR_education: string = ""; //學歷
  apiR_marriage: string = ""; //婚姻
  apiR_job: string = ""; //職業
  apiR_company: string = ""; // 任職公司/就讀學校
  apiR_companyAddress: string = "";// 任職公司地址/就讀學校地址
  apiR_jobTitle: string = ""; //職稱
  apiR_livingCountry: string = ""; //現在居住地國別
  apiR_accountPurpose: string = ""; // 開戶目的與性質
  apiR_accountPurposeOther: string = ""; // 開戶目的與性質
  apiR_income: string = ""; // 個人年收入
  apiR_fundSource: string = ""; //資金主要來源
  apiR_fundSourceDesc: string = ""; //資金主要來源


  // 基本資料

  // 聯絡資訊
  apiR_email: string = "";
  apiR_emailValidate: string = "";
  apiR_homePhone1: string = ""; //住家電話區碼
  apiR_homePhone2: string = ""; //住家電話
  apiR_homePhone3: string = ""; //住家電話分機
  apiR_companyPhone1: string = ""; //公司電話區碼
  apiR_companyPhone2: string = ""; //公司電話
  apiR_companyPhone3: string = ""; //公司電話分機
  apiR_cellPhone: string = ""; //行動電話
  apiR_tfaPhone: string = ""; //雙因素電話
  apiR_contactAddress: string = ""; //通訊地址
  apiR_zip: string = ""; //郵遞區號

  // 聯絡資訊

  // 寄送設定
  apiR_bankStatementType: string = ""; //綜合業務對帳單
  // 寄送設定

  // 上傳檔案
  apiR_a245: string = "N";
  // 上傳檔案

  // 其他
  apiR_zipList: Array<object> = []; //全國縣市郵遞區號
  apiR_voucherType: string = ""; //扣繳憑單
  // 其他


  apiR_ssl: string = "";
  apiR_otp: string = "";
  apiR_fxml: string = "";
  apiR_efinger: string = "";
  apiR_statusCode: string = "";
  apiR_statusMsg: string = "";

  

  // **************


  constructor(
    private f1002Service: F1002Service,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.setIsLoading(true);
    // this.f1002Service.isLoading = true;

    //取得網址參數
    this.activatedRoute.queryParams.subscribe(params =>{
    this.custId = params['custId'];

    //網址functionItem參數可以指定頁面跳到該頁籤
    let functionItem = params['functionItem'];
    if(functionItem === "1"){
      this.functionItem = 1;
    }else if (functionItem == 2){
      this.functionItem = 2;
    }else if (functionItem == 3){
      this.functionItem = 3;
    }else if (functionItem == 4){
      this.functionItem = 4;
    }else{
      this.functionItem = 1;
    }
    });

    console.time("變更基本資料查詢API");
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': 'Bearer test'
      })
    };
    let url = "https://customer-common-ibank.apps.devocp.firstbank.com.tw/api/customer/personal/v1/personal/getcustinfo";
    this.http.post<getcustinfo>(url,{
      "header": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "body": {
        "custId": this.custId
      }
    },httpOptions).subscribe(data => {
      // this.test = JSON.stringify(data);
      this.test = data.clientResponse;
      this.apiR_name = data.clientResponse.name;
      this.apiR_nickName = data.clientResponse.nickName;
      this.apiR_education = data.clientResponse.education
      this.apiR_marriage = data.clientResponse.marriage
      this.apiR_job = data.clientResponse.job;
      this.apiR_company = data.clientResponse.company;
      this.apiR_jobTitle = data.clientResponse.jobTitle;
      this.apiR_homePhone1 = data.clientResponse.homePhone1;
      this.apiR_homePhone2 = data.clientResponse.homePhone2;
      this.apiR_homePhone3 = data.clientResponse.homePhone3;
      this.apiR_companyPhone1 = data.clientResponse.companyPhone1;
      this.apiR_companyPhone2 = data.clientResponse.companyPhone2;
      this.apiR_companyPhone3 = data.clientResponse.companyPhone3;
      this.apiR_cellPhone = data.clientResponse.cellPhone;
      this.apiR_email = data.clientResponse.email;
      this.apiR_emailValidate = data.clientResponse.emailValidate;
      this.apiR_bankStatementType = data.clientResponse.bankStatementType;
      this.apiR_livingCountry = data.clientResponse.livingCountry;
      this.apiR_contactAddress = data.clientResponse.contactAddress;
      this.apiR_companyAddress = data.clientResponse.companyAddress;
      this.apiR_zip = data.clientResponse.zip;
      this.apiR_zipList = data.clientResponse.zipList;
      this.apiR_accountPurpose = data.clientResponse.accountPurpose;
      this.apiR_accountPurposeOther = data.clientResponse.accountPurposeOther;
      this.apiR_income = data.clientResponse.income;
      this.apiR_fundSource = data.clientResponse.fundSource;
      this.apiR_fundSourceDesc = data.clientResponse.fundSourceDesc;
      this.apiR_voucherType = data.clientResponse.voucherType;
      this.apiR_tfaPhone = data.clientResponse.tfaPhone;
      this.apiR_ssl = data.clientResponse.ssl;
      this.apiR_otp = data.clientResponse.otp;
      this.apiR_fxml = data.clientResponse.fxml;
      this.apiR_efinger =  data.clientResponse.efinger;
      this.apiR_a245 = data.clientResponse.a245;
      this.apiR_statusCode = data.statusCode;
      this.apiR_statusMsg = data.statusMsg;


      // console.log(data)
      this.setIsLoading(false);
      console.log("close Loading")
      console.timeEnd("變更基本資料查詢API");
    })
    
    

  }

  setIsLoading(bool: boolean){
    // this.f1002Service.isLoading = bool;
    this.isLoading = bool;
  }

  // getIsLoading() {
  //   let bool: boolean = this.f1002Service.isLoading;
  //   console.log("getIsLoading", bool)
  //   return bool;
  // }

  /**
   * 選單切換
   * @param item 
   */
  switchFunctionItem(item: number){
    this.functionItem = item;
  }
}
