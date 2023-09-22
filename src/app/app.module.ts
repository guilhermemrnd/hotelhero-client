import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxsModule } from '@ngxs/store';
import { AuthState } from './core/store/auth.state';

import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { HotelDetailsComponent } from './pages/hotel-details/hotel-details.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';

import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { SearchResultsModule } from './pages/search-results/search-results.module';

import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HotelDetailsComponent,
    CheckoutComponent,
    PaymentSuccessComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([AuthState]),
    NgxsStoragePluginModule.forRoot({ key: ['auth'] }),
    CalendarModule,
    InputNumberModule,
    InputMaskModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    AutoCompleteModule,
    ComponentsModule,
    SearchResultsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en-US'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
