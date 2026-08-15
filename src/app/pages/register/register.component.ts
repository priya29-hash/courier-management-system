import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;

  message = '';

  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {

    this.registerForm = this.fb.group({

      username: ['', Validators.required],

      full_name: ['', Validators.required],

      role: ['Employee', Validators.required],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]

    });

  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  register() {

    if (this.registerForm.invalid) {
      this.message = "Please fill all fields";
      return;
    }

    this.http.post<any>(
      "http://127.0.0.1:8000/auth/register",
      this.registerForm.value
    )
    .subscribe({

      next: () => {

        this.message = "Registration Successful";

        this.registerForm.reset();

        setTimeout(() => {

          this.router.navigate(['/']);

        }, 1500);

      },

      error: (err) => {

        if (err.status == 400) {

          this.message = "Username already exists";

        } else {

          this.message = "Registration Failed";

        }

      }

    });

  }

}