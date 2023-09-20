export interface BookingDetails {
  id: number;
  userId: number;
  hotelId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  createdAt: string;
  status: string;
}
