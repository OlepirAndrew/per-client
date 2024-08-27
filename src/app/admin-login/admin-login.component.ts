import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { MatCardModule} from '@angular/material/card';
import { MatError, MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { ILogin, LoginService } from './service/login.service';
import { BehaviorSubject, take } from 'rxjs';
import { TokenService } from '../shared/service/token.service';

interface IAuthErrors {
  status: string,
  statusText: string,
  message: string
}

interface Login {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatHint,
    MatError,
    MatLabel,
    JsonPipe,
    AsyncPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  title = 'Admin Login'
  errorTitle = 'Authentication error';
  authErrors: IAuthErrors | null = null;
  loginForm: FormGroup<Login>;
  disable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  tokenService = inject(TokenService);

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private loginService: LoginService,
    ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,
        // Validators.email,
        Validators.maxLength(40)]],
      password:  ['', [Validators.required, Validators.maxLength(40)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.invalid)  {
      for (const key in this.loginForm.controls) {
        if (!this.loginForm.get(key)?.dirty) {
          this.loginForm.get(key)?.markAsTouched()
        }
      }

      return
    }
    this.disable.next(true);

    const login = <ILogin>this.loginForm.value;

    this.loginService.login$(login)
      .pipe(take(1))
      .subscribe({
        next: () => this.onReset(),
        error: (err) => {
          const mesErr = {
            message: err.error.message,
            status: err.status,
            statusText: err.statusText,
          }

          this.authErrors = {...mesErr};
        }
      }
    )
  }

  onReset() {
    this.disable.next(false);
    this.loginForm.reset();
    this.authErrors = null;
  }

  clearToken() {
    this.tokenService.removeToken()
  }
}
