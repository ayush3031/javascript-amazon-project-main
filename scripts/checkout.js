import {renderOrderSummary,getItemQuantity} from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
//import '../data/cart-class.js';
console.log(p);
const p = new Promise(()=>{
    console.log('promise');
})
//Promise();
//import '../data/backend-practice.js'
loadProducts(renderOrderSummary);
loadProducts(renderPaymentSummary);
    //renderOrderSummary();
    //renderPaymentSummary();


