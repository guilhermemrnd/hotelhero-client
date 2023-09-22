import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Select, Store } from '@ngxs/store';
import { AuthState, Logout } from './../../../core/store/auth.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Select(AuthState.isLoggedIn) isLoggedIn$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit() {}

  public logout(): void {
    this.store.dispatch(new Logout());
  }

  public navigateToLogin(): void {
    window.location.href = '/login';
  }
}
