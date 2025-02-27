import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  private apiUrl = 'http://localhost:5000/api'; // เปลี่ยนเป็น URL ของ Backend

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  //  เปิดบัญชีใหม่
  openAccount(accountData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/account/open`, accountData, this.getHeaders());
  }

  //  ฝากเงิน
  deposit(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/transaction/deposit`, data, this.getHeaders());
  }

  //  ถอนเงิน
  withdraw(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/transaction/withdraw`, data, this.getHeaders());
  }

  //  โอนเงิน
  transfer(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/transaction/transfer`, data, this.getHeaders());
  }

  //  ดูยอดเงิน
  getBalance(): Observable<any> {
    return this.http.get(`${this.apiUrl}/transaction/balance`, this.getHeaders());
  }

  //  ดูประวัติธุรกรรม
  getTransactionHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/transaction/history`, this.getHeaders());
  }
}
