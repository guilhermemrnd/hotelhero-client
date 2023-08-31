import { Component, Input, OnInit } from '@angular/core';

import { Hotel } from './../../../interfaces/hotel';
import { HotelService } from './../../../services/hotel.service';
import { UtilsService } from './../../../services/utils.service';
import { Library } from './../../../shared/library';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss']
})
export class HotelCardComponent implements OnInit {
  @Input() hotel: Hotel;

  constructor(
    private hotelService: HotelService,
    private utilService: UtilsService
  ) {}

  ngOnInit() {}

  public toggleFavorite(hotel: Hotel) {
    hotel.isFavorite = !hotel.isFavorite;
    this.hotelService.toggleFavorite(hotel).subscribe({
      error: (e) => console.error('Error updating favorite status', e)
    });
  }

  public getTotalStayPrice(price: number): number {
    const { checkIn, checkOut } = this.utilService.getFormData();
    const nights = this.utilService.calcTotalNights(checkIn, checkOut);
    return this.utilService.calcDailyPrices(nights, price);
  }
}
