import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  message: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(): void {

    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>(
      'http://127.0.0.1:8000/auth/login',
      loginData
    ).subscribe({

      next: (response: any) => {

        // Save Login Details
        localStorage.setItem(
          'token',
          response.access_token
        );

        // Save Username
        localStorage.setItem(
          'username',
          this.username
        );

        // Save Role
        localStorage.setItem(
          'role',
          response.role || 'Administrator'
        );

        // Save Login Date & Time
        localStorage.setItem(
          'loginDate',
          new Date().toLocaleString()
        );

        this.message = 'Login Successful';

        setTimeout(() => {

          this.router.navigate([
            '/app/dashboard'
          ]);

        }, 500);

      },

      error: () => {

        this.message =
          'Invalid username or password';

      }

    });

  }

}