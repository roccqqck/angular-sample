import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'form-row-readonly',
  templateUrl: './form-row-readonly.component.html',
  styleUrls: ['./form-row-readonly.component.css']
})
export class FormRowReadonlyComponent implements OnInit {

  @Input() rowName="";
  @Input() rowValue="";

  constructor() { }

  ngOnInit(): void {
  }

}
