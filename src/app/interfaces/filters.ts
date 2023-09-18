export interface Filters {
  price?: { min: number, max?: number };
  propertyType: { [key: string]: boolean };
  amenities: { [key: string]: boolean };
  reviews: { [key: string]: boolean };
}
