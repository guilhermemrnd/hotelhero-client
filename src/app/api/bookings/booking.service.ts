import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseService } from '../base.service';

import { APIBooking } from './booking.model';
import { CreateBookingReq } from '../interfaces/create-booking-req';
import { UpdateBookingReq } from '../interfaces/update-booking-req';

@Injectable({ providedIn: 'root' })
export class BookingService extends BaseService<APIBooking> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public createBooking(bookingDetails: CreateBookingReq) {
    return this.create(bookingDetails, 'bookings', true);
  }

  public getBookingById(id: string) {
    return this.getOne(id, 'bookings', true);
  }

  public updateBooking(id: string, bookingDetails: UpdateBookingReq) {
    return this.update(id, bookingDetails, 'bookings', true);
  }

  public finalizeBooking(bookingId: string, paymentId: string): Observable<APIBooking> {
    const url = `${this.API}/bookings/${bookingId}/finalize`;
    const [body, options] = [{ paymentId }, { withCredentials: true }];
    return this.httpClient.patch<APIBooking>(url, body, options);
  }

  // Missing implementation in the API
  public deleteBooking(id: string): Observable<{ message: string }> {
    return this.delete(id, 'bookings', true);
  }
}
