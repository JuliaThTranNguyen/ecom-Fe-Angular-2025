import { Subscription } from "rxjs";
import { Product } from "../../src/app/models/product.model";
import { ProductService } from "../../src/app/services/product/product.service";

// Get all paginated products from the server 
// This function using "getProducts" method from the ProductService
export function fetchProducts(
  productService: ProductService,
  currentPage: number,
  pageSize: number,
  categoryName?: string,
  sortBy?: string,
  partialName?: string,
  sortDir: string = 'asc',
  callback?: (products: Product[], totalItems: number, categories: string[], noProductsFound: boolean) => void
): Subscription {
  return productService
    .getProducts(currentPage + 1, pageSize, categoryName, sortBy, partialName, sortDir)
    .subscribe({
      next: (data) => {
        console.log('Received response:', data);

        if (data.totalElements === 0) {
          console.warn('No products found with the given parameters');
          callback?.([], 0, [], true);
          return;
        }

        const products = data.content.map((product) => {
          product.category = { ...product.category };
          return product;
        });

        const categories = productService.getCategoriesFromProducts(products);

        callback?.(products, data.totalElements, categories, false);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        callback?.([], 0, [], true);
      },
    });
}
