import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HotelCardComponent } from './hotel-card/hotel-card.component';
import { HotelSummaryComponent } from './hotel-summary/hotel-summary.component';
import { FloatingFormComponent } from './floating-form/floating-form.component';

@NgModule({
  declarations: [HotelCardComponent, HotelSummaryComponent, FloatingFormComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [HotelCardComponent, HotelSummaryComponent, FloatingFormComponent]
})
export class ComponentsModule {}
