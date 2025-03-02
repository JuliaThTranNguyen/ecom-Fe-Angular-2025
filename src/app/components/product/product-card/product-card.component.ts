import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditDeleteDialogComponent } from '../../auth/admin/edit-delete-dialog/edit-delete-dialog.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  standalone: false,
})
export class ProductCardComponent implements OnInit {
  stockMessage: string ='';
  isAdmin: boolean = true;

  @Input() fullWidthMode: boolean = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter();

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit(): void {}

  onAddToCart(): void {
    if (!this.product) {
      console.error('Product is undefined');
      return;
    }

    if (this.product.stock === 0) {
      this.stockMessage = "Product is out of stock !";
      this.snackBar.open('This product is out of stock! Please come back later.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
      return;
    }

    this.stockMessage='';
    this.addToCart.emit(this.product);
    console.log('Add to cart');
  }

  openEditDialog(): void {
    this.dialog.open(EditDeleteDialogComponent, {
      width: '400px',
      data: { productId: this.product?.productId }
    });
  }

  openDeleteDialog(): void {
    this.dialog.open(EditDeleteDialogComponent, {
      width: '400px',
      data: { productId: this.product?.productId }
    });
  }
}
