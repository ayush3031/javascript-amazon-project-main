//doing integration test
import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';
import { loadFromStorage , cart } from '../../data/cart.js';

describe('test suite : renderOrderSummary' ,() =>{
    it('displays the cart ' , ()=>{
        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-checkout-item"></div>
        <div class="js-order-summary"></div>
        `;


        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify( [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionsId: '1'
            },
            {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionsId: '2'
            }
            ]);

            addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6','1');
            expect(cart.length).toEqual(1);

            expect(localStorage.setItem).toHaveBeenCalledTimes(1);
            expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
            expect(cart[0].quantity).toEqual('2');
            
        });
        loadFromStorage();


        renderOrderSummary();
    })
});