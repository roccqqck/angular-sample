import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { editStarFavorite, favorite } from 'src/app/shared/model/favorite.model';
import { API_COMMON_EDITUSRFNCTBYSTAR, API_COMMON_GETUSRFNCT, API_SETTING_HTTPOPTIONS } from 'src/app/shared/constants/api.constants'

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  
  custId!: string;
  type!: string;
  functionId!: string;
 
  
  constructor(
    public http: HttpClient
  ) { }


  /**
   * 查詢常用功能列表
   * @param custId 身分證/統編，含重複序號
   * @return {*}  {Observable<favorite>} 
   * functionList[{
   *  custid:客戶ID,functionId:功能代碼,seq:顯示順序
   * }]
   * @memberof FavoriteService
   */
  getFavorite(): Observable<favorite> {
    const APIBODY = {
      "header": {
        "additionalProp1": "test",
        "additionalProp2": "test",
        "additionalProp3": "test"
      },
      "body": {
        "custId": this.getCustId()
      }
    }
    return this.http.post<favorite>(API_COMMON_GETUSRFNCT, APIBODY, API_SETTING_HTTPOPTIONS).pipe(
      tap((response) => {
        console.log("getFavorite", response);
        return response;
      }),
      // catchError(this.handleError)
    )
  }

  /**
   * 修改常用功能(星號)
   * @param custId 身分證/統編，含重複序號
   * @param type 修改類別(A:新增 D:移除)
   * @param functionId 功能別代碼 ex:'F1003'
   * @return {*}  {Observable<editStarFavorite>}
   * @memberof FavoriteService
   */
  editStarFavorite(): Observable<editStarFavorite> {
    const APIBODY = {
      "header": {
        "additionalProp1": "test",
        "additionalProp2": "test",
        "additionalProp3": "test"
      },
      "body": {
        "custId": this.getCustId(),
        "type":this.getType(),
        "functionId":this.getFunctionId()
      }
    }
    return this.http.post<editStarFavorite>(API_COMMON_EDITUSRFNCTBYSTAR, APIBODY, API_SETTING_HTTPOPTIONS).pipe(
      tap((response) => {
        console.log("getFavorite", response);
        return response;
      }),
      // catchError(this.handleError)
    )
  }



  setCustId(custId: string) { 
    this.custId = custId;
  }
  setType(type: string){
    this.type = type;
  }
  setFunctionId(functionId: string){
    this.functionId = functionId;
  }

  getCustId(): string { return this.custId; }
  getType(): string { return this.type; }
  getFunctionId():string { return this.functionId; }

}
