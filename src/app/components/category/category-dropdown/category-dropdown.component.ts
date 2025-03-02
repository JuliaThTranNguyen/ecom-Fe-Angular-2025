import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category/category.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryDialogComponent } from '../create-category-dialog/create-category-dialog.component';

@Component({
  selector: 'app-category-dropdown',
  templateUrl: './category-dropdown.component.html',
  standalone: false,
})
export class CategoryDropdownComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Output() categorySelected = new EventEmitter<number>();
  @Output() categoryAdded = new EventEmitter<Category>();

  selectedCategoryId?: number;

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.categoryService.categories$.subscribe((updatedCategories) => {
      this.categories = updatedCategories;
    });

    if (this.categories.length === 0) {
      this.loadCategories();
    }
  }

  loadCategories(): void {
    this.categoryService.getCategories(1, 100).subscribe({
      next: (data) => {
        this.categories = data.filter((category) => category.name);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      },
    });
  }

  onCategoryChange(): void {
    if (this.selectedCategoryId !== undefined) {
      this.categorySelected.emit(this.selectedCategoryId);
    }
  }

  openCategoryDialog(): void {
    const dialogRef = this.dialog.open(CreateCategoryDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((newCategory) => {
      if (newCategory) {
        this.categoryAdded.emit(newCategory);
        this.selectedCategoryId = newCategory.categoryId;
        this.categorySelected.emit(newCategory.categoryId);
        this.categoryService.addCategory(newCategory);
      }
    });
  }
}
