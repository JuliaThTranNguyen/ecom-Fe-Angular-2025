import { Component, OnInit } from '@angular/core';
import {
  PaginatedUsersResponse,
  UserProfileModel,
} from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessPopupComponent } from '../../components/auth/success-popup/success-popup/success-popup.component';
import { ConfirmDeleteComponent } from '../../components/user/confirm-delete/confirm-delete.component';
import { response } from 'express';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  standalone: false,
})
export class UserManagementComponent implements OnInit {
  users: UserProfileModel[] = [];
  loading = true;
  errorMessage = '';

  pageNo: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    if (!this.userService.isAdmin()) {
      this.errorMessage = 'Access Denied: Only Admins Can View This Page';
      this.loading = false;
      return;
    }

    // Ensure pageNo is non-negative
    if (this.pageNo < 0) {
      this.pageNo = 0;
    }
    console.log(
      `Loading users with pageNo: ${this.pageNo} and pageSize: ${this.pageSize}`
    );

    this.userService.getAllUsers(this.pageNo, this.pageSize).subscribe({
      next: (response: PaginatedUsersResponse) => {
        this.users = response.content;
        this.totalElements = response.totalElements;
        this.loading = false;
      },
      error: (error) => {
        console.error('User Fetch Error:', error);
        this.errorMessage = 'Failed to load users: ' + error.message;
        this.loading = false;
      },
    });
  }

  onPaginatorChange(event: PageEvent): void {
    this.pageNo = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }

  confirmDelete(userId: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: { message: 'Are you sure you want to delete this user?' },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.userService.deleteUser(userId).subscribe({
          next: () => {
            this.users = this.users.filter((user) => user.userId !== userId);
            this.dialog.open(SuccessPopupComponent, {
              data: { message: 'User deleted successfully!' },
            });
          },
          error: (error) => {
            console.error('Delete Error:', error);
            alert(error.message);
          },
        });
      }
    });
  }
}
