import {cart,deleteFromCart,updateDeliveryOptions} from '../../data/cart.js';
import { prod } from '../../data/products.js';
import  {formatCurrency}  from '../utility/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryoptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { loadProducts } from '../../data/products.js';
//view

let cartproductId;
let cartdeliveryOption;
export function getItemQuantity() 
{
    let cnt=0;
    cart.forEach(()=>
    {
        cnt++;
    })
    return cnt;
}

function headerUpdate() 
{
    document.querySelector('.js-checkout-item').innerHTML= `
    Checkout (<a class="return-to-home-link js-checkout-item"
    href="amazon.html">${getItemQuantity() } items</a>)`;
}
loadProducts(renderOrderSummary)
export function renderOrderSummary() {

  headerUpdate() ;

let cartSummaryHTML ='';

cart.forEach((cartItem)=>
{
  console.log(cartItem.productId);
    
    const productId = cartItem.productId;
    let productName,productImage,productPrice,productQuantity,matchingItem;
    //console.log(prod[0]);
    prod.forEach((product)=>{
        //console.log(product.id)
        if(product.id == productId)
        {
            matchingItem = product;
            productName=product.name;
            productImage=product.image;
            productPrice=product.priceCents;
        }
    })

    const deliveryOptionId = cartItem.deliveryOptionsId;


    const deliveryOption = getDeliveryOption(deliveryOptionId)
    
    
    console.log(deliveryOption.deliverDays)
    console.log(cart);
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliverDays,'days');
    const presentDate = deliveryDate.format('dddd, MMMM D');

    console.log(presentDate)
    cartproductId = cartItem.productId;
    console.log(matchingItem);

    let html = `
    <div class="cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date">
              Delivery date: ${presentDate}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${productImage}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${productName}
                </div>
                <div class="product-price">
                  ${matchingItem.getPrice()}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-button" data-update-button="${productId}">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-link="${productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                    ${deliveryOptionsHTML(cartItem)}
                </div>
              </div>
            </div>
          </div>`
        cartSummaryHTML+=html;
})
//console.log(cartSummaryHTML);
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((link)=>
{
    link.addEventListener('click',()=>
    {
        const productId = link.dataset.productLink
        deleteFromCart(productId);

        renderPaymentSummary();
        
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        console.log(container);
        container.remove();

        renderOrderSummary();
    })
})


function deliveryOptionsHTML(cartItem) {
    
    let html="";
     deliveryOptions.forEach((deliveryOption)=>
    {
        const tod = dayjs();
        const deliveryDate = tod.add(deliveryOption.deliverDays,'days');
        const presentDate = deliveryDate.format('dddd, MMMM D');
        const priceString = deliveryOption.price === 0 ? 'FREE':
        `Rs.${formatCurrency(deliveryOption.price)} -` 

        const isChecked =deliveryOption.id === cartItem.deliveryOptionsId;

        console.log(deliveryOption.id);
       

        html+=`<div class="delivery-option js-delivery-option"
        data-product-id="${cartItem.productId}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" ${isChecked ?'checked' :''}
          class="delivery-option-input"
          name="delivery-option-${cartItem.productId}">
        <div>
          <div class="delivery-option-date">
            ${presentDate}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>`
    })
    return html;
}


//controller


document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    
    element.addEventListener('click',()=>
    {
        const productId = element.dataset.productId;
        const deliveryOption = element.dataset.deliveryOptionId;
        console.log(productId);
        console.log(deliveryOption);
        
        updateDeliveryOptions(productId,deliveryOption)
        renderOrderSummary();
        renderPaymentSummary();
    })
})


//update button 
document.querySelectorAll('.js-update-button').forEach((button)=>{
  button.addEventListener('click',()=>{
    console.log("hello");
    button.innerHTML = `
    <form>
    <input class="input-updated-quantity" type="number" min="0" max="10">
    <input type="submit">
    </form> `;
  })
})

//update button code ends*/
}
renderOrderSummary();

