import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../../../services/product/product.service';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  standalone: false,
})
export class EditProductFormComponent implements OnInit {
  product: Product | undefined;
  
  constructor(
    public dialogRef: MatDialogRef<EditProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: number },
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.getProductById(this.data.productId).subscribe((product) => {
      this.product = product;
    });
  }

  onSave(): void {
    if (this.product) {
      this.productService.updateProduct(this.product).subscribe((updatedProduct) => {
        this.product = updatedProduct;
        this.productService.refreshProducts();
        this.dialogRef.close();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
