import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { EditProductFormComponent } from '../../../product/product-card/edit-product-form/edit-product-form.component';
import { ConfirmDeleteProductComponent } from '../../../product/product-card/confirm-delete-product/confirm-delete-product.component';
import { ProductService } from '../../../../services/product/product.service';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'product-edit-delete-dialog-form',
  templateUrl: './edit-delete-dialog.component.html',
  standalone: false,
})
export class EditDeleteDialogComponent {
  productData: Product | undefined;

  constructor(
    public dialogRef: MatDialogRef<EditDeleteDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { productId: number },
    private productService: ProductService
  ) {

    this.productService.getProductById(this.data.productId).subscribe((product) => {
      this.productData = product; // Store product data
    });
  }

  editProduct(): void {
    if (this.productData) {
      this.dialog.open(EditProductFormComponent, {
        width: '1200px',
        height: '600px',
        data: { productId: this.productData.productId },
      });
      this.dialogRef.close();
    }
  }

  confirmDelete(): void {
    if (this.productData) {
      this.dialog.open(ConfirmDeleteProductComponent, {
        width: '800px',
        height: '400px',
        data: {
          productId: this.productData.productId,
          title: this.productData.title,
          image: this.productData.image,
        },
      });
      this.dialogRef.close();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
