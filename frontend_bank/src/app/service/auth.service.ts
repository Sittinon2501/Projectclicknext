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
  private currentUserSubject = new BehaviorSubject<any>(
    this.getUserFromLocalStorage()
  );
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(username: string, password: string, accountName: string, accountType: string, initialDeposit: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      username,
      password,
      accountName,
      accountType,
      initialDeposit
    });
  }
  

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      map((response: any) => {
        if (typeof window !== 'undefined' && response.token) {
          localStorage.setItem('token', response.token);
          this.setCurrentUserFromToken(response.token); // ดึงข้อมูล user จาก token
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

  isAuthenticated(): boolean {
    return typeof window !== 'undefined' ? !!this.getToken() : false;
  }

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

  // ฟังก์ชันที่จะใช้ดึงข้อมูลผู้ใช้จาก localStorage เมื่อหน้าโหลดขึ้น
  private getUserFromLocalStorage(): any {
    if (typeof window !== 'undefined') {
      const token = this.getToken();
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
          return {
            userId: decodedToken.userId,
            username: decodedToken.username,
          };
        } catch (error) {
          console.error('Error decoding token on app load:', error);
        }
      }
    }
    return null;
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
}
