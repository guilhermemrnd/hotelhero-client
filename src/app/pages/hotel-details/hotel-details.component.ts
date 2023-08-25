import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {
  hotel: any;

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
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    const hotelId = this.route.snapshot.paramMap.get('id');

    if (hotelId) {
      this.hotelService.getHotelById(+hotelId).subscribe((data) => {
        this.hotel = data;
      });
    }
  }

  toggleFavorite(): void {
    this.hotel.isFavorite = !this.hotel.isFavorite;
  }

  hasFacility(key: string): boolean {
    return this.hotel.main_facilities.some((facility: any) => facility[key]);
  }
}
