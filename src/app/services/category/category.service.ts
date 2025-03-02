import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../enviroments/enviroment';
import { Category } from '../../models/category.model';

import { AuthService } from '../auth/auth.service';
import { AuthApiResponse } from '../../models/auth.model';

const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryUrl = `${BASE_URL}/categories`;
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    let token = this.authService.getToken();
    if (!token) {
      throw new Error('No access token found! Please log in.');
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Fetch all categories with pagination
  getCategories(pageNo: number, pageSize: number): Observable<Category[]> {
    return this.httpClient
      .get<{ content: Category[] }>(
        `${this.categoryUrl}?pageNo=${pageNo}&pageSize=${pageSize}`,
        { headers: this.getHeaders() }
      )
      .pipe(
        map((response) => response.content || []),
        catchError((error) => {
          console.error('Error fetching categories:', error);
          return throwError(() => new Error('Failed to load categories.'));
        })
      );
  }

  // Add a new category and update the BehaviorSubject
  addCategory(newCategory: Category): void {
    const updatedCategories = [...this.categoriesSubject.value, newCategory]; 
    this.categoriesSubject.next(updatedCategories); 
    console.log('Categories updated in service:', this.categoriesSubject.value);
  }

  // Create a new category
  createCategory(category: Category): Observable<Category> {
    return this.httpClient
      .post<AuthApiResponse<Category>>(this.categoryUrl, category, {
        headers: this.getHeaders(),
      })
      .pipe(
        map((response) => {
          const createdCategory = response.result as Category;
          this.reloadCategories();
          return createdCategory;
        }),
        catchError((error) => {
          console.error('Error creating category:', error);
          return throwError(
            () =>
              new Error(error.error?.message || 'Failed to create category.')
          );
        })
      );
  }

    // Reload the categories by fetching the latest list from the server
    private reloadCategories(): void {
      // Example: reload categories with pagination parameters (adjust pageNo, pageSize as needed)
      this.getCategories(1, 100).subscribe((categories) => {
        this.categoriesSubject.next(categories); // Emit the updated categories list
      });
    }
}
