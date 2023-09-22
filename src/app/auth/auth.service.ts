import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Store } from '@ngxs/store';
import { AuthState } from '../core/store/auth.state';

import { environment } from '../../environments/environment';
import { IsAuthenticatedRes } from '../api/interfaces/is-authenticated-res';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API = environment.apiURL;

  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  public login(email: string, password: string, rememberMe: boolean) {
    const { url, options } = this.getUrlAndOptions('auth/login', true);
    const credentials = { email, password, rememberMe };
    return this.http.post<{ message: string }>(url, credentials, options);
  }

  public logout() {
    const { url, options } = this.getUrlAndOptions('auth/logout', true);
    return this.http.post<{ message: string }>(url, {}, options);
  }

  public isAuthenticated() {
    const { url, options } = this.getUrlAndOptions('auth/check', true);
    return this.http.get<IsAuthenticatedRes>(url, options);
  }

  get isLoggedIn(): boolean {
    return this.store.selectSnapshot(AuthState.isLoggedIn);
  }

  get userId(): string {
    return this.store.selectSnapshot(AuthState.userId);
  }

  private getUrlAndOptions(path: string, useCredentials: boolean, id?: string) {
    const url = id ? `${this.API}/${path}/${id}` : `${this.API}/${path}`;
    const options = useCredentials ? { withCredentials: true } : {};
    return { url, options };
  }
}
