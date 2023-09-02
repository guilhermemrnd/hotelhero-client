import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { SearchResultsModule } from './pages/search-results/search-results.module';
import { HomeComponent } from './pages/home/home.component';
import { HotelDetailsComponent } from './pages/hotel-details/hotel-details.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HotelDetailsComponent,
    CheckoutComponent,
    PaymentSuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    InputNumberModule,
    InputMaskModule,
    MessagesModule,
    MessageModule,
    ComponentsModule,
    SearchResultsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en-US'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
