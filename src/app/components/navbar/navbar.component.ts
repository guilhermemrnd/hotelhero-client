import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { Utils } from './../../services/utils.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public loggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loggedIn = Utils.checkLoggedIn();
  }

  public logout(): void {
    this.authService.logout();
  }
}
