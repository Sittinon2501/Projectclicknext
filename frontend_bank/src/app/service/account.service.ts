import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = 'http://localhost:5000/api/accounts'; // API URL ของ backend

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  // เปิดบัญชี
  openAccount(accountData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/open`, accountData, this.getHeaders());
  }

  // ดึงข้อมูลบัญชีของผู้ใช้
  getUserAccounts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`, this.getHeaders());
  }
}
