import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-header',
  standalone: false,

  templateUrl: './product-header.component.html',
})
export class ProductHeaderComponent implements OnInit {
  @Output() updatedLayout = new EventEmitter<number>();
  @Output() toggleFilter = new EventEmitter<void>();
  sort = 'descending';

  constructor() {}
  ngOnInit(): void {}

  onSortByPrice(newSort: string): void {
    this.sort = newSort;
  }

  onUpdatedLayout(selectedLayout: number): void {
    this.updatedLayout.emit(selectedLayout);
  }
}
