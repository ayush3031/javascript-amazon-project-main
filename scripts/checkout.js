import {cart,deleteFromCart} from '../data/cart.js';
import { prod } from '../data/products.js';
import  formatCurrency  from './utility/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import deliveryOptions from '../data/deliveryoptions.js';




let cartSummaryHTML ='';

cart.forEach((cartItem)=>
{
    const productId = cartItem.productId;
    let productName,productImage,productPrice,productQuantity;
    prod.forEach((product)=>{
        if(product.id == productId)
        {
            productName=product.name;
            productImage=product.image;
            productPrice=product.priceCents;
        }
    })


    const deliveryOptionId = cartItem.deliveryOptionsId;
    let deliveryOption;

    deliveryOptions.forEach((option)=>
    {
        if(deliveryOptionId === option.id)
        {
            deliveryOption = option
        }  
    })
    
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliverDays,'days');
    const presentDate = deliveryDate.format('dddd, MMMM D');

    console.log(presentDate)

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
                 Rs.${formatCurrency(productPrice)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
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
        
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        console.log(container);
        container.remove();
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
        
        html+=`<div class="delivery-option">
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