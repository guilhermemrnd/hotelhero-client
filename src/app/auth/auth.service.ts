import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API = environment.apiURL;

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient) {
    this.isAuthenticated().subscribe((loggedIn) => {
      if (loggedIn) this._isLoggedIn.next(true);
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

  public isAuthenticated(): Observable<boolean> {
    const { url, options } = this.getUrlAndOptions('auth/check', true);
    return this.http.get<any>(url, options).pipe(
      map((res) => (res.authenticated ? true : false)),
      catchError((err) => of(false))
    );
  }

  private getUrlAndOptions(path: string, useCredentials: boolean, id?: string) {
    const url = id ? `${this.API}/${path}/${id}` : `${this.API}/${path}`;
    const options = useCredentials ? { withCredentials: true } : {};
    return { url, options };
  }
}
