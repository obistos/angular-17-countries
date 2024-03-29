import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CountriesComponent } from './components/countries/countries.component';
import { CountryComponent } from './components/country/country.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuardService } from './services/admin-guard.service';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'countries',
        component: CountriesComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'country/:id/edit',
        component: CountryComponent,
        canActivate: [AuthGuardService, AdminGuardService]
    },
    {
        path: 'country/:id/view',
        component: CountryComponent,
        canActivate: [AuthGuardService]
    }
];
