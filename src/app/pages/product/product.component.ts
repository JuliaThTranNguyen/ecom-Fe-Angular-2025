import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart/cart.service';
import { ProductService } from '../../services/product/product.service';
import { Observable, Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { ROWS_HEIGHT } from '../../../../shared/commons';
import { fetchProducts } from '../../../../shared/utils/product-utils';
import { addToCart } from '../../../../shared/utils/cart-utils';

@Component({
  selector: 'app-product',
  standalone: false,

  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit, OnDestroy {
  // PRODUCT CARD LAYOUT DESIGN
  cur_layout = 3;
  rowHeight = ROWS_HEIGHT[this.cur_layout];

  // PAGINATOR
  pageSize: number = 50; // Default page size
  totalItems: number = 0; // Total number of products
  currentPage: number = 0; // Current page index

  // FILTER SIDE BAR
  categoryName: string | undefined;
  partialName: string | undefined;
  sortBy: string | undefined; // sort by stock or price
  sortDir: string = 'asc';
  drawerOpened = false;

  // PRODUCT CARD DATA
  products: Array<Product> | undefined = [];
  categories: string[] = [];
  pagedProducts: Product[] = [];
  productsSubscription: Subscription | undefined;
  categoriesSubscription: Subscription | undefined;
  noProductsFound: boolean = false;
  products$!: Observable<Product[]>;

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {
    this.products$ = this.productService.products$;
  }

  ngOnInit(): void {
    this.loadProducts();
  }


  // Filter by category name
  onShowCategory(selectedCategory: string): void {
    if (!selectedCategory) {
      this.categoryName = undefined; // Reset category
    } else {
      this.categoryName = selectedCategory;
    }

    this.loadProducts(); // Fetch all products again
  }

  // function: update sort options - by price/stock
  onSortChanged(sortOptions: { sortBy: string; sortDir: string }): void {
    this.sortBy = sortOptions.sortBy;
    this.sortDir = sortOptions.sortDir;
    this.loadProducts();
  }

  // function: update search query for product title
  onSearchQueryChanged(searchTerm: string): void {
    // Try to match the search term with categories first
    const matchingCategory = this.categories.find(
      (category) => category.toLowerCase() === searchTerm.toLowerCase()
    );

    if (matchingCategory) {
      // If a match is found, set it as categoryName
      this.categoryName = matchingCategory;
      this.partialName = undefined; // Clear partialName if we are searching by category
      console.log('search by Category name:', this.categoryName);
    } else {
      // If no match, treat it as a partial name for the product
      this.partialName = searchTerm;
      this.categoryName = undefined; // Clear categoryName
      console.log('search by Partial name:', this.partialName);
    }

    this.loadProducts();
  }

  // function: update layout and product card height
  onUpdatedLayout(selectedLayout: number): void {
    this.cur_layout = selectedLayout;
    this.rowHeight = ROWS_HEIGHT[this.cur_layout];
  }

  //function: open Category drawer
  toggleDrawer(): void {
    this.drawerOpened = !this.drawerOpened;
  }

  // Handle pagination page change
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagedProducts();
  }

  // Call for function to get all products DB from shared/utils/product-utils.ts
  loadProducts(): void {
    this.productsSubscription = fetchProducts(
      this.productService,
      this.currentPage,
      this.pageSize,
      this.categoryName,
      this.sortBy,
      this.partialName,
      this.sortDir,
      (products, totalItems, categories, noProductsFound) => {
        this.products = products;
        this.totalItems = totalItems;
        this.categories = categories;
        this.noProductsFound = noProductsFound;
        this.updatePagedProducts();
      }
    );
  }

  updatePagedProducts(): void {
    if (!Array.isArray(this.products)) {
      console.error('this.products is not an array', this.products);
      return;
    }

    // Paginator logic
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProducts = this.products.slice(startIndex, endIndex);
  }

  // Call for addToCart function from shared/utils/cart-utils.ts
  onAddToCart(product: Product): void {
    addToCart(this.cartService, product);
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
