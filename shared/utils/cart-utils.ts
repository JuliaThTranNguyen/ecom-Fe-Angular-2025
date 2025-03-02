import { Product } from '../../src/app/models/product.model';
import { CartService } from '../../src/app/services/cart/cart.service';

export function addToCart(cartService: CartService, product: Product): void {
  cartService.addToCart({
    product: product.image,
    name: product.title,
    price: product.price,
    quantity: 1,
    id: product.productId,
  });
  console.log('Product added to cart:', product);
}
