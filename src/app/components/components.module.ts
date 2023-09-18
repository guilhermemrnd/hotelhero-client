import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputNumberModule } from 'primeng/inputnumber';

import { NavbarComponent } from './navbar/navbar.component';
import { HotelSummaryComponent } from './hotel-summary/hotel-summary.component';
import { FloatingFormComponent } from './floating-form/floating-form.component';

@NgModule({
  declarations: [NavbarComponent, HotelSummaryComponent, FloatingFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CalendarModule,
    AutoCompleteModule,
    InputNumberModule
  ],
  exports: [NavbarComponent, HotelSummaryComponent, FloatingFormComponent]
})
export class ComponentsModule {}
