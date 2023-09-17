import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseService } from '../base.service';
import { APIUser } from './user.interface';
import { APIBooking } from '../bookings/booking.interface';
import { APIResponse } from '../api-response';
import { UserInput } from './user-input.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public createUser(item: UserInput): Observable<APIResponse<APIUser>> {
    return this.create(item, 'users', false);
  }

  public checkEmail(email: string): Observable<{ exists: boolean }> {
    const { url, options } = this.getUrlAndOptions('users/check-email', false);
    return this.httpClient.post<{ exists: boolean }>(url, { email }, options);
  }

  public getUser(id: string): Observable<APIUser> {
    return this.getOne(id, 'users', true);
  }

  public getUsers(): Observable<APIUser[]> {
    return this.getAll('users', false);
  }

  public getUserBookings(id: string): Observable<APIBooking[]> {
    const { url, options } = this.getUrlAndOptions('users', true, id);
    return this.httpClient.get<APIBooking[]>(url, options);
  }

  public updateUser(id: string, item: UserInput): Observable<APIResponse<APIUser>> {
    return this.update(id, item, 'users', true);
  }

  public deleteUser(id: string): Observable<{ message: string }> {
    return this.delete(id, 'users', true);
  }
}
