import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'isAuthenticated';
  private readonly USER_KEY = 'currentUser';
  authChanged = new EventEmitter<boolean>();

  constructor(private router: Router) {
    // Initialize from localStorage
    if (typeof window !== 'undefined') {
      const isAuth = localStorage.getItem(this.AUTH_KEY) === 'true';
      if (isAuth) {
        this.authChanged.emit(true);
      }
    }
  }

  login(email: string, password: string): boolean {
    // Simple authentication - in production, this would call an API
    // For now, accept any email/password combination
    if (email && password) {
      const user = { email, loginTime: new Date().toISOString() };
      localStorage.setItem(this.AUTH_KEY, 'true');
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      this.authChanged.emit(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    localStorage.removeItem(this.USER_KEY);
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
