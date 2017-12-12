import { Component } from '@angular/core';
import { Product } from './product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
purchaseModel:Product;

constructor(private router:Router){}

    clickme(){
        this.router.navigate(["/addtocart"]);
    }



}
