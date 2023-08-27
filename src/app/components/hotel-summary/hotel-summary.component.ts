import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotel-summary',
  templateUrl: './hotel-summary.component.html',
  styleUrls: ['./hotel-summary.component.scss']
})
export class HotelSummaryComponent implements OnInit {
  @Input() hotel: any;

  constructor() {}

  ngOnInit() {}
}
