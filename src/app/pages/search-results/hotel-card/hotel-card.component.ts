import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss']
})
export class HotelCardComponent implements OnInit {
  @Input() hotel: any;

  constructor() {}

  ngOnInit() {}

  toggleFavorite() {
    this.hotel.isFavorite = !this.hotel.isFavorite
  }
}
