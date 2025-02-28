import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  accountName: string = '';
  accountType: string = 'savings';
  initialDeposit: number = 1000;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const userData = {
      username: this.username,
      password: this.password,
      accountName: this.accountName,
      accountType: this.accountType,
      initialDeposit: this.initialDeposit,
    };

    this.authService
      .register(
        userData.username,
        userData.password,
        userData.accountName,
        userData.accountType,
        userData.initialDeposit
      )
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'You can now log in!',
            confirmButtonColor: '#6c5ce7',
          }).then(() => {
            this.router.navigate(['/login']);
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: err.message || 'Something went wrong. Please try again!',
            confirmButtonColor: '#d33',
          });
        },
      });
  }
}