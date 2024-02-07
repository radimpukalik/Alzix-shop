import { countProductsInCart } from "./utils.js";
import { cart } from "../data/cart.js";

export let totalProducts = countProductsInCart(cart);

export function updateProductAddedUI() {
    cart.forEach(cartItem => {
        if (cartItem) {
            const button = document.querySelector(`[data-product-id="${cartItem.id}"]`);

            if(button){
                const productAddedElement = button.parentElement.querySelector('.product-added');

                if(productAddedElement){
                    productAddedElement.style.display = 'block';
                }

                button.style.display = 'none';
            }
        }
    });
}

export function updateCartCount(){
    totalProducts = countProductsInCart(cart);
    document.querySelector('.js-header-product-amount').innerHTML = `${totalProducts}`;
}

export function updateStylesFromStorage() {
    const checkedStyle = `
        color: red;
        font-weight: bold;
    `;

    const uncheckedStyle = `
        color: #000000;
        font-weight: regular;
    `;

    cart.forEach(cartItem => {
        const replacementWarrantyCheckbox = document.querySelector(`#replacement-warranty-label-${cartItem.id}`);
        if (replacementWarrantyCheckbox) {
            if (cartItem.replacementWarranty) {
                document.querySelector(`.color-change-${cartItem.id}`).style = checkedStyle;
            } else {
                document.querySelector(`.color-change-${cartItem.id}`).style = uncheckedStyle;
            }
        }

        const extendedWarrantyThreeCheckbox = document.querySelector(`#extended-warranty-three-label-${cartItem.id}`);
        if (extendedWarrantyThreeCheckbox) {
            if (cartItem.extendedWarranty.threeYears) {
                document.querySelector(`.color-change-extended-three-${cartItem.id}`).style = checkedStyle;
                document.querySelector(`.extended-warranty-one-${cartItem.id}`).style.display = "none";
            } else {
                document.querySelector(`.color-change-extended-three-${cartItem.id}`).style = uncheckedStyle;
                document.querySelector(`.extended-warranty-one-${cartItem.id}`).style.display = "flex";
            }
        }

        const extendedWarrantyOneCheckbox = document.querySelector(`#extended-warranty-one-label-${cartItem.id}`);
        if (extendedWarrantyOneCheckbox) {
            if (cartItem.extendedWarranty.oneYear) {
                document.querySelector(`.color-change-extended-one-${cartItem.id}`).style = checkedStyle;
                document.querySelector(`.extended-warranty-three-${cartItem.id}`).style.display = "none";
            } else {
                document.querySelector(`.color-change-extended-one-${cartItem.id}`).style = uncheckedStyle;
                document.querySelector(`.extended-warranty-three-${cartItem.id}`).style.display = "flex";
            }
        }

        const damageWarrantyTwoCheckbox = document.querySelector(`#damage-warranty-two-label-${cartItem.id}`);
        if (damageWarrantyTwoCheckbox) {
            if (cartItem.damageWarranty.twoYears) {
                document.querySelector(`.color-change-damage-two-${cartItem.id}`).style = checkedStyle;
                document.querySelector(`.damage-warranty-one-${cartItem.id}`).style.display = "none";
            } else {
                document.querySelector(`.color-change-damage-two-${cartItem.id}`).style = uncheckedStyle;
                document.querySelector(`.damage-warranty-one-${cartItem.id}`).style.display = "flex";
            }
        }

        const damageWarrantyOneCheckbox = document.querySelector(`#damage-warranty-one-label-${cartItem.id}`);
        if (damageWarrantyOneCheckbox) {
            if (cartItem.damageWarranty.oneYear) {
                document.querySelector(`.color-change-damage-one-${cartItem.id}`).style = checkedStyle;
                document.querySelector(`.damage-warranty-two-${cartItem.id}`).style.display = "none";
            } else {
                document.querySelector(`.color-change-damage-one-${cartItem.id}`).style = uncheckedStyle;
                document.querySelector(`.damage-warranty-two-${cartItem.id}`).style.display = "flex";
            }
        }
    });
}

export function updateTotalExtensionsCount(){
    const totalExtensionsCount = cart.reduce((totalCount, product) => {
        if(product.replacementWarranty){
            totalCount++;
        }
        if(product.extendedWarranty.threeYears){
            totalCount++;
        }
        if(product.extendedWarranty.oneYear){
            totalCount++;
        }
        if(product.damageWarranty.twoYears){
            totalCount++;
        }
        if(product.damageWarranty.oneYear){
            totalCount++;
        }
        return totalCount;
    }, 0);
    document.querySelector('.js-extension-summary-count').textContent = `Extensions(${totalExtensionsCount}):`;
}