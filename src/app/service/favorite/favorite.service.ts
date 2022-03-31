import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { favorite } from 'src/app/shared/model/favorite.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  APIURL: string = environment.APIURL_FAVORITE;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization':'test'
    })
  };

  APIBODY = {
    "header": {
      "additionalProp1": "test",
      "additionalProp2": "test",
      "additionalProp3": "test"
    },
    "body": {
      "custId": "A1231231230"
    }
  }

  constructor(public http: HttpClient) { }//取得圖形驗證碼



  getFavorite(): Observable<favorite> {
    return this.http.post<favorite>(this.APIURL, this.APIBODY, this.httpOptions).pipe(
      tap((response) => {
        console.log("getFavorite", response);
        return response;
      }),
      // catchError(this.handleError)
    )
  }






}
