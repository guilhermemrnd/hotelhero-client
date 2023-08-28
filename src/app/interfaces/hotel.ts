export interface Hotel {
  id: number;
  name: string;
  short_description: string;
  long_description: string;
  address: string;
  rating: number;
  images: string;
  main_facilities: string[];
  max_guests: number;
  beds: number;
  bathrooms: number;
  isFavorite: boolean;
  price: number;
}
