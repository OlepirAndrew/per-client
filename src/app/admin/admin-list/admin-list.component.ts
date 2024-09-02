import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { AdminService } from '../service/admin.service';
import { AsyncPipe, NgClass, NgForOf, NgSwitch, NgSwitchCase, NgSwitchDefault, TitleCasePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { IAdmin } from '../service/admin';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, take } from 'rxjs';


type ReflectAdmin = Omit<IAdmin, 'password'>

@Component({
  imports: [MatTableModule, MatCheckboxModule, NgClass, MatButton, AsyncPipe, NgSwitch, NgForOf, TitleCasePipe, NgSwitchCase, NgSwitchDefault],
  selector: 'app-admin-list',
  standalone: true,
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.scss',
})
export class AdminListComponent implements OnInit {
  adminService = inject(AdminService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  displayedColumns: string[] = ['id', 'name', 'email', 'lastLogin', 'createdAt', 'updatedAt', 'actions'];
  adminList!:MatTableDataSource<ReflectAdmin>;
  disable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ngOnInit() {
    this.adminService.getAdmins$().subscribe(admins => {
      console.log(admins);
      this.adminList = new MatTableDataSource<ReflectAdmin>(admins)
    })
  }


  onDelete(admin: IAdmin) {
    this.disable.next(true);
    this.adminService.delete(admin)
      .pipe(take(1)).subscribe({
      next: (admins) => {
        this.adminList = new MatTableDataSource<ReflectAdmin>(admins);
        this.onReset();
      },
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
