import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'form-title',
  templateUrl: './form-title.component.html',
  styleUrls: ['./form-title.component.css']
})
export class FormTitleComponent implements OnInit {

  @Input() formTitle='';
  constructor() { }

  ngOnInit(): void {
  }

}
