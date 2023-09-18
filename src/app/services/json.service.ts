import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { Hotel } from '../interfaces/hotel';
import { BookingDetails } from '../interfaces/booking-details';
import { PaymentForm } from '../interfaces/payment-form';
import { Library } from '../shared/moment-utils';

@Injectable({
  providedIn: 'root'
})
export class JSONService {
  private readonly API = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public setBookingDetails(details: BookingDetails): void {
    localStorage.setItem('bookingDetails', JSON.stringify(details));
  }

  public getBookingDetails(): BookingDetails {
    return JSON.parse(localStorage.getItem('bookingDetails'));
  }

  public getHotelList(formData: any): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.API}/hotels`, { params: formData });
  }

  public getHotelById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.API}/hotels/${id}`);
  }

  public toggleFavorite(hotel: Hotel): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.API}/hotels/${hotel.id}`, hotel);
  }

  public processPayment(payment: PaymentForm): Observable<any> {
    return payment ? of({ success: true }) : of({ success: false });
  }

  public createReservation(booking: BookingDetails): Observable<BookingDetails> {
    const createdAt = Library.getToday();
    const reservation = { ...booking, id: uuidv4(), createdAt, status: 'Confirmed' };

    return this.http.post<any>(`${this.API}/bookings`, reservation);
  }
}
