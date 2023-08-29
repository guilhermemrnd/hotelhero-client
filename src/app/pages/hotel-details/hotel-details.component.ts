import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Hotel } from './../../interfaces/hotel';
import { ReservationDetails } from '../../interfaces/reservation-details';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {
  searchForm: ReservationDetails;

  hotel: Hotel;

  mainFacilities = [
    { key: 'wifi', label: 'Wi-Fi gratuito', icon: 'fa-wifi' },
    { key: 'parking', label: 'Estacionamento gratuto', icon: 'fa-parking' },
    { key: 'reception_24h', label: 'Recepção 24 horas', icon: 'fa-concierge-bell' },
    { key: 'access_card', label: 'Cartão de acesso', icon: 'fa-key' },
    { key: 'air_conditioning', label: 'Ar-condicionado', icon: 'fa-snowflake' },
    { key: 'outdoor_pool', label: 'Piscina ao ar livre', icon: 'fa-swimming-pool' },
    { key: 'room_service', label: 'Serviço de quarto', icon: 'fa-broom' },
    { key: 'breakfast', label: 'Café da manhã', icon: 'fa-coffee' },
    { key: 'airport_transfer', label: 'Transfer (aeroporto)', icon: 'fa-shuttle-van' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.hotelService.getFormData();

    const hotelID = this.route.snapshot.paramMap.get('id');
    this.hotelService.getHotelById(+hotelID).subscribe((data) => {
      this.hotel = data;
    });
  }

  public onSearch(event: ReservationDetails): void {
    this.hotelService.setFormData(event);
    this.router.navigate(['/search'], { queryParams: event });
  }

  public toggleFavorite(): void {
    // this.hotel.isFavorite = !this.hotel.isFavorite;
  }

  public hasFacility(key: string): boolean {
    return this.hotel?.mainFacilities[key];
  }
}
