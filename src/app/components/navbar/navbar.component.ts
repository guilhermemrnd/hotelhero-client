import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.subscription = this.authService.isLoggedIn$.subscribe(
      (loggedIn) => (this.isLoggedIn = loggedIn)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
