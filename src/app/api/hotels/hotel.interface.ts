import { APIRegion } from './region.interface';
import { APIAmenity } from './amenity.interface';
import { APIBooking } from '../bookings/booking.interface';

export interface APIHotel {
  id: number;
  name: string;
  address: string;
  rating: number;
  numberOfReviews: number;
  dailyPrice: number;
  currencyCode: string;
  description: string;
  photos: string[];
  maxGuests: number;
  bathrooms: number;
  region?: APIRegion;
  ameneities?: APIAmenity[];
  bookings?: APIBooking[];
}
