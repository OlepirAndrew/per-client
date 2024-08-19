import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IPerformer } from '../type';
import { MatCardModule } from '@angular/material/card';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-performer',
  standalone: true,
  imports: [MatCardModule, NgOptimizedImage],
  templateUrl: './performer.component.html',
  styleUrl: './performer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformerComponent {
  @Input() performer!: IPerformer
}
