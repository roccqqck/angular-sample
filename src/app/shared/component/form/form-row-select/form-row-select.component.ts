import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';
import { select2Init } from 'src/app/shared/util/common';

@Component({
  selector: 'form-row-select',
  templateUrl: './form-row-select.component.html',
  styleUrls: ['./form-row-select.component.css']
})
export class FormRowSelectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    select2Init();
  }

}


