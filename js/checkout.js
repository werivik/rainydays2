document.addEventListener("DOMContentLoaded", function() {
    displayShoppingBasket();
    setupConfirmationButton();
});

function setupConfirmationButton() {
    const confirmationButton = document.getElementById('confirmationButton');
    if (confirmationButton) {
        confirmationButton.addEventListener('click', function() {
            localStorage.setItem('confirmedItems', JSON.stringify(JSON.parse(localStorage.getItem('basketItems')) || []));
            clearShoppingCart();
            window.location.href = 'checkoutconfirmation.html';
        });
    }
}

function displayShoppingBasket() {
    const basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];
    const basketContainer = document.getElementById('basketContainer');
    const cartControlButtons = document.querySelector('.cart-controll-buttons');

    if (!basketContainer || !cartControlButtons) {
        console.error("Basket container or cart control buttons div not found.");
        return;
    }

    basketContainer.innerHTML = '';
    cartControlButtons.innerHTML = '';

    if (basketItems.length === 0) {
        basketContainer.innerHTML = '<p class="emptybasket">Your shopping basket is empty, check <a href="allproducts.html">here</a> to fill it up!</p>';
        return;
    }

    let totalPrice = 0;
    let basketHTML = '<div class="basket-items">';

    basketItems.forEach(item => {
        if (item.price !== null) {
            totalPrice += item.price;
            const formattedPrice = item.price.toFixed(2);
            let titleWithoutRepetitionCheckout = item.title.replace(/Rainy Days/g, '');
    
            basketHTML += `
                <div class="basket-row">
                    <div class="basket-image-item">
                        <img src="${item.image.url}" alt="${item.description}">
                    </div>
                    <div class="basket-info">
                        <div class="basket-title"><span>${titleWithoutRepetitionCheckout}</span></div>
                        <div>Size: <span>${item.size}</span></div>
                        <div class="basket-item-price">Price: <span>${formattedPrice} kr</span></div>
                        <div class="buttons-checkout">
                            <input type="number" class="quantity-input" value="1" min="1" max="${item.quantity}">
                            <button class="remove-btn" data-id="${item.id}">Remove from Cart</button>
                            <div class="quantity">Quantity: <span>${item.quantity}</span></div>
                        </div>
                    </div>
                </div>
        `;
        }
    });

    basketHTML += '</div>';
    basketContainer.innerHTML = basketHTML;

    const formattedTotalPrice = totalPrice.toFixed(2);

    cartControlButtons.innerHTML = `
        <p class="TP">Total Price: ${formattedTotalPrice} kr</p>
        <button id="confirmationButton" class="confirm-checkout">Checkout</button>
    `;

    document.getElementById('clearButton').addEventListener('click', clearShoppingCart);

    const confirmationButton = document.getElementById('confirmationButton');
    if (confirmationButton) {
        confirmationButton.addEventListener('click', function() {
            localStorage.setItem('confirmedItems', JSON.stringify(basketItems));
            clearShoppingCart();
            window.location.href = 'checkoutconfirmation.html';
        });
    }

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            removeItem(itemId);
        });
    });
}

function removeItem(itemId) {
    let basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];
    const index = basketItems.findIndex(item => item.id === itemId);

    if (index !== -1) {
        const item = basketItems[index];
        const removeQuantity = parseInt(document.querySelector(`.remove-btn[data-id="${itemId}"]`).previousElementSibling.value);

        if (removeQuantity > 0 && removeQuantity <= item.quantity) {
            item.quantity -= removeQuantity;

            if (item.quantity === 0) {
                basketItems.splice(index, 1);
            } else {
                item.price = (item.price / (item.quantity + removeQuantity)) * item.quantity;
            }

            localStorage.setItem('basketItems', JSON.stringify(basketItems));
            displayShoppingBasket();
        } 
        
        else {
            alert('Invalid quantity to remove.');
        }
    }
}

function clearShoppingCart() {
    localStorage.removeItem('basketItems');
    displayShoppingBasket();
}
