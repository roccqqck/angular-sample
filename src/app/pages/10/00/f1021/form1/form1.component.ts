import { DynamicPadComponent } from './../../../../../shared/component/dynamic-pad/dynamic-pad.component';
import { DynamicPadService } from '../../../../../shared/component/dynamic-pad/service/dynamic-pad.service';
import { Component, Input, OnInit, ChangeDetectorRef, ViewChild, ComponentFactoryResolver, ViewContainerRef, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { userValidator } from 'src/app/shared/util/check/user-validator.directive';
import { countInt, select2Init } from 'src/app/shared/util/common';
import { CryptoService } from 'src/app/service/shared/crypto.service';
import { Select2OptionData } from 'src/app/shared/component/ng-select2/ng-select2.interface';
import { Observable, of, Subscriber } from 'rxjs';
import { F1021Service } from 'src/app/service/10/f1021.service';
import { ScriptService } from 'src/app/service/script/script.service';

declare var $: any;

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component implements OnInit {
  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
     F1021 存摺通提(取款)密碼變更 component-form1
    declare variable
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  @ViewChild(DynamicPadComponent, { read: ElementRef }) private dynamicPadElementRef!: ElementRef;
  @Output() nextEvent = new EventEmitter<number>();

  f1021Form!: FormGroup;
  isSubmit: boolean = false;
  currentTab:string='tab1'; //預設頁籤1

  accountList!: Array<Select2OptionData>;
  
 


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    constructor
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  constructor(
    private form: FormBuilder,//使用 FormBuilder 服務產生控制元件
    private f1021Service: F1021Service,
    private changeDectorRef: ChangeDetectorRef,
    public dynamicPadService: DynamicPadService,
    private scriptService:ScriptService,
    private cryptoService: CryptoService
  ) {}



  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    init
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  ngOnInit(): void { 
        
    // console.log( B64_SHA1("88888888")+"=")
    this.f1021Form = this.form.group({
      selectAccountTab1:['',[]],
      selectAccountTab2:['',[]],
      newWithdraw: ['',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8),
          Validators.pattern("^[0-9]*$"),
          // userValidator()
        ]
      ],
      checkWithdraw: ['',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8),
          Validators.pattern("^[0-9]*$"),
          // userValidator()
        ]
      ],
    },
      { validators: [this.compareCheckWithdraw,this.checkwithDraw] }
    );

    this.f1021Form.get('selectAccountTab1')?.valueChanges.subscribe(
      (value)=>{
        console.log('selectAccountTab1 valueChanges：',value);
      }
    )
    this.f1021Form.get('selectAccountTab2')?.valueChanges.subscribe(
      (value)=>{
        console.log('selectAccountTab2 valueChanges：',value);
      }
    )

    this.f1021Form.get('newWithdraw')?.valueChanges.subscribe(
      (value) => {
        this.f1021Service.setNewWithdraw(value);
      })
    this.f1021Form.get('checkWithdraw')?.valueChanges.subscribe(
      (value) => {
        this.f1021Service.setCheckWithdraw(value);
      })

      select2Init(); 
         // 頁籤元件
         $(".areaTabs button").click(function (this:any) {
          var index = $(this).index();
          $(this).addClass('active').siblings().removeClass('active');
          $('.tabContent .tabPane').eq(index).addClass('active').siblings().removeClass('active');
      });
  }

  ngAfterViewInit() {
    this.dynamicPadService.navElement = this.dynamicPadElementRef.nativeElement;
  }

 

  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    customer validate
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  //檢核新SSL與確認SSL需相同
  compareCheckWithdraw: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newSSL = control.get('newWithdraw')?.value;
    const checkSSL = control.get('checkWithdraw')?.value;
    return (newSSL !== checkSSL && (newSSL!="" && checkSSL!="")) ? { isNotCompareNew: { value: true } } : null;
  };

  checkwithDraw: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newWithdraw = control.get('newWithdraw')?.value;
    return newWithdraw == "0000" ? { is0000: { value: true } } : newWithdraw =="9999" ?  { is9999: { value: true } } : null;
  };


  /**
   * 頁籤切換
   * @param currentTab 
   */
  handleTabChange(currentTab:string){
    console.log("currentTAB:"+currentTab)
    this.currentTab=currentTab;

    if(currentTab=="tab1"){
    }

    if(currentTab=="tab2"){
      // this.f1021Service.setIsLoading(true);
      this.accountList=[]
      this.scriptService.load('FirstCardObject_js','FirstCardObjectNew').then(data => {
        console.log('script loaded ', data);
        this.f1021Service.cardObservable().subscribe(
          (data)=>{
          this.accountList=data
          console.log('data:',data);
          // this.f1021Service.setIsLoading(false);
  
          //變化檢測>刷新畫面
          this.changeDectorRef.markForCheck();
          this.changeDectorRef.detectChanges();
          })
    
      }).catch(error => console.log('script loaded error',error));
     
        // this.f1021Service.setIsLoading(false);
    }
    
  }

  



 
  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    submit & validate
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/
  onValidate() {
    this.isSubmit = true;
    if (
            //new
            this.newWithdrawCtrl.errors?.['required'] ||
            this.newWithdrawCtrl.errors?.['minlength'] ||
            this.newWithdrawCtrl.errors?.['maxlength'] ||
            this.newWithdrawCtrl.errors?.['pattern'] ||
            this.newWithdrawCtrl.errors?.['continuous4Validator'] ||
            this.newWithdrawCtrl.errors?.['increment4Validator'] ||
            this.newWithdrawCtrl.errors?.['decrease4Validator'] ||
            //check
            this.checkWithdrawCtrl.errors?.['required'] ||
            this.checkWithdrawCtrl.errors?.['minlength'] ||
            this.checkWithdrawCtrl.errors?.['maxlength'] ||
            this.checkWithdrawCtrl.errors?.['pattern'] ||
            this.checkWithdrawCtrl.errors?.['continuous4Validator'] ||
            this.checkWithdrawCtrl.errors?.['increment4Validator'] ||
            this.checkWithdrawCtrl.errors?.['decrease4Validator'] ||
            this.f1021Form.errors?.['isCompareNew']
    ) {
      return false;
    } else {
      return true;
    }
  }

  //下一步
  goNext() {
    //欄位檢核
    const isValidate = this.onValidate();
    // console.log('goNext selectAccount',this.f1021Form.get('selectAccountTab2')?.value)
    //go to step 2
    if(true){//方便測試暫時不檢核

      if(this.currentTab=="tab1"){
        this.f1021Service.setSelectAccount(this.f1021Form.get('selectAccountTab1')?.value);
      }else{
        this.f1021Service.setSelectAccount(this.f1021Form.get('selectAccountTab2')?.value);
      }
      
      this.f1021Service.setNewWithdraw(this.f1021Form.get('newWithdraw')?.value);
      this.f1021Service.setCheckWithdraw(this.f1021Form.get('checkWithdraw')?.value);

      this.nextEvent.emit(2);
    }

  }


  /*＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    set() & get()
  ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊*/

  get form1Data() {
    const temp1=this.f1021Service.getAccountList();
    const selectTemp:Array<Select2OptionData>=[];
    if(temp1 != undefined){
      temp1.forEach((item)=>{
        selectTemp.push({id:item.account,text: item.branchTW+" "+item.account})
      })
    }
   
    return {
      accountList: selectTemp,
      lastModifyDttm: this.f1021Service.getLastModifyDttm()
    }
  };


 


  //formControl
  get selectAccount1Ctrl() { return this.f1021Form.get('selectAccountTab1')! as FormControl; }
  get selectAccount2Ctrl() { return this.f1021Form.get('selectAccountTab2')! as FormControl; }
  get newWithdrawCtrl() { return this.f1021Form.get('newWithdraw')! as FormControl; }
  get checkWithdrawCtrl() { return this.f1021Form.get('checkWithdraw')! as FormControl; }
  get f() { return this.f1021Form.controls; }
}


