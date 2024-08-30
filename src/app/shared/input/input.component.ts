import { Component, Input } from '@angular/core';
import { MatError, MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { AsyncPipe, JsonPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatHint,
    MatError,
    MatLabel,
    JsonPipe,
    AsyncPipe,
    TitleCasePipe,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() type!: string;
  @Input() placeholder!: string;
  @Input() errorMessage!: string;
  @Input() errorName!: string;
}
