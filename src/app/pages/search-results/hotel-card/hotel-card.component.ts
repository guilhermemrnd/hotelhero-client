import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

import { Hotel } from './../../../interfaces/hotel';
import { HotelService } from './../../../services/hotel.service';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss']
})
export class HotelCardComponent implements OnInit {
  @Input() hotel: Hotel;

  constructor(private hotelService: HotelService) {}

  ngOnInit() {}

  public toggleFavorite(hotel: Hotel) {
    hotel.isFavorite = !hotel.isFavorite;
    this.hotelService.toggleFavorite(hotel).subscribe({
      error: (e) => console.error('Error updating favorite status', e)
    });
  }

  public getTotalPrice(price: number): number {
    const formData = this.hotelService.getFormData();
    const checkIn = moment(formData.checkIn);
    const checkOut = moment(formData.checkOut);
    const nights = checkOut.diff(checkIn, 'days');

    if (nights <= 1) {
      return price;
    }

    return price * nights;
  }
}
