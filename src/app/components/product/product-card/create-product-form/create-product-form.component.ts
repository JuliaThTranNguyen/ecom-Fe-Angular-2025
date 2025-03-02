import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../../../models/product.model';
import { Category } from '../../../../models/category.model';
import { ProductService } from '../../../../services/product/product.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessPopupComponent } from '../../../auth/success-popup/success-popup/success-popup.component';
import { CategoryService } from '../../../../services/category/category.service';
import { fetchProducts } from '../../../../../../shared/utils/product-utils';

@Component({
  selector: 'app-create-product-form',
  templateUrl: './create-product-form.component.html',
  standalone: false,
})
export class CreateProductFormComponent implements OnInit {
  product: Product = {
    productId: 0,
    title: '',
    description: '',
    category: {} as Category,
    price: 0,
    image: '',
    stock: 0,
  };
  categories: Category[] = [];
  products: Product[] = [];
  responseMessage: string = '';
  loadingSuccess: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateProductFormComponent>,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.categoryService.categories$.subscribe((categories) => {
      this.categories = categories;
      console.log('Categories updated:', categories);
    });

    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories(1, 100).subscribe({
      next: (categories) => {
        this.categories = categories;
        console.log('Loaded categories:', categories);
      },
      error: (err) => {
        this.responseMessage = err.message;
      },
    });
  }

  onCategorySelected(categoryId: number): void {
    const selectedCategory = this.categories.find(
      (category) => category.categoryId === categoryId
    );
    if (selectedCategory) {
      this.product.category = selectedCategory;
    }
  }

  onCategoryAdded(newCategory: Category): void {
    this.categories.push(newCategory);
    this.product.category = newCategory;
    this.cdRef.detectChanges();
  }

  onSubmit(): void {
    this.loadingSuccess = true;
    this.responseMessage = '';

    this.productService.createProduct(this.product).subscribe({
      next: () => {
        this.loadingSuccess = false;
        this.productService.refreshProducts();
        
        const dialogRef = this.dialog.open(SuccessPopupComponent, {
          data: { message: 'Product created successfully!' },
        });

        setTimeout(() => {
          dialogRef.close();
          // Optional: Reset the form after successful creation
          this.product = {
            productId: 0,
            title: '',
            description: '',
            category: {} as Category,
            price: 0,
            image: '',
            stock: 0,
          };
        }, 2000);
        this.dialogRef.close();
      },
      error: (err) => {
        this.loadingSuccess = false;
        this.responseMessage = err.message;
        console.error('Product creation error:', err.message);
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
