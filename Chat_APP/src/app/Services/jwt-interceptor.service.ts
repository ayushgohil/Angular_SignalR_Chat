import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';
import { catchError, throwError } from 'rxjs';
@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthServiceService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.auth.getToken();
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.auth.logout();
          console.log("didnt work")
        }
        return throwError(() => error);
      })
    );
  }
}