import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart/cart.service';
import { ProductService } from '../../services/product/product.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 355, 4: 350 };

@Component({
  selector: 'app-product',
  standalone: false,

  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit, OnDestroy {
  // Define layout and product card height
  cur_layout = 3;
  rowHeight = ROWS_HEIGHT[this.cur_layout];

  // Define values for pagination
  pageSize: number = 12; // Default page size
  totalItems: number = 0; // Total number of products
  currentPage: number = 0; // Current page index

  // categories filter
  category: string | undefined;
  drawerOpened = false;

  // Define products data
  products: Array<Product> | undefined;
  pagedProducts: Product[] = [];
  productsSubcription: Subscription | undefined;

  // Sort products by price
  sort = 'descending';

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  // function: update layout and product card height
  onUpdatedLayout(selectedLayout: number): void {
    this.cur_layout = selectedLayout;
    this.rowHeight = ROWS_HEIGHT[this.cur_layout];
  }



  // function: filter products by category
  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.fetchProducts(); 
  }

  //function: open Category drawer
  toggleDrawer(): void {
    this.drawerOpened = !this.drawerOpened;
  }




  // Handle pagination page change
  onPageChange(event: PageEvent): void {
    //console.log('Page Event:', event);
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagedProducts();
  }

  // updatePagedProducts(): void {
  //   console.log('Current page:', this.currentPage, 'Page size:', this.pageSize); // Debug log
  //   const startIndex = this.currentPage * this.pageSize;
  //   const endIndex = startIndex + this.pageSize;
  //   this.pagedProducts = this.products.slice(startIndex, endIndex);
  //   //console.log('Paged products:', this.pagedProducts); // Debug log
  // }

  updatePagedProducts(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProducts = this.products!.slice(startIndex, endIndex); // Non-null assertion
    this.sortProducts();
  }

  // fetchProducts(): void {
  //   const mockProducts: Array<Product> = [
  //     {
  //       id: 1,
  //       title: 'Mock Product 1',
  //       description: 'Mock Description 1',
  //       category: "men's clothing",
  //       price: 100,
  //       images: 'https://via.placeholder.com/150',
  //     },
  //     {
  //       id: 2,
  //       title: 'Mock Product 2',
  //       description: 'Mock Description 2',
  //       category: "men's clothing",
  //       price: 200,
  //       images: 'https://via.placeholder.com/150',
  //     },
  //   ];
  //   this.products = mockProducts;
  //   this.updatePagedProducts();
  // }
  //fetch All Products data
  fetchProducts(): void {
    this.productService
      .getAllProducts(this.pageSize, this.sort, this.category)
      .subscribe({
        next: (_products: Array<Product>) => {
          console.log('Fetched products:', _products); // Debug log
          this.products = _products;
          this.totalItems = _products.length;
          this.sortProducts();
          this.updatePagedProducts();
        },
        error: (error) => {
          console.error('Error fetching products:', error);
        },
      });
  }

  onSortChanged(newSort: string): void {
    //console.log('Received sort change:', newSort); // Debug log
    this.sort = newSort;
    this.fetchProducts();
  }
    
  private sortProducts(): void {
    if (!this.pagedProducts || this.pagedProducts.length === 0) return;
    
    if (this.sort === 'ascending') {
      this.products!.sort((a, b) => a.price - b.price); // Non-null assertion
    } else if (this.sort === 'descending') {
      this.products!.sort((a, b) => b.price - a.price); // Non-null assertion
    }
  }
  


  // Method to handle adding products to the cart
  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
    console.log('Product image to cart:', product);
  }

  ngOnDestroy(): void {
    if (this.productsSubcription) {
      this.productsSubcription.unsubscribe();
    }
  }
}
