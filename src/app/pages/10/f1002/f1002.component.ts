import { Component, OnInit } from '@angular/core';
import { F1002Service } from 'src/app/service/10/f1002.service';
@Component({
  selector: 'app-f1002',
  templateUrl: './f1002.component.html',
  styleUrls: ['./f1002.component.css']
})
export class F1002Component implements OnInit {

  test = "123"
  isLoading: boolean = true;
  constructor(private f1002Service: F1002Service) { }

  ngOnInit(): void {
    // this.f1002Service.isLoading = true;
  }

  getIsLoading() {
    console.log("isLoading", this.f1002Service.isLoading)
    return this.f1002Service.isLoading;
  }

}
