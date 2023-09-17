import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseService } from '../base.service';
import { APIHotel } from './hotel.model';
import { APIBooking } from '../bookings/booking.model';
import { APIResponse } from '../api-response';
import { HotelDetailsRequest } from '../interfaces/hotel-details-request';

@Injectable({ providedIn: 'root' })
export class HotelService extends BaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  // TODO: Create a type for the item parameter
  public createHotel(item: unknown): Observable<APIResponse<APIHotel>> {
    return this.create(item, 'hotels', true);
  }

  public getHotelDetails(item: HotelDetailsRequest): Observable<APIHotel> {
    const url = `${this.API}/hotels/details`;
    const params = this.createQueryParams(item);
    return this.httpClient.get<APIHotel>(url, { params });
  }

  public getHotels(): Observable<APIHotel[]> {
    return this.getAll('hotels', false);
  }

  public getHotelBookings(id: string): Observable<APIBooking[]> {
    const { url, options } = this.getUrlAndOptions(`hotels/${id}/bookings`, true);
    return this.httpClient.get<APIBooking[]>(url, options);
  }

  public updateHotel(id: string, item: unknown): Observable<APIResponse<APIHotel>> {
    return this.update(id, item, 'hotels', true);
  }

  public deleteHotel(id: string): Observable<{ message: string }> {
    return this.delete(id, 'hotels', true);
  }
}
