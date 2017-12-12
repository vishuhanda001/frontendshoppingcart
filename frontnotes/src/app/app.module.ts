import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ShoppingCartComponent} from './ShoppingCartComponent/ShoppingCartComponent.component';
import {routes} from './app.routing';
import { AppComponent } from './app.component';
import {AddtocartComponent} from './addtocart/addtocart.component';
import {ProductService} from '../app/shared/product.service';


@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    AddtocartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    
    
    routes
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
