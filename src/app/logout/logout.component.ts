import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
  providers: [ApiService]
})
export class LogoutComponent {

  constructor(private apiService: ApiService, private router: Router) {}


  ngOnInit(): void {
    this.apiService.deleteCookie('loggedInUser');
    window.location.href = "/login";
  }  

}
