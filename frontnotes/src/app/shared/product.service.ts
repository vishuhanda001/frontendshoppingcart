import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Products} from '../products';
import { Product } from '../product';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class ProductService{

products:Product[]=[];
cartItems = new BehaviorSubject<any>(Product);


constructor(){
}

getSearchedProducts(searchQuery:string){


}



setlocalstoragedata(key:string,value:string){
    localStorage.setItem(key,value);
}
getlocalstoragedata(key){
    return localStorage.getItem(key);
}

addtocartProducts(product:Product){
    
    this.products.push(product);
    this.cartItems.next(this.products);
    // console.log("in service:- "+product);
}


}