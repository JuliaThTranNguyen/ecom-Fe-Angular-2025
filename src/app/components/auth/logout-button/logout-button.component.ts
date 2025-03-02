import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SuccessPopupComponent } from '../success-popup/success-popup/success-popup.component';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  standalone: false,
})
export class LogoutButtonComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdminRole: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router,
    private refresher: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      if (status) {
        this.loadUserRole();
      } else {
        this.isAdminRole = false;
      }
      this.refresher.detectChanges();
    });
  }

  loadUserRole(): void {
    this.userService.getProfile().subscribe({
      next: (profile) => {
        this.isAdminRole = profile.role === 'ROLE_ADMIN';
      },
      error: (error) => {
        console.error('Failed to fetch user role:', error);
      },
    });
  }

  onLogout(): void {
    this.authService.logoutUser().subscribe({
      next: (response) => {
        console.log('Logout success:', response);

        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenId');

        this.authService.updateLoginStatus(false);

        this.dialog.open(SuccessPopupComponent, {
          data: {
            message: response.message || 'Logging out... Redirecting...',
          },
        });

        setTimeout(() => {
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        }, 2000);
      },
      error: (error) => {
        console.error('Logout failed:', error.message);

        this.dialog.open(SuccessPopupComponent, {
          data: {
            message: error.message || 'Logout failed. Please try again.',
          },
        });

        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenId');
        this.authService.updateLoginStatus(false);
      },
    });
  }
}
