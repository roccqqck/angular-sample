import { Component, OnInit } from '@angular/core';
import { F1004Service } from 'src/app/service/10/f1004.service';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component implements OnInit {


  constructor(private f1004Service: F1004Service) { }

  ngOnInit(): void {

  }




}
