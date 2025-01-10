import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../models/category.model';
import { Observable } from 'rxjs';

const BASE_URL = environment.apiUrl;
console.log(BASE_URL);

@Injectable({
  providedIn: 'root'
})
export class CategoryService {



  constructor(private httpClient: HttpClient) { }


  
  
  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${BASE_URL}/categories`);
  }


}
