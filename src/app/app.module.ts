import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [			
    AppComponent,
      HomeComponent,
      RoomDetailsComponent,
      CheckoutComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
