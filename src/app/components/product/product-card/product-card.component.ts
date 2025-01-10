import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: false,
  
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined ;
  @Output() addToCart = new EventEmitter();



  constructor() {}

  ngOnInit(): void {
    //console.log('Image URLs:', this.product?.images);  // Check if images are loaded correctly


  }


  onAddToCart(): void {
    if (this.product) {
      this.addToCart.emit(this.product);
      console.log('Add to cart');
    } else {
      console.error('Product is undefined');
    }
 
  }
}