import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';

import { environment } from './../../environments/environment';
import { IsAuthenticatedRes } from '../api/interfaces/is-authenticated-res';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API = environment.apiURL;

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedIn.asObservable();

  private _userId = new BehaviorSubject<string>(null);
  public userId$ = this._userId.asObservable();

  constructor(private http: HttpClient) {
    this.isAuthenticated().subscribe((res) => {
      if (res.authenticated) {
        this._userId.next(res.userId);
        this._isLoggedIn.next(true);
      }
    });
  }

  public login(email: string, password: string, rememberMe: boolean) {
    const { url, options } = this.getUrlAndOptions('auth/login', true);
    const credentials = { email, password, rememberMe };
    return this.http.post(url, credentials, options).pipe(tap(() => this._isLoggedIn.next(true)));
  }

  public logout(): void {
    const { url, options } = this.getUrlAndOptions('auth/logout', true);
    this.http
      .post(url, {}, options)
      .pipe(tap(() => this._isLoggedIn.next(false)))
      .subscribe(() => {
        window.location.href = '/login';
      });
  }

  public isAuthenticated(): Observable<IsAuthenticatedRes> {
    const { url, options } = this.getUrlAndOptions('auth/check', true);
    return this.http.get<IsAuthenticatedRes>(url, options);
  }

  private getUrlAndOptions(path: string, useCredentials: boolean, id?: string) {
    const url = id ? `${this.API}/${path}/${id}` : `${this.API}/${path}`;
    const options = useCredentials ? { withCredentials: true } : {};
    return { url, options };
  }
}
