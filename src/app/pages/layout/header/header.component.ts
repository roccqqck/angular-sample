import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  lang="";
  constructor(
    private router: Router
  ) {}


  ngOnInit(): void {
    this.lang = this.getCurrentLanguage();
  }

  getCurrentRoute() {
    console.log("router :"+ this.router.url);
    return this.router.url;
  }
  changeLanguage() {
    const changelang=this.lang=="zh"?"en":"zh";
    console.log("redirect : 1."+ this.lang+ " 2."+changelang);
    // const redirectPathName = window.location.pathname.replace(`/`+this.lang+`/`,`/`+changelang+`/`)+window.location.hash;
    const redirectPathName = encodeURI(window.location.pathname).replace(`/`+this.lang+`/`,`/`+changelang+`/`)+"#"+encodeURI(this.router.url).replaceAll(`%257B`,`{`).replaceAll(`%2522`,`"`).replaceAll(`%257D`,`}`);
    console.log(redirectPathName);
   // window.location.pathname = redirectPathName;
    window.location.href=redirectPathName;

  }

  private getCurrentLanguage = () => {
    const lang = ['en', 'zh'];
    const currentLang = lang.find(l => new RegExp(`/${l}/`).test(window.location.pathname));
    if (!currentLang) {
      return 'zh';
    }
    return currentLang;
  };

}
