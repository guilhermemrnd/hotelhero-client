import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Hotel } from '../interfaces/hotel';
import { ReservationDetails } from '../interfaces/reservation-details';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private readonly API = 'http://localhost:3000';

  private bookingDetails: ReservationDetails;

  constructor(private http: HttpClient) {}

  public setBookingDetails(details: ReservationDetails): void {
    this.bookingDetails = details;
  }

  public getBookingDetails(): ReservationDetails {
    return this.bookingDetails;
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
}
