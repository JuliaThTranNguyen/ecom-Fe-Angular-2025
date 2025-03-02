import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { ProductService } from '../../../../services/product/product.service';
import { SuccessPopupComponent } from '../../../auth/success-popup/success-popup/success-popup.component';

@Component({
  selector: 'app-confirm-delete-second',
  templateUrl: './confirm-delete-twice.component.html',
  standalone: false,
})
export class ConfirmDeleteTwiceComponent implements OnInit {
  countdown: number = 5;
  responseMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteTwiceComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { productId: number; title: string; image: string },
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(interval);
        this.onDelete();
      }
    }, 1000);
  }

  onDelete(): void {
    this.productService.deleteProduct(this.data.productId).subscribe({
      next: () => {
        this.showSuccessPopup('Product deleted successfully!');
        this.dialogRef.close();
      },
      error: (err) => {
        this.responseMessage = err.message || 'Failed to delete product';
        console.error('Error deleting product:', this.responseMessage);
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  showSuccessPopup(message: string): void {
    this.dialog.open(SuccessPopupComponent, {
      data: { message: message },
      width: '300px',
    });
  }
}
