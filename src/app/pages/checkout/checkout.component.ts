import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { HotelService } from './../../services/hotel.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  hotel: any;

  editingField: string = null;
  fields = { dates: 'July 17 - 21', guests: '2 guests' };

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  ngOnInit() {
    const hotelId = this.route.snapshot.paramMap.get('id');

    if (hotelId) {
      this.hotelService.getHotelById(+hotelId).subscribe((data) => {
        this.hotel = data;
      });
    }
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
