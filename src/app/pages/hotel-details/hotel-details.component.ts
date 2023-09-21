import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HotelService } from './../../api/hotels/hotel.service';
import { UserService } from './../../api/users/user.service';
import { Library } from './../../shared/moment-utils';
import { Utils } from './../../services/utils.service';

import { APIHotel } from './../../api/hotels/hotel.model';
import { SearchForm } from '../../interfaces/search-form';
import { BookingDetails } from './../../interfaces/booking-details';
import { HotelDetailsReq } from './../../api/interfaces/hotel-details-req';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {
  readonly NEW_USER_DISCOUNT = 50;
  readonly HOTEL_FEE = 24.99;

  public searchForm: SearchForm;

  public bookingForm: FormGroup;

  public hotel: APIHotel;

  public filteredAmenities = [];
  public mainFacilities = [
    { label: 'Free WiFi', icon: 'fas fa-wifi' },
    { label: 'Free parking', icon: 'fas fa-parking' },
    { label: 'Room service', icon: 'fas fa-concierge-bell' },
    { label: '24-hour front desk', icon: 'bi bi-alarm' },
    { label: 'Air conditioning', icon: 'fas fa-snowflake' },
    { label: 'Swimming pool', icon: 'fas fa-swimming-pool' },
    { label: 'Minibar', icon: 'fas fa-glass-martini-alt' },
    { label: 'Non-smoking rooms', icon: 'bi bi-slash-circle' },
    { label: 'Airport shuttle', icon: 'fas fa-shuttle-van' },
    { label: 'Fitness center', icon: 'fas fa-dumbbell' },
    { label: 'Spa/Wellness packages', icon: 'fas fa-spa' },
    { label: 'Ocean view', icon: 'fas fa-eye' }
  ];

  public currentDate = new Date();
  public minCheckOutDate = new Date();

  constructor(
    private hotelService: HotelService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.searchForm = Utils.getFromLocalStorage<SearchForm>(Utils.SEARCH_FORM_KEY);
    if (!this.searchForm) window.location.href = '/';

    const { checkIn, checkOut } = this.searchForm;

    this.bookingForm = this.formBuilder.group({
      checkIn: [new Date(checkIn), Validators.required],
      checkOut: [new Date(checkOut), Validators.required],
      guests: [this.searchForm.guests, Validators.required]
    });

    const hotelId = this.route.snapshot.paramMap.get('id');

    const params = this.buildQueryParams(this.bookingForm.value, hotelId);
    this.hotelService.getHotelDetails(params).subscribe((hotel) => {
      this.hotel = hotel;
      this.setupHotelAmenities(hotel);
    });

    this.handleCheckInChange();
  }

  public onSearch(event: SearchForm): void {
    const queryParams = Utils.formatSearchFormForURL(event);
    this.router.navigate(['/search'], { queryParams });
  }

  public shareProperty(): void {
    if (navigator.share) {
      navigator
        .share({
          title: this.hotel.name,
          text: this.hotel.description,
          url: window.location.href
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
  }

  public toggleFavorite(hotel: APIHotel): void {
    if (!Utils.checkLoggedIn()) {
      return alert('You must be logged in to favorite hotels');
    }

    const userId = Utils.getLoggedInUserId();
    hotel.isFavorite = !hotel.isFavorite;
    this.userService.toggleFavorite(userId, hotel.id, hotel.isFavorite).subscribe({
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

  public setupHotelAmenities(hotel: APIHotel): void {
    this.filteredAmenities = hotel?.amenities
      .filter((amenity) => this.mainFacilities.some((f) => f.label === amenity.name))
      .slice(0, 9);
  }

  public findIconByLabel(amenityName: string): string {
    const facility = this.mainFacilities.find((f) => f.label === amenityName);
    return facility ? facility.icon : '';
  }

  public navigateToCheckout(): void {
    if (!Utils.checkLoggedIn()) {
      return alert('You must be logged in to book hotels');
    }

    if (this.bookingForm.valid) {
      const bookingDetails = { ...this.bookingForm.value, hotelId: this.hotel.id };
      Utils.saveToLocalStorage<BookingDetails>(Utils.BOOKING_DETAILS_KEY, bookingDetails);
      this.router.navigate(['/checkout']);
    }
  }

  private buildQueryParams(formData: SearchForm, hotelId: string): HotelDetailsReq {
    const userId = Utils.getLoggedInUserId();

    const params = {
      hotelId: Number(hotelId),
      checkIn: Library.convertDate(formData.checkIn),
      checkOut: Library.convertDate(formData.checkOut),
      guests: formData.guests
    };

    return userId ? { ...params, userId } : params;
  }

  private handleCheckInChange(): void {
    this.bookingForm.get('checkIn').valueChanges.subscribe((selectedDate: Date) => {
      this.minCheckOutDate = new Date(selectedDate);
      this.minCheckOutDate.setDate(this.minCheckOutDate.getDate() + 1);

      if (this.getFieldValue('checkOut') < this.minCheckOutDate) {
        this.bookingForm.patchValue({ checkOut: this.minCheckOutDate });
      }
    });
  }
}
