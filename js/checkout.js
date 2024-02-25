document.addEventListener("DOMContentLoaded", function() {
    displayShoppingBasket();
    setupConfirmationButton();
});

function setupConfirmationButton() {
    const confirmationButton = document.getElementById('confirmationButton');
    if (confirmationButton) {
        confirmationButton.addEventListener('click', function() {
            localStorage.setItem('confirmedItems', JSON.stringify(JSON.parse(localStorage.getItem('basketItems')) || [] ));
            clearShoppingCart();
            window.location.href = 'checkoutconfirmation.html';
        });
    }
}

function displayShoppingBasket() {
    const basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];
    const basketContainer = document.getElementById('basketContainer');
    const confirmationButton = document.getElementById('confirmationButton');
    if (confirmationButton) {
        confirmationButton.addEventListener('click', function() {
            localStorage.setItem('confirmationItems', JSON.stringify(JSON.parse(localStorage.getItem('basketItems')) || [] ));
            clearShoppingCart();
            window.location.href = 'checkoutconfirmation.html'
        })
    }

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
            <div class="basketcontainer-looks">
                <div class="basket-row">
                    <div class="basket-image-item">
                        <img src="${item.image.url}" alt="${item.description}">
                    </div>
                    <div class="basketcontainer-looks-div">
                        <div class="basket-title"><span>${titleWithoutRepetitionCheckout}</span></div>
                        <div>Size: <span>${item.size}</span></div>
                        <div>Quantity: <span>${item.quantity}</span></div>
                        <div class="basket-item-price">Price: <span>${formattedPrice} kr</span></div>
                        <div class="buttons-checkout">
                        <input type="number" class="quantity-input" value="1" min="1" max="${item.quantity}">
                        <button class="remove-btn" data-id="${item.id}">Remove from Cart</button>
                        <button class="add-btn" data-id="${item.id}">Add Jacket</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        }
    });

    basketHTML += '</div>';
    const formattedTotalPrice = totalPrice.toFixed(2);
    basketHTML += '<div class="cart-controll-buttons">';
    basketHTML += '<button id="clearButton">Clear Shopping Cart</button>';
    basketHTML += `<p class="TP">Total Price: ${formattedTotalPrice} kr</p>`;
    basketHTML += '<button id="confirmationButton">Proceed to Checkout Confirmation</button>';
    basketHTML += '</div>';

    basketContainer.innerHTML = basketHTML;

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            removeItem(itemId);
        });
    });

    const addButtons = document.querySelectorAll('.add-btn')
    addButtons.forEach(button => {
        button.addEventListener('click', function () {
            const itemId = this.getAttribute('data-id');
            addItem(itemId);
        });
    });

    const clearButton = document.getElementById('clearButton');
    if (clearButton) {
        clearButton.addEventListener('click', clearShoppingCart);
    }
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
            }

            item.price = item.price / (item.quantity + removeQuantity) * item.quantity;

            localStorage.setItem('basketItems', JSON.stringify(basketItems));
            displayShoppingBasket();

        } 
        else {
            alert('Invalid quantity to remove.');
        }
    }
}

function addItem(itemId) {
    let basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];
    const index = basketItems.findIndex(item => item.id === itemId);

    if (index !== -1) {
        const item = basketItems[index];
        const addQuantity = parseInt(document.querySelector(`.add-btn[data-id="${itemId}"]`).previousElementSibling.value);

        if (addQuantity > 0 && addQuantity <= item.quantity) {
            item.quantity += addQuantity;

            document.querySelector(`.basketcontainer-looks[data-id="${itemId}"] .quantity`).textContent = item.quantity;

            localStorage.setItem('basketItems', JSON.stringify(basketItems));
        }
    }
}

function clearShoppingCart() {
    localStorage.removeItem('basketItems');
    displayShoppingBasket();
}