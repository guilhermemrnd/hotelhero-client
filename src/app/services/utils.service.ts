import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Library } from '../shared/moment-utils';
import { SearchForm } from '../interfaces/search-form';

@Injectable({
  providedIn: 'root'
})
export class Utils {
  static readonly LOGGED_IN_KEY = 'loggedIn';
  static readonly USER_ID_KEY = 'userId';
  static readonly SEARCH_FORM_KEY = 'searchForm';
  static readonly BOOKING_DETAILS_KEY = 'bookingDetails';

  constructor() {}

  public static saveToLocalStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static getFromLocalStorage<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key));
  }

  public static checkLoggedIn(): boolean {
    const loggedIn = this.getFromLocalStorage<boolean>(this.LOGGED_IN_KEY);
    return loggedIn === true;
  }

  public static getLoggedInUserId(): string | null {
    return this.getFromLocalStorage<string>(this.USER_ID_KEY);
  }

  public static formatDates(
    dateOne: Date | string,
    dateTwo: Date | string,
    abbreviated: boolean
  ): string {
    const [checkIn, checkOut] = [moment(dateOne), moment(dateTwo)];

    const sameMonth = checkIn.isSame(checkOut, 'month');
    const sameYear = checkIn.isSame(checkOut, 'year');

    const format = abbreviated ? 'MMM D' : 'MMMM D';

    if (sameYear && sameMonth) {
      return `${checkIn.format(format)} - ${checkOut.format('D')}`;
    } else if (sameYear && !sameMonth) {
      return `${checkIn.format(format)} - ${checkOut.format(format)}`;
    } else {
      return `${checkIn.format(`${format}, YYYY`)} - ${checkOut.format(`${format}, YYYY`)}`;
    }
  }

  public static calcTotalNights(dateOne: Date | string, dateTwo: Date | string): number {
    const [checkIn, checkOut] = [moment(dateOne), moment(dateTwo)];
    const nights = checkOut.diff(checkIn, 'days');
    return nights;
  }

  public static calcDailyPrices(nights: number, price: number): number {
    return nights <= 1 ? price : price * nights;
  }

  public static formatSearchFormForURL(formData: SearchForm): any {
    const destination = formData.destination.name.split(',')[0];
    const checkIn = Library.convertDate(formData.checkIn);
    const checkOut = Library.convertDate(formData.checkOut);
    return { destination, checkIn, checkOut, guests: formData.guests };
  }
}
