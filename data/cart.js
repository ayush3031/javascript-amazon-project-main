//model

export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart = [{
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


export function updateDeliveryOptions (productId , deliveryOptionId) {
    let matchingItem;
    cart.forEach((item)=>{
        if(productId == item.productId)
        {
            matchingItem = item;
        }
    })
    matchingItem.deliveryOptionsId = deliveryOptionId;

    saveToStorage();
}


function saveToStorage() {
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(prodId) {

    let matchingItem;
    cart.forEach((item)=>{
        if(prodId == item.productId)
        {
            matchingItem = item;
        }
    })

    if(matchingItem) 
    {
        matchingItem.quantity +=1;
    }
    else
    {
        cart.push({
            productId: prodId,
            quantity: 1,
            deliveryOptionsId: '1'
        })
    }
    saveToStorage();
}

export function deleteFromCart(productId)
{
    const newCart = [];
    cart.forEach((cartItem)=>
    {
        if(cartItem.productId != productId)
            newCart.push(cartItem);
    })

    cart = newCart;
    saveToStorage();
}