import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Hotel } from './../../interfaces/hotel';
import { SearchForm } from '../../interfaces/search-form';
import { JSONService } from '../../services/json.service';
import { Utils } from './../../services/utils.service';
import { Library } from '../../shared/moment-utils';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {
  readonly NEW_USER_DISCOUNT = 50;
  readonly HOTEL_FEE = 24.99;

  searchForm: SearchForm;

  bookingForm: FormGroup;

  hotel: Hotel;

  mainFacilities = [
    { key: 'wifi', label: 'Wi-Fi gratuito', icon: 'fa-wifi' },
    { key: 'parking', label: 'Estacionamento gratuto', icon: 'fa-parking' },
    { key: 'reception_24h', label: 'Recepção 24 horas', icon: 'fa-concierge-bell' },
    { key: 'access_card', label: 'Cartão de acesso', icon: 'fa-key' },
    { key: 'air_conditioning', label: 'Ar-condicionado', icon: 'fa-snowflake' },
    { key: 'outdoor_pool', label: 'Piscina ao ar livre', icon: 'fa-swimming-pool' },
    { key: 'room_service', label: 'Serviço de quarto', icon: 'fa-broom' },
    { key: 'breakfast', label: 'Café da manhã', icon: 'fa-coffee' },
    { key: 'airport_transfer', label: 'Transfer (aeroporto)', icon: 'fa-shuttle-van' }
  ];

  currentDate: Date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private jsonService: JSONService
  ) {}

  ngOnInit(): void {
    this.searchForm = JSON.parse(sessionStorage.getItem('searchForm'));
    const { checkIn, checkOut } = this.searchForm;

    this.bookingForm = this.formBuilder.group({
      checkIn: [checkIn, Validators.required],
      checkOut: [checkOut, Validators.required],
      guests: [this.searchForm.guests, Validators.required]
    });

    const hotelID = this.route.snapshot.paramMap.get('id');
    this.jsonService.getHotelById(+hotelID).subscribe((data) => {
      this.hotel = data;
    });
  }

  public onSearch(event: SearchForm): void {
    this.router.navigate(['/search'], { queryParams: event });
  }

  public shareProperty(): void {
    if (navigator.share) {
      navigator
        .share({
          title: this.hotel.name,
          text: this.hotel.shortDescription,
          url: window.location.href
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
  }

  public toggleFavorite(hotel: Hotel): void {
    hotel.isFavorite = !hotel.isFavorite;
    this.jsonService.toggleFavorite(hotel).subscribe({
      error: (e) => console.error('Error updating favorite status', e)
    });
  }

  public getFieldValue(field: string): any {
    return this.bookingForm.get(field).value;
  }

  public getTotalNights(): number {
    const { checkIn, checkOut } = this.bookingForm.value;
    return Utils.calcTotalNights(checkIn, checkOut);
  }

  public getDailyPrices(price: number): number {
    const nights = this.getTotalNights();
    return Utils.calcDailyPrices(nights, price);
  }

  public getTotalPrice(price: number): number {
    const dailyPrices = this.getDailyPrices(price);
    return dailyPrices + this.HOTEL_FEE - this.NEW_USER_DISCOUNT;
  }

  public hasFacility(key: string): boolean {
    return this.hotel?.mainFacilities[key];
  }

  public navigateToCheckout(): void {
    if (this.bookingForm.valid) {
      const bookingDetails = { ...this.bookingForm.value, hotelID: this.hotel.id };
      this.jsonService.setBookingDetails(bookingDetails);
      this.router.navigate(['/checkout']);
    }
  }
}
