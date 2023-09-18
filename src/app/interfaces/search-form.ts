import { APIRegion } from "../api/hotels/region.model";

export interface SearchForm {
  destination?: APIRegion;
  checkIn: Date;
  checkOut: Date;
  guests: number;
}
