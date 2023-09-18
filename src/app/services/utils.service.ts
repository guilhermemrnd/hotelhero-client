import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Library } from '../shared/moment-utils';
import { SearchForm } from '../interfaces/search-form';

@Injectable({
  providedIn: 'root'
})
export class Utils {
  constructor() {}

  public static persistSearchForm(formData: SearchForm) {
    sessionStorage.setItem('searchForm', JSON.stringify(formData));
  }

  public static fetchSearchForm(): SearchForm {
    return JSON.parse(sessionStorage.getItem('searchForm'));
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

  public static formatQueryParams(formData: SearchForm): any {
    const destination = formData.destination.name.split(',')[0];
    const checkIn = Library.convertDate(formData.checkIn);
    const checkOut = Library.convertDate(formData.checkOut);
    return { destination, checkIn, checkOut, guests: formData.guests };
  }
}
