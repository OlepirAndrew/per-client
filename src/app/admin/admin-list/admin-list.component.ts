import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.scss'
})
export class AdminListComponent implements OnInit{

  private adminService = inject(AdminService)

  ngOnInit() {
    this.adminService.getAdmins$().subscribe(admins => {
      console.log('Admins', admins);
    })
  }
}
