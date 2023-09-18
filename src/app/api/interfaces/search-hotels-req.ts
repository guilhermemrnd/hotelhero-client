export interface SearchHotelsReq {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  limit?: number;
  page: number;
  minPrice?: string;
  maxPrice?: string;
  amenities?: string[];
  ratings?: string[];
}
