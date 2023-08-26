import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { HomeComponent } from './pages/home/home.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { HotelDetailsComponent } from './pages/hotel-details/hotel-details.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchResultsComponent,
    HotelDetailsComponent,
    CheckoutComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxSliderModule, ComponentsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
