import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Hotel } from './../../interfaces/hotel';
import { PaymentForm } from './../../interfaces/payment-form';
import { BookingDetails } from './../../interfaces/booking-details';
import { HotelService } from './../../services/hotel.service';
import { UtilsService } from './../../services/utils.service';
import { Library } from './../../shared/library';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  readonly NEW_USER_DISCOUNT = 50;
  readonly HOTEL_FEE = 24.99;

  bookingDetails: BookingDetails;

  hotel: Hotel;

  paymentForm: FormGroup;

  dates: Date[] = [];
  currentDate: Date = new Date();

  editingField: string = null;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    private hotelService: HotelService,
    private utilService: UtilsService
  ) {}

  ngOnInit() {
    this.bookingDetails = this.hotelService.getBookingDetails();

    const { checkIn, checkOut } = this.bookingDetails;
    this.dates = [Library.parseDate(checkIn), Library.parseDate(checkOut)];

    this.hotelService.getHotelById(this.bookingDetails.hotelID).subscribe({
      next: (data) => (this.hotel = data),
      error: (err) => console.error('Failed to get hotel', err)
    });

    this.paymentForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, this.validateCardNumber]],
      cardHolder: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      expirationDate: ['', [Validators.required, this.validateExpirationDate]],
      CVV: ['', [Validators.required, this.validateCVV]]
    });
  }

  public goBack(): void {
    this.location.back();
  }

  // Editable fields methods
  public toggleEdit(fieldName: string): void {
    this.editingField = fieldName;
  }

  public getFormattedDates() {
    const { checkIn, checkOut } = this.bookingDetails;
    return this.utilService.formatDates(checkIn, checkOut, false);
  }

  public updateDates(): void {
    const [checkIn, checkOut] = this.dates;
    this.bookingDetails.checkIn = Library.convertDate(checkIn);
    this.bookingDetails.checkOut = Library.convertDate(checkOut);
    this.editingField = null;
  }

  // Payment form methods
  public hasError(fieldName: string, errorType: string) {
    const control = this.paymentForm.get(fieldName);
    return control?.touched && control?.errors?.[errorType];
  }

  public submitPayment(): void {
    if (this.paymentForm.valid) {
      const totalPrice = this.getTotalPrice(this.hotel.price);

      const booking: BookingDetails = { ...this.bookingDetails, totalPrice };
      const payment: PaymentForm = { ...this.paymentForm.value };

      this.hotelService.processPayment(payment).subscribe({
        next: (response) => {
          if (response.success) {
            this.hotelService.createReservation(booking).subscribe(() => {
              this.router.navigate(['/payment-success']);
            });
          } else {
            console.error('Failed to process payment');
          }
        },
        error: (err) => console.error('Failed to process payment', err)
      });
    } else {
      console.error('Form is invalid');
    }
  }

  // Booking details methods
  public getTotalNights(): number {
    const { checkIn, checkOut } = this.bookingDetails;
    return this.utilService.calcTotalNights(checkIn, checkOut);
  }

  public getDailyPrices(price: number): number {
    const nights = this.getTotalNights();
    return this.utilService.calcDailyPrices(nights, price);
  }

  public getTotalPrice(price: number): number {
    const dailyPrices = this.getDailyPrices(price);
    return dailyPrices + this.HOTEL_FEE - this.NEW_USER_DISCOUNT;
  }

  public getCancellationDate(): Date {
    const checkIn = Library.parseDate(this.bookingDetails.checkIn);
    const cancellationDate = Library.getDateBefore(checkIn, 2);
    return Library.parseDate(cancellationDate);
  }

  // Private methods
  private validateCardNumber(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.replace(/ /g, '');

    if (!value) {
      return null;
    }

    if (value.length !== 16) {
      return { length: true };
    }

    if (!/^[0-9]+$/.test(value)) {
      return { nonNumeric: true };
    }

    return null;
  }

  private validateExpirationDate(control: AbstractControl): ValidationErrors | null {
    const currentMonth = Library.getToday();
    const enteredMonth = Library.momentDate(control?.value, 'MM/YY');

    if (enteredMonth.isBefore(currentMonth, 'month')) {
      return { expired: true };
    }

    return null;
  }

  private validateCVV(control: AbstractControl): ValidationErrors | null {
    const value = control?.value;

    if (!value) {
      return null;
    }

    if (value.length === 3 && /^[0-9]*$/.test(value)) {
      return null;
    } else if (!/^[0-9]*$/.test(value)) {
      return { nonNumeric: true };
    } else {
      return { invalidLength: true };
    }
  }
}
