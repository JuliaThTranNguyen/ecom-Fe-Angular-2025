import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service'; // Import CartService
import { ActivatedRoute } from '@angular/router';
import { addToCart } from '../../../../shared/utils/cart-utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styles: [
    `
      .snackbar-error {
        background-color: #f44336 !important; /* Red background */
        color: white !important; /* White text */
      }
    `,
  ],
  standalone: false,
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  randomProducts: Product[] = [];

  showViewMoreMessage: boolean = false;
  stockMessage: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      if (productId) {
        this.loadProductDetails(productId);
      }
    });
    this.loadRandomProducts();
  }

  // Fetch the product details dynamically
  loadProductDetails(productId: number) {
    console.log('Fetching product details for ID:', productId);
    this.productService.getProductById(productId).subscribe({
      next: (data) => {
        this.product = data;
        console.log('Product Data:', this.product);
      },
      error: (err) => console.error('Error fetching product:', err),
    });
  }

  // Fetch random products for the bottom section
  loadRandomProducts() {
    this.productService.getRandomProducts().subscribe({
      next: (data) => {
        this.randomProducts = data;
        console.log('Random products fetched:', this.randomProducts);
      },
      error: (err) => console.error('Error fetching random products:', err),
    });
  }

  // Call for addToCart function from shared/utils/cart-utils.ts
  onAddToCart(product?: Product): void {
    if (!product) {
      console.error('Product is undefined, cannot add to cart.');
      return;
    }

    if (product.stock === 0) {
      this.stockMessage = "Product is out of stock !";
      this.snackBar.open(
        'This product is temporarily out of stock. Please come back another time.',
        'Close',
        {
          duration: 3000, // Automatically disappears after 3 seconds
          panelClass: ['snackbar-error'], // Custom styling (optional)
        }
      );
      return;
    }

    this.stockMessage = '';
    addToCart(this.cartService, product);
    this.snackBar.open('Product added to cart!', 'Close', { duration: 3000 });
  }
}
