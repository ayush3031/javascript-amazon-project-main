export const deliveryOptions = [{
    id: '1',
    deliverDays: 7,
    price: 0
},
{
    id: '2',
    deliverDays: 3,
    price: 49
},
{
    id: '3',
    deliverDays: 1,
    price: 99
},
]

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;
    
    deliveryOptions.forEach((option)=>
    {
        if(deliveryOptionId === option.id)
        {
            deliveryOption = option
        }  
    })
    return deliveryOption|| deliveryOptions[0];
}

