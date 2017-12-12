import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {Products} from '../products';
import { Product } from '../product';
import { ProductService } from '../shared/product.service';
import { OnInit } from '@angular/core';
// import { Product } from '../product';
@Component({
    selector:'my-shoppingcart',
    templateUrl:'./ShoppingCartComponent.component.html',
    styleUrls:['./ShoppingCartComponent.component.css']
})

export class ShoppingCartComponent implements OnInit{

productsshow:Product[]=[];
cartcount:number=0;
productsInCart:Product[]=[];
constructor(public router:Router,public productservice:ProductService){
    this.getAllProducts();
}

ngOnInit(){
    // window.addEventListener('load',()=>{
    //     console.log("onload");
    //   })
  
}


getAllProducts(){

    for(var i=0;i<Products.length;i++){
        this.productsshow.push(Products[i])   
    }
}
searchProducts(query:any){
    // console.log(query.value);
    this.productsshow = [];
    for(var i=0;i<Products.length;i++){
        if(Products[i].productName.toLowerCase().includes(query.value.toString().toLowerCase())){
            this.productsshow.push(Products[i]);
        }
    }


}
addTocart(){
    this.router.navigate(["/addtocart"]);
}

addtocartcount(product){
    this.cartcount++;
    this.productservice.addtocartProducts(product);
    this.productsInCart.push(product);
}


}