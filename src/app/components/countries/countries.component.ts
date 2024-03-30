import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { DataService } from '../../services/data.service';
import { Country } from '../../interfaces/country.interface';
import { AuthService } from '../../services/auth.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { FilterPipe } from '../../helpers/filter.pipe';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule, 
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    FilterPipe
  ],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss'
})
export class CountriesComponent implements OnDestroy {
  onDestroy$ = new Subject<boolean>();
  countries: Country[] = [];
  searchText = '';
  appearance: MatFormFieldAppearance = 'fill';

  constructor(
    public dialog: MatDialog,
    private dataService: DataService, 
    public authService: AuthService
    ) {
    this.dataService.getAllCountries()
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((res) => {
      this.countries = res.sort((a: any, b: any) => a.region.localeCompare(b.region));
    })
  }

  confirmDeletion(country: Country): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: country
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dataService.deleteCountryByID(result)
        .subscribe((response) => console.log(response));
      }
    });
  }

  ngOnDestroy(): void {
      this.onDestroy$.next(true);
      this.onDestroy$.complete();
  }
}
