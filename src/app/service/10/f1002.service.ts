import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class F1002Service {

  private _isLoading: boolean = false;
  

  constructor() { }

  public get isLoading(): boolean {
    return this._isLoading;
  }
  public set isLoading(value: boolean) {
    this._isLoading = value;
  }
  
}
