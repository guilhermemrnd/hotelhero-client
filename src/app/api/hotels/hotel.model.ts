import { APIRegion } from './region.model';
import { APIAmenity } from './amenity.model';
import { APIBooking } from '../bookings/booking.model';

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
