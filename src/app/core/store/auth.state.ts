import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';

import { AuthService } from './../../auth/auth.service';

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: { email: string; password: string; rememberMe: boolean }) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class CheckAuth {
  static readonly type = '[Auth] Check Auth';
}

export interface AuthStateModel {
  isLoggedIn: boolean;
  userId: string | null;
}

@Injectable()
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    isLoggedIn: false,
    userId: null
  }
})
export class AuthState {
  constructor(private authService: AuthService) {}

  @Selector()
  static isLoggedIn(state: AuthStateModel): boolean {
    return state.isLoggedIn;
  }

  @Selector()
  static userId(state: AuthStateModel): string {
    return state.userId;
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    const { email, password, rememberMe } = action.payload;
    return this.authService.login(email, password, rememberMe).pipe(
      tap((result) => {
        ctx.patchState({ isLoggedIn: true });
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    return this.authService.logout().pipe(
      tap(() => {
        ctx.patchState({ isLoggedIn: false, userId: null });
      })
    );
  }

  @Action(CheckAuth)
  checkAuth(ctx: StateContext<AuthStateModel>) {
    return this.authService.isAuthenticated().pipe(
      tap((result) => {
        ctx.patchState({ isLoggedIn: result.authenticated, userId: result.userId });
      })
    );
  }
}
