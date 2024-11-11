import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [ApiService]
})
export class LoginComponent {


  // Inject MyService in the component constructor
  constructor(private apiService: ApiService, private router: Router) {}

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });



  onSubmit() {

    const sampleData = this.userForm.value;

    this.apiService.loginUser(sampleData).subscribe({
      next: (response) => {
        if(response.success){
          this.apiService.setCookie("loggedInUser", JSON.stringify(response.data), 1);
          window.location.href = "/dashboard";
        }else{
          alert("Invalid login details");
        }
      },
      error: (error) => {
        console.error('Error during POST:', error.message);
      }
    });

  }

}
