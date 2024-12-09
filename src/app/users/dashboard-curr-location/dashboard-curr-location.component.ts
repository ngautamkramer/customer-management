import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-dashboard-curr-location',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './dashboard-curr-location.component.html',
  styleUrl: './dashboard-curr-location.component.css',
  providers: [ApiService]
})
export class DashboardCurrLocationComponent {

  locationData: any;
  chatLoaderStatus: boolean = false;
  constructor(private locationService: ApiService) {}


  ngOnInit(): void {
    this.getCurrentLocation();
  }

  getCurrentLocation(){
    this.chatLoaderStatus = true; 
    this.locationService.getLocation().subscribe({
      next: (data) => {
        this.chatLoaderStatus = false; 
        this.locationData = data;
      },
      error: (error) => {
        this.chatLoaderStatus = false; 
        console.error('Error fetching location data:', error);
      },
    });

  }

}
