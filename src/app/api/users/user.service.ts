import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cacheable } from '../../shared/cacheable.decorator';
import { BaseService } from '../base.service';

import { APIUser } from './user.model';
import { APIBooking } from '../bookings/booking.model';
import { UserInputReq } from '../interfaces/user-input-req';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<APIUser> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public createUser(item: UserInputReq) {
    return this.create(item, 'users', false);
  }

  @Cacheable()
  public checkEmail(email: string): Observable<{ exists: boolean }> {
    const url = `${this.API}/users/check-email`;
    return this.httpClient.post<{ exists: boolean }>(url, { email });
  }

  public getUser(id: string): Observable<APIUser> {
    return this.getOne(id, 'users', true);
  }

  public getUsers(): Observable<APIUser[]> {
    return this.getAll('users', false);
  }

  public getUserBookings(id: string): Observable<APIBooking[]> {
    const { url, options } = this.getUrlAndOptions(`users/${id}/bookings`, true);
    return this.httpClient.get<APIBooking[]>(url, options);
  }

  public updateUser(id: string, item: UserInputReq) {
    return this.update(id, item, 'users', true);
  }

  public toggleFavorite(userId: string, hotelId: number, isFavorite: boolean) {
    const url = `${this.API}/users/${userId}/favorite-hotels/${hotelId}`;
    const [params, options] = [{ isFavorite }, { withCredentials: true }];
    return this.httpClient.patch<{ message: string }>(url, params, options);
  }

  public deleteUser(id: string): Observable<{ message: string }> {
    return this.delete(id, 'users', true);
  }
}
