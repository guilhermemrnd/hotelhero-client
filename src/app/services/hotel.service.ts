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

  constructor(private http: HttpClient) {}

  public setFormData(data: ReservationDetails): void {
    localStorage.setItem('searchForm', JSON.stringify(data));
  }

  public getFormData(): ReservationDetails {
    return JSON.parse(localStorage.getItem('searchForm'));
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
