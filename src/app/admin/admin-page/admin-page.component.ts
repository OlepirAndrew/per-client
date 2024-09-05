 import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { InputComponent } from '../../shared/input/input.component';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, filter, map, switchMap, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { IAdmin } from '../service/admin';
import { v4 as uuidv4 } from 'uuid';

export interface INewAdminDate {
  id?: number,
  name: string,
  email: string,
  password?: string
}

interface AdminForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    AsyncPipe,
    InputComponent,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    ReactiveFormsModule,
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent implements OnInit{
  title= ''
  form!: FormGroup<AdminForm>;
  disable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private route = inject(ActivatedRoute);
  private adminService = inject(AdminService);
  private router = inject(Router);
  admin!: IAdmin;
  isAdminEdit: boolean = false;

  constructor() {
    this.form = new FormGroup<AdminForm>({
      name: new FormControl(this.admin?.name, [
        Validators.required,
        Validators.maxLength(255)
      ]),
      email: new FormControl(this.admin?.email, [
        Validators.required,
        Validators.email,
        Validators.maxLength(255)
      ]),
      password: new FormControl('', [
        Validators.maxLength(255)
      ]),
    });
  }

  ngOnInit() {
    this.route.url.pipe(
      map(segments => {
        this.isAdminEdit = segments.some(segment => segment.path === 'edit');
        this.title = this.isAdminEdit ? 'Edit Admin' : 'Add Admin';
        !this.isAdminEdit && this.password.setValidators(Validators.required);

        return this.isAdminEdit
      }),
      filter(Boolean),
      switchMap(() => this.route.params),
      switchMap((params) => {
        return this.adminService.getAdminByIndex$(Number(params['id']));
      }),
      filter(Boolean),
      take(1),
    ).subscribe({
      next: (params) => {
        this.admin = {...params}

        this.updateForm();
      },
    }
    )
  }

  private updateForm() {
    this.form.patchValue(this.admin);
  }

  get name() {
    return this.form.controls['name'];
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

    const newAdminDate = {
      ...this.isAdminEdit && {id: this.admin.id},
      ...this.form.value
    } as INewAdminDate ;

    if(!newAdminDate.password) {
      delete newAdminDate.password
    }

    this.adminService.submitAdmin$(newAdminDate, this.isAdminEdit ?  'edit' : 'add')
      .pipe(take(1))
      .subscribe({
          next: () => {
            this.router.navigate(['admin/admins'])
          },
          error: () =>  this.disable.next(false)
        }
      )
  }

  generateMany() {
    let counter = 0
    const interval = setInterval(() => {
      counter++

      const name = `admin1_${uuidv4().slice(0, 8)}`;
      const email = `${name}@example.com`;
      const password = 'email';
      this.form.patchValue({name, email, password});

      this.onSubmit();

      if (counter === 100) {
        clearInterval(interval);
      }
    }, 500)
  }

  generateOne(){
    const name = `admin1_${uuidv4().slice(0, 8)}`;
    const email = `${name}@example.com`;
    const password = name;
    this.form.patchValue({name, email, password});
  }


}
