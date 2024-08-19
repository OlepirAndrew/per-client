import { Component, inject, Inject, OnInit } from '@angular/core';
import { PerformersService } from './performers.service';
import { Observable } from 'rxjs';
import { IPerformer } from './type';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { PerformerComponent } from './performer/performer.component';

@Component({
  selector: 'app-performers-list',
  standalone: true,
  imports: [
    AsyncPipe, JsonPipe, PerformerComponent
  ],
  templateUrl: './performers-list.component.html',
  styleUrl: './performers-list.component.scss'
})
export class PerformersListComponent implements OnInit {
  private performersService = inject(PerformersService)
  performers$!: Observable<IPerformer[]>

  ngOnInit() {
    this.performers$ = this.performersService.getPerformers$()
  }
}
