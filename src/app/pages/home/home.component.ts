import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {}
}
