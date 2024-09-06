import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { InputComponent } from '../../shared/input/input.component';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { INewAdminDate } from '../../admin/admin-info/admin-info.component';
import { BehaviorSubject, filter, map, switchMap, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin/service/admin.service';
import { IPerformer } from '../../shared/types';
import { v4 as uuidv4 } from 'uuid';
import { PerformersService } from '../performers.service';


interface PerformerForm {
  name: FormControl<string | null>;
  nickName: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}


@Component({
  selector: 'app-performer-info',
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
        ReactiveFormsModule
    ],
  templateUrl: './performer-info.component.html',
  styleUrl: './performer-info.component.scss'
})
export class PerformerInfoComponent implements OnInit {
  title= ''
  form!: FormGroup<PerformerForm>;
  disable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private route = inject(ActivatedRoute);
  private performerService = inject(PerformersService);
  private router = inject(Router);
  performer!: IPerformer;
  isPerformerEdit: boolean = false;

  constructor() {
    this.form = new FormGroup<PerformerForm>({
      name: new FormControl(this.performer?.name, [
        Validators.required,
        Validators.maxLength(255)
      ]),
      nickName: new FormControl(this.performer?.name, [
        Validators.required,
        Validators.maxLength(255)
      ]),
      email: new FormControl(this.performer?.email, [
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
        this.isPerformerEdit = segments.some(segment => segment.path === 'edit');
        this.title = this.isPerformerEdit ? 'Edit Performer' : 'Add Performer';
        !this.isPerformerEdit && this.password.setValidators(Validators.required);

        return this.isPerformerEdit
      }),
      filter(Boolean),
      switchMap(() => this.route.params),
      switchMap((params) => {
        return this.performerService.getItemById$(Number(params['id']));
      }),
      filter(Boolean),
      take(1),
    ).subscribe({
        next: (params) => {
          this.performer = {...params}

          this.updateForm();
        },
      }
    )
  }

  private updateForm() {
    this.form.patchValue(this.performer);
  }

  get name() {
    return this.form.controls['name'];
  }

  get nickName() {
    return this.form.controls['nickName'];
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
      ...this.isPerformerEdit && {id: this.performer.id},
      ...this.form.value
    } as INewAdminDate ;

    if(!newAdminDate.password) {
      delete newAdminDate.password
    }

    this.performerService.submitItem$(newAdminDate, this.isPerformerEdit ?  'edit' : 'add')
      .pipe(take(1))
      .subscribe({
          next: () => {
            this.router.navigate(['admin/performers'])
          },
          error: () =>  this.disable.next(false)
        }
      )
  }

  generateMany() {
    let counter = 0
    const interval = setInterval(() => {
      counter++

      const name = `performer_${uuidv4().slice(0, 8)}`;
      const email = `${name}@example.com`;
      const nickName = `performer_${uuidv4().slice(0, 8)}`;
      const password = 'performer';
      this.form.patchValue({name, nickName, email, password});

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
    const nickName = `performer_${uuidv4().slice(0, 8)}`;
    this.form.patchValue({name, email, password, nickName});
  }


}
