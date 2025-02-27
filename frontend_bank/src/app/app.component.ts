import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend_bank';
  isLoggedIn = false;
  username: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser.subscribe((user) => {
      this.isLoggedIn = !!user;
      this.username = user ? user.username : null;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
