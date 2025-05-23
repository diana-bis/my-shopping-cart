import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cart-item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  cartKey: string = '';

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const userEmail = user.email;
    this.cartKey = `cart-${userEmail}`;
    this.cart = JSON.parse(localStorage.getItem(this.cartKey) || '[]');
  }

  getTotalPrice():number {
    return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }


  removeItem(index: number){
    if(this.cart[index].quantity > 1){
      this.cart[index].quantity--;
    }
    else{
      this.cart.splice(index, 1);
    }
    localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
  }

  clearCart(){
    this.cart = [];
    localStorage.removeItem(this.cartKey);
  }

}
