import { addToCart ,cart , loadFromStorage } from '../../data/cart.js';

describe('test suite : add to cart' , () => {
    it('adds an existing prdct in cart', () => {

        spyOn(localStorage,'setItem');


        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: '1',
                deliveryOptionsId: '1'
            }]);

            addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6','1');
            expect(cart.length).toEqual(1);

            expect(localStorage.setItem).toHaveBeenCalledTimes(1);
            expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
            expect(cart[0].quantity).toEqual('2');
            
        });
        loadFromStorage();
    });

    it('add a new prdct to cart', () => {
        //mocking setitem of local storage
        spyOn(localStorage,'setItem');


        //mock code
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6','1');
        expect(cart.length).toEqual(1);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual('1');
    });
});