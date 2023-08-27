import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-floating-form',
  templateUrl: './floating-form.component.html',
  styleUrls: ['./floating-form.component.scss']
})
export class FloatingFormComponent implements OnInit {
  formData: { [key: string]: any } = {
    destination: 'Maceió',
    checkIn: new Date('2023-04-26'),
    checkOut: new Date('2023-04-29'),
    guests: 2
  };

  editingField: string = null;

  @ViewChild('inputElement', { read: ElementRef }) inputElement: ElementRef;

  constructor() {}

  ngOnInit() {}

  toggleEdit(fieldName: string): void {
    this.editingField = this.editingField === fieldName ? null : fieldName;
    if (this.editingField === fieldName) {
      setTimeout(() => {
        this.inputElement.nativeElement.focus();
        this.updateWidth(fieldName);
      }, 0);
    }
  }

  updateField(event: Event, fieldName: string): void {
    const input = event.target as HTMLInputElement;

    if (!input.value.replace(/\s/g, '').length) {
      input.value = this.formData[fieldName];
    }

    this.formData[fieldName] = input.value;
    this.editingField = null;
  }

  updateWidth(field: string): void {
    const input = this.inputElement.nativeElement;
    const text = input.value || this.formData[field];
    const style = getComputedStyle(input);
    const font = `${style.fontSize} ${style.fontFamily}`;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = font;
    const width = ctx.measureText(text).width;

    input.style.width = `${width + 10}px`;
  }

  getFormattedDates() {
    const checkIn = moment(this.formData['checkIn']);
    const checkOut = moment(this.formData['checkOut']);

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
