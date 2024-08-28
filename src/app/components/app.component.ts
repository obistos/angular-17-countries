import { Component, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ScrollComponent } from './scroll/scroll.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    ScrollComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'World Countries';
  showScroll$ = of(false);
  
  constructor(public authService: AuthService) {}

  @HostListener('document:scroll', ['$event'])
    onScroll() {
      const pos = window.scrollY;
      if(pos > 300) this.showScroll$ = of(true);
      else this.showScroll$ = of(false);
  }

  ngAfterViewInit(): void {
    this.onScrollToTop();
  }

  onScrollToTop(): void {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
  
  logout() {
    this.authService.logout()
  }
}
