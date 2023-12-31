import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseService } from '../base.service';
import { Cacheable } from '../../shared/cacheable.decorator';

import { APIHotel } from './hotel.model';
import { APIBooking } from '../bookings/booking.model';
import { APIRegion } from './region.model';
import { APIGetResponse } from './../api-get-response';
import { HotelDetailsReq } from '../interfaces/hotel-details-req';
import { SearchHotelsReq } from '../interfaces/search-hotels-req';

@Injectable({ providedIn: 'root' })
export class HotelService extends BaseService<APIHotel> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  // TODO: Create a type for the item parameter
  public createHotel(item: unknown) {
    return this.create(item, 'hotels', true);
  }

  @Cacheable()
  public getRegions(search: string): Observable<APIRegion[]> {
    const url = `${this.API}/regions?search=${search}`;
    return this.httpClient.get<APIRegion[]>(url);
  }

  @Cacheable()
  public getHotels(searchParams: SearchHotelsReq): Observable<APIGetResponse<APIHotel[]>> {
    const url = `${this.API}/hotels`;
    const params = this.createQueryParams(searchParams);
    return this.httpClient.get<APIGetResponse<APIHotel[]>>(url, { params });
  }

  @Cacheable()
  public getHotelById(id: string): Observable<APIHotel> {
    return this.getOne(id, 'hotels', false);
  }

  @Cacheable()
  public getHotelDetails(item: HotelDetailsReq): Observable<APIHotel> {
    const url = `${this.API}/hotels/detail`;
    const params = this.createQueryParams(item);
    return this.httpClient.get<APIHotel>(url, { params });
  }

  @Cacheable()
  public getHotelUnavailableDates(id: string): Observable<{ dates: string[] }> {
    const url = `${this.API}/hotels/${id}/unavailable-dates`;
    return this.httpClient.get<{ dates: string[] }>(url);
  }

  public getHotelBookings(id: string): Observable<APIBooking[]> {
    const { url, options } = this.getUrlAndOptions(`hotels/${id}/bookings`, true);
    return this.httpClient.get<APIBooking[]>(url, options);
  }

  // TODO: Create a type for the item parameter
  public updateHotel(id: string, item: unknown) {
    return this.update(id, item, 'hotels', true);
  }

  // Missing implementation in the API
  public deleteHotel(id: string): Observable<{ message: string }> {
    return this.delete(id, 'hotels', true);
  }
}
