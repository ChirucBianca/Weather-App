import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weatherService/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherData: any = {};
  city: string = '';
  backgroundImage: string = '';


  constructor(private weatherservice: WeatherService) { }

  ngOnInit() {
    //fetch data for a default city
    this.getWeatherData('London');
  }
  getWeather() {
    // fetch weather data for the city entered by the user
    this.getWeatherData(this.city);
  }

  private getWeatherData(city: string) {
    this.weatherservice.getWeather(this.city).subscribe(data => {
      this.weatherData = data;
      console.log(this.weatherData);

      // Determine the appropriate background image based on weather condition
      const weather = this.weatherData.weather[0].main.toLowerCase();
      if (weather.includes('clear') || weather.includes('sun')) {
        this.weatherData.backgroundImage = 'sunny.jpg';
      } else if (weather.includes('clouds')) {
        this.weatherData.backgroundImage = 'cloudy.jpg';
      } else if (weather.includes('rain')) {
        this.weatherData.backgroundImage = 'rainy.jpg';
      } else if (weather.includes('snow')) {
        this.weatherData.backgroundImage = 'sonw.jpg';
      } else if (weather.includes('thunder')) {
        this.weatherData.backgroundImage = 'thunder.jpg';
      } else if (weather.includes('mist') || weather.includes('haze') || weather.includes('fog')) {
        this.weatherData.backgroundImage = 'mist.jpg';
      }
      
      // Set the icon based on temperature
      const temp = this.weatherData.main.temp - 273.15;
      if (temp >= 30) {
        this.weatherData.icon = 'hot.png';
      } else if (temp >= 20 && temp < 30) {
        this.weatherData.icon = 'warm.png';
      } else if (temp >= 10 && temp < 20) {
        this.weatherData.icon = 'cool.png';
      } else {
        this.weatherData.icon = 'cold.png';
      }

    });

  }
}
