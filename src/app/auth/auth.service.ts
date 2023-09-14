import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const token = localStorage.getItem('access_token');
    if (token) this._isLoggedIn.next(true);
  }

  public login(email: string, password: string) {
    return this.http
      .post<{ access_token: string }>(`${environment.apiURL}/login`, { email, password })
      .pipe(
        tap((res) => {
          localStorage.setItem('access_token', res.access_token);
          this._isLoggedIn.next(true);
        }),
        catchError((err) => {
          this._isLoggedIn.next(false);
          return throwError(() => new Error(err));
        })
      );
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    this._isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

  public refreshToken() {
    const oldToken = localStorage.getItem('access_token');
    return this.http
      .post<{ access_token: string }>(`${environment.apiURL}/refresh`, { oldToken })
      .pipe(
        tap((res) => {
          localStorage.setItem('access_token', res.access_token);
        }),
        catchError((err) => {
          this.logout();
          return throwError(() => new Error(err));
        })
      );
  }
}
