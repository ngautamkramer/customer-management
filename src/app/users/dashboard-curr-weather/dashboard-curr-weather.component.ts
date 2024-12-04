import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard-curr-weather',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-curr-weather.component.html',
  styleUrl: './dashboard-curr-weather.component.css',
  providers: [ApiService]
})
export class DashboardCurrWeatherComponent {


  weatherData: any;

  constructor(private weatherService: ApiService) { }


  ngOnInit(): void {
    this.getCurrentWeather();
  }

  getCurrentWeather() {
    this.weatherService.getLocation().subscribe({
      next: (data) => {
        let locationData: any = data;
        this.getCurrentWeatherFromLatAndLong(locationData.lat, locationData.lon);  // Check the location data in the console
      },
      error: (error) => {
        console.error('Error fetching location data:', error);
      },
    });
  }


  getCurrentWeatherFromLatAndLong(lat: any, long: any) {
    this.weatherService.getWeather(lat, long).subscribe({
      next: (data) => {
        this.weatherData = data;
        console.log(this.weatherData);  // Check the location data in the console
      },
      error: (error) => {
        console.error('Error fetching location data:', error);
      },
    });
  }

}
