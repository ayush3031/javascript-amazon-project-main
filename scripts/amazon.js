import {cart,addToCart} from '../data/cart.js' //.. means go out of the file 
import{prod} from '../data/products.js'
import { formatCurrency } from './utility/money.js';


updateQuantity();
let html = '';
prod.forEach((product)=>{
     html+= `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${(product.rating.stars)*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>
 
          <div class="product-price">
            Rs.${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-selected-option" data-selected-val=
            "${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>
          
          <div class="added-to-cart js-added-to-cart" data-added-cart="${product.id}">
            <img src="images/icons/checkmark.png">
            Added!
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `
});
document.querySelector('.js-products-grid').innerHTML = html;




function updateQuantity() {
    let quantity=0;
        cart.forEach((cartItem)=>{
            quantity++;
        });
        document.querySelector('.js-cart-quantity').innerHTML=quantity;
        //console.log(cart);
}



document.querySelectorAll('.js-add-to-cart').forEach((button)=>
{
    button.addEventListener('click',()=>
    {
        console.log(button.dataset.productId); //gives data attribue and chnges kabab case to camel case

        const prodId = button.dataset.productId;
        

        // adding added text on top of add to cart 
        document.querySelectorAll('.js-added-to-cart').forEach((addedToCart)=>{
            
            if(addedToCart.dataset.addedCart == prodId)
            {
                
                addedToCart.style.opacity = "1";
            }
        })
        //adding added text code ends

        //updating cart with selected quantity

        let selectedQuantity;
        document.querySelectorAll('.js-selected-option').forEach((selectedOption)=>{
            
            if(selectedOption.dataset.selectedVal == prodId)
            {
                selectedQuantity = selectedOption.value;
                console.log(selectedQuantity);
            }
        })


        addToCart(prodId,selectedQuantity);
        updateQuantity();
        
    })
})