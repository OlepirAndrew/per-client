import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { IAuthErrors } from '../../admin-login/admin-login.component';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatButton
  ],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerStatusComponent {
  @Input() status!: IAuthErrors
  @Output() reset: EventEmitter<any> = new EventEmitter();

}
