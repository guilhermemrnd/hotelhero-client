import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseService } from '../base.service';
import { APIUser } from './user.model';
import { APIBooking } from '../bookings/booking.model';
import { APIPostResponse } from '../api-post-response';
import { UserInputReq } from '../interfaces/user-input-req';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public createUser(item: UserInputReq): Observable<APIPostResponse<APIUser>> {
    return this.create(item, 'users', false);
  }

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

  public updateUser(id: string, item: UserInputReq): Observable<APIPostResponse<APIUser>> {
    return this.update(id, item, 'users', true);
  }

  public deleteUser(id: string): Observable<{ message: string }> {
    return this.delete(id, 'users', true);
  }
}
