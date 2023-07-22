import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { conversationData } from '../models/constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  postMessage(userData: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService?.token}`
    );
    return this.http.post<any>(
      `${environment.apiUrl}/chat`,
      { query: userData },
      {
        headers,
      }
    );
  }

  postConversation(conversationData: conversationData): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService?.token}`
    );
    return this.http.post<any>(
      `${environment.apiUrl}/conversation/user`,
      conversationData,
      { headers }
    );
  }
  getConversation(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService?.token}`
    );
    return this.http.get<any>(`${environment.apiUrl}/conversation/user`, {
      headers,
    });
  }
  updateConversation(conversationData: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService?.token}`
    );
    return this.http.put<any>(
      `${environment.apiUrl}/conversation/user`,
      conversationData,
      { headers }
    );
  }
}
