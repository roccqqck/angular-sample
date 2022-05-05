import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fn-error-page',
  templateUrl: './fn-error-page.component.html',
  styleUrls: ['./fn-error-page.component.css']
})
export class FnErrorPageComponent implements OnInit {

  @Input() title:string="系統回覆訊息";
  @Input() code:string="500";
  @Input() message:string="異常錯誤，請洽資訊人員";

  constructor() { }

  ngOnInit(): void {
  }

}
