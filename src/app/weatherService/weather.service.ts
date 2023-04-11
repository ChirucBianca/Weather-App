import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'c8f4766c3a491a8072cce201b9c6037d';

  constructor(private http: HttpClient) { }

  getWeather(cityName: string) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${this.apiKey}`);
  }
}
