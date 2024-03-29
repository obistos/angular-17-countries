import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { DataService } from '../../services/data.service';
import { Countries } from '../../interfaces/countries.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatGridListModule],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss'
})
export class CountriesComponent implements OnDestroy {
  onDestroy$ = new Subject<boolean>();
  data: Countries[] = [];

  constructor(private dataService: DataService, public authService: AuthService) {
    this.dataService.getAllCountries()
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((res) => {
      this.data = res;
      console.log(this.data);
    })
  }

  ngOnDestroy(): void {
      this.onDestroy$.next(true);
      this.onDestroy$.complete();
  }
}
