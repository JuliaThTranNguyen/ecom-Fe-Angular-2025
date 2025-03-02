import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDeleteDialogComponent } from '../edit-delete-dialog/edit-delete-dialog.component';
import { CreateProductFormComponent } from '../../../product/product-card/create-product-form/create-product-form.component';

@Component({
  selector: 'product-header-add-dialog',
  templateUrl: './add-dialog.component.html',
  standalone: false,
})
export class AddDialogComponent {

  @Input() isAdmin: boolean = false; 

  constructor(private dialog: MatDialog) {}

  openEditDialog(): void {
    this.dialog.open(CreateProductFormComponent, {
      width: '800px',
      height: '600px',
      data: { mode: 'create' } 
    });
  }
}

