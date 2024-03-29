import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if(this.authService.isAdminUser()) return true;
    else this.router.navigate(['/countries']); return false;
  }
}