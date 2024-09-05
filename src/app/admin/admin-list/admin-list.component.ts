import { AfterViewInit, Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { AdminService } from '../service/admin.service';
import { AsyncPipe, NgClass, NgForOf, NgSwitch, NgSwitchCase, NgSwitchDefault, TitleCasePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { IAdmin } from '../service/admin';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, startWith, switchMap, take, tap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  imports: [MatTableModule, MatCheckboxModule, NgClass, MatButton, AsyncPipe, NgSwitch, NgForOf, TitleCasePipe, NgSwitchCase, NgSwitchDefault, MatPaginator, MatProgressSpinner],
  selector: 'app-admin-list',
  standalone: true,
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.scss',
})
export class AdminListComponent implements AfterViewInit {
  adminService = inject(AdminService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  displayedColumns: string[] = ['id', 'name', 'email', 'lastLogin', 'createdAt', 'updatedAt', 'actions'];
  adminList: IAdmin[] = [];
  pageSize= 10

  resultsLength = 0;
  isLoadingResults = false;
  disable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  destroyRef = inject(DestroyRef);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.paginator.page.pipe(
      tap(() => this.isLoadingResults = true),
      startWith(this.getAdmins()),
      switchMap(() => this.getAdmins()),
      takeUntilDestroyed(this.destroyRef),
      ).subscribe();
  }

  getAdmins()  {
     return this.adminService.getAdmins$(this.paginator.pageIndex + 1, this.pageSize)
      .pipe(
        map(({admins, meta}) => {
          this.resultsLength = meta.itemCount;
          this.isLoadingResults = false;
          this.adminList = admins
        }),
      )
  }

  onDelete(admin: IAdmin) {
    this.disable.next(true);
    this.adminService.delete(admin)
      .pipe(
        switchMap(() => this.getAdmins()),
        take(1),
      ).subscribe({
        next: (admins) => this.onReset(),
    });
  }

  onReset() {
    this.disable.next(false);
  }

  edit(admin: IAdmin) {
    this.router.navigate(['edit', admin.id], { relativeTo: this.route });
  }

  addAdmin() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
}
