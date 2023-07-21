import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { loginForm, signupForm } from '../models/constants';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../shared/localStorage.utilis';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = false;
  role = '';
  token = '';
  username = '';
  constructor(private http: HttpClient) {
    this.auth = getLocalStorageItem('auth') || false;
    this.role = getLocalStorageItem('role') || '';
    this.token = getLocalStorageItem('token') || '';
    this.username = getLocalStorageItem('username') || '';
  }

  // login
  login(userData: loginForm): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/login`, userData);
  }

  // register
  registerUser(userData: signupForm): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/register`, userData);
  }
  updateLoginCredential(username: string, token: string, role: string): void {
    this.username = username;
    this.token = token;
    this.role = role;
    this.auth = true;
    setLocalStorageItem('token', token);
    setLocalStorageItem('auth', true);
    setLocalStorageItem('username', username);
    setLocalStorageItem('role', role);
  }

  // checking if user is logged in
  isUser(): boolean {
    if (this.auth && this.role == 'User' && this.token) {
      return true;
    }
    return false;
  }

  // checking for admin login
  isAdmin(): boolean {
    if (this.auth && this.role == 'Admin' && this.token) {
      return true;
    }
    return false;
  }

  // performing logout and removin data from ls
  logOut(): void {
    this.auth = false;
    this.role = '';
    this.username = '';
    this.token = '';
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    // this.toast.success('<p>Logout Successfull</p>', '', {
    //   enableHtml: true,
    // });
  }
}
