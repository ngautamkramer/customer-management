import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, MatDatepickerModule, RouterModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  providers: [ApiService, provideNativeDateAdapter()]
})
export class EditComponent {

  // Inject MyService in the component constructor
  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {}

  userInfo: any;
  customerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    mobile_number: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    visit_date: new FormControl('', [Validators.required])
  });
  currentCustomerId:any = null;
  

  ngOnInit(): void {

      this.userInfo = this.apiService.getUserInfo();

      if(this.userInfo.user_id){
      
        this.route.paramMap.subscribe((params) => {

          this.currentCustomerId = params.get('id');
                
          this.apiService.getCustomer(this.userInfo.user_id, this.currentCustomerId).subscribe({
            next: (response) => {
              this.setFormValues(response.data);
            },
            error: (error) => {
              console.error('Error during POST:', error.message);
            }
          });

        });
        
      }

  }

  setFormValues(cData: any){    
    this.customerForm.patchValue(cData);
  }

  onSubmit(){

    if(this.userInfo.user_id){

      let sampleData: any = this.customerForm.value;

      console.log(sampleData);

      sampleData['user_id'] = this.userInfo.user_id;
      sampleData['customer_id'] = this.currentCustomerId;

      this.apiService.updateCustomer(sampleData).subscribe({
        next: (response) => {
            alert("Customer updated successfully");
            this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error during POST:', error.message);
        }
      });

    }

  }



}
