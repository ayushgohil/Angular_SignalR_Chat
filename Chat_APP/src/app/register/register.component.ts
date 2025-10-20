import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';
import { Register } from '../_Interfaces/register';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // registerForm: FormGroup;
  registerForm!: FormGroup;


  constructor(private auth: AuthServiceService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  register() {
    if (this.registerForm.valid) {
      debugger;
      const formData = this.registerForm.value;
      debugger;

      const registerData: Register = {
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        Email: formData.Email,
        Password: formData.Password,
        PhoneNo: formData.PhoneNo.toString()
      };

      this.auth.Register(registerData).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: err => {
          console.error('Registration failed:', err);
        }
      });
    } else {
      console.log('Form is invalid.');
    }
  }

}

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
  const password = control.get('Password');
  const confirmPassword = control.get('ConfirmPassword');

  if (!password || !confirmPassword) {
    return null; // Controls not found
  }

  return password.value === confirmPassword.value ? null : { passwordMismatch: true };
};
