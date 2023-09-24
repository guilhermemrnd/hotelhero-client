import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Subscription, filter } from 'rxjs';

import { Store } from '@ngxs/store';
import { CheckAuth } from './core/store/auth.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'hotelhero';

  private scrollSubscription: Subscription;

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new CheckAuth());

    this.scrollSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.viewportScroller.scrollToPosition([0, 0]);
      });
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }
}
