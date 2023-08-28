import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { HotelService } from './../../services/hotel.service';
import { ReservationDetails } from '../../interfaces/reservation-details';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    const formData = this.hotelService.getFormData();
    this.searchForm = formData ? this.buildForm(formData) : this.buildForm();
  }

  public navigate(): void {
    if (this.searchForm.valid) {
      this.hotelService.setFormData(this.searchForm.value);
      this.router.navigate(['/search'], { queryParams: this.searchForm.value });
    }
  }

  private buildForm(formData?: ReservationDetails): FormGroup {
    return this.formBuilder.group({
      destination: [formData?.destination ?? '', Validators.required],
      checkIn: [formData?.checkIn ?? '', Validators.required],
      checkOut: [formData?.checkOut ?? '', Validators.required],
      guests: [formData?.guests ?? '', [Validators.required, Validators.min(1)]]
    });
  }
}
