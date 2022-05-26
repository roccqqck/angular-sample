import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ConditionalExpr } from '@angular/compiler';
import { Component, DoCheck, OnInit,SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { F1002Service } from 'src/app/service/10/f1002.service';
import { getcustinfo } from 'src/app/shared/model/customer-common-ibank/customer/v1/personal/getcustinfo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-f1002',
  templateUrl: './f1002.component.html',
  styleUrls: ['./f1002.component.css']
})
export class F1002Component implements OnInit, DoCheck {

  test: object = {};
  custId = "";
  isLoading: boolean = false;
  functionItem: number = 1;
  apiError: boolean = false;
  renderPage: boolean = false;//確認資料處理完成再開啟畫面給USER
  formInfo: FormGroup;
  // **************
  // api reponse

  // 基本資料
  apiR_name: string = ""; //戶名
  apiR_nickName: string = ""; //暱稱
  _nickName: string = "";
  apiR_education: string = ""; //學歷
  _education: string = "";
  apiR_marriage: string = ""; //婚姻
  _marriage: string = "";
  apiR_job: string = ""; //職業
  _job: string = ""; 
  apiR_company: string = ""; // 任職公司/就讀學校
  _company: string = ""; 
  apiR_companyAddress: string = "";// 任職公司地址/就讀學校地址
  _companyAddress: string = "";
  apiR_jobTitle: string = ""; //職稱
  _jobTitle: string = ""; 
  apiR_livingCountry: string = ""; //現在居住地國別
  _livingCountry: string = ""; 
  // apiR_accountPurpose: string = ""; // 開戶目的與性質
  // _accountPurpose: string = ""; 
  apiR_purposeSalay: string = "";
  _purposeSalay: string = "";
  apiR_purposeInvestment: string = ""; //理財投資
  _purposeInvestment: string = ""; //理財投資
  apiR_purposeSaving: string = "";
  _purposeSaving: string = "";
  apiR_purposeFundsDisp: string = "";
  _purposeFundsDisp: string = "";
  apiR_purposeSecurities: string = "";
  _purposeSecurities: string = "";
  apiR_purposeLoan: string = "";
  _purposeLoan: string = "";
  apiR_purposeCompOperation: string = "";
  _purposeCompOperation: string = "";
  apiR_purposeStrongBox: string = "";
  _purposeStrongBox: string = "";
  apiR_purposeCreditAcq: string = "";
  _purposeCreditAcq: string = "";
  apiR_purposeOther: string = "";
  _purposeOther: string = "";
  apiR_purposeOtherDesc: string = "";
  _purposeOtherDesc: string = "";

  apiR_accountPurposeOther: string = ""; // 開戶目的與性質
  _accountPurposeOther: string = ""; 
  apiR_income: string = ""; // 個人年收入
  _income: string = ""; 
  apiR_fundSource: string = ""; //資金主要來源
  _fundSource: string = ""; 
  apiR_fundSourceDesc: string = ""; //資金主要來源
  _fundSourceDesc: string = ""; 


  // 基本資料

  // 聯絡資訊
  apiR_email: string = "";
  _email: string = "";
  apiR_emailValidate: string = "";
  _emailValidate: string = "";
  apiR_homePhone1: string = ""; //住家電話區碼
  _homePhone1: string = "";
  apiR_homePhone2: string = ""; //住家電話
  _homePhone2: string = ""; 
  apiR_homePhone3: string = ""; //住家電話分機
  _homePhone3: string = ""; 
  apiR_companyPhone1: string = ""; //公司電話區碼
  _companyPhone1: string = ""; 
  apiR_companyPhone2: string = ""; //公司電話
  _companyPhone2: string = ""; 
  apiR_companyPhone3: string = ""; //公司電話分機
  _companyPhone3: string = "";
  apiR_cellPhone: string = ""; //行動電話
  _cellPhone: string = ""; 
  apiR_tfaPhone: string = ""; //雙因素電話
  _tfaPhone: string = ""; 
  apiR_contactAddress: string = ""; //通訊地址
  _contactAddress: string = ""; 
  apiR_zip: string = ""; //郵遞區號
  _zip: string = "";

  // 聯絡資訊

  // 寄送設定
  apiR_bankStatementType: string = ""; //綜合業務對帳單
  _bankStatementType: string = "";
  // 寄送設定

  // 上傳檔案
  apiR_a245: string = "N";
  _a245: string = "N";
  // 上傳檔案

