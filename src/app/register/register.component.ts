import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [ApiService]
})


export class RegisterComponent {

   // Inject MyService in the component constructor
   constructor(private apiService: ApiService, private router: Router) {}

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });



  onSubmit() {

    const sampleData = this.userForm.value;

    this.apiService.regsiterNewUser(sampleData).subscribe({
      next: (response) => {
        if(response.data == "email_exist"){
          alert("Email id already exist");
        }else{
          alert("User regsiter successfully");
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.error('Error during POST:', error.message);
      }
    });

  }

}
