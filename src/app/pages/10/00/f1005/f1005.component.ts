import { DynamicPadComponent } from './../../../../shared/component/dynamic-pad/dynamic-pad.component';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { F1004Service } from 'src/app/service/10/f1004.service';

@Component({
  selector: 'app-f1005',
  templateUrl: './f1005.component.html',
  styleUrls: ['./f1005.component.css']
})
export class F1005Component implements OnInit {

  step!:Number;
  txnError:boolean=false;

  @ViewChild('dynamicPad', { read: ViewContainerRef }) dynamicPad: any


  constructor(private f1004Service: F1004Service
    ) { }

  ngOnInit(): void {
    //defalut show form1
    this.step=1;
    this.f1004Service.setStep(1);


  }
  ngAfterViewInit(){
    // this.loadDynamicComponent();

  }


  //載入動態鍵盤
  // private loadDynamicComponent() {
  //   const ref = this.dynamicPad.createComponent(DynamicPadComponent);
  //   ref.changeDetectorRef.detectChanges();
  // }

  getStep(){
    return this.f1004Service.getStep();
  }



}
