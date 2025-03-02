import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import {
  AuthApiResponse,
  AuthResponseModel,
  LoginRequestModel,
  LogoutRequestModel,
  SignupRequestModel,
} from '../../models/auth.model';
import { isPlatformBrowser } from '@angular/common';

const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private signupUrl = BASE_URL + '/auth/register';
  private loginUrl = BASE_URL + '/auth/login';
  private logoutUrl = BASE_URL + '/auth/logout';

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    // Only access localStorage if running in the browser
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('accessToken');
      this.isLoggedInSubject.next(!!token);
    }
  }

  updateLoginStatus(isLoggedIn: boolean): void {
    this.isLoggedInSubject.next(isLoggedIn);
  }

  getToken(): string | null {
    if (typeof window === 'undefined') {
      return null; // Prevents SSR crashes
    }
    
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('accessToken');
    }
    console.log(localStorage.getItem('accessToken'));

    return null; // Prevent SSR issues

  }

  // Register new user account
  registerUser(
    userData: SignupRequestModel
  ): Observable<AuthApiResponse<string>> {
    return this.httpClient
      .post<AuthApiResponse<string>>(this.signupUrl, userData)
      .pipe(catchError(this.handleError));
  }

  // Handle API - BE server errors
  private handleError(error: HttpErrorResponse) {
    console.error('Server error:', error);
    const errorMessage =
      error.error?.message ||
      'Oops, Something has went wrong! Please try again.';
    return throwError(() => new Error(errorMessage));
  }

  // User login - returns access token
  loginUser(loginData: LoginRequestModel): Observable<AuthResponseModel> {
    return this.httpClient
      .post<AuthResponseModel>(this.loginUrl, loginData)
      .pipe(
        catchError(this.handleError),
        // Save accessToken and tokenId when login is successful
        tap((response) => {
          if (response.accessToken && response.tokenId) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('tokenId', response.tokenId);
            this.isLoggedInSubject.next(true);
            this.fetchUserRole(response.accessToken);
          }else {
            console.error('No access token received from backend!');
          }
        })
      );
  }

    // Fetch and store the role
    private fetchUserRole(token: string) {
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
      this.httpClient.get<{ role: string }>(BASE_URL + '/profile', { headers }).subscribe(
        (profile) => {
          localStorage.setItem('userRole', profile.role);
          console.log('User role stored:', profile.role);
        },
        (error) => {
          console.error('Failed to fetch user role:', error);
        }
      );
    }

  // User logout - requires token inside the request body
  logoutUser(): Observable<any> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.warn('No access token found, skipping logout.');
      return throwError(() => new Error('No token found'));
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body: LogoutRequestModel = { token };

    return this.httpClient
      .post(this.logoutUrl, body, { headers, responseType: 'text' })
      .pipe(
        tap(() => {
          // Remove token from localStorage and update state
          localStorage.removeItem('accessToken');
          localStorage.removeItem('tokenId');
          localStorage.removeItem('userRole');
          this.isLoggedInSubject.next(false);
          console.log('User Data & tokens are cleared after logout');
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Logout error response:', error);
          return throwError(() => new Error(error.message || 'Logout failed!'));
        })
      );
  }
}
