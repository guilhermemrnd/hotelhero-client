import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { SearchForm } from '../interfaces/search-form';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() {}

  public getFormData(): SearchForm {
    return JSON.parse(localStorage.getItem('searchForm'));
  }

  public setFormData(data: SearchForm): void {
    localStorage.setItem('searchForm', JSON.stringify(data));
  }

  public formatDates(dateOne: Date | string, dateTwo: Date | string, abbreviated: boolean): string {
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

  public calcTotalNights(dateOne: Date | string, dateTwo: Date | string): number {
    const [checkIn, checkOut] = [moment(dateOne), moment(dateTwo)];
    const nights = checkOut.diff(checkIn, 'days');
    return nights;
  }

  public calcDailyPrices(nights: number, price: number): number {
    return nights <= 1 ? price : price * nights;
  }
}
