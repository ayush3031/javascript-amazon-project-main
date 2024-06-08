export const cart = [];

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
            quantity: 1
        })
    }
}