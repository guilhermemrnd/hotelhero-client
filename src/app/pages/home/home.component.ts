import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { HotelService } from './../../api/hotels/hotel.service';
import { Utils } from './../../services/utils.service';
import { APIRegion } from './../../api/hotels/region.model';
import { SearchForm } from '../../interfaces/search-form';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public searchForm: FormGroup;

  public regions: APIRegion[] = [];

  public currentDate = new Date();
  public minCheckOutDate = new Date();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    const formData = JSON.parse(sessionStorage.getItem('searchForm'));
    this.searchForm = formData ? this.buildForm(formData) : this.buildForm();
    this.handleCheckInChange();
  }

  public searchRegions(query: string): void {
    this.hotelService.getRegions(query).subscribe((regions: APIRegion[]) => {
      this.regions = regions;
    });
  }

  public getFieldValue(field: string): any {
    return this.searchForm.get(field).value;
  }

  public navigate(): void {
    if (this.searchForm.valid) {
      Utils.persistSearchForm(this.searchForm.value);
      const queryParams = Utils.formatQueryParams(this.searchForm.value);
      this.router.navigate(['/search'], { queryParams });
    }
  }

  private buildForm(formData?: SearchForm): FormGroup {
    const destination = formData?.destination ?? '';
    const checkIn = new Date(formData?.checkIn) ?? null;
    const checkOut = new Date(formData?.checkOut) ?? null;
    const guests = formData?.guests ?? null;

    return this.formBuilder.group({
      destination: [destination, Validators.required],
      checkIn: [checkIn, Validators.required],
      checkOut: [checkOut, Validators.required],
      guests: [guests, [Validators.required, Validators.min(1)]]
    });
  }

  private handleCheckInChange(): void {
    this.searchForm.get('checkIn').valueChanges.subscribe((selectedDate: Date) => {
      this.minCheckOutDate = new Date(selectedDate);
      this.minCheckOutDate.setDate(this.minCheckOutDate.getDate() + 1);

      if (this.getFieldValue('checkOut') < this.minCheckOutDate) {
        this.searchForm.patchValue({ checkOut: this.minCheckOutDate });
      }
    });
  }
}
