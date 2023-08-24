import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private readonly API = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getHotelList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/hotels`);
  }

  getHotelById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API}/hotels/${id}`);
  }
}
