import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private readonly API = 'http://localhost:3000';

  isLoggedIn = false;

  hotels: any[] = [];

  minValue: number = 50;
  maxValue: number = 1000;
  options: Options = {
    floor: 50,
    ceil: 1000,
    step: 10,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return 'R$' + value;
        case LabelType.High:
          return 'R$' + value;
        default:
          return 'R$' + value;
      }
    }
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(`${this.API}/hotels`).subscribe((data) => {
      this.hotels = data;
    });
  }
}
