import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';
import { Register } from '../_Interfaces/register';

@Component({
  selector: 'app-register',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerdata: Register = { username: "", email: "", password: "", confirmPassword: "" }
  constructor(private auth: AuthServiceService, private router: Router) { }

  register() {
    this.auth.Register(this.registerdata).subscribe({
      next: () => {
        this.router.navigate(['/login'])
      },
      error: err => {

      }
    })
  }
}
