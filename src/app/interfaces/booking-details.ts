export interface BookingDetails {
  id: number;
  userID: number;
  hotelID: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  createdAt: string;
  status: string;
}
