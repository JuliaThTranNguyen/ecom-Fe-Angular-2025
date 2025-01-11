import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroment';
import { Product } from '../../models/product.model';

const BASE_URL = environment.apiUrl;
console.log(BASE_URL);

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  sort = 'descending';
  pageSize: number = 12;

  constructor(private httpClient: HttpClient) { }

  // getAllProducts(limit = this.pageSize, sort = this.sort, category?: string): Observable<Array<Product>> {
  //   return this.httpClient.get<Array<Product>>(
  //     `${BASE_URL}/products${category ? '/category/' + category : ''}?sort=${sort}&limit=${limit}`
  //   );
  // }
  getAllProducts(limit = this.pageSize,sort = this.sort, category?: string): Observable<Array<Product>> {
    const url = category 
      ? `${BASE_URL}/products/category/${category}?limit=${limit}`
      : `${BASE_URL}/products?limit=${limit}`;
    return this.httpClient.get<Array<Product>>(url);
  }
  
}