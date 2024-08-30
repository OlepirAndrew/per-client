import {SelectionModel} from '@angular/cdk/collections';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { AdminService } from '../service/admin.service';
import { AsyncPipe, NgClass, NgForOf, NgSwitch, NgSwitchCase, NgSwitchDefault, TitleCasePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { IAdmin } from '../service/admin';
import { ActivatedRoute, Router } from '@angular/router';

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
  displayedColumns: string[] = ['id', 'name', 'email', 'password', 'lastLogin', 'createdAt', 'updatedAt', 'actions'];
  adminList!:MatTableDataSource<IAdmin>;

  ngOnInit() {
    this.adminService.getAdmins$().subscribe(admins => {
      this.adminList = new MatTableDataSource<IAdmin>(admins)
    })
  }


  onDelete(admin: IAdmin) {
    console.log(admin)
    this.adminList.data = this.adminList.data.filter(a => a.id !== admin.id);
  }

  edit(admin: IAdmin) {
    console.log(admin.id)
    this.router.navigate(['edit', admin.id], { relativeTo: this.route });
    }

  addAdmin() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
}
