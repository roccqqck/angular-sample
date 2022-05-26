import { PageMetaService } from './service/shared/page-meta.service';
import { Component, HostListener, Renderer2 } from '@angular/core';
import { WebStorageService } from './service/shared/web-storage.service';
import { netbankStyle } from './shared/util/common';
import { AuthService } from './auth/auth.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // @HostListener('window:keydown',['$event']) keyboardInput(event:any){
  //   let e= <KeyboardEvent> event;
  //   if (e.ctrlKey){
  //     console.log("ctrl");
  //     event.preventDefault();

  //   }
  // }
  @HostListener('click',['$event']) onClick(event:any){
    let e= <KeyboardEvent> event;
    if (e.ctrlKey){
      console.log("disable 左鍵+ctrl");
      event.preventDefault();

    }
  }

  @HostListener('contextmenu',['$event']) onRightClick(event:any){
    console.log("disable 右鍵")
    event.preventDefault();
  }

  public constructor(
    private PageMetaService: PageMetaService,
    private authService: AuthService,
    private renderer:Renderer2,
    private activatedRoute: ActivatedRoute,
    private WebStorageService: WebStorageService
  ){}

  ngOnInit(): void {
    this.PageMetaService.setTitle("iLeoBank");
    this.PageMetaService.addTag('第一銀行,FirstBank,iBank,iLeoBank,iLeo','', false);
    this.WebStorageService.setCookie("authToken","Test_Auth_Token");

    this.activatedRoute.queryParams.subscribe(params =>{
      console.log("params type:",typeof params,"  params:",params)

      if(Object.keys(params).length !== 0 ){
        //取出url中的json參數
        const paramsObjString:any= Object.keys(params)[0];
        console.log("paramsObjString",paramsObjString)
        if(paramsObjString.startsWith('{')){
          console.log("參數來源　mobile格式")
          const paramsObj=JSON.parse(paramsObjString);
          const ott = paramsObj['ott'];
          const ip = paramsObj['ip'];
          const info = paramsObj['info'];
          const ch= paramsObj['ch'];
          this.authService.setToken(ott);
          this.authService.setCustId(info);
          this.authService.setChannel(ch);
          console.log("obj:",paramsObj,"type of", typeof paramsObj);
          console.log("ott:",ott);
          console.log("ip:",ip);
          console.log("info:",info);
          console.log("ch:",ch);
          netbankStyle( ch);
          if(ch === "W_M" || ch === "W_L"){
            this.renderer.addClass(document.body, 'mobileView');
            console.log('add mobileView')
          }else{
            this.renderer.removeClass(document.body, 'mobileView');
            console.log('remove mobileView')
          }
        }else{
          console.log("參數來源　WEB格式")
          let urlchannel= params['channel'];
          console.log("getChannel:",urlchannel);
          let urltoken= params['token'];
          console.log("getToken:",urltoken);
          let urlinfo= params['info'];
          console.log("getInfo:",urlinfo)
          this.authService.setToken(urltoken);
          this.authService.setCustId(urlinfo);
          this.authService.setChannel(urlchannel);
          netbankStyle( urlchannel);
          if(urlchannel === "W_M" || urlchannel === "W_L"){
            this.renderer.addClass(document.body, 'mobileView');
            console.log('add mobileView')
          }else{
            this.renderer.removeClass(document.body, 'mobileView');
            console.log('remove mobileView')
          }
        }
       
      }
    
      
      
      
    })
    // this.authService.getChannel()''
    // if(this.WebStorageService.getLocalStorage("channel") === "W_M" || this.WebStorageService.getLocalStorage("channel") === "W_L"){
    //   this.renderer.addClass(document.body, 'mobileView');
    //   console.log('add mobileView')
    // }else{
    //   this.renderer.removeClass(document.body, 'mobileView');
    //   console.log('remove mobileView')
    // }

  }

  title = "iLeoBank"

  print(){
    window.print();
  }

}
