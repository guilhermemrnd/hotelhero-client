import { APIHotel } from "./hotel.interface";

export interface APIRegion {
  id: number;
  name: string;
  hotels?: APIHotel[];
}
