import { Component, InjectionToken } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule} from '@angular/material/checkbox';

import { AsyncPipe, NgClass, NgForOf, NgSwitch, NgSwitchCase, NgSwitchDefault, TitleCasePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { IAdmin } from '../../shared/types';

import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ItemListComponent } from '../../shared/item-list.abstract.class';
import { ItemTableComponent } from '../../shared/item-table/item-table.component';


export const DISPLAYED_ADMIN_COLUMNS = new InjectionToken<string[]>('DisplayedAdminColumns');

@Component({
  imports: [MatTableModule, MatCheckboxModule, NgClass, MatButton, AsyncPipe, NgSwitch, NgForOf, TitleCasePipe, NgSwitchCase, NgSwitchDefault, MatPaginator, MatProgressSpinner, ItemTableComponent],
  selector: 'app-admin-list',
  standalone: true,
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.scss',
})
export class AdminListComponent extends ItemListComponent<IAdmin>{

}
