import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart, CartItem } from '../../models/cart.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartLocalStorageKey = 'cart';

  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(
    private _snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loadCart();
  }

  // Load cart data from local storage (only on the client side)
  loadCart(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedCart = localStorage.getItem(this.cartLocalStorageKey);
      if (savedCart) {
        this.cart.next(JSON.parse(savedCart));
      }
    }
  }

  // Save cart data to localStorage (only on the client side)
  private saveCart(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(
        this.cartLocalStorageKey,
        JSON.stringify(this.cart.value)
      );
    }
  }

  // Add item to the cart or increase its quantity
  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      // Correctly increase the quantity by 1
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this.saveCart();
    this._snackBar.open('Item added to cart', 'Dismiss', { duration: 3000 });
    console.log('Item added to cart', item);
  }

  // Calculate total price
  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, curr) => prev + curr, 0);
  }

  // Clear all items from the cart
  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart cleared', 'Dismiss', { duration: 3000 });
    this.saveCart();
    console.log('Cart cleared');
  }

  // Remove a specific item from the cart
  removeItem(item: CartItem, updateCart = true): CartItem[] {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );

    if (updateCart) {
      this.cart.next({ items: filteredItems });
      this.saveCart();
      this._snackBar.open('1 item removed from cart.', 'Dismiss', {
        duration: 3000,
      });
    }

    return filteredItems;
  }

  removeQuantity(item: CartItem): void {
    let itemForRemoval!: CartItem;

    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }

      return _item;
    });

    if (itemForRemoval) {
      filteredItems = this.removeItem(itemForRemoval, false);
    }

    this.cart.next({ items: filteredItems });
    this.saveCart();
    this._snackBar.open('1 item removed from cart.', 'Ok', {
      duration: 3000,
    });
  }
}
