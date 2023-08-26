import { Component, OnInit } from '@angular/core';
import { LabelType, Options } from '@angular-slider/ngx-slider';

import { HotelService } from './../../services/hotel.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  hotels: any[] = [];

  minValue: number = 50;
  maxValue: number = 1000;
  options: Options = {
    floor: 50,
    ceil: 1000,
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

  constructor(private hotelService: HotelService) {}

  ngOnInit() {
    this.hotelService.getHotelList().subscribe((data) => {
      this.hotels = data;
    });
  }
}
