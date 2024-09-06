import { AfterViewInit, Component, inject, InjectionToken, OnInit } from '@angular/core';
import { PerformersService } from './performers.service';
import { IAdmin, IPerformer } from '../shared/types';
import { DISPLAYED_ADMIN_COLUMNS } from '../admin/admin-list/admin-list.component';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTable
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ItemListComponent } from '../shared/item-list.abstract.class';

export const DISPLAYED_PERFORMER_COLUMNS = new InjectionToken<string[]>('DisplayedPerformerColumns');


@Component({
  selector: 'app-performers',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButton,
    MatCell,
    MatCellDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatProgressSpinner,
    MatRow,
    MatRowDef,
    MatTable,
    TitleCasePipe,
    MatColumnDef,
    MatHeaderCellDef
  ],
  templateUrl: './performers.component.html',
  styleUrl: './performers.component.scss'
})
export class PerformersComponent extends ItemListComponent<IPerformer> implements AfterViewInit {
  override itemService = inject(PerformersService);
  override displayedColumns = inject(DISPLAYED_PERFORMER_COLUMNS)



}
