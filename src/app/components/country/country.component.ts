import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

import { DataService } from '../../services/data.service';
import { Country } from '../../interfaces/country.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent implements OnDestroy {
  onDestroy$ = new Subject<boolean>();
  form: FormGroup;
  appearance: MatFormFieldAppearance = 'fill';
  errorMessage = '';
  country: Country;
  languages: any = [];
  saveCountry: Country;
  path = '';

  constructor(
    private fb: FormBuilder, 
    private dataService: DataService, 
    private route: ActivatedRoute, 
    public authService: AuthService
    ) {
    this.country = history.state;
    this.saveCountry = history.state;

    const url = this.route.snapshot.url;
    this.path = url[url.length-1].path;

    this.dataService.getCountryByID(this.route.snapshot.params['id'])
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((res) => {
      if(res.length>0) {
        this.country = res[0];
        this.languages = Object.values(res[0].languages) ?? [];
      }
    });

    this.form = this.fb.group ({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      capital: new FormControl('', [Validators.required]),
      region: new FormControl('', [Validators.required]),
      subregion: new FormControl('', [Validators.required]),
      population: new FormControl('', [Validators.required])
    });

    this.form.valueChanges
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((values) => {
      this.updateErrorMessage();
      this.saveCountry.name.common = values.name;
      this.saveCountry.name.official = values.description;
      this.saveCountry.capital = [values.capital];
      this.saveCountry.region = values.region;
      this.saveCountry.subregion = values.subregion;
      this.saveCountry.population = values.population;
    })
  }

  getCurrency(item: any) {
    const values = Object.keys(item);
    if(values) return values;
    else return '';
  }

  getCurrencySymbol(item: any) {
    const currency: string = Object.keys(item)[0];
    if(currency) return item[currency];
    else return {};
  }

  getLanguageTranslation(item: any) {
    let data: any = [];
    if(item) {
      const currencies = Object.keys(item);
      currencies.forEach((el) => {
        data.push({name: el, ...item[el]})
      });
    }
    return data;
  }

  saveDetails(): void {
    this.dataService.updateCountryByID(this.country.cca2, this.saveCountry).subscribe()
  }

  updateErrorMessage() {
    if (this.form.get('name')?.hasError('required')) this.errorMessage = 'You must enter a value';
    if (this.form.get('description')?.hasError('required')) this.errorMessage = 'You must enter a value';
    if (this.form.get('capital')?.hasError('required')) this.errorMessage = 'You must enter a value';
    if (this.form.get('region')?.hasError('required')) this.errorMessage = 'You must enter a value';
    if (this.form.get('subregion')?.hasError('required')) this.errorMessage = 'You must enter a value';
    if (this.form.get('population')?.hasError('required')) this.errorMessage = 'You must enter a value';
    else this.errorMessage = '';
  }

  ngOnDestroy(): void {
      this.onDestroy$.next(true);
      this.onDestroy$.complete();
  }
}
