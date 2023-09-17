import { APIBooking } from "../bookings/booking.interface";

export interface APIUser {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  bookings?: APIBooking[];
}
