import { Component } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  onDestroy$ = new Subject<boolean>();
  loginForm: FormGroup;
  errorMessage = '';
  appearance: MatFormFieldAppearance = 'fill';
  users = [];

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder, 
    private authService: AuthService
    ) {
    this.dataService.getUsers()
    .pipe(take(1))
    .subscribe((res) => {
      this.users = res;   
    });

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges
    .pipe(takeUntil(this.onDestroy$))
    .subscribe(() => {
      this.updateErrorMessage();
    });
  }

  updateErrorMessage() {
    if (this.loginForm.get('username')?.hasError('required')) this.errorMessage = 'You must enter a value';
    if (this.loginForm.get('password')?.hasError('required')) this.errorMessage = 'You must enter a value';
    else this.errorMessage = '';
  }
  onSubmit(): void {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.login(username, password);
  }

  ngOnDestroy(): void {
      this.onDestroy$.next(true);
      this.onDestroy$.complete();
  }
}
