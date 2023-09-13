import { Component, OnInit } from '@angular/core';

import { Hotel } from './../../interfaces/hotel';
import { BookingDetails } from './../../interfaces/booking-details';
import { HotelService } from './../../services/hotel.service';
import { Library } from './../../shared/library';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
  reservation: BookingDetails;

  hotel: Hotel;

  constructor(private hotelService: HotelService) {}

  ngOnInit() {
    this.reservation = this.hotelService.getBookingDetails();

    this.hotelService.getHotelById(this.reservation.hotelID).subscribe((data) => {
      this.hotel = data;
    });
  }

  public getFormattedDates(): string {
    const checkIn = Library.momentDate(this.reservation?.checkIn);
    const checkOut = Library.momentDate(this.reservation?.checkOut);

    const sameYear = checkIn.isSame(checkOut, 'year');
    const sameMonth = checkIn.isSame(checkOut, 'month');

    if (sameYear && sameMonth) {
      return `${checkIn.format('MMMM D')} - ${checkOut.format('D, YYYY')}`;
    } else if (sameYear && !sameMonth) {
      return `${checkIn.format('MMMM D')} - ${checkOut.format('MMMM D, YYYY')}`;
    } else {
      return `${checkIn.format('MMMM D, YYYY')} - ${checkOut.format('MMMM D, YYYY')}`;
    }
  }
}
