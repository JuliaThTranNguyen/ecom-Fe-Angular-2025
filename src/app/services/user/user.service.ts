import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  PaginatedUsersResponse,
  UserProfileModel,
} from '../../models/user.model';
import { AuthService } from '../auth/auth.service';
import { isPlatformBrowser } from '@angular/common';

const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private profileUrl = BASE_URL + '/profile';
  private usersUrl = BASE_URL + '/users';
  private userRole: string | null = null;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
        // Only attempt to read from localStorage in the browser
        if (isPlatformBrowser(this.platformId)) {
          this.userRole = localStorage.getItem('userRole');
        }
  }

  // Method to check user role after getting user token
  isAdmin(): boolean {
    console.log('Checking Admin Role:', this.userRole);
    return this.userRole === 'ROLE_ADMIN';
  }

  // Use stored role instead of JWT
  getUserRole(): string | null {
    return this.userRole;
  }

  // Fetch a single user profile
  getProfile(): Observable<UserProfileModel> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError(
        () => new Error('No access token found! Please log in.')
      );
    }

    console.log('Before fetching profile, token:', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.httpClient
      .get<UserProfileModel>(this.profileUrl, { headers })
      .pipe(
        tap((profile) => {
          this.userRole = profile.role;
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('userRole', this.userRole); 
          }
          console.log('User role:', this.userRole);
        }),
        catchError((error) => {
          console.error('Profile fetch error:', error);
          return throwError(
            () => new Error(error.error?.message || 'Failed to load profile.')
          );
        })
      );
  }

  // Edit user profile
  updateProfile(
    updatedUser: Partial<UserProfileModel>
  ): Observable<UserProfileModel> {
    let token = this.authService.getToken();
    if (!token) {
      return throwError(
        () => new Error('No access token found! Please log in.')
      );
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.httpClient
      .put<UserProfileModel>(this.profileUrl, updatedUser, { headers })
      .pipe(
        catchError((error) => {
          console.error('Profile update error:', error);
          return throwError(
            () => new Error(error.error?.message || 'Failed to update profile.')
          );
        })
      );
  }

  // Get all users
  getAllUsers(
    pageNo: number,
    pageSize: number
  ): Observable<PaginatedUsersResponse> {
    let token = this.authService.getToken();
    if (!token) {
      return throwError(
        () => new Error('No access token found! Please log in.')
      );
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.httpClient
      .get<PaginatedUsersResponse>(
        `${this.usersUrl}?pageSize=${pageSize}&pageNo=${pageNo}`,
        { headers }
      )
      .pipe(
        tap((response) => console.log('Fetched users:', response)),
        catchError((error) => {
          console.error('Error fetching all users:', error);
          return throwError(
            () => new Error(error.error?.message || 'Failed to load users.')
          );
        })
      );
  }

  // Delete user
  deleteUser(userId: number): Observable<any> {
    let token = this.authService.getToken();
    if (!token) {
      return throwError(
        () => new Error('No access token found! Please log in.')
      );
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.httpClient
      .delete(`${this.usersUrl}/${userId}`, { headers, responseType: 'text' })
      .pipe(
        map(() => null), // Convert response to `null` since no JSON is expected
        tap(() => console.log(`User ${userId} deleted successfully`)),
        catchError((error) => {
          console.error('Error deleting user:', error);
          return throwError(
            () => new Error(error.error?.message || 'Failed to delete user.')
          );
        })
      );
  }
}
