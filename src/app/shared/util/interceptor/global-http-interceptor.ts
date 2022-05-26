import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {

  constructor(
   private  authService:AuthService
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //
    const newRequest = req.clone({ setHeaders: {authorization: "Bearer "+this.authService.getToken()}});
    return next.handle(newRequest);
  }
}
