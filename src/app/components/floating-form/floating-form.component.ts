import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

import { APIRegion } from './../../api/hotels/region.model';
import { HotelService } from './../../api/hotels/hotel.service';
import { UtilsService } from './../../services/utils.service';
import { SearchForm } from '../../interfaces/search-form';
import { Library } from '../../shared/moment-utils';

@Component({
  selector: 'app-floating-form',
  templateUrl: './floating-form.component.html',
  styleUrls: ['./floating-form.component.scss']
})
export class FloatingFormComponent implements OnInit {
  @Input() formData: SearchForm;
  searchForm: FormGroup;

  regions: APIRegion[] = [];

  currentDate = new Date();

  @ViewChild('inputElement', { read: ElementRef }) inputElement: ElementRef;
  editingField: string = null;

  @Output() searchEvent = new EventEmitter<SearchForm>();

  constructor(
    private formBuilder: FormBuilder,
    private hotelService: HotelService,
    private utilService: UtilsService
  ) {}

  ngOnInit() {
    const { checkIn, checkOut } = this.formData;

    this.searchForm = this.formBuilder.group({
      destination: [this.formData.destination, [Validators.required, Validators.maxLength(45)]],
      dates: [[new Date(checkIn), new Date(checkOut)], Validators.required],
      guests: [this.formData.guests, [Validators.required, Validators.min(1)]]
    });

    console.log(this.searchForm.value);

    this.searchForm.get('dates').valueChanges.subscribe((dates: Date[]) => {
      this.validateDateRange(dates);
    });
  }

  public searchHotels(): void {
    this.searchEvent.emit(this.formData);
  }

  public getFieldValue(fieldName: string): any {
    return this.searchForm.get(fieldName).value;
  }

  public toggleEdit(fieldName: string): void {
    this.editingField = this.editingField === fieldName ? null : fieldName;
    if (this.editingField === fieldName) {
      setTimeout(() => {
        this.inputElement.nativeElement.focus();
        this.updateWidth(fieldName);
      }, 0);
    }
  }

  public searchRegions(event: any): void {
    this.hotelService.getRegions(event.query).subscribe((regions: APIRegion[]) => {
      this.regions = regions;
    });
  }

  public updateField(fieldName: string): void {
    let inputValue = this.searchForm.get(fieldName)?.value;

    switch (fieldName) {
      case 'destination':
        this.updateDestinationField(inputValue);
        break;
      case 'dates':
        this.updateDatesField(inputValue);
        break;
      case 'guests':
        this.updateGuestsField(inputValue);
        break;
    }

    this.editingField = null;
  }

  public updateWidth(fieldName: string): void {
    const input = this.inputElement.nativeElement;
    const text = input.value || this.searchForm.get(fieldName).value;
    const style = getComputedStyle(input);
    const font = `${style.fontSize} ${style.fontFamily}`;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = font;
    const width = ctx.measureText(text).width;

    input.style.width = `${width + 10}px`;
  }

  public getFormattedDates() {
    const [checkIn, checkOut] = this.searchForm.get('dates')?.value;
    return this.utilService.formatDates(checkIn, checkOut, true);
  }

  private validateDateRange(selectedRange: Date[]): void {
    if (!selectedRange) return;

    const startDate = moment(selectedRange[0]);
    const endDate = moment(selectedRange[1]);

    if (endDate.isSame(startDate, 'day')) {
      this.searchForm.get('dates').setValue(null, { emitEvent: false });
    }
  }

  private updateDestinationField(inputValue: APIRegion) {
    if (!inputValue?.name.trim()) {
      this.searchForm.patchValue({ destination: this.formData.destination });
    } else {
      this.formData = { ...this.formData, destination: inputValue };
    }
  }

  private updateDatesField(inputValue: Date[]) {
    if (!inputValue[0] && !inputValue[1]) {
      const { checkIn, checkOut } = this.formData;
      this.searchForm.patchValue({ dates: [checkIn, checkOut] });
    } else if (!inputValue[1]) {
      const dayAfter = moment(inputValue[0]).add(1, 'day').toDate();
      this.searchForm.get('dates').setValue([inputValue[0], dayAfter], { emitEvent: false });
    } else {
      const [checkIn, checkOut] = inputValue;
      this.formData = { ...this.formData, checkIn, checkOut };
    }
  }

  private updateGuestsField(inputValue: number) {
    if (!inputValue) {
      this.searchForm.get('guests').setValue(this.formData.guests);
    } else {
      this.formData = { ...this.formData, guests: +inputValue };
    }
  }
}