  // 其他
  apiR_zipList: Array<object> = []; //全國縣市郵遞區號
  _zipList: Array<object> = []; 
  apiR_voucherType: string = ""; //扣繳憑單
  _voucherType: string = ""; 
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
    private activatedRoute: ActivatedRoute,
    private fb:FormBuilder) {
      this.formInfo = this.fb.group({
        'nickName': '',
        "aa":''
      })
     }

  ngOnInit(): void {
    this.setRenderPage(false);
    this.setIsLoading(true);

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
        'Content-Type': 'application/json'
        // 'authorization': 'Bearer test'
      })
    };
    let url = "/api/customer/personal/v1/personal/getcustinfo";
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
      if(data.success){
        // this.test = JSON.stringify(data);
        this.test = data.clientResponse;
        let apiData = data.clientResponse;
        this.apiR_name = apiData.name;
        this.apiR_nickName = this._nickName = apiData.nickName;
        this.apiR_education = this._education = apiData.education
        this.apiR_marriage = this._marriage = apiData.marriage
        this.apiR_job = this._job = apiData.job;
        this.apiR_company = this._company = apiData.company;
        this.apiR_jobTitle = this._jobTitle = apiData.jobTitle;
        this.apiR_homePhone1 = this._homePhone1 = apiData.homePhone1;
        this.apiR_homePhone2 = this._homePhone2 = apiData.homePhone2;
        this.apiR_homePhone3 = this._homePhone3 = apiData.homePhone3;
        this.apiR_companyPhone1 = this._companyPhone1 = apiData.companyPhone1;
        this.apiR_companyPhone2 = this._companyPhone2 = apiData.companyPhone2;
        this.apiR_companyPhone3 = this._companyPhone3 = apiData.companyPhone3;
        this.apiR_cellPhone = this._cellPhone = apiData.cellPhone;
        this.apiR_email = this._email = apiData.email;
        this.apiR_emailValidate = this._emailValidate = apiData.emailValidate;
        this.apiR_bankStatementType = this._bankStatementType = apiData.bankStatementType;
        this.apiR_livingCountry = this._livingCountry = apiData.livingCountry;
        this.apiR_contactAddress = this._contactAddress = apiData.contactAddress;
        this.apiR_companyAddress = this._companyAddress = apiData.companyAddress;
        this.apiR_zip = this._zip = apiData.zip;
        this.apiR_zipList = this._zipList = apiData.zipList;
        // this.apiR_accountPurpose = this._accountPurpose = apiData.accountPurpose;
        // this.apiR_accountPurposeOther = this._accountPurposeOther = apiData.accountPurposeOther;

        this.apiR_purposeSalay = this._purposeSalay = apiData.purposeSalay;
        this.apiR_purposeInvestment = this._purposeInvestment = apiData.purposeInvestment;
        this.apiR_purposeSaving = this._purposeSaving = apiData.purposeSaving;
        this.apiR_purposeFundsDisp = this._purposeFundsDisp = apiData.purposeFundsDisp;
        this.apiR_purposeSecurities = this._purposeSecurities = apiData.purposeSecurities;
        this.apiR_purposeLoan = this._purposeLoan = apiData.purposeLoan;
        this.apiR_purposeCompOperation = this._purposeCompOperation = apiData.purposeCompOperation;
        this.apiR_purposeStrongBox = this._purposeStrongBox = apiData.purposeStrongBox;
        this.apiR_purposeCreditAcq = this._purposeCreditAcq = apiData.purposeCreditAcq;
        this.apiR_purposeOther = this.apiR_purposeOther = apiData.purposeOther;
        this.apiR_purposeOtherDesc = this._purposeOtherDesc = apiData.purposeOtherDesc;


        
        this.apiR_income = this._income = apiData.income;
        this.apiR_fundSource = this._fundSource = apiData.fundSource;
        this.apiR_fundSourceDesc = this._fundSourceDesc = apiData.fundSourceDesc;
        this.apiR_voucherType = this._voucherType = apiData.voucherType;
        this.apiR_tfaPhone = this._tfaPhone = apiData.tfaPhone;

        this.apiR_ssl = apiData.ssl;
        this.apiR_otp = apiData.otp;
        this.apiR_fxml = apiData.fxml;
        this.apiR_efinger =  apiData.efinger;
        this.apiR_a245 = apiData.a245;
        this.apiR_statusCode = data.statusCode;
        this.apiR_statusMsg = data.statusMsg;


        // console.log(data)
        this.setIsLoading(false);
        console.log("close Loading")
        console.timeEnd("變更基本資料查詢API");
        this.setRenderPage(true);
      }else{
        this.apiError = true;
        this.apiR_statusCode = data.statusCode;
        this.apiR_statusMsg = data.statusMsg;
        console.log(data.error.message);
        this.setIsLoading(false);
      }
    })
    


  }

  ngDoCheck(){
    if(this._nickName != this.apiR_nickName){
      console.log("changes")  
    }else{
      console.log("no changes")
    }
    
  }
  submitForm(value: any){

    console.warn(value)

    // this.formInfo.patchValue(value)

    // console.log("form ==> ", value)
    // console.log("form ==>")
    // console.log(JSON.stringify(value))

    // console.log(this.formInfo.getRawValue())
  }

  setIsLoading(bool: boolean){
    this.isLoading = bool;
  }

  setRenderPage(bool: boolean){
    this.renderPage = bool;
  }


  /**
   * 選單切換
   * @param item 
   */
  switchFunctionItem(item: number){
    this.functionItem = item;
  }
}
