import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  private apiUrl = 'http://localhost:5000/api/notifications';

  constructor(private http: HttpClient) {}

  // ฟังก์ชันดึงการแจ้งเตือนทั้งหมดของผู้ใช้
  getNotifications(): Observable<any> {
    return this.http.get<any>(this.apiUrl);  // ทำการเรียก API ดึงการแจ้งเตือน
  }

  // ฟังก์ชันทำการทำเครื่องหมายว่าอ่านการแจ้งเตือนแล้ว
  markAsRead(notificationId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${notificationId}/read`, {});  // การอัพเดตสถานะเป็น "อ่านแล้ว"
  }

  // ฟังก์ชันลบการแจ้งเตือน (optional ถ้าต้องการลบการแจ้งเตือนหลังจากอ่านแล้ว)
  deleteNotification(notificationId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${notificationId}`);
  }
}
