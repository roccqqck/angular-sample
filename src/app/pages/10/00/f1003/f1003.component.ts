import { favorite } from 'src/app/shared/model/favorite.model';
import { Component, OnInit } from '@angular/core';
import { F1003Service } from 'src/app/service/10/f1003.service';
import { FavoriteService } from 'src/app/service/favorite/favorite.service';

@Component({
  selector: 'app-f1003',
  templateUrl: './f1003.component.html',
  styleUrls: ['./f1003.component.css']
})
export class F1003Component implements OnInit {

  step!:Number;
  txnError:boolean=false;

  //改從service
  // form1data={
  //   accountName:"小Ｏ獅的朋友test",
  //   lastModifyDttm:"2022/01/03 11:00:05",
  //   oldUsrId:"USER0002"
  // }
  constructor(private f1003Service: F1003Service) { }


  ngOnInit(): void {
    //defalut show form1
    this.step=1;
    this.f1003Service.setStep(1);

  }

  getStep(){
    return this.f1003Service.getStep();
  }







}
