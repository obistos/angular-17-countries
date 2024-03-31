import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // Get
  getAllCountries(): Observable<any> {
    return this.http.get('https://restcountries.com/v3.1/all?fields=name,capital,currencies,region,population,flag,cca2,flags');
  }

  getCountryByID(Id: string): Observable<any> {
    return this.http.get(`https://restcountries.com/v3.1/alpha/${Id}`);
  }

  getUsers(): Observable<any> {
    return this.http.get('./assets/users.json');
  }

  // Update
  updateCountryByID(Id: string, data: any): Observable<any> {
    return this.http.put(`https://restcountries.com/v3.1/alpha/${Id}`, data);
  }

  // Delete
  deleteCountryByID(Id: string): Observable<any> {
    return this.http.delete(`https://restcountries.com/v3.1/alpha/${Id.toLowerCase()}`);
  }
}
