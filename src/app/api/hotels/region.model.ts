import { APIHotel } from "./hotel.model";

export interface APIRegion {
  id: number;
  name: string;
  hotels?: APIHotel[];
}
