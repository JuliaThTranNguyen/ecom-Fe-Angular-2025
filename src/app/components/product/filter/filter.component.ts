import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  standalone: false,

  templateUrl: './filter.component.html',
})
export class FilterComponent implements OnInit {
  @Output() showCategory = new EventEmitter<string>();
  categories = [
    'shoes',
    'shirts',
    'pants',
    'bags',
    'belts',
    'jackets',
    'socks',
  ];

  constructor() {}

  ngOnInit(): void {}

  onShowCategories(category: string): void {
    this.showCategory.emit(category);
  }
}
