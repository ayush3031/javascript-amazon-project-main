import {cart} from '../../data/cart.js'
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryoptions.js';
import {formatCurrency} from '../utility/money.js';
import { getItemQuantity } from './orderSummary.js';
import { loadProducts } from '../../data/products.js';

loadProducts(renderPaymentSummary);
export function renderPaymentSummary() {
    let cost = 0;
    let shippingPrice = 0;
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId)
        cost += product.priceCents*cartItem.quantity;
        const deliveryOption =  getDeliveryOption(cartItem.deliveryOptionsId)

        shippingPrice += deliveryOption.price;
    });

    
    
    const totalPriceBeforeTax = cost+shippingPrice;
    const tax = totalPriceBeforeTax*0.1;
    const totalPrice = tax+totalPriceBeforeTax;

    const paymentSummaryHTML =`
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${getItemQuantity()}):</div>
            <div class="payment-summary-money">
            Rs.${formatCurrency(cost)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
            Rs.${formatCurrency(shippingPrice)}
            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
            Rs.${formatCurrency(totalPriceBeforeTax)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
            Rs.${formatCurrency(tax)}
            </div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
            Rs.${formatCurrency(totalPrice)}
            </div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;

          document.querySelector('.js-payment-summary').innerHTML
          =paymentSummaryHTML;
}
