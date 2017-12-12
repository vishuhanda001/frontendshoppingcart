import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';
import { Product } from '../product';


@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddtocartComponent implements OnInit {



productsinCart:Product[]=[];
totalproductsincart:number=0;
intialproductsincart:any[]=[];
  constructor(public productService:ProductService) {
      this.productService.cartItems.subscribe((products:Product[])=>{
                   if(typeof products == "function" ){
                      
                      this.productsinCart=JSON.parse(this.getDataFromLocalStorage("products"));
                      this.totalproductsincart = this.productsinCart.length;
                    }
                    if(typeof products == "object" ){
                      
                      this.productsinCart = products;
                      this.totalproductsincart = this.productsinCart.length;
                      
                     for(var i=0;i<this.productsinCart.length;i++){
                      this.intialproductsincart[i]={};
                      for (var prop in this.productsinCart[i]) {
                        this.intialproductsincart[i][prop] = this.productsinCart[i][prop]; 
                    }

                     }


                     if(this.productsinCart === this.intialproductsincart){
                       console.log("true");
                     }

                    this.setDatatoLocalStorage("products",JSON.stringify(products));
                 }
   
      })
   }

  ngOnInit() {
    
  }

  deleteProduct(product:Product){
    let index ;  
      for(var i=0;i<this.productsinCart.length;i++){
        if(this.productsinCart[i].productId==product.productId){
          index = i;
        }
      }
      this.productsinCart.splice(index,1);
      this.totalproductsincart = this.productsinCart.length;
      this.intialproductsincart = this.productsinCart.filter((e)=>{return e;});
      this.setDatatoLocalStorage("products",JSON.stringify(this.productsinCart));
  }


  selectQuantity(e:any,product:Product){
     this.productsinCart = JSON.parse(localStorage.getItem("products"));       
    for(var i=0;i<this.productsinCart.length;i++){
      if(this.productsinCart[i].productId==product.productId){
        this.productsinCart[i].productAmount = this.productsinCart[i].productAmount*e.value;
      }
    }
  }

  getDataFromLocalStorage(key:string){
    return this.productService.getlocalstoragedata(key);
  }
  setDatatoLocalStorage(key:string,value:string){
    this.productService.setlocalstoragedata(key,value);
  }

}
