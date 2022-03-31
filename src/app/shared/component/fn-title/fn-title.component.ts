import { Component, OnInit ,Input, ChangeDetectorRef} from '@angular/core';
import { FavoriteService } from 'src/app/service/favorite/favorite.service';

@Component({
  selector: 'app-fn-title',
  templateUrl: './fn-title.component.html',
  styleUrls: ['./fn-title.component.css']
})
export class FnTitleComponent implements OnInit {

  @Input() title = '';
  @Input() fnctId= '';

  favoriteClass:string="far fa-star";

  isFavorite:boolean=false;

  constructor(private favoriteService: FavoriteService,private changeDectorRef:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.favoriteService.getFavorite().subscribe(
      (data) => {
        console.log("favorite.Service:",data.clientResponse.functionList)
        data.clientResponse.functionList.forEach((item)=>{
          if (item.functionId==this.fnctId){
            console.log("是常用功能",this.fnctId)
            this.isFavorite=true;
            this.favoriteClass="fas fa-star fontGreen2"
          }
        })

         //變化檢測>刷新畫面
         this.changeDectorRef.markForCheck();
         this.changeDectorRef.detectChanges();
      }


    );
  }



  //我的最愛功能（暫時）
  onFavoriteChange(){
    this.isFavorite=!this.isFavorite;
    if(this.isFavorite==true){
       this.favoriteClass="fas fa-star fontGreen2"
    }else{
       this.favoriteClass="far fa-star"
    }
  }

  //取得icon class
  // getFavoriteClass(){
  //   if(this.isFavorite==true){
  //     return "fas fa-star fontGreen2"
  //   }else{
  //     return "far fa-star"
  //   }
  // }
}
