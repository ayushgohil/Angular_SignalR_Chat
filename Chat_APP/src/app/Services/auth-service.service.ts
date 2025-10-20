import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../_Interfaces/login-model';
import { Observable } from 'rxjs';
import { Register } from '../_Interfaces/register';
import { AuthenticateResponse } from '../_Interfaces/authenticate-reponse';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiurl = 'https://localhost:7039/api/'
  constructor(private http: HttpClient) { }

  Login(dto: LoginModel): Observable<AuthenticateResponse> {
    return this.http.post<AuthenticateResponse>(`${this.apiurl}Authenticate/login`, dto);
  }

  Register(dto: Register): Observable<AuthenticateResponse> {
    return this.http.post<AuthenticateResponse>(`${this.apiurl}Authenticate/register`, dto);
  }

  logout(): void {
    localStorage.removeItem("jwt")
  }

  getToken(): string | null {
    return localStorage.getItem("jwt");
  }
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    else {
      return true;
    }
  }
}