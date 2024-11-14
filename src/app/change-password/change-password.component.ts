import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
  providers: [ApiService]
})
export class ChangePasswordComponent {

  // Inject MyService in the component constructor
  constructor(private apiService: ApiService, private router: Router) {}

  changePasswordForm = new FormGroup({
    email: new FormControl({ disabled: true }, [Validators.required]),
    old_password: new FormControl("", [Validators.required]),
    new_password: new FormControl("", [Validators.required]),
    cnf_password: new FormControl("", [Validators.required])
  });
  checkPasswordMatchStatus: boolean = false;
  userInfo: any = '';

  ngOnInit(): void {
    this.userInfo = this.apiService.getUserInfo();
    this.changePasswordForm.patchValue({email: this.userInfo.email});
    this.changePasswordForm.get('email')?.disable();
  }

  
  onSubmit() {
    let sampleData: any = this.changePasswordForm.value; 
    sampleData['user_id'] = this.userInfo.user_id;

    this.apiService.changeUserPassword(sampleData).subscribe({
      next: (response) => {
        if(response.success){
          alert("Password changed sucessfully");
          this.apiService.deleteCookie("loggedInUser");
          window.location.href = "/logout";
        }else{
          alert(response.message);
        }
      },
      error: (error) => {
        console.error('Error during POST:', error.message);
      }
    });
  }


  validateBothPassword() {
    let new_password = this.changePasswordForm.get('new_password')?.value;
    let cnf_password = this.changePasswordForm.get('cnf_password')?.value;
    if(new_password && cnf_password){
      if(new_password == cnf_password){
        this.checkPasswordMatchStatus = false;
      }else{
        this.checkPasswordMatchStatus = true;
        this.changePasswordForm.setErrors({ forceInvalid: true });
      }
    }
  }


}
