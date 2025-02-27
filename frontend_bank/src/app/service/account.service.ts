import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = 'http://localhost:5000/api/accounts'; // API URL ของ backend

  constructor(private http: HttpClient) {}

  openAccount(accountData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/open`, accountData);
  }
}
