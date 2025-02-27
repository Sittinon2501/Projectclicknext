import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode'; // ใช้ jwt-decode สำหรับถอดรหัส JWT
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        this.setCurrentUserFromToken(token); // ✅ ดึงข้อมูล user จาก token
      }
    }
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      map((response: any) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', response.token);
          this.setCurrentUserFromToken(response.token); // ✅ ดึงข้อมูล user จาก token
        }
        return response;
      })
    );
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      this.currentUserSubject.next(null);
    }
  }

  getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return typeof window !== 'undefined' ? !!this.getToken() : false;
  }

  // ✅ ฟังก์ชันถอดรหัส JWT และดึง userId, username
  private setCurrentUserFromToken(token: string): void {
    try {
      const decodedToken: any = jwtDecode(token);
      this.currentUserSubject.next({
        userId: decodedToken.userId,
        username: decodedToken.username,
      });
    } catch (error) {
      console.error('Error decoding token:', error);
      this.currentUserSubject.next(null);
    }
  }
}
