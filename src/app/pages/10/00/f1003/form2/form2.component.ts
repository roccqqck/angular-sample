import { Component, OnInit } from '@angular/core';
import { F1003Service } from 'src/app/service/10/f1003.service';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component implements OnInit {


  constructor(private f1003Service: F1003Service) { }

  ngOnInit(): void {

  }

  get custName() { return this.f1003Service.getCustName();}
  get oldUsrId() { return this.f1003Service.getOldUsrId();}
  get lastModifyDttm() { return this.f1003Service.getLastModifyDttm();}
  get usrId() { return this.f1003Service.getUsrId(); }
  get usrTipId() { return this.f1003Service.getUsrIdTip(); }


}
