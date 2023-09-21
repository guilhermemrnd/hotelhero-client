export interface UpdateBookingReq {
  checkIn?: string;
  checkOut?: string;
  numberOfGuests?: number;
  totalCost?: number;
  bookingStatus?: string;
}
