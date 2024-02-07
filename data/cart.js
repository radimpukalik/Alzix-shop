export let cart = JSON.parse(localStorage.getItem('cartProducts')) || [];

export function saveToStorage(){
    localStorage.setItem('cartProducts', JSON.stringify(cart));
}

export function removeFromCart(productId){
    cart = cart.filter(cartItem => cartItem.id !== productId);
    saveToStorage();
}

export function addToCart(productId){
    cart.push({
        id: productId,
        amount: 1,
        replacementWarranty: false,
        extendedWarranty: 
        {
            threeYears: false,
            oneYear: false
        },
        damageWarranty: 
        {
            twoYears: false,
            oneYear: false
        }
   })
   saveToStorage();
}