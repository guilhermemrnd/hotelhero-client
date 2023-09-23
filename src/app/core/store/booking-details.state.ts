import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';

import { BookingDetails } from '../../interfaces/booking-details';

export class SetBookingDetails {
  static readonly type = '[BookingDetails] Set Data';
  constructor(public payload: BookingDetails) {}
}

export interface BookingDetailsModel {
  hotelId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
}

@Injectable()
@State<BookingDetailsModel>({
  name: 'bookingDetails',
  defaults: {
    hotelId: null,
    checkIn: null,
    checkOut: null,
    guests: null
  }
})
export class BookingDetailsState {
  @Action(SetBookingDetails)
  setBookingDetails(ctx: StateContext<BookingDetails>, action: SetBookingDetails) {
    ctx.patchState(action.payload);
  }
}
