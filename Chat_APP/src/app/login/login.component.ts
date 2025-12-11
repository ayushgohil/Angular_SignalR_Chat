import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginModel } from '../_Interfaces/login-model';
import { AuthServiceService } from '../Services/auth-service.service';
import { AuthenticateResponse } from '../_Interfaces/authenticate-reponse';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  showPassword = false;

  ngOnInit(): void {
    localStorage.clear();
    this.ngxService.stop();
  }
  credentials: LoginModel = { Username: '', Password: '' };
  invalidLogin = false;

  constructor(private auth: AuthServiceService, private router: Router, private ngxService: NgxUiLoaderService) { }

  login = (form: NgForm) => {
    this.ngxService.start();
    this.auth.Login(this.credentials).subscribe({
      next: (response) => {
        debugger;
        this.auth.saveToken(response.token);
        this.auth.saveCredentials(response.userCredentials);
        this.invalidLogin = false;
        this.router.navigate(['/mainmodule']);
      },
      error: err => {
        this.invalidLogin = true;
      }
    })
  }

}
