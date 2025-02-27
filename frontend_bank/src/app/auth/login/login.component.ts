import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.authService.login(credentials.username, credentials.password).subscribe({
      next: (res) => {
        // เมื่อล็อกอินสำเร็จ
        this.router.navigate(['/home']);  // พาผู้ใช้ไปที่ Dashboard หรือหน้าอื่น ๆ
      },
      error: (err) => {
        this.message = 'Invalid credentials or server error';
      }
    });
  }
}