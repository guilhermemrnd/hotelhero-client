export interface Hotel {
  id: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  address: string;
  propertyType: string;
  reviews: number;
  rating: number;
  images: string;
  mainFacilities: { [key: string]: boolean };
  maxGuests: number;
  beds: number;
  bathrooms: number;
  isFavorite: boolean;
  price: number;
}
