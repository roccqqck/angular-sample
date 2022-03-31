import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class PageMetaService {

  constructor(private titleService: Title, private metaService: Meta) { }

  public setTitle(newTitle: string){
    this.titleService.setTitle(newTitle + " | 第一銀行 FirstBank");
  }

  public addTag(keywords: string , description: string, isFollow: boolean){
    this.metaService.addTags([
      {name: 'keywords', content: keywords},
      {name: 'description', content: description},
      {name: 'robots', content: isFollow ? 'index, follow' : 'noindex, nofollow'}
    ])
  }

}
