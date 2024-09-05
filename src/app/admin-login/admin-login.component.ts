import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { MatCardModule} from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { ILogin, LoginService } from './service/login.service';
import { BehaviorSubject, take } from 'rxjs';
import { TokenService } from '../shared/service/token.service';
import { InputComponent } from '../shared/input/input.component';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

interface Login {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormField,
    JsonPipe,
    AsyncPipe,
    InputComponent,
    MatButton,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  title = 'Admin Login'
  form: FormGroup<Login>;
  disable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  router= inject(Router);
  tokenService = inject(TokenService);

  constructor(
    private loginService: LoginService,
    ) {
    this.form = new FormGroup<Login>({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(255)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ])
    });
  }

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

  onSubmit() {
    if (this.form.invalid)  {
      for (const key in this.form.controls) {
        if (!this.form.get(key)?.dirty) {
          this.form.get(key)?.markAsTouched()
        }
      }

      return
    }
    this.disable.next(true);

    const login = <ILogin>this.form.value;

    this.loginService.login$(login)
      .pipe(take(1))
      .subscribe({
        next: () => this.router.navigate(['admin']),
        error: () => this.disable.next(false)
      }
    )
  }

  onReset() {
    this.disable.next(false);
    this.form.reset();
  }

  // ----delete----->
  clearToken() {
    this.tokenService.removeToken()
  }

  login() {
    const email = 'admin@admin';
    const password = 'admin@admin';
    this.form.patchValue({email, password});
  }
 //------>
}
