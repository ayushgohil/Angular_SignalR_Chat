import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService {

  constructor(private auth: AuthServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set("Authentication", `Bearer ${token}`)
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}

