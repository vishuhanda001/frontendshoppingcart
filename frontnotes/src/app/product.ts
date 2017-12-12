export class Product{
    constructor(
        public productId:number,
        public productName:string,
        public productImage:string,
        public productAmount:number,
        public productQuantity:number
    ){}

    getproduct(){
        return {"productId":this.productId,
                "productName":this.productName,
                "productImage":this.productImage,
                "productAmount":this.productAmount,
                "productQuantity":this.productQuantity}
    }

}