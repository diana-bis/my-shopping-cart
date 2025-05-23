import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartItem } from '../../models/cart-item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: Product[] = [
    { id: 1, name: 'Tshirt', price: 10, image: 'assets/images/tshirt.jpg' },
    { id: 2, name: 'Blouse', price: 20, image: 'assets/images/blouse.webp' },
    { id: 3, name: 'Dress', price: 25, image: 'assets/images/dress.jpg' },
    { id: 4, name: 'Skirt', price: 8, image: 'assets/images/skirt.jpg' },
    { id: 5, name: 'Sneakers', price: 30, image: 'assets/images/sneakers.jpg' },
    { id: 6, name: 'Sandals', price: 22, image: 'assets/images/sandals.jpg' },
    { id: 7, name: 'Pants', price: 15, image: 'assets/images/pants.jpg' },
    { id: 8, name: 'Blazer', price: 25, image: 'assets/images/blazer.jpg' },
    { id: 9, name: 'Hat', price: 5, image: 'assets/images/hat.jpg' },
  ];

  addToCart(product: Product){
    // Get current logged in user and build user specific cart
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const userEmail = user.email;
    const cartKey = `cart-${userEmail}`;

    const cart: CartItem[] = JSON.parse(localStorage.getItem(cartKey) || '[]');
    const existingItem = cart.find(item => item.product.id == product.id);

    if(existingItem){
      existingItem.quantity++;
    }
    else {  // Product is a new item
      cart.push({ product, quantity: 1 });  // Add the new item to the array
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));   // Save the updated array back to localStorage

  }

}
