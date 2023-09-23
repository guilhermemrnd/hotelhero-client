import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngxs/store';
import { SearchFormState } from './../../core/store/search-form.state';

import { BookingService } from './../../api/bookings/booking.service';
import { Library } from '../../shared/moment-utils';

import { APIBooking } from './../../api/bookings/booking.model';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
  reservation: APIBooking;
  destination: string;

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    const bookingId = this.route.snapshot.paramMap.get('bookingId');
    this.bookingService.getBookingById(bookingId).subscribe((data) => {
      this.reservation = data;
    });

    const { destination } = this.store.selectSnapshot(SearchFormState);
    this.destination = destination.name.split(',')[0];
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
