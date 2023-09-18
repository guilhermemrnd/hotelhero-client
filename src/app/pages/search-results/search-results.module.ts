import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ComponentsModule } from './../../components/components.module';
import { SearchResultsComponent } from './search-results.component';
import { HotelCardComponent } from './hotel-card/hotel-card.component';
import { HotelFilterComponent } from './hotel-filter/hotel-filter.component';

@NgModule({
  declarations: [SearchResultsComponent, HotelCardComponent, HotelFilterComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxSliderModule,
    NgxSpinnerModule,
    ComponentsModule
  ]
})
export class SearchResultsModule {}
