import { APIHotel } from "./hotel.interface";

export interface APIAmenity {
  id: number;
  name: string;
  hotels?: APIHotel[];
}
