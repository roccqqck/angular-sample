
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AppComponent } from '../app.component';
import { F1003Component } from '../pages/10/00/f1003/f1003.component';
    

    


export interface CanComponentDeactivate {
canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({providedIn: 'root'})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

    canDeactivate(
        component: CanComponentDeactivate,
        currentRoute: ActivatedRouteSnapshot, 
        currentState: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        return component.canDeactivate ? component.canDeactivate() : true;
    }

    isChangeNotSave:boolean=false;

    setIsChangeNotSave(isChangeNotSave:boolean){
        this.isChangeNotSave = isChangeNotSave;
    }
    getIsChangeNotSave() { return this.isChangeNotSave; }

}