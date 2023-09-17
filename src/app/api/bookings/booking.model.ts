import { APIUser } from "../users/user.model";
import { APIHotel } from "../hotels/hotel.model";

export interface APIBooking {
  id: string;
  user?: APIUser;
  hotel?: APIHotel;
  checkIn: string;
  checkOut: string;
  numberOfGuests: number;
  totalCost: number;
  bookingStatus: string;
  createdAt: string;
  updatedAt: string;
}
