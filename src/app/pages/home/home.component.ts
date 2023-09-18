import { Library } from './../../shared/moment-utils';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { APIRegion } from './../../api/hotels/region.model';
import { SearchForm } from '../../interfaces/search-form';
import { HotelService } from './../../api/hotels/hotel.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

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

  public searchRegions(event: any): void {
    this.hotelService.getRegions(event.query).subscribe((regions: APIRegion[]) => {
      this.regions = regions;
    });
  }

  public getFieldValue(field: string): any {
    return this.searchForm.get(field).value;
  }

  public navigate(): void {
    if (this.searchForm.valid) {
      const queryParams = this.formatQueryParams(this.searchForm.value);
      sessionStorage.setItem('searchForm', JSON.stringify(this.searchForm.value));
      this.router.navigate(['/search'], { queryParams });
    }
  }

  private buildForm(formData?: SearchForm): FormGroup {
    return this.formBuilder.group({
      destination: [formData?.destination ?? '', Validators.required],
      checkIn: [formData?.checkIn ?? '', Validators.required],
      checkOut: [formData?.checkOut ?? '', Validators.required],
      guests: [formData?.guests ?? null, [Validators.required, Validators.min(1)]]
    });
  }

  private handleCheckInChange() {
    this.searchForm.get('checkIn').valueChanges.subscribe((selectedDate: Date) => {
      this.minCheckOutDate = new Date(selectedDate);
      this.minCheckOutDate.setDate(this.minCheckOutDate.getDate() + 1);

      if (this.getFieldValue('checkOut') < this.minCheckOutDate) {
        this.searchForm.patchValue({ checkOut: this.minCheckOutDate });
      }
    });
  }

  private formatQueryParams(formData: SearchForm) {
    const destination = formData.destination.name;
    const checkIn = Library.convertDate(formData.checkIn);
    const checkOut = Library.convertDate(formData.checkOut);
    return { destination, checkIn, checkOut, guests: formData.guests };
  }
}
