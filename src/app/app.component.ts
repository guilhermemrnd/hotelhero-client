import { Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { CheckAuth } from './core/store/auth.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hotelhero';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new CheckAuth());
  }
}
