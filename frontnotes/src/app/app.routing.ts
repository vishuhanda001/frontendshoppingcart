import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { ShoppingCartComponent } from './ShoppingCartComponent/ShoppingCartComponent.component';
import { AddtocartComponent } from './addtocart/addtocart.component';



export const router:Routes = [
    {path:'',redirectTo:'shoppingcart',pathMatch:'full'},
    {path:'shoppingcart',component:ShoppingCartComponent},
    {path:'addtocart',component:AddtocartComponent}
]



export const routes:ModuleWithProviders = RouterModule.forRoot(router);