import { Component, Input, OnInit } from '@angular/core';

import { APIHotel } from './../../../api/hotels/hotel.model';

@Component({
  selector: 'app-hotel-summary',
  templateUrl: './hotel-summary.component.html',
  styleUrls: ['./hotel-summary.component.scss']
})
export class HotelSummaryComponent implements OnInit {
  @Input() hotel: APIHotel;

  constructor() {}

  ngOnInit() {}
}
