
import { Injectable } from '@angular/core';
import { Product } from '../../models/product.model';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const BASE_URL = environment.apiUrl;
console.log(BASE_URL);

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  sort = 'desc';
  pageSize: number = 12;

  constructor(private httpClient: HttpClient) { }

  getAllProducts(limit = this.pageSize, sort = this.sort, category?: string): Observable<Product[]> {
    return this.httpClient.get<Array<Product>>(
      `${BASE_URL}/products${category ? '/category/' + category : ''}?sort=${sort}&limit=${limit}`
    );
  }
  
}
