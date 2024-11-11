import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterLink, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule, HttpClientModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [ApiService]
})
export class NavbarComponent {

  constructor(private apiService: ApiService, private router: Router) {}

  currentUser: any = '';
  loginStatus: boolean = false;
  userImage: string = '';

  ngOnInit(): void {
    //check routes change
    this.currentUser =  this.apiService.getUserInfo();
    if(this.currentUser){
      this.loginStatus = true;
    }
    //end check routes change

    const firstLetter = this.currentUser.name ? this.currentUser.name.charAt(0).toUpperCase() : 'A';
    this.userImage = `https://www.gravatar.com/avatar/${firstLetter}`;
  }  

}
