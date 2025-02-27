import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: false,
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  message: string = '';

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  // ฟังก์ชันเพื่อดึงการแจ้งเตือน
  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (res) => {
        this.notifications = res.notifications;  // ดึงข้อมูลการแจ้งเตือนมาเก็บในตัวแปร
      },
      error: (err) => {
        this.message = 'Error fetching notifications';
        console.error('Error fetching notifications:', err);
      }
    });
  }

  // ฟังก์ชันในการทำเครื่องหมายว่าอ่านแล้ว
  markAsRead(notificationId: string): void {
    this.notificationService.markAsRead(notificationId).subscribe({
      next: () => {
        this.loadNotifications();  // รีเฟรชการแจ้งเตือน
      },
      error: (err) => {
        console.error('Error marking notification as read:', err);
      }
    });
  }

  // ฟังก์ชันในการลบการแจ้งเตือน
  deleteNotification(notificationId: string): void {
    this.notificationService.deleteNotification(notificationId).subscribe({
      next: () => {
        this.loadNotifications();  // รีเฟรชการแจ้งเตือน
      },
      error: (err) => {
        console.error('Error deleting notification:', err);
      }
    });
  }
}