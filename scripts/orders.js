import { cart } from "../data/cart.js";
import { getProduct } from "../data/products.js";
import { getDeliveryOption } from "../data/deliveryoptions.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { prod } from "../data/products.js";
import { formatCurrency } from "./utility/money.js";
import { loadProducts } from "../data/products.js";
import { addToCart } from "../data/cart.js";

loadProducts(renderOrders)
export function renderOrders()
{
    let html=``;
    cart.forEach((cartItem)=>{
    const today = dayjs();
    const deliveryOption =  getDeliveryOption(cartItem.deliveryOptionsId)
    const deliveryDate = today.add(deliveryOption.deliverDays,'days');
    const presentDate = today.format('ddd,MMM D');
    const arrivingDate = deliveryDate.format('dddd, MMMM D');

    
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



    html+=`<div class="order-container">
          
          <div class="order-header js-order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${presentDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>Rs.${formatCurrency(productPrice)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
            </div>
          </div>

          <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${productImage}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${productName}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${arrivingDate}
              </div>
              <div class="product-quantity">
                Quantity: ${cartItem.quantity}
              </div>
              <button class="buy-again-button button-primary" data-product-id="${productId}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>
          </div>
        </div>`
})

document.querySelector('.js-orders-grid').innerHTML=`${html}`

document.querySelectorAll('.buy-again-button').forEach((element)=>{
    
    element.addEventListener('click',()=>
    {
        const productId = element.dataset.productId;
        addToCart(productId,1);
    })
})

let cnt=0;
cart.forEach((cartItem)=>{
  cnt++;
})
document.querySelector('.js-cart-quant').innerHTML=`${cnt}`

}



    