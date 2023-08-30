import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

import { HotelSummaryComponent } from './hotel-summary/hotel-summary.component';
import { FloatingFormComponent } from './floating-form/floating-form.component';

@NgModule({
  declarations: [HotelSummaryComponent, FloatingFormComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, CalendarModule],
  exports: [HotelSummaryComponent, FloatingFormComponent]
})
export class ComponentsModule {}
