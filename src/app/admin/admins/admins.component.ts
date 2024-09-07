import { Component, InjectionToken } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { IAdmin } from '../../shared/types';
import { MatPaginator } from '@angular/material/paginator';
import { ItemListComponent } from '../../shared/item-list.abstract.class';
import { ItemTableComponent } from '../../shared/item-table/item-table.component';


export const DISPLAYED_ADMIN_COLUMNS = new InjectionToken<string[]>('DisplayedAdminColumns');

@Component({
  imports: [
    ItemTableComponent,
    MatPaginator,
    MatButton
  ],
  selector: 'app-admin-list',
  standalone: true,
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.scss',
})
export class AdminsComponent extends ItemListComponent<IAdmin>{

}
