import { addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { updateProductAddedUI, updateCartCount } from "./update.js";
import { navbar } from "../data/navbar.js";
import { handleNavbarDisplay } from "./utils.js";

renderProducts();
renderNavbarItems();
handleNavbarDisplay();

document.querySelector('.mobile-filter-navbar-button').addEventListener('click', () => {
    const toggleElement = document.querySelector('.navbar');
    const clickedButton = document.querySelector('.mobile-filter-navbar-button');
    const closeButton = document.querySelector('.navbar-mobile-close-button');

    toggleElement.style.display = "flex";
    clickedButton.style.display = "none";
    closeButton.style.display = "flex";
})

document.querySelector('.navbar-mobile-close-button').addEventListener('click', () => {
    const toggleElement = document.querySelector('.navbar');
    const clickedButton = document.querySelector('.mobile-filter-navbar-button');
    const closeButton = document.querySelector('.navbar-mobile-close-button');

    toggleElement.style.display = "none";
    clickedButton.style.display = "flex";
    closeButton.style.display = "none";
})

window.addEventListener('resize', handleNavbarDisplay);

document.querySelector('.js-product-grid').addEventListener('click', (event) => {
    const addButton = event.target.closest('.js-add-to-cart');

    if(addButton){
        const addButtonId = addButton.dataset.productId;

        addToCart(addButtonId);
        updateProductAddedUI();
        updateCartCount();
    }
});

document.querySelectorAll('.navbar-item-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', renderProducts);
});

document.querySelectorAll('.navbar-price-filter-input').forEach(input => {
    input.addEventListener('change', renderProducts);
})

document.querySelector('.header-input').addEventListener('input', renderProducts);

function renderProducts(){
    const selectedFiltersArray = Array.from(document.querySelectorAll('.navbar-item-checkbox:checked')).map(checkbox => checkbox.value);
    const minFilterValue = document.querySelector('.js-filter-min').value;
    const maxFilterValue = document.querySelector('.js-filter-max').value;
    const headerInputFilter = document.querySelector('.header-input').value;

    const productsHTML = products
        .filter(product => {
            if (headerInputFilter) {
                return product.name.toLowerCase().includes(headerInputFilter);
            }
            return (minFilterValue ? (product.priceCrowns / 23) > minFilterValue : true) &&
                   (maxFilterValue ? (product.priceCrowns / 23) < maxFilterValue : true) &&
                   (selectedFiltersArray.length === 0 || selectedFiltersArray.some(filter => product.filterKeywords.includes(filter)));
                   
        })
        .map(product => {
                return `
                <div class="product">
                    <div class="product-image-container">
                        <img src="${product.image}" class="image-product">
                    </div>
                    <div class="product-rating-container">
                        <div class="product-rating-star-container">
                            <img src="img/rating/rating-${product.rating.stars*10}.png" class="product-rating-star image">
                        </div>
                        <div class="product-rating-rate-count">${product.rating.count}x</div>
                    </div>
                    <div class="product-name">
                        ${product.name}
                    </div>
                    <div class="product-prize">
                        ${(product.priceCrowns/23).toFixed(2)} $
                    </div>
                    <div class="product-buy-button-container">
                        <button class="product-buy-button js-add-to-cart" data-product-id="${product.id}">
                            <img src="img/icons/grocery-store.png" class="product-buy-button-img">
                            <div>Add to cart</div>
                        </button>
                        <div class="product-added">
                            Added to the cart
                        </div>
                    </div>
                </div>
                `
        }).join('');
        
    document.querySelector('.js-product-grid').innerHTML = productsHTML;
    updateProductAddedUI();
    updateCartCount();
}

function renderNavbarItems(){
    const navHTML = navbar.map(navItem => `
    <label class="navbar-item">
        <div class="navbar-item-left">
            <img src="${navItem.img}" class="navbar-item-img">
        </div>
        <div class="navbar-item-middle">
            ${navItem.name}
        </div>
        <div class="navbar-item-right">
            <input type="checkbox" class="navbar-item-checkbox" value="${navItem.value}">
        </div>
    </label>
    `).join('');
    document.querySelector('.js-navbar-items-grid').innerHTML += navHTML;
}
