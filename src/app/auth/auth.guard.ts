import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

import { Store } from '@ngxs/store';
import { AuthState } from '../core/store/auth.state';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): boolean {
    return this.store.selectSnapshot(AuthState.isLoggedIn);
  }
}
