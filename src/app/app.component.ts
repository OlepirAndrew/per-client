import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PerformersListComponent } from './performers-list/performers-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PerformersListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'per-client';
}
