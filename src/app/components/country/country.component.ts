import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent implements OnDestroy {
  onDestroy$ = new Subject<boolean>();
  data = [];
  path = '';

  constructor(private dataService: DataService, route: ActivatedRoute) {
    const url = route.snapshot.url;
    this.path = url[url.length-1].path;

    this.dataService.getCountryByID(route.snapshot.params['id'])
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((res) => {
      this.data = res[0];
      console.log(this.data);      
    });    
  }

  ngOnDestroy(): void {
      this.onDestroy$.next(true);
      this.onDestroy$.complete();
  }
}
