import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, tap } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(res => {
        console.log("call api success, request :", request)

        console.log("call api success :", res)
      }),
      catchError(err => {
        console.log("error interceptor:", err.status)
        if (err.status === 404) {
          // redirect to some page
          this.router.navigate(['/PageNotFound']);
        } else if (err.status === 400) {
          this.router.navigate(['/']);
        }
        else if (err.status === 500) {
          this.router.navigate(['/PageNotFound']);
        }
        const error = err.error || err.statusText;
        return throwError(error);
      }))
  }
}
