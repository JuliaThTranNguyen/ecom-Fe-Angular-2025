import { Component, OnInit } from '@angular/core';

const ROWS_HEIGHT: {[id: number]:number} = {1: 400, 3: 355, 4: 350}

@Component({
  selector: 'app-product',
  standalone: false,

  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  // Define layout and product card height
  cur_layout = 3;
  rowHeight = ROWS_HEIGHT[this.cur_layout];

  // categories filter
  category: string | undefined;
  drawerOpened = false;

  constructor() {}

  ngOnInit(): void {}

  // function: update layout and product card height
  onUpdatedLayout(selectedLayout: number): void {
    this.cur_layout = selectedLayout;
    this.rowHeight = ROWS_HEIGHT[this.cur_layout];
  }

  // function: filter products by category
  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }

  //function: open Category drawer
  toggleDrawer(): void {
    this.drawerOpened = !this.drawerOpened;
  }
}
