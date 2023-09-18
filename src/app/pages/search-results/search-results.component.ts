import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeContext, LabelType, Options } from '@angular-slider/ngx-slider';
import { BehaviorSubject, debounceTime, switchMap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { HotelService } from './../../api/hotels/hotel.service';
import { Utils } from './../../services/utils.service';
import { Library } from './../../shared/moment-utils';

import { APIHotel } from './../../api/hotels/hotel.model';
import { SearchForm } from '../../interfaces/search-form';
import { Filters } from './../../interfaces/filters';
import { SearchHotelsReq } from './../../api/interfaces/search-hotels-req';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  private triggerSearch = new BehaviorSubject<void>(null);

  searchForm: SearchForm;
  currentFilters: Filters;

  hotels: APIHotel[] = null;
  totalItems: number = 0;

  totalPages: number = 0;
  currentPage: number = 1;

  minValue: number = 50;
  maxValue: number = 1000;
  options: Options = this.setSliderOptions();

  constructor(
    private hotelService: HotelService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: SearchForm) => {
      this.searchForm = JSON.parse(sessionStorage.getItem('searchForm'));
      this.triggerSearch.next();
    });

    this.setupDebouncedHotelSearch(); // Set up subscription for delayed hotel searc
  }

  public onSearch(event: SearchForm): void {
    const queryParams = Utils.formatQueryParams(event);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });

    this.searchForm = event;
    this.triggerSearch.next();
  }

  public onFilterChanged(filters: Filters): void {
    this.currentFilters = filters;
    this.triggerSearch.next();
  }

  public onFilterPrice(event: ChangeContext): void {
    const [min, max] = [event.value, event.highValue];

    if (max === 1000) {
      this.currentFilters = { ...this.currentFilters, price: { min } };
      this.triggerSearch.next();
    } else {
      this.currentFilters = { ...this.currentFilters, price: { min, max } };
      this.triggerSearch.next();
    }
  }

  public changePage(newPage: number) {
    this.currentPage = newPage;
    this.triggerSearch.next();
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

  private setupDebouncedHotelSearch() {
    this.triggerSearch
      .pipe(
        debounceTime(1500),
        switchMap(() => {
          this.spinner.show('search-spinner');
          const [formData, filters] = [this.searchForm, this.currentFilters];
          const params = this.buildQueryParams(formData, filters);
          return this.hotelService.getHotels(params);
        })
      )
      .subscribe({
        next: (res) => {
          this.hotels = res.data;
          this.totalItems = res.total;
          this.totalPages = Math.ceil(res.total / 10);
          this.spinner.hide('search-spinner');
        },
        error: (err) => {
          this.spinner.hide('search-spinner');
          console.error('Failed to get hotels', err);
        }
      });
  }

  private buildQueryParams(formData: SearchForm, filters?: Filters): SearchHotelsReq {
    const { destination, checkIn, checkOut, guests } = formData;

    const params = {
      destination: destination.id,
      checkIn: Library.convertDate(checkIn),
      checkOut: Library.convertDate(checkOut),
      guests,
      limit: 10,
      page: this.currentPage
    };

    if (!filters) return params;

    const {
      price: { min, max },
      amenities,
      reviews
    } = filters;

    if (min) params['minPrice'] = min;
    if (max) params['maxPrice'] = max;
    if (amenities) params['amenities'] = Object.keys(amenities).filter((key) => amenities[key]);
    if (reviews) params['ratings'] = Object.keys(reviews).filter((key) => reviews[key]);

    return params;
  }

  private setSliderOptions(): Options {
    return {
      floor: this.minValue,
      ceil: this.maxValue,
      step: 50,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return '$' + value;
          case LabelType.High:
            return value === 1000 ? `$1000+` : `$${value}`;
          default:
            return '$' + value;
        }
      }
    };
  }
}
