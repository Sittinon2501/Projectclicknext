import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from './service/notification.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'frontend_bank';
  isLoggedIn = false;
  username: string | null = null;
  unreadNotificationsCount = 0; // ตัวแปรเก็บจำนวนการแจ้งเตือนที่ยังไม่ได้อ่าน

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      this.username = user ? user.username : null;
    });
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      // Subscribe to notifications$ เพื่ออัปเดตข้อมูลการแจ้งเตือน
      this.notificationService.notifications$.subscribe((notifications: any) => {
        this.unreadNotificationsCount = notifications.filter((notification: any) => !notification.isRead).length;
      });

      this.notificationService.getNotifications().subscribe((res: any) => {
        // อัปเดตข้อมูลการแจ้งเตือน
        this.notificationService.updateNotifications(res.notifications);
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}