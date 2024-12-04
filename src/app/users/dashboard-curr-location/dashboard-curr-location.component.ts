import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-curr-location',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-curr-location.component.html',
  styleUrl: './dashboard-curr-location.component.css',
  providers: [ApiService]
})
export class DashboardCurrLocationComponent {

  locationData: any;

  constructor(private locationService: ApiService) {}


  ngOnInit(): void {
    this.getCurrentLocation();
  }

  getCurrentLocation(){
    this.locationService.getLocation().subscribe({
      next: (data) => {
        this.locationData = data;
        console.log(this.locationData);  // Check the location data in the console
      },
      error: (error) => {
        console.error('Error fetching location data:', error);
      },
    });

  }

}
