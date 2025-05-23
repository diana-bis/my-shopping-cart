import { Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  loggedInUser: any = null;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  }

  getTotalItems(): number {
    const cartKey = `cart-${this.loggedInUser.email}`;
    const cart: CartItem[] = JSON.parse(localStorage.getItem(cartKey) || '[]');
    return cart.reduce((sum, item) => sum + item.quantity, 0);} 

  logout(){
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

}
