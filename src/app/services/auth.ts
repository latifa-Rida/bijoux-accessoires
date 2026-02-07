import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'isAuthenticated';
  private readonly USER_KEY = 'currentUser';
  authChanged = new EventEmitter<boolean>();
  private apiUrl = '/api/login';

  constructor(private router: Router, private http: HttpClient) {
    // Initialize from localStorage
    if (typeof window !== 'undefined') {
      const isAuth = localStorage.getItem(this.AUTH_KEY) === 'true';
      if (isAuth) {
        this.authChanged.emit(true);
      }
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        console.log('Login Response:', response);
        if (response.success) {
          localStorage.setItem(this.AUTH_KEY, 'true');
          localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
          if (response.user.role === 'admin') {
            console.log('User is admin, setting token');
            localStorage.setItem('admin_token', response.token);
          } else {
            console.log('User is NOT admin:', response.user.role);
          }
          this.authChanged.emit(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem('admin_token');
    this.authChanged.emit(false);
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.AUTH_KEY) === 'true';
    }
    return false;
  }

  getCurrentUser(): any {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem(this.USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }
}
