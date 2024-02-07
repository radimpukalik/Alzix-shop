import { products } from "../data/products.js";
import { cart, removeFromCart, saveToStorage } from "../data/cart.js";
import { updateCartCount, totalProducts, updateStylesFromStorage, updateTotalExtensionsCount } from "./update.js";

productRender();

document.querySelector('.js-checkout-grid').addEventListener('click', (event) => {
    if (event.target.classList.contains('js-delete-button')) {
        const deleteButtonItemId = event.target.dataset.itemId;
        removeFromCart(deleteButtonItemId);

        const itemContainer = document.querySelector(`.js-item-container-${deleteButtonItemId}`);
        itemContainer.remove();
        updateSummaryPrices();
        renderProductSummary();
        updateCartCount();
    }

    if (event.target.classList.contains('js-plus-button') || event.target.classList.contains('js-minus-button')) {
        const container = event.target.closest('.checkout-product-container');
        const itemId = container.querySelector('.js-delete-button').getAttribute('data-item-id');
        const cartProduct = cart.find(cartItem => cartItem.id === itemId);

        if(cartProduct){
            if (event.target.classList.contains('js-plus-button')) {
                cartProduct.amount++;
            } else if (event.target.classList.contains('js-minus-button') && cartProduct.amount > 1) {
                cartProduct.amount--;
            }
        }
        
        const amountInput = container.querySelector('.js-amount-input');
        if (amountInput) {
            amountInput.value = parseInt(cartProduct.amount);
        }

        updateCartCount();
        saveToStorage();
        productRender();
    }

});

document.querySelector('.js-checkout-grid').addEventListener('change', (event) => {
    if (event.target.type === 'checkbox'){
        const container = event.target.closest('.checkout-product-container');
        const itemId = container.querySelector('.js-delete-button').getAttribute('data-item-id');

        handleCheckboxChange(event.target, itemId);
        renderProductSummary();
        productRender();
    }
})

