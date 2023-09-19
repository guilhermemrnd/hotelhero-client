import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from './../../../auth/auth.service';
import { UserService } from 'src/app/api/users/user.service';
import { Utils } from './../../../services/utils.service';

import { APIHotel } from './../../../api/hotels/hotel.model';
import { Hotel } from './../../../interfaces/hotel';
@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss']
})
export class HotelCardComponent implements OnInit {
  @Input() hotel: APIHotel;

  public loggedIn: boolean;
  public userId: string;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) this.loggedIn = isLoggedIn;
    });

    this.authService.userId$.subscribe((userId) => {
      if (userId) this.userId = userId;
    });
  }

  public toggleFavorite() {
    if (!this.loggedIn) return alert('You must be logged in to favorite hotels');

    this.hotel.isFavorite = !this.hotel.isFavorite;
    this.userService.toggleFavorite(this.userId, this.hotel.id, this.hotel.isFavorite).subscribe({
      error: (err) => console.error('Failed to favorite hotel', err)
    });
  }

  public getTotalStayPrice(price: number): number {
    const { checkIn, checkOut } = Utils.fetchSearchForm();
    const nights = Utils.calcTotalNights(checkIn, checkOut);
    return Utils.calcDailyPrices(nights, price);
  }
}
