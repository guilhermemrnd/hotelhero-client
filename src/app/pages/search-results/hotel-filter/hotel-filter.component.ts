import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

import { Filters } from './../../../interfaces/filters';

@Component({
  selector: 'app-hotel-filter',
  templateUrl: './hotel-filter.component.html',
  styleUrls: ['./hotel-filter.component.scss']
})
export class HotelFilterComponent implements OnInit {
  private filterSubject = new Subject<Filters>();

  filters: Filters = {
    propertyType: {
      hotel: false,
      guestHouse: false,
      apartment: false,
      house: false
    },
    amenities: {
      breakfast: false,
      parking: false,
      airConditioning: false,
      wifi: false,
      pool: false,
      gym: false,
      sauna: false,
      spa: false,
      petFriendly: false,
      roomService: false
    },
    reviews: {
      twoStars: false,
      threeStars: false,
      fourStars: false,
      fiveStars: false,
      unrated: false
    }
  };

  propertyTypeLabels = {
    hotel: 'Hotel',
    guestHouse: 'Guesthouse',
    apartment: 'Apartment',
    house: 'House'
  };

  amenitiesLabels = {
    breakfast: 'Breakfast included',
    parking: 'Parking',
    airConditioning: 'Air conditioning',
    wifi: 'Wi-Fi',
    pool: 'Pool',
    gym: 'Gym',
    sauna: 'Sauna',
    spa: 'Spa',
    petFriendly: 'Pet friendly',
    roomService: 'Room service'
  };

  reviewsLabels = {
    twoStars: '2 stars',
    threeStars: '3 stars',
    fourStars: '4 stars',
    fiveStars: '5 stars',
    unrated: 'Unrated'
  };

  @Output() filterChanged = new EventEmitter<Filters>();

  constructor() {}

  ngOnInit() {
    this.filterSubject.pipe(debounceTime(500), distinctUntilChanged()).subscribe((filters) => {
      this.filterChanged.emit(filters);
    });
  }

  public applyFilter(): void {
    const normalizedFilters = JSON.parse(JSON.stringify(this.filters));

    for (const category of Object.keys(normalizedFilters)) {
      for (const filterKey of Object.keys(normalizedFilters[category])) {
        if (!normalizedFilters[category][filterKey]) {
          delete normalizedFilters[category][filterKey];
        }
      }

      if (Object.keys(normalizedFilters[category]).length === 0) {
        delete normalizedFilters[category];
      }
    }

    this.filterSubject.next(normalizedFilters);
  }

  get propertyTypeKeys() {
    return Object.keys(this.filters.propertyType);
  }

  get amenitiesKeys() {
    return Object.keys(this.filters.amenities);
  }

  get reviewsKeys() {
    return Object.keys(this.filters.reviews);
  }
}
