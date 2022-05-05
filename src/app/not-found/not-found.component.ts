import { PageMetaService } from './../service/shared/page-meta.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  public constructor(private PageMetaService: PageMetaService){}

  ngOnInit(): void {
    this.PageMetaService.setTitle("找不到此頁面");
    this.PageMetaService.addTag('第一銀行,FirstBank,iBank,iLeoBank,iLeo','', false);
  }

}
