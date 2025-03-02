import { ChangeDetectorRef, Injectable } from '@angular/core';

import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroment';
import { PaginatedProductsResponse, Product } from '../../models/product.model';
import { AuthApiResponse } from '../../models/auth.model';
import { AuthService } from '../auth/auth.service';

const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  /**
   * Fetch products data from the backend with optional category filter.
   * @param pageNo - The page number for pagination
   * @param pageSize - The page size for pagination
   * @param categoryName - Optional category name filter
   * @param sortByStock - Optional field to sort by (e.g., price, name, etc.)
   * @param partialName - Optional search for partial name
   * @param sortDir - Optional sort direction ('ascending' or 'descending')
   * @returns Paginated response with products
   */

  // Fetch products data from the backend
  getProducts(
    pageNo: number,
    pageSize: number,
    categoryName?: string,
    sortBy?: string,
    partialName?: string,
    sortDir?: string
  ): Observable<PaginatedProductsResponse> {
    let params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString());

    if (categoryName) params = params.set('categoryName', categoryName);
    if (partialName) params = params.set('partialName', partialName);
    if (sortBy) params = params.set('sortBy', sortBy);
    if (sortDir) params = params.set('sortDir', sortDir);

    console.log('Request params:', params.toString()); // Debugging
    return this.httpClient.get<PaginatedProductsResponse>(
      `${BASE_URL}/products`,
      { params }
    );
  }

  // Fetch categories from the backend by extracting them from the products
  getCategoriesFromProducts(products: any[]): string[] {
    const categorySet = new Set<string>(); // Use Set to avoid duplicate categories
    products.forEach((product) => {
      if (product.category && product.category.name) {
        categorySet.add(product.category.name);
      }
    });
    return Array.from(categorySet); // Convert Set to Array
  }

  // Fetch a single product by ID
  getProductById(productId: number): Observable<Product> {
    console.log('Fetching product by ID:', productId);
    return this.httpClient.get<Product>(`${BASE_URL}/products/${productId}`);
  }

  // Fetch 4 random product
  getRandomProducts(): Observable<Product[]> {
    return this.httpClient
      .get<PaginatedProductsResponse>(
        `${BASE_URL}/products?pageNo=1&pageSize=20`
      )
      .pipe(
        map((response) => {
          if (!response || !response.content) {
            return [];
          }
          // Shuffle and select 4 random products
          return response.content.sort(() => 0.5 - Math.random()).slice(0, 4);
        })
      );
  }

  // Create a new product
  createProduct(product: Product): Observable<AuthApiResponse<Product>> {
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
      .post<AuthApiResponse<Product>>(`${BASE_URL}/products`, product, {
        headers,
      })
      .pipe(
        tap(() => {
          this.refreshProducts();
        }),
        catchError((error) => {
          console.error('Product creation error:', error);
          return throwError(
            () => new Error(error.error?.message || 'Failed to create product.')
          );
        })
      );
  }

  updateProduct(product: Product): Observable<Product> {
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
      .put<Product>(`${BASE_URL}/products/${product.productId}`, product, {
        headers,
      })
      .pipe(
        tap(() => {
          this.refreshProducts();
        }),
        catchError((error) => {
          console.error('Product update error:', error);
          return throwError(() => new Error('Failed to update product.'));
        })
      );
  }

  deleteProduct(productId: number): Observable<any> {
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
      .delete(`${BASE_URL}/products/${productId}`, {
        headers,
        responseType: 'text',
      })
      .pipe(
        map(() => null),
        tap(() => {
          this.refreshProducts();
          console.log(`Product ${productId} deleted successfully`);
        }),
        catchError((error) => {
          console.error('Product deletion error:', error);

          if (error.status === 404) {
            return throwError(
              () =>
                new Error(
                  'Product not found. It may have been deleted already.'
                )
            );
          }

          return throwError(() => new Error('Failed to delete product.'));
        })
      );
  }

  refreshProducts(): void {
    this.getProducts(1, 100).subscribe((response) => {
      if (response && response.content) {
        this.productsSubject.next(response.content);
        window.location.reload();
      }
    });
  }
}
