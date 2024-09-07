import { Component, input, Input, output, Output } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { AsyncPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-item-table',
  standalone: true,
  imports: [
    MatProgressSpinner,
    MatTable,
    MatHeaderRow,
    MatRow,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatButton,
    MatHeaderRowDef,
    TitleCasePipe,
    AsyncPipe,
    MatRowDef
  ],
  templateUrl: './item-table.component.html',
  styleUrl: './item-table.component.scss'
})
export class ItemTableComponent {
  edit = output<any>()
  onDelete = output<any>()

  isLoadingResults = input.required<boolean>()
  itemsList = input.required<CdkTableDataSourceInput<any>>()
  displayedColumns = input<any>()
  disable = input.required<boolean>()

}
