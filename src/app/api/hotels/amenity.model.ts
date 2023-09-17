import { APIHotel } from "./hotel.model";

export interface APIAmenity {
  id: number;
  name: string;
  hotels?: APIHotel[];
}