function productRender(){
    const checkoutProductHTML = cart.map(cartProduct => {
    
        const item = products.find(product => {
            return cartProduct.id === product.id;
        })
    
        const itemCart = cart.find(cartItem => {
            return cartItem.id === item.id;
        })
    
        return `
        <div class="checkout-product-container js-item-container-${item.id}">
            <section class="top-part">
                <div class="top-part-product-picture">
                    <img src="${item.image}" class="image-product">
                </div>
                <div class="top-part-product-name">
                    ${item.name}
                </div>
                <div class="top-part-mobile">
                    <div class="top-part-product-amount">
                        <input type="number" class="top-part-product-amount-input js-amount-input" value="${itemCart.amount}" readonly>
                        <div class="top-part-product-amount-buttons-container">
                            <button class="top-part-product-amount-buttons-plus js-plus-button">+</button>
                            <button class="top-part-product-amount-buttons-minus js-minus-button">-</button>
                        </div>
                    </div>
                    <div class="top-part-product-price">
                        ${parseFloat(((item.priceCrowns/23).toFixed(2)) * itemCart.amount).toFixed(2)} $
                    </div>
                    <div class="top-part-product-delete">
                        <button class="top-part-product-delete-button js-delete-button" data-item-id="${item.id}">Delete</button>
                    </div>
                </div>
            </section>
    
            <section class="bottom-part">
    
                <div class="product-extension-container">
                    <div class="product-extension-image">
                        <img src="img/icons/replacement_warranty.webp" class="image">
                    </div>
                    <div class="product-extension-list replacement-warranty">
                        <label class="extension" for="replacement-warranty-label-${item.id}">
                            <div class="extension-checkbox-container">
                                <input type="checkbox" id="replacement-warranty-label-${item.id}" ${itemCart.replacementWarranty ? 'checked' : ''}>
                            </div>
                            <div class="extension-name-container">
                                Immediate Product Replacement Warranty
                            </div>
                            <div class="extension-price-container color-change-${item.id}">
                                ${((((item.priceCrowns/23)*0.085).toFixed(2)) * itemCart.amount).toFixed(2)} $
                            </div>
                        </label>
                    </div>
                </div>
    
                <div class="product-extension-container">
                    <div class="product-extension-image">
                        <img src="img/icons/extended_warranty.webp" class="image">
                    </div>
                    <div class="product-extension-list extended-warranty">
                        <label class="extension extended-warranty-three-${item.id}" for="extended-warranty-three-label-${item.id}">
                            <div class="extension-checkbox-container">
                                <input type="checkbox" id="extended-warranty-three-label-${item.id}" ${itemCart.extendedWarranty.threeYears ? 'checked' : ''}>
                            </div>
                            <div class="extension-name-container">
                                Extended Warranty + 3 Years. Best Offer.
                            </div>
                            <div class="extension-price-container color-change-extended-three-${item.id}">
                            ${((((item.priceCrowns/23)*0.16).toFixed(2)) * itemCart.amount).toFixed(2)} $
                            </div>
                        </label>
                        <label class="extension extended-warranty-one-${item.id}" for="extended-warranty-one-label-${item.id}">
                            <div class="extension-checkbox-container">
                                <input type="checkbox" id="extended-warranty-one-label-${item.id}" ${itemCart.extendedWarranty.oneYear ? 'checked' : ''}>
                            </div>
                            <div class="extension-name-container">
                                Extended Warranty + 1 Year
                            </div>
                            <div class="extension-price-container color-change-extended-one-${item.id}">
                            ${((((item.priceCrowns/23)*0.11).toFixed(2)) * itemCart.amount).toFixed(2)} $
                            </div>
                        </label>
                    </div>
                </div>
    
                <div class="product-extension-container">
                    <div class="product-extension-image">
                        <img src="img/icons/insurance_warranty.webp" class="image">
                    </div>
                    <div class="product-extension-list damage-warranty">
                        <label class="extension damage-warranty-two-${item.id}" for="damage-warranty-two-label-${item.id}">
                            <div class="extension-checkbox-container">
                                <input type="checkbox" id="damage-warranty-two-label-${item.id}" ${itemCart.damageWarranty.twoYears ? 'checked' : ''}>
                            </div>
                            <div class="extension-name-container">
                                Damage & Theft Insurance for 2 Years
                            </div>
                            <div class="extension-price-container color-change-damage-two-${item.id}">
                            ${((((item.priceCrowns/23)*0.09).toFixed(2)) * itemCart.amount).toFixed(2)} $
                            </div>
                        </label>
                        <label class="extension damage-warranty-one-${item.id}" for="damage-warranty-one-label-${item.id}">
                            <div class="extension-checkbox-container">
                                <input type="checkbox" id="damage-warranty-one-label-${item.id}" ${itemCart.damageWarranty.oneYear ? 'checked' : ''}>
                            </div>
                            <div class="extension-name-container">
                                Damage & Theft Insurance for 1 Year
                            </div>
                            <div class="extension-price-container color-change-damage-one-${item.id}">
                            ${((((item.priceCrowns/23)*0.07).toFixed(2)) * itemCart.amount).toFixed(2)} $
                            </div>
                        </label>
                    </div>
                </div>
            </section>
        </div>
        `
    }).join('');
    document.querySelector('.js-checkout-grid').innerHTML = checkoutProductHTML;
    updateCartCount();
    renderProductSummary();
    updateStylesFromStorage();
    updateTotalExtensionsCount();
}

function renderProductSummary() {
    const existingSummaryContainer = document.querySelector('.order-summary-container');

    if (cart.length === 0 && existingSummaryContainer) {
        existingSummaryContainer.remove();
        document.querySelector('.js-checkout-grid').innerHTML = `
        <div class="empty-shopping-cart-container">Looks like there's nothing in here...</div>
        `
        return;
    }

    if (existingSummaryContainer) {
        existingSummaryContainer.remove();
    }

    const summaryPrices = countOrderSummary();
    
    const checkoutSumarryHTML = `
        <div class="order-summary-container">
            <div class="order-summary-title-container">
                Order Summary
            </div>
            <div class="order-summary-items-container">
                <div class="js-total-item-checkout">Items(${totalProducts}):</div>
                <div class="js-items-summary">${summaryPrices.totalItemPrice} $</div>
            </div>
            <div class="order-summary-items-container">
                <div class="js-extension-summary-count"></div>
                <div class="js-extension-summary">${summaryPrices.totalExtensionsPrice} $</div>
             </div>
            <div class="order-summary-shipping-container">
                <div>Shipping</div>
                <div>9.99 $</div>
            </div>
            
            <div class="order-summary-tax-container">
                <div>Estimated tax (8.5%):</div>
                <div class="js-tax-summary">${summaryPrices.taxPrice} $</div>
            </div>
            <div class="order-summary-total-container">
                <div>Order total:</div>
                <div class="js-total-summary">${summaryPrices.totalOrderPrice} $</div>
            </div>
            <div class="order-summary-order-container">
                <button class="order-summary-order-button">Place your order</button>
            </div>
        </div>
    `;

    if(cart.length > 0){
        document.querySelector('.js-checkout-grid').innerHTML += checkoutSumarryHTML;
    }else{
        document.querySelector('.js-checkout-grid').innerHTML = `
        <div class="empty-shopping-cart-container">Looks like there's nothing in here...</div>
        `
    }

}

