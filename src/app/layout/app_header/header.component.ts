import { Component } from '@angular/core';
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
  isLoggedIn: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Subscribe to cart observable to get the updated cart data
    this.cartService.cart.subscribe((cart: Cart) => {
      this.cartItems = cart.items;
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
