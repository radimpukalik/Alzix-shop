export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

export function countProductsInCart(cart){
    return cart.reduce((totalCount, product) => totalCount + product.amount, 0)
}

export function countOrderSummary(cart){
  let totalItemPrice = 0;
  cart.forEach(cartProduct => {
      const item = products.find(product => product.id === cartProduct.id);
      const itemPrice = (item.priceCrowns / 23);
      
      console.log(typeof(itemPrice))
      totalItemPrice += itemPrice;
  })
  let taxPrice = totalItemPrice * 0.085;
  let totalOrderPrice = totalItemPrice + taxPrice + 9.99;

  totalItemPrice = totalItemPrice.toFixed(2);
  taxPrice = taxPrice.toFixed(2);
  totalOrderPrice = totalOrderPrice.toFixed(2);

  return {totalItemPrice, taxPrice, totalOrderPrice};
}

export function handleNavbarDisplay() {
  const toggleElement = document.querySelector('.navbar');
  const clickedButton = document.querySelector('.mobile-filter-navbar-button');
  const closeButton = document.querySelector('.navbar-mobile-close-button');

  if (window.innerWidth > 650) {
      toggleElement.style.display = "flex";
      clickedButton.style.display = "none";
      closeButton.style.display = "none";
  } else {
      toggleElement.style.display = "none";
      clickedButton.style.display = "flex";
      closeButton.style.display = "none";
  }
}