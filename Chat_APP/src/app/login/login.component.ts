import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginModel } from '../_Interfaces/login-model';
import { AuthServiceService } from '../Services/auth-service.service';
import { AuthenticateResponse } from '../_Interfaces/authenticate-reponse';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials: LoginModel = { username: '', password: '' };
  invalidLogin = false;

  constructor(private auth: AuthServiceService, private router: Router) { }

  login = (form: NgForm) => {
    this.auth.Login(this.credentials).subscribe({
      next: (response) => {
        localStorage.setItem("jwt", response.token);
        this.invalidLogin = false;
        this.router.navigate(['/dashboard'])
      },
      error: err => {
        this.invalidLogin = true;
      }
    })
  }

}
