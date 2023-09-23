import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Library } from '../shared/moment-utils';
import { SearchForm } from '../interfaces/search-form';
import { HotelDetailsReq } from '../api/interfaces/hotel-details-req';

@Injectable({
  providedIn: 'root'
})
export class Utils {
  constructor() {}

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

  public static buildHotelDetailsParams(
    formData: SearchForm,
    hotelId: number,
    userId?: string
  ): HotelDetailsReq {
    const params = {
      hotelId: Number(hotelId),
      checkIn: Library.convertDate(formData.checkIn),
      checkOut: Library.convertDate(formData.checkOut),
      guests: formData.guests
    };

    return userId ? { ...params, userId } : params;
  }
}
