import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  @Input() fullWidthMode: boolean = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter();

  constructor() {}
  ngOnInit(): void {} 

  onAddToCart(): void {
    if (this.product) {
      this.addToCart.emit(this.product);
      console.log('Add to cart');
    } else {
      console.error('Product is undefined');
    }
  }
}
