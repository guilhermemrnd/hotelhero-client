export interface CreateBookingReq {
  userId: string;
  hotelId: string;
  checkIn: string;
  checkOut: string;
  numberOfGuests: number;
  totalCost: number;
}
