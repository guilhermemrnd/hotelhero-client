import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HotelCardComponent } from './hotel-card/hotel-card.component';

@NgModule({
  declarations: [HotelCardComponent],
  imports: [CommonModule, RouterModule],
  exports: [HotelCardComponent]
})
export class ComponentsModule {}
