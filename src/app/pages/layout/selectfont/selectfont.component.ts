import { SettingService } from './../../../service/setting/setting.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selectfont',
  templateUrl: './selectfont.component.html',
  styleUrls: ['./selectfont.component.css']
})
export class SelectfontComponent implements OnInit {
  isOpen=false;
  constructor(
    private settingService: SettingService
  ) { }

  ngOnInit(): void {
  }

  selectFontSize(){
  this.isOpen= !this.isOpen;
  }

  changeSize(size:string){
    // this.settingService.setCss('html', 'font-size', size);
    this.settingService.setCss('html', 'font-size', size);

  }

}
