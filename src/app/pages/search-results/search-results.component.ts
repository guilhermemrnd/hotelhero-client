import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeContext, LabelType, Options } from '@angular-slider/ngx-slider';
import { delay } from 'rxjs';

import { Hotel } from './../../interfaces/hotel';
import { Filters } from './../../interfaces/filters';
import { ReservationDetails } from '../../interfaces/reservation-details';
import { HotelService } from './../../services/hotel.service';
import { UtilsService } from './../../services/utils.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  searchForm: ReservationDetails;
  currentFilters: Filters;

  hotels: Hotel[] = null;

  totalPages: number = 0;
  currentPage: number = 1;

  minValue: number = 50;
  maxValue: number = 1000;
  options: Options = this.setSliderOptions();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private utilService: UtilsService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: ReservationDetails) => {
      this.getHotelList(params);
      this.searchForm = params;
    });
  }

  public onSearch(event: ReservationDetails): void {
    this.utilService.setFormData(event);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: event,
      queryParamsHandling: 'merge'
    });

    this.getHotelList(event);
  }

  public onFilterChanged(filters: Filters): void {
    this.getHotelList(this.searchForm, filters);
  }

  public onFilterPrice(event: ChangeContext): void {
    const [min, max] = [event.value, event.highValue];
    const filters = { ...this.currentFilters, price: { min, max } };
    this.getHotelList(this.searchForm, filters);
  }

  public changePage(newPage: number) {
    this.currentPage = newPage;
  }

  public getDisplayedPages(): number[] {
    if (this.totalPages <= 5) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    const pages = [1];

    if (this.currentPage > 3) {
      pages.push(-1);
    }

    if (this.currentPage === this.totalPages || this.currentPage === this.totalPages - 1) {
      pages.push(this.totalPages - 2, this.totalPages - 1);
    } else if (this.currentPage === 1 || this.currentPage === 2) {
      pages.push(2, 3);
    } else {
      pages.push(this.currentPage - 1, this.currentPage, this.currentPage + 1);
    }

    if (this.currentPage < this.totalPages - 2) {
      pages.push(-1);
    }

    pages.push(this.totalPages);

    return pages;
  }

  private getHotelList(formData: ReservationDetails, filters?: Filters): void {
    this.hotelService
      .getHotelList(formData)
      .pipe(delay(1500))
      .subscribe({
        next: (hotels: Hotel[]) => {
          this.hotels = this.getFilteredData(hotels, filters);
          // this.getMinAndMaxPrice(this.hotels);
          this.totalPages = Math.ceil(this.hotels?.length / 10);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  private getFilteredData(hotels: Hotel[], filters: Filters): Hotel[] {
    if (!filters) return hotels;

    const filteredData = [...hotels];

    return filteredData.filter((hotel) => {
      return (
        this.filterByPrice(hotel.price, filters) &&
        this.filterByPropertyType(hotel.propertyType, filters) &&
        this.filterByAmenities(hotel.mainFacilities, filters) &&
        this.filterByReviews(hotel.rating, filters)
      );
    });
  }

  private filterByPrice(price: number, filters: Filters): boolean {
    return !filters.price || (price >= filters.price.min && price <= filters.price.max);
  }

  private filterByPropertyType(propertyType: string, filters: Filters): boolean {
    return !filters.propertyType || filters.propertyType[propertyType];
  }

  private filterByAmenities(mainFacilities: { [key: string]: boolean }, filters: Filters): boolean {
    return !filters.amenities || Object.keys(filters.amenities).every((key) => mainFacilities[key]);
  }

  private filterByReviews(rating: number, filters: Filters): boolean {
    let ratingKey = '';

    if (rating >= 2 && rating < 3) ratingKey = 'twoStars';
    if (rating >= 3 && rating < 4) ratingKey = 'threeStars';
    if (rating >= 4 && rating < 5) ratingKey = 'fourStars';
    if (rating == 5) ratingKey = 'fiveStars';
    if (!rating) ratingKey = 'unrated';

    return !filters.reviews || filters.reviews[ratingKey];
  }

  private getMinAndMaxPrice(hotels: Hotel[]): void {
    if (!hotels) {
      this.minValue = 0;
      this.maxValue = 0;
      return;
    }

    const { min, max } = hotels.reduce(
      (acc, hotel) => {
        return { min: Math.min(acc.min, hotel.price), max: Math.max(acc.max, hotel.price) };
      },
      { min: Number.MAX_VALUE, max: Number.MIN_VALUE }
    );

    this.minValue = min;
    this.maxValue = max;

    this.options = this.setSliderOptions();
  }

  private setSliderOptions(): Options {
    return {
      floor: this.minValue,
      ceil: this.maxValue,
      step: 10,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return 'R$' + value;
          case LabelType.High:
            return 'R$' + value;
          default:
            return 'R$' + value;
        }
      }
    };
  }
}
