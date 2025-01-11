import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Cart, CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: false,
})
export class HeaderComponent {
  cartItems: CartItem[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Subscribe to cart observable to get the updated cart data
    this.cartService.cart.subscribe((cart: Cart) => {
      this.cartItems = cart.items;

      // Calculate total quantity and total price
      this.totalQuantity = this.cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      this.totalPrice = this.cartService.getTotal(this.cartItems);
    });
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }
}
