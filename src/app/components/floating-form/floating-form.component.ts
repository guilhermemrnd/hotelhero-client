import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

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
    this.searchForm = this.formBuilder.group({
      destination: [this.formData.destination, [Validators.required, Validators.maxLength(45)]],
      checkIn: [this.formData.checkIn, Validators.required],
      checkOut: [this.formData.checkOut, Validators.required],
      guests: [this.formData.guests, [Validators.required, Validators.min(1)]]
    });
  }

  public searchHotels(): void {
    this.searchEvent.emit(this.searchForm.value);
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

    if (isNaN(inputValue) && !inputValue?.trim()) {
      inputValue = this.formData[fieldName];
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
    const checkIn = moment(this.searchForm.get('checkIn').value);
    const checkOut = moment(this.searchForm.get('checkOut').value);

    const sameMonth = checkIn.isSame(checkOut, 'month');
    const sameYear = checkIn.isSame(checkOut, 'year');

    if (sameYear && sameMonth) {
      return `${checkIn.format('MMMM D')} - ${checkOut.format('D')}`;
    } else if (sameYear && !sameMonth) {
      return `${checkIn.format('MMMM D')} - ${checkOut.format('MMMM D')}`;
    } else {
      return `${checkIn.format('MMMM D, YYYY')} - ${checkOut.format('MMMM D, YYYY')}`;
    }
  }
}
