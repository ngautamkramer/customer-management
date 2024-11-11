import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, MatDatepickerModule, RouterModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
  providers: [ApiService, provideNativeDateAdapter()]
})
export class AddComponent {

  // Inject MyService in the component constructor
  constructor(private apiService: ApiService, private router: Router) {}

  customerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    mobile_number: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    visit_date: new FormControl('', [Validators.required])
  });


  onSubmit(){
    
    let userInfo = this.apiService.getUserInfo();
    
    let sampleData: any = this.customerForm.value;
    sampleData['user_id'] = userInfo.user_id;

    this.apiService.addNewCustomer(sampleData).subscribe({
      next: (response) => {
          alert("Customer Added successfully");
          this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error during POST:', error.message);
      }
    });

  }

}
