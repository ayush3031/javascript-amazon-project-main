function Cart(localStorageKey) {
    const cart = {
        cartItems : undefined,
   
   
        loadFromStorage : function() 
       {
           this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
   
           if(!this.cartItems){
               this.cartItems = [{
                       productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                       quantity: 2,
                       deliveryOptionsId: '1'
                   },
                   {
                       productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                       quantity: 1,
                       deliveryOptionsId: '2'
                   }
                   ];
           }
       },
   
   
        saveToStorage : function() {
           localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
       },
   
       
   
       addToCart(prodId,selectedQuantity) {
   
           let matchingItem;
           this.cartItems.forEach((item)=>{
               if(prodId == item.productId)
               {
                   matchingItem = item;
               }
           })
       
           if(matchingItem) 
           {
               const sum = Number(matchingItem.quantity)+Number(selectedQuantity);
               console.log(matchingItem.quantity);
               matchingItem.quantity = sum;
               console.log(matchingItem.quantity);
           }
           else
           {
               this.cartItems.push({
                   productId: prodId,
                   quantity: selectedQuantity,
                   deliveryOptionsId: '1'
               })
           }
           this.saveToStorage();
       },
   
       deleteFromCart(productId)
       {
           const newCart = [];
           this.cartItems.forEach((cartItem)=>
           {
               if(cartItem.productId != productId)
                   newCart.push(cartItem);
           })
   
           this.cartItems = newCart;
           this.saveToStorage();
       },
   
   
       updateDeliveryOptions (productId , deliveryOptionId) {
           let matchingItem;
           this.cartItems.forEach((item)=>{
               if(productId == item.productId)
               {
                   matchingItem = item;
               }
           })
           matchingItem.deliveryOptionsId = deliveryOptionId;
       
           this.saveToStorage();
       }
       
   
   };

   return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');




cart.loadFromStorage();

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);










