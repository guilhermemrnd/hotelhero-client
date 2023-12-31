export interface SearchHotelsReq {
  userId?: string;
  destination: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  limit: number;
  page: number;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
  ratings?: string[];
}
