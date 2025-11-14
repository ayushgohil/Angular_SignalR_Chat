import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../_Interfaces/login-model';
import { Observable } from 'rxjs';
import { Register } from '../_Interfaces/register';
import { AuthenticateResponse } from '../_Interfaces/authenticate-reponse';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiurl = 'https://localhost:7039/api/'
  constructor(private http: HttpClient, private router: Router) { }

  Login(dto: LoginModel): Observable<AuthenticateResponse> {
    return this.http.post<AuthenticateResponse>(`${this.apiurl}Authenticate/login`, dto);
  }

  Register(dto: Register): Observable<AuthenticateResponse> {
    return this.http.post<AuthenticateResponse>(`${this.apiurl}Authenticate/register`, dto);
  }

  logout(): void {
    localStorage.removeItem('jwt');
    console.log("there is some problem");
    this.router.navigate(['/login']);
  }

  saveToken(token: string) {
    localStorage.setItem('jwt', token);
  }
  saveCredentials(credentials: string) {
    localStorage.setItem('usercredentials', JSON.stringify(credentials));
  }
  getCredentials() {
    return JSON.parse(localStorage.getItem('usercredentials') || "");
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }
  isLoggedIn(): boolean {
    debugger;
    const token = this.getToken();
    if (!token)
      return false
    else
      return true;
    // Optionally check expiry
    // const payload = JSON.parse(atob(token.split('.')[1]));
    // return Date.now() / 1000 < payload.exp;
  }
}