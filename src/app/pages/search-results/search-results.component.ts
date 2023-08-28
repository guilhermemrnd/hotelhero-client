import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LabelType, Options } from '@angular-slider/ngx-slider';

import { Hotel } from './../../interfaces/hotel';
import { ReservationDetails } from '../../interfaces/reservation-details';
import { HotelService } from './../../services/hotel.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  searchForm: ReservationDetails;
  hotels: Hotel[] = null;

  minValue: number = 50;
  maxValue: number = 1000;
  options: Options = {
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

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: ReservationDetails) => {
      this.getHotelList(params);
      this.searchForm = params;
    });
  }

  public onSearch(event: ReservationDetails): void {
    this.hotelService.setFormData(event);
    this.getHotelList(event);
  }

  private getHotelList(params: ReservationDetails): void {
    this.hotelService.getHotelList(params).subscribe({
      next: (data: Hotel[]) => {
        this.hotels = data;
        this.getMinAndMaxPrice();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  private getMinAndMaxPrice(): void {}
}
