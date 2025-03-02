import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-product-filter',
  templateUrl: './filter.component.html',
  standalone: false,
})
export class FilterComponent implements OnInit {
  @Input() categories: string[] = [];
  @Output() showCategory = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<{
    sortBy: string;
    sortDir: string;
  }>();

  // Define selection list state - uncheck/check the box
  @ViewChild(MatSelectionList) categorySelectionList!: MatSelectionList;
  @ViewChild('sortSelectionList') sortSelectionList!: MatSelectionList;

  uncheckedCategory: string | undefined;

  constructor() {}

  ngOnInit(): void {}

  // Handle selection change
  onSelectionChange(event: any): void {
    const selectedCategory = event.options[0].value;

    // Check if the category was already selected (deselection)
    if (this.uncheckedCategory === selectedCategory) {
      // If the category is being deselected, reset the filter and fetch all products
      this.uncheckedCategory = undefined;
      this.showCategory.emit(''); // Reset the category to fetch all products
    } else {
      // Otherwise, set the selected category and fetch products
      this.uncheckedCategory = selectedCategory;
      this.showCategory.emit(selectedCategory);
    }
  }

  // Handle sorting by directions & by names - params: sortBy, sortDir
  onSortChange(event: any): void {
    const selectedSort = event.options[0].value;
    let sortBy = 'price';
    let sortDir = 'asc';

    switch (selectedSort) {
      case 'priceAsc':
        sortBy = 'price';
        sortDir = 'asc';
        break;
      case 'priceDesc':
        sortBy = 'price';
        sortDir = 'desc';
        break;
      case 'stockAsc':
        sortBy = 'stock';
        sortDir = 'asc';
        break;
      case 'stockDesc':
        sortBy = 'stock';
        sortDir = 'desc';
        break;
    }

    this.sortChange.emit({ sortBy, sortDir });
  }

  // Reset filters
  onResetFilters(): void {
    // Deselect all selections in category, and sorting lists
    if (this.categorySelectionList) {
      this.categorySelectionList.deselectAll();
    }
    if (this.sortSelectionList) {
      this.sortSelectionList.deselectAll();
    }

    // Reset stored category selection
    this.uncheckedCategory = undefined;
    this.showCategory.emit('');

    // Reset sorting filter (emit default sorting values)
    this.sortChange.emit({ sortBy: '', sortDir: '' });

    console.log('Selected all filters reset');
  }
}
