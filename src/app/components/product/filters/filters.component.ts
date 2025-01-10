import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../services/product/product.service';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-filters',
  standalone: false,
  
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit, OnDestroy{
  @Output() showCategory = new EventEmitter<string>();
  categoriesSubcription: Subscription | undefined;
  categories: Category[] | undefined;
  constructor( private categoryService: CategoryService){}

  ngOnInit(): void {
    this.categoriesSubcription = this.categoryService
      .getAllCategories()
      .subscribe((response: Category[]) => {
        this.categories = response;
       // console.log('Fetched categories: from filter', this.categories);  // Log the API response
      });

      
  }
  
  

onShowCategories(category: string): void {
    this.showCategory.emit(category);
    console.log('show selected category', category);
  }

  ngOnDestroy(): void {
      if (this.categoriesSubcription) {
        this.categoriesSubcription.unsubscribe();
      }
  }
}
