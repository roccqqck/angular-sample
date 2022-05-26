import { Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CryptoService } from 'src/app/service/shared/crypto.service';
import { DynamicPadComponent } from '../../component/dynamic-pad/dynamic-pad.component';
import { DynamicPadService } from '../../component/dynamic-pad/service/dynamic-pad.service';
import { SecurityControlService } from '../security-control.service';

@Component({
  selector: 'security-ssl',
  templateUrl: './ssl.component.html',
  styleUrls: ['./ssl.component.css']
})
export class SSLComponent implements OnInit {
  inputType: string = "password" //html input type: text/password
  @ViewChild(DynamicPadComponent, { read: ElementRef }) private dynamicPadElementRef!: ElementRef;
  sslForm!: FormGroup;

  constructor(
    private form: FormBuilder,//使用 FormBuilder 服務產生控制元件
    public dynamicPadService: DynamicPadService,
    private securityControlService:SecurityControlService,
    private cryptoService:CryptoService
  ) { }

  ngOnInit(): void {
    this.sslForm = this.form.group({
      sslSecurity:['',[]]
    });
    this.sslForm.get('sslSecurity')?.valueChanges.subscribe(
      (value)=>{
        this.securityControlService.setSslValue(value);
        // console.log("crypto:",this.cryptoService.base64(this.cryptoService.sha1(value)))
      }
    )
  }

  ngAfterViewInit() {
    this.dynamicPadService.navElement = this.dynamicPadElementRef.nativeElement;
  }

  ngDoCheck() {
    // console.log("ngdocheck")
    if (document.getElementById("sslSecurity")) {
      if ((document.getElementById("sslSecurity") as HTMLInputElement).value != this.sslForm.controls["sslSecurity"].value) {
        // console.log("form-row ngOnInit", (document.getElementById("id_"+this.id)as HTMLInputElement).value)
        this.sslForm.get("sslSecurity")?.setValue((document.getElementById("sslSecurity") as HTMLInputElement).value);
        this.securityControlService.setSslValue(this.cryptoService.b64_sha1(this.sslForm.get("sslSecurity")?.value))
      }
    }

  }


  //顯示/隱藏字串
  onChange() {
    this.inputType = this.inputType == "text" ? "password" : "text";
  }

}
