import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

import { Library } from './../../shared/library';
import { ReservationDetails } from '../../interfaces/reservation-details';

@Component({
  selector: 'app-floating-form',
  templateUrl: './floating-form.component.html',
  styleUrls: ['./floating-form.component.scss']
})
export class FloatingFormComponent implements OnInit {
  @Input() formData: ReservationDetails;
  searchForm: FormGroup;

  @ViewChild('inputElement', { read: ElementRef }) inputElement: ElementRef;
  editingField: string = null;

  @Output() searchEvent = new EventEmitter<ReservationDetails>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    const [checkIn, checkOut] = this.getParsedDates();

    this.searchForm = this.formBuilder.group({
      destination: [this.formData.destination, [Validators.required, Validators.maxLength(45)]],
      dates: [[checkIn, checkOut], Validators.required],
      guests: [this.formData.guests, [Validators.required, Validators.min(1)]]
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
    const checkIn = moment(this.searchForm.get('dates')?.value[0]);
    const checkOut = moment(this.searchForm.get('dates')?.value[1]);

    const sameMonth = checkIn.isSame(checkOut, 'month');
    const sameYear = checkIn.isSame(checkOut, 'year');

    if (sameYear && sameMonth) {
      return `${checkIn.format('MMM D')} - ${checkOut.format('D')}`;
    } else if (sameYear && !sameMonth) {
      return `${checkIn.format('MMM D')} - ${checkOut.format('MMM D')}`;
    } else {
      return `${checkIn.format('MMM D, YYYY')} - ${checkOut.format('MMM D, YYYY')}`;
    }
  }

  private updateDestinationField(inputValue: any) {
    if (!inputValue?.trim()) {
      this.searchForm.get('destination').setValue(this.formData.destination);
    } else {
      this.formData = { ...this.formData, destination: inputValue };
    }
  }

  private updateDatesField(inputValue: any) {
    if (!inputValue?.length) {
      const [checkIn, checkOut] = this.getParsedDates();
      this.searchForm.get('dates').setValue([checkIn, checkOut]);
    } else {
      const [checkIn, checkOut] = inputValue.map((date: Date) => Library.dateToString(date));
      this.formData = { ...this.formData, checkIn, checkOut };
    }
  }

  private updateGuestsField(inputValue: any) {
    if (!inputValue) {
      this.searchForm.get('guests').setValue(this.formData.guests);
    } else {
      this.formData = { ...this.formData, guests: +inputValue };
    }
  }

  private getParsedDates(): Date[] {
    const [checkIn, checkOut] = [
      Library.parseDate(this.formData.checkIn),
      Library.parseDate(this.formData.checkOut)
    ];

    return [checkIn, checkOut];
  }
}
