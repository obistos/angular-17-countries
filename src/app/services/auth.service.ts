import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../interfaces/user.interface';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private dataService: DataService, private router: Router) { }

  login(username: string, password: string) {
    this.dataService.getUsers()
    .subscribe((results) => {
      const user: User = results.find((res: User) => res.username === username && res.password === password);
      if(user) {
        localStorage.setItem('authToken', this.createJWTToken(JSON.stringify(user)));
        this.router.navigate(['/countries']);

      } else {
        alert('Login Failed.');
      }
    });
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  createJWTToken(details: string) {
    const header = {
      "alg": "HS256",
      "exp": "60",
      "typ": "JWT"
    }
    const encodedHeaders = btoa(JSON.stringify(header))
    const encodedPlayload = btoa(JSON.stringify(details))
    const HMACSHA256 = (stringToSign = '', secret = '') => "not_implemented"
    
    const signature = HMACSHA256(`${encodedHeaders}.${encodedPlayload}`, "MG")
    const encodedSignature = btoa(signature)

    const jwt = `${encodedHeaders}.${encodedPlayload}.${encodedSignature}`
    console.log({jwt})
    return jwt;
  }

  getLoggedInUser() {
    const token = localStorage.getItem('authToken') ?? '';
    const helper = new JwtHelperService();
    const user = helper.decodeToken(token);
    return JSON.parse(user);
  }

  isAdminUser(): boolean {
    const user = this.getLoggedInUser();
    if(user.role === 'Admin') return true;
    else return false;
  }
  
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }
}
