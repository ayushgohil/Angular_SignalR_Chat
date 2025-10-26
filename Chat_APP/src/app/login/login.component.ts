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
export class LoginComponent implements OnInit {


  ngOnInit(): void {
    localStorage.clear();
  }
  credentials: LoginModel = { Username: '', Password: '' };
  invalidLogin = false;

  constructor(private auth: AuthServiceService, private router: Router) { }

  login = (form: NgForm) => {
    this.auth.Login(this.credentials).subscribe({
      next: (response) => {
        debugger;
        this.auth.saveToken(response.token);
        this.auth.saveCredentials(response.userCredentials);
        this.invalidLogin = false;
        this.router.navigate(['/mainmodule'])
      },
      error: err => {
        this.invalidLogin = true;
      }
    })
  }

}
