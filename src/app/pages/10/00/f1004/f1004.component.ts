import { Component, OnInit } from '@angular/core';
import { F1004Service } from 'src/app/service/10/f1004.service';

@Component({
  selector: 'app-f1004',
  templateUrl: './f1004.component.html',
  styleUrls: ['./f1004.component.css']
})
export class F1004Component implements OnInit {

  step!:Number;
  txnError:boolean=false;

  constructor(private f1004Service: F1004Service) { }

  ngOnInit(): void {
    //defalut show form1
    this.step=1;
    this.f1004Service.setStep(1);
  }

  getStep(){
    return this.f1004Service.getStep();
  }



}
