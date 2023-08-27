import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HotelCardComponent } from './hotel-card/hotel-card.component';
import { HotelSummaryComponent } from './hotel-summary/hotel-summary.component';

@NgModule({
  declarations: [HotelCardComponent, HotelSummaryComponent],
  imports: [CommonModule, RouterModule],
  exports: [HotelCardComponent, HotelSummaryComponent]
})
export class ComponentsModule {}
