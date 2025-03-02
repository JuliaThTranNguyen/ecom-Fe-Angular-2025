import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category/category.service';
import { SuccessPopupComponent } from '../../auth/success-popup/success-popup/success-popup.component';

@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  standalone: false,
})
export class CreateCategoryDialogComponent {
  category: Category = { categoryId: 0, name: '', image: '' };
  responseMessage: string = '';

  constructor(
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<CreateCategoryDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSubmit(): void {
    this.responseMessage = '';

    this.categoryService.createCategory(this.category).subscribe({
      next: (newCategory) => {
        this.showSuccessPopup("Category created successfully!");
        this.dialogRef.close(newCategory);
      },
      error: (err) => {
        this.responseMessage = err.message;
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
