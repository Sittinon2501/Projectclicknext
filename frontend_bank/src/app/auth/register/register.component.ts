import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
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
  message: string = '';

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
        next: (res) => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.message = 'Error registering user: ' + err.message;
        },
      });
  }
}
