import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fn-step',
  templateUrl: './fn-step.component.html',
  styleUrls: ['./fn-step.component.css']
})
export class FnStepComponent implements OnInit {

 stepItems: any[]=[];
@Input() stepItem1:String="";
@Input() stepItem2:String="";
@Input() stepItem3:String="";
@Input() stepItem4:String="";
@Input() stepItem5:String="";
@Input() stepItem6:String="";
@Input() txnError:boolean=false;//判斷是否交易失敗
@Input() currentStep:Number=0;

  constructor() { }

  ngOnInit(): void {
    if(this.stepItem1!==""){
      this.stepItems.push(this.stepItem1)
    }
    if(this.stepItem2!==""){
      this.stepItems.push(this.stepItem2)
    }
    if(this.stepItem3!==""){
      this.stepItems.push(this.stepItem3)
    }
    if(this.stepItem4!==""){
      this.stepItems.push(this.stepItem4)
    }if(this.stepItem5!==""){
      this.stepItems.push(this.stepItem5)
    }
    if(this.stepItem6!==""){
      this.stepItems.push(this.stepItem6)
    }

  }
  getProgressGreenClass(){
    switch(this.currentStep){
      case 1:{
        return this.txnError? "progressGreen1":"progressGreen1"
        break;
      }
      case 2:{
        return this.txnError? "progressGreen2Error":"progressGreen2"
        break;
      }
      case 3:{
        return this.txnError? "progressGreen3Error":"progressGreen3"
        break;
      }
      case 4:{
        return this.txnError? "progressGreen4Error":"progressGreen4"
        break;
      }
      default:{
        break;
      }
    }

    return "progressGreen1"
  }

  getStepPadding(){
    // console.log("getPadding",this.stepItem1.length,"style","padding-right: calc("+(this.stepItem1.length/4)+"rem - 7px);")
    let stepPadding="padding-left:"+(this.stepItem1.length/4)+"rem;"+"padding-right: calc("+(this.stepItem1.length/4)+"rem - "+this.stepItem1.length+"px);"
    return stepPadding;
  }

}
