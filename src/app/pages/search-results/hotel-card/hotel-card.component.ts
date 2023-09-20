import { Component, Input, OnInit } from '@angular/core';

import { UserService } from 'src/app/api/users/user.service';
import { Utils } from './../../../services/utils.service';

import { APIHotel } from './../../../api/hotels/hotel.model';
import { SearchForm } from 'src/app/interfaces/search-form';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss']
})
export class HotelCardComponent implements OnInit {
  @Input() hotel: APIHotel;

  constructor(private userService: UserService) {}

  ngOnInit() {}

  public toggleFavorite(hotel: APIHotel) {
    if (!Utils.checkLoggedIn()) {
      return alert('You must be logged in to favorite hotels');
    }

    const userId = Utils.getLoggedInUserId();
    hotel.isFavorite = !hotel.isFavorite;

    this.userService.toggleFavorite(userId, hotel.id, hotel.isFavorite).subscribe({
      error: (err) => console.error('Failed to favorite hotel', err)
    });
  }

  public getTotalStayPrice(price: number): number {
    const formData = Utils.getFromLocalStorage<SearchForm>(Utils.SEARCH_FORM_KEY);
    const nights = Utils.calcTotalNights(formData.checkIn, formData.checkOut);
    return Utils.calcDailyPrices(nights, price);
  }
}
