import { AfterViewInit, Component, inject, InjectionToken } from '@angular/core';
import { PerformersService } from './performers.service';
import { IPerformer } from '../shared/types';
import { MatButton } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { ItemListComponent } from '../shared/item-list.abstract.class';
import { ItemTableComponent } from '../shared/item-table/item-table.component';
export const DISPLAYED_PERFORMER_COLUMNS = new InjectionToken<string[]>('DisplayedPerformerColumns');

@Component({
  selector: 'app-performers',
  standalone: true,
  imports: [
    ItemTableComponent,
    MatPaginator,
    MatButton

  ],
  templateUrl: './performers.component.html',
  styleUrl: './performers.component.scss'
})
export class PerformersComponent extends ItemListComponent<IPerformer> implements AfterViewInit {
  override itemService = inject(PerformersService);
  override displayedColumns = inject(DISPLAYED_PERFORMER_COLUMNS)

  buttonName = 'Add performer';
}
