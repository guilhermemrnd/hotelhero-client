import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Utils } from '../services/utils.service';
import { environment } from '../../environments/environment';
import { IsAuthenticatedRes } from '../api/interfaces/is-authenticated-res';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API = environment.apiURL;

  constructor(private http: HttpClient) {
    this.isAuthenticated().subscribe((res) => {
      Utils.saveToLocalStorage(Utils.USER_ID_KEY, res.userId);
      Utils.saveToLocalStorage(Utils.LOGGED_IN_KEY, res.authenticated);
    });
  }

  public login(email: string, password: string, rememberMe: boolean) {
    const { url, options } = this.getUrlAndOptions('auth/login', true);
    const credentials = { email, password, rememberMe };
    return this.http.post(url, credentials, options);
  }

  public logout(): void {
    const { url, options } = this.getUrlAndOptions('auth/logout', true);
    this.http.post(url, {}, options).subscribe(() => {
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
