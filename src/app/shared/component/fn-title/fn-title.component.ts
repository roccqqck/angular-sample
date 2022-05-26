import { Component, OnInit ,Input, ChangeDetectorRef} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
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

  constructor(
    private favoriteService: FavoriteService,
    private changeDectorRef:ChangeDetectorRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.favoriteService.setCustId(this.authService.getCustId());
    this.getFavorite();
  }

  getFavorite(){
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
    this.favoriteService.setFunctionId(this.fnctId);

    if(this.isFavorite==true){
       this.favoriteService.setType("A");
       this.editStarFavorite();
      //  this.favoriteClass="fas fa-star fontGreen2";
    }else{
      this.favoriteService.setType("D");
      this.editStarFavorite();
      // this.favoriteClass="far fa-star";
    }
  }

  editStarFavorite(){
    this.favoriteService.editStarFavorite().subscribe(
      (data) => {
        if(data.success == true){
          if(this.isFavorite==true){
            this.favoriteClass="fas fa-star fontGreen2";
          }else{
            this.favoriteClass="far fa-star";
          }
        }
         //變化檢測>刷新畫面
         this.changeDectorRef.markForCheck();
         this.changeDectorRef.detectChanges();
      }
    );
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
