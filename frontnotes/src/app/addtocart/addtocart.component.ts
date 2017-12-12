import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Product } from '../product';


@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddtocartComponent implements OnInit {



  productsinCart: Product[] = [];
  totalproductsincart: number = 0;
  subTotal = 0;
  tax = 0;
  total = 0;
  
  constructor(public productService: ProductService) {
    this.productService.cartItems.subscribe((products: Product[]) => {
      if (typeof products == "function") {

        this.productsinCart = JSON.parse(this.getDataFromLocalStorage("products"));
        this.totalproductsincart = this.productsinCart.length;

        this.subTotal = JSON.parse(this.getDataFromLocalStorage("subTotal"));
        this.tax = JSON.parse(this.getDataFromLocalStorage("tax"));
        this.total = JSON.parse(this.getDataFromLocalStorage("total"));

      }
      if (typeof products == "object") {

        this.productsinCart = products;
        this.totalproductsincart = this.productsinCart.length;

        this.setDatatoLocalStorage("products", JSON.stringify(products));

        for (var i = 0; i < this.productsinCart.length; i++) {
          this.subTotal = this.subTotal + this.productsinCart[i].productAmount;
        }

        this.tax = this.subTotal * 19 / 100;
        this.total = this.subTotal + this.tax;

        this.setDatatoLocalStorage("subTotal", JSON.stringify(this.subTotal))
        this.setDatatoLocalStorage("tax", JSON.stringify(this.tax))
        this.setDatatoLocalStorage("total", JSON.stringify(this.total))



      }

    })
  }

  ngOnInit() {

  }

  deleteProduct(product: Product) {
    let index;
    for (var i = 0; i < this.productsinCart.length; i++) {
      if (this.productsinCart[i].productId == product.productId) {
        index = i;
      }
    }
    this.productsinCart.splice(index, 1);
    this.totalproductsincart = this.productsinCart.length;
    this.setDatatoLocalStorage("products", JSON.stringify(this.productsinCart));

    this.subTotal = 0;
    for (var i = 0; i < this.productsinCart.length; i++) {
      this.subTotal = this.subTotal + this.productsinCart[i].productAmount;
    }

    this.tax = this.subTotal * 19 / 100;
    this.total = this.subTotal + this.tax;

    this.setDatatoLocalStorage("subTotal", JSON.stringify(this.subTotal))
    this.setDatatoLocalStorage("tax", JSON.stringify(this.tax))
    this.setDatatoLocalStorage("total", JSON.stringify(this.total))


  }


  decrementQuantity(e, product) {
    if (parseInt(e.innerText) < 2) {
      alert("cant do that");
      return;
    }
    e.innerText = parseInt(e.innerText) - 1;
    
    this.productsinCart = JSON.parse(localStorage.getItem("products"));

    for(var i=0;i<this.productsinCart.length;i++){
      if(this.productsinCart[i].productId == product.productId){
        this.productsinCart[i].productQuantity = this.productsinCart[i].productQuantity-1;
      }
  }

    for (var i = 0; i < this.productsinCart.length; i++) {
      if (this.productsinCart[i].productId == product.productId) {
        this.productsinCart[i].productAmount = this.productsinCart[i].productAmount * parseInt(e.innerText);
      }
    }

    this.setDatatoLocalStorage("products",JSON.stringify(this.productsinCart));

    this.subTotal = 0;
    for (var i = 0; i < this.productsinCart.length; i++) {
      this.subTotal = this.subTotal + this.productsinCart[i].productAmount;
    }

    this.tax = this.subTotal * 19 / 100;
    this.total = this.subTotal + this.tax;

    this.setDatatoLocalStorage("subTotal", JSON.stringify(this.subTotal))
    this.setDatatoLocalStorage("tax", JSON.stringify(this.tax))
    this.setDatatoLocalStorage("total", JSON.stringify(this.total))




  }

  incrementQuantity(e, product) {
    if (parseInt(e.innerText) > 25) {
      alert("cant do that");
      return;
    }
    e.innerText = parseInt(e.innerText) + 1;
    this.productsinCart = JSON.parse(localStorage.getItem("products"));
    
    for(var i=0;i<this.productsinCart.length;i++){
        if(this.productsinCart[i].productId == product.productId){
          this.productsinCart[i].productQuantity = this.productsinCart[i].productQuantity+1;
        }
    }

    for (var i = 0; i < this.productsinCart.length; i++) {
      if (this.productsinCart[i].productId == product.productId) {
        this.productsinCart[i].productAmount = this.productsinCart[i].productAmount * parseInt(e.innerText);
      }
    }

    this.setDatatoLocalStorage("products",JSON.stringify(this.productsinCart));


    this.subTotal = 0;
    for (var i = 0; i < this.productsinCart.length; i++) {
      this.subTotal = this.subTotal + this.productsinCart[i].productAmount;
    }

    this.tax = this.subTotal * 19 / 100;
    this.total = this.subTotal + this.tax;

    this.setDatatoLocalStorage("subTotal", JSON.stringify(this.subTotal))
    this.setDatatoLocalStorage("tax", JSON.stringify(this.tax))
    this.setDatatoLocalStorage("total", JSON.stringify(this.total))



  }

  getvalue(e) {
    console.log(e);
  }

  selectQuantity(e: any, product: Product) {
    this.productsinCart = JSON.parse(localStorage.getItem("products"));
    for (var i = 0; i < this.productsinCart.length; i++) {
      if (this.productsinCart[i].productId == product.productId) {
        this.productsinCart[i].productAmount = this.productsinCart[i].productAmount * e.value;
      }
    }

    this.subTotal = 0;
    for (var i = 0; i < this.productsinCart.length; i++) {
      this.subTotal = this.subTotal + this.productsinCart[i].productAmount;
    }

    this.tax = this.subTotal * 19 / 100;
    this.total = this.subTotal + this.tax;

    this.setDatatoLocalStorage("subTotal", JSON.stringify(this.subTotal))
    this.setDatatoLocalStorage("tax", JSON.stringify(this.tax))
    this.setDatatoLocalStorage("total", JSON.stringify(this.total))

  }

  getDataFromLocalStorage(key: string) {
    return this.productService.getlocalstoragedata(key);
  }
  setDatatoLocalStorage(key: string, value: string) {
    this.productService.setlocalstoragedata(key, value);
  }

}
