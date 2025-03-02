import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../../../services/product/product.service';
import { SuccessPopupComponent } from '../../../auth/success-popup/success-popup/success-popup.component';
import { ConfirmDeleteTwiceComponent } from '../confirm-delete-twice/confirm-delete-twice.component';


@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete-product.component.html',
standalone: false,
})
export class ConfirmDeleteProductComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: number, title: string, image: string },
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onConfirmDelete(): void {

    this.dialogRef.close();
    const dialogRef = this.dialog.open(ConfirmDeleteTwiceComponent, {
      data: { productId: this.data.productId, title: this.data.title, image: this.data.image },
      width: '400px',
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
