import { Component, OnInit } from '@angular/core';

import { HotelService } from './../../services/hotel.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
  reservationDetails = {
    checkIn: '2023-04-26',
    checkOut: '2023-04-29',
    numberOfGuests: 2,
    hotelID: 1
  };

  hotel: any;

  constructor(private hotelService: HotelService) {}

  ngOnInit() {
    this.hotelService.getHotelById(this.reservationDetails.hotelID).subscribe((data) => {
      this.hotel = data;
    });
  }
}
