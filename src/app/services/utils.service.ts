import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { ReservationDetails } from '../interfaces/reservation-details';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() {}

  public getFormData(): ReservationDetails {
    return JSON.parse(localStorage.getItem('searchForm'));
  }

  public setFormData(data: ReservationDetails): void {
    localStorage.setItem('searchForm', JSON.stringify(data));
  }

  public calcTotalNights(dateOne: Date | string, dateTwo: Date | string): number {
    const [checkIn, checkOut] = [moment(dateOne), moment(dateTwo)];
    const nights = checkOut.diff(checkIn, 'days');
    return nights;
  }

  public calcDailyPrices(nights: number, price: number): number {
    return nights <= 1 ? price : price * nights;
  }
}
