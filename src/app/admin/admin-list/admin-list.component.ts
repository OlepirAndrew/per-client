import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { AdminService } from '../service/admin.service';
import { AsyncPipe, NgClass, NgForOf, NgSwitch, NgSwitchCase, NgSwitchDefault, TitleCasePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { IAdmin } from '../service/admin';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of, startWith, switchMap, take, tap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Channel } from 'node:diagnostics_channel';


type ReflectAdmin = Omit<IAdmin, 'password'>

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
  cd = inject(ChangeDetectorRef);


  displayedColumns: string[] = ['id', 'name', 'email', 'lastLogin', 'createdAt', 'updatedAt', 'actions'];
  adminList: IAdmin[] = [];
  pageSize= 10

  resultsLength = 0;
  isLoadingResults = false;
  disable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.paginator.page.pipe(
      tap(() => this.isLoadingResults = true),
      startWith(this.getAdmins()),
      switchMap(() => this.getAdmins()),
      ).subscribe();
  }

  getAdmins()  {
     return this.adminService.getAdmins$(this.paginator.pageIndex + 1, this.pageSize)
      .pipe(
        // tap(res => {
        //
        //   console.log('this.isLoadingResults', this.isLoadingResults)
        //   // this.cd.detectChanges();
        // }),

        map(({admins, meta}) => { //<=== error

          if (admins === null) {
            return [];
          }

          this.resultsLength = meta.itemCount;

          return admins;
        }),
        tap(admins => {
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
    console.log(admin.id)
    this.router.navigate(['edit', admin.id], { relativeTo: this.route });
    }

  addAdmin() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
}
