import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient, private cookieService: CookieService) {}

   // Method to POST data
   regsiterNewUser(data: any): Observable<any> {
    return this.http.post<any>(environment.api_url + "register", data).pipe(
      map((response) => {
        console.log('POST response:', response); // Log or process the response
        return response;  // Return transformed response if needed
      }),
      catchError(this.handleError)  // Handle errors
    );
  }

  loginUser(data: any): Observable<any> {
    return this.http.post<any>(environment.api_url + "login", data).pipe(
      map((response) => {
        console.log('POST response:', response); // Log or process the response
        return response;  // Return transformed response if needed
      }),
      catchError(this.handleError)  // Handle errors
    );
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something went wrong. Please try again.'));
  }

  getUserInfo(){
    let info = this.getCookie("loggedInUser");
    if (info != '' && info != null) {
       return JSON.parse(info);
    } else {
      return false;
    }
  }

  isUserLoggedIn(){
    let info = this.getCookie("loggedInUser");
    if (info != '' && info != null) {
       return true
    } else {
      return false;;
    }
  }


  setCookie(name: string, value: string, days: number): void {
    this.cookieService.set(name, value, 1);
  }

  getCookie(name: string): string {
    return this.cookieService.get(name);
  }
  
  deleteCookie(name: string) {
    this.cookieService.delete(name);
  }

  // Method to POST data
  addNewCustomer(data: any): Observable<any> {
    return this.http.post<any>(environment.api_url + "addcustomer", data).pipe(
      map((response) => {
        console.log('POST response:', response); // Log or process the response
        return response;  // Return transformed response if needed
      }),
      catchError(this.handleError)  // Handle errors
    );
  }

  // Method to POST data
  getCustomers(data: any): Observable<any> {
    return this.http.get<any>(environment.api_url + "customers/" + data).pipe(
      map((response) => {
        console.log('GET response:', response); // Log or process the response
        return response;  // Return transformed response if needed
      }),
      catchError(this.handleError)  // Handle errors
    );
  }

  // Method to POST data
  deleteCustomers(user_id: string, customer_id: string): Observable<any> {
    return this.http.delete<any>(environment.api_url + "customers/" + user_id + '/' + customer_id).pipe(
      map((response) => {
        console.log('DELETE response:', response); // Log or process the response
        return response;  // Return transformed response if needed
      }),
      catchError(this.handleError)  // Handle errors
    );
  }

  // Method to POST data
  getCustomer(user_id: string, customer_id: string): Observable<any> {
    
    return this.http.get<any>(environment.api_url + "customer/" + user_id + '/' + customer_id).pipe(
      map((response) => {
        console.log('GET response:', response); // Log or process the response
        return response;  // Return transformed response if needed
      }),
      catchError(this.handleError)  // Handle errors
    );

  }

  // Method to POST data
  updateCustomer(data: any): Observable<any> {
    return this.http.put<any>(environment.api_url + "customer", data).pipe(
      map((response) => {
        console.log('POST response:', response); // Log or process the response
        return response;  // Return transformed response if needed
      }),
      catchError(this.handleError)  // Handle errors
    );
  }


  changeUserPassword(data: any): Observable<any> {
    return this.http.put<any>(environment.api_url + "customer/change-password", data).pipe(
      map((response) => {
        console.log('POST response:', response); // Log or process the response
        return response;  // Return transformed response if needed
      }),
      catchError(this.handleError)  // Handle errors
    );
  }
  

  getFirstCharFromString(text: string){
    let firstInitial: string = '';
    let lastInitial: string = '';
    const nameParts = text.trim().split(" ");
    if (nameParts.length < 2) {
      firstInitial = nameParts[0].charAt(0);
      lastInitial = nameParts[0].charAt(1);
    }else{
      firstInitial = nameParts[0].charAt(0);
      lastInitial = nameParts[nameParts.length - 1].charAt(0);
    }
    return firstInitial + lastInitial;
  }

  generateColorFromString(input: string): string {

    let hash = 0;
  
    // Generate a hash from the string characters
    for (let i = 0; i < input.length; i++) {
      hash = input.charCodeAt(i) + ((hash << 5) - hash); // hash function
    }
  
    // Ensure the color is in a valid range
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += (`00${value.toString(16)}`).slice(-2);
    }
  
    return color;
  }
  

} 
