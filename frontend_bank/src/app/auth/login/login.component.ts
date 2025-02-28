import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // ✅ Import SweetAlert2

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false; // ✅ ตัวแปรควบคุมการแสดงรหัสผ่าน

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const credentials = { username: this.username, password: this.password };

    this.authService.login(credentials.username, credentials.password).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome to Online Banking!',
          timer: 2000,
          showConfirmButton: false
        });
        this.router.navigate(['/home']);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid credentials or server error',
          confirmButtonColor: '#ff7675'
        });
      }
    });
  }

  // ✅ ฟังก์ชัน Toggle ดูรหัสผ่าน
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
