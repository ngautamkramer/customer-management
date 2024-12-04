import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-curr-weather',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard-curr-weather.component.html',
  styleUrl: './dashboard-curr-weather.component.css',
  providers: [ApiService]
})
export class DashboardCurrWeatherComponent {


  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  private stream: MediaStream | null = null;
  currVideoInformation: any;

  startBtnStatus: boolean = false;
  stopBtnStatus: boolean = true;

  // Turn on the camera
  async startCamera() {
    try {
      // Request access to the video stream
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (this.videoElement && this.stream) {
        this.videoElement.nativeElement.srcObject = this.stream;

        const videoTrack = this.stream.getVideoTracks()[0];
        this.currVideoInformation = {
          label: videoTrack.label,
          settings: videoTrack.getSettings(),
          capabilities: videoTrack.getCapabilities()
        };

        //disable button stats
        this.startBtnStatus = true;
        this.stopBtnStatus = false;
        
        console.log("hello", this.currVideoInformation);


      }
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  }

  // Turn off the camera
  stopCamera() {
    if (this.stream) {
      // Stop all tracks in the stream
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;

      //disable button stats
      this.startBtnStatus = false;
      this.stopBtnStatus = true;
      this.currVideoInformation = null;

      // Clear the video source
      if (this.videoElement) {
        this.videoElement.nativeElement.srcObject = null;
      }
    }
  }

  // Ensure the camera is turned off when the component is destroyed
  ngOnDestroy() {
    this.stopCamera();
  }

} 
