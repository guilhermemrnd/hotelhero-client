export interface HotelDetailsReq {
  userId?: string;
  hotelId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
}
