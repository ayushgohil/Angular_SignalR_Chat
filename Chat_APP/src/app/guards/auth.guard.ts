// import { CanActivateFn } from '@angular/router';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };


import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthServiceService) { }

  canActivate(): boolean {
    debugger;
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
