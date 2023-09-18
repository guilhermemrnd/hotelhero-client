import { Component, Input, OnInit } from '@angular/core';

import { Library } from '../../../shared/moment-utils';
import { JSONService } from '../../../services/json.service';
import { UtilsService } from './../../../services/utils.service';
import { APIHotel } from './../../../api/hotels/hotel.model';
import { Hotel } from './../../../interfaces/hotel';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss']
})
export class HotelCardComponent implements OnInit {
  @Input() hotel: APIHotel;

  constructor(
    private jsonService: JSONService,
    private utilService: UtilsService
  ) {}

  ngOnInit() {}

  public toggleFavorite(hotel: Hotel) {
    hotel.isFavorite = !hotel.isFavorite;
    this.jsonService.toggleFavorite(hotel).subscribe({
      error: (e) => console.error('Error updating favorite status', e)
    });
  }

  public getTotalStayPrice(price: number): number {
    const { checkIn, checkOut } = JSON.parse(sessionStorage.getItem('searchForm'));
    const nights = this.utilService.calcTotalNights(checkIn, checkOut);
    return this.utilService.calcDailyPrices(nights, price);
  }
}
