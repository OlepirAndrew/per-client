import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {  MatCardModule} from '@angular/material/card';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLoginComponent {
  title = 'Admin Login'
  loginForm: FormGroup<Login>;
  disable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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
          this.disable.next(false);
          console.log('ERR', err)
        }
      }
    )
  }

  onReset() {
    this.disable.next(false);
    this.loginForm.reset();
  }
}
