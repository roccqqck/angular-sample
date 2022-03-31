import { map } from 'rxjs';
import { DynamicPadService } from './../../../service/dynamicPad/dynamic-pad.service';
import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';

@Component({
  selector: 'dynamic-pad',
  templateUrl: './dynamic-pad.component.html',
  styleUrls: ['./dynamic-pad.component.css']
})
export class DynamicPadComponent implements OnInit {

  @ViewChild('dynamicPad') html!: ElementRef;
  @Input()  numList: any
  list!: Array<string>;

  constructor(public dynamicPadService: DynamicPadService,
    private changeDectorRef: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    // console.log("numList",this.numList)
    this.list=this.numList.list;
  }

  ngOnChanges(){
    console.log("numList 改變",this.numList.list)
    this.list=this.numList.list;
  }





}