function handleCheckboxChange(checkbox, productId) {
    cart.forEach(cartItem => {
        if(cartItem.id === productId){
            switch (checkbox.id) {
                case `replacement-warranty-label-${productId}`:
                    if(checkbox.checked){
                        cartItem.replacementWarranty = true;
                    }else{
                        cartItem.replacementWarranty = false;
                    }
                    break;
                case `extended-warranty-three-label-${productId}`:
                    if(checkbox.checked){
                        cartItem.extendedWarranty.threeYears = true;
                    }else{
                        cartItem.extendedWarranty.threeYears = false;
                    }
                    break;
                case `extended-warranty-one-label-${productId}`:
                    if(checkbox.checked){
                        cartItem.extendedWarranty.oneYear = true;
                    }else{
                        cartItem.extendedWarranty.oneYear = false;
                    }
                    break;
                case `damage-warranty-two-label-${productId}`:
                    if(checkbox.checked){
                        cartItem.damageWarranty.twoYears = true;
                    }else{
                        cartItem.damageWarranty.twoYears = false;
                    }
                    break;
                case `damage-warranty-one-label-${productId}`:
                    if(checkbox.checked){
                        cartItem.damageWarranty.oneYear = true;
                    }else{
                        cartItem.damageWarranty.oneYear = false;
                    }
                    break;
                default:
                    console.log("Unknown checkbox changed");
                    break;
            }
            updateStylesFromStorage();
            saveToStorage();
        }
    })
}

function countOrderSummary(){
    let totalItemPrice = 0;
    let totalExtensionsPrice = 0;

    cart.forEach(cartProduct => {
        const item = products.find(product => product.id === cartProduct.id);
        const itemPrice = (item.priceCrowns / 23) * parseInt(cartProduct.amount);

        if (cartProduct.replacementWarranty) {
            totalExtensionsPrice += ((((item.priceCrowns / 23) * 0.085).toFixed(2)) * cartProduct.amount);
        }

        if (cartProduct.extendedWarranty.threeYears) {
            totalExtensionsPrice += ((((item.priceCrowns / 23) * 0.16).toFixed(2)) * cartProduct.amount);
        }

        if (cartProduct.extendedWarranty.oneYear) {
            totalExtensionsPrice += ((((item.priceCrowns / 23) * 0.11).toFixed(2)) * cartProduct.amount);
        }

        if (cartProduct.damageWarranty.twoYears) {
            totalExtensionsPrice += ((((item.priceCrowns / 23) * 0.09).toFixed(2)) * cartProduct.amount);
        }

        if (cartProduct.damageWarranty.oneYear) {
            totalExtensionsPrice += ((((item.priceCrowns / 23) * 0.07).toFixed(2)) * cartProduct.amount);
        }

        totalItemPrice += itemPrice;
    })

    let taxPrice = totalItemPrice * 0.085;
    let totalOrderPrice = totalItemPrice + taxPrice + 9.99;
    totalOrderPrice += parseFloat(totalExtensionsPrice);

    totalItemPrice = totalItemPrice.toFixed(2);
    taxPrice = taxPrice.toFixed(2);
    totalOrderPrice = totalOrderPrice.toFixed(2);
    totalExtensionsPrice = totalExtensionsPrice.toFixed(2);

    return {totalItemPrice, taxPrice, totalOrderPrice, totalExtensionsPrice};
}

function updateSummaryPrices(){
    const summaryPrices = countOrderSummary();

    document.querySelector('.js-items-summary').textContent = `${summaryPrices.totalItemPrice} $`;
    document.querySelector('.js-extension-summary').textContent = `${summaryPrices.totalExtensionsPrice} $`;
    document.querySelector('.js-tax-summary').textContent = `${summaryPrices.taxPrice} $`;
    document.querySelector('.js-total-summary').textContent = `${summaryPrices.totalOrderPrice} $`;
}


