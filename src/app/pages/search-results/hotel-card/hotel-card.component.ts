import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { Store } from '@ngxs/store';
import { SearchFormState } from './../../../core/store/search-form.state';

import { AuthService } from './../../../auth/auth.service';
import { HotelService } from './../../../api/hotels/hotel.service';
import { UserService } from './../../../api/users/user.service';
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

  constructor(
    private authService: AuthService,
    private hotelService: HotelService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {}

  public goToHotelDetails(hotelId: number): void {
    this.spinner.show();

    const userId = this.authService.userId;
    const formData: SearchForm = this.store.selectSnapshot(SearchFormState);
    const params = Utils.buildHotelDetailsParams(formData, hotelId, userId);

    this.hotelService.getHotelDetails(params).subscribe({
      next: () => {
        this.spinner.hide();
        this.router.navigate(['/hotel-details', hotelId]);
      },
      error: (err) => {
        console.error('Failed to get hotel details', err);
        alert('Something went wrong, please try again later');
      }
    });
  }

  public toggleFavorite(hotel: APIHotel) {
    if (!this.authService.isLoggedIn) {
      return alert('You must be logged in to favorite hotels');
    }

    const userId = this.authService.userId;
    hotel.isFavorite = !hotel.isFavorite;

    this.userService.toggleFavorite(userId, hotel.id, hotel.isFavorite).subscribe({
      error: (err) => console.error('Failed to favorite hotel', err)
    });
  }

  public getTotalStayPrice(price: number): number {
    const formData: SearchForm = this.store.selectSnapshot(SearchFormState);
    const totalNights = Utils.calcTotalNights(formData.checkIn, formData.checkOut);
    return Utils.calcDailyPrices(totalNights, price);
  }
}
