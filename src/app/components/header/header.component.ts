import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  username: string = localStorage.getItem('username') || 'Admin';

  role: string = localStorage.getItem('role') || 'Administrator';

  loginDate: string = localStorage.getItem('loginDate') || new Date().toLocaleString();

  showProfile: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {

    this.username = localStorage.getItem('username') || 'Admin';

    this.role = localStorage.getItem('role') || 'Administrator';

    this.loginDate =
      localStorage.getItem('loginDate') || new Date().toLocaleString();

  }

  toggleProfile(): void {

    this.showProfile = !this.showProfile;

  }

  logout(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('loginDate');

    this.router.navigate(['/login']);

  }

}