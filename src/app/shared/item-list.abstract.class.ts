import { AfterViewInit, Component, DestroyRef, inject, signal, ViewChild } from '@angular/core';
import { AdminService } from '../admin/service/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IAdmin } from './types';
import { BehaviorSubject, map, startWith, switchMap, take, tap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DISPLAYED_ADMIN_COLUMNS } from '../admin/admin-list/admin-list.component';

@Component({
  template: ''
})
export abstract class ItemListComponent <T> implements AfterViewInit {
  itemService = inject(AdminService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  displayedColumns = inject(DISPLAYED_ADMIN_COLUMNS)
  itemsList: T[] = [];
  pageSize= 10

  resultsLength = 0;
  isLoadingResults = false;
  disable = signal<boolean>(false);
  destroyRef = inject(DestroyRef);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.paginator.page.pipe(
      tap(() => this.isLoadingResults = true),
      startWith(this.getItems()),
      switchMap(() => this.getItems()),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }

  getItems()  {
    return this.itemService.getItems$(this.paginator.pageIndex + 1, this.pageSize)
      .pipe(
        map(({entities, meta}) => {
          this.resultsLength = meta.itemCount;
          this.isLoadingResults = false;
          this.itemsList = entities
        }),
      )
  }

  onDelete(admin: IAdmin) {
    this.disable.set(true);
    this.itemService.deleteItem$(admin.id)
      .pipe(
        switchMap(() => this.getItems()),
        take(1),
      ).subscribe({
      next: (admins) => this.onReset(),
      error: () => this.onReset()
    });
  }

  onReset() {
    this.disable.set(false);
  }

  edit(item: T & { id: number }) {
    this.router.navigate(['edit', item.id], { relativeTo: this.route });
  }

  addItem() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
}
