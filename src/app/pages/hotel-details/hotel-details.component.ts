import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {
  isLoggedIn = false;

  hotel: any;

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    const hotelId = this.route.snapshot.paramMap.get('id');

    if (hotelId) {
      this.hotelService.getHotelById(+hotelId).subscribe((data) => {
        this.hotel = data;
      });
    }
  }

  toggleFavorite() {
    this.hotel.isFavorite = !this.hotel.isFavorite;
  }
}
