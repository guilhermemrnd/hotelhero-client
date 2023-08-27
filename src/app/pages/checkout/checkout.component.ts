import { Component, OnInit } from '@angular/core';

import { HotelService } from './../../services/hotel.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  reservationDetails = {
    checkIn: '2023-04-26',
    checkOut: '2023-04-29',
    numberOfGuests: 2,
    hotelID: 1
  };

  hotel: any;

  editingField: string = null;
  fields = { dates: 'July 17 - 21', guests: '2 guests' };

  constructor(private location: Location, private hotelService: HotelService) {}

  ngOnInit() {
    this.hotelService.getHotelById(this.reservationDetails.hotelID).subscribe((data) => {
      this.hotel = data;
    });
  }

  goBack(): void {
    this.location.back();
  }

  toggleEdit(fieldName: string): void {
    this.editingField = fieldName;
  }

  updateField(event: Event, fieldName: string): void {
    const input = event.target as HTMLInputElement;
    // this.fields[fieldName] = input.value;
    this.editingField = null;
  }

  cancelEdit(): void {
    this.editingField = null;
  }
}
