document.addEventListener("DOMContentLoaded", function() {
    displayShoppingBasket();
});

function displayShoppingBasket() {
    const basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];
    const basketContainer = document.getElementById('basketContainer');

    if (basketItems.length === 0) {
        basketContainer.innerHTML = '<p>Your shopping basket is empty.</p>';
        return;
    }

    let totalPrice = 0;
    let basketHTML = '<ul>';

    basketItems.forEach(item => {
        if (item.price !== null) {
            totalPrice += item.price;
            const formattedPrice = item.price.toFixed(2);
    
            basketHTML += `
            <li class="basketcontainer-looks">
            <div>
                <div>${item.title} - Size: ${item.size} - Quantity: ${item.quantity}</div>
                <div>Price: ${formattedPrice} kr</div>
                <input type="number" class="remove-quantity" value="1" min="1" max="${item.quantity}">
                <button class="remove-btn" data-id="${item.id}">Remove from Cart</button>
            </div>
        </li>
        `;
        }
    });

    basketHTML += '</ul>';
    const formattedTotalPrice = totalPrice.toFixed(2);
    basketHTML += `<p>Total Price: ${formattedTotalPrice} kr</p>`;

    basketHTML += '<button id="clearButton">Clear Shopping Cart</button>';

    basketContainer.innerHTML = basketHTML;

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            removeItem(itemId);
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


            item.price = item.price / (item.quantity + removeQuantity) * item.quantity;

            if (item.quantity === 0) {
                basketItems.splice(index, 1);
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



// function displayBasketItems(basketItems) {
//     const checkoutItemsElement = document.getElementById('checkoutItems');
//     checkoutItemsElement.innerHTML = '';

//     basketItems.forEach(item => {
//         const itemElement = document.createElement('div');
//         itemElement.innerHTML = `
//         <p>${item.title} - Size: ${item.size} - Quantity: ${item.quantity} - Price: ${item.price}</p>
//         `;

//         checkoutItemsElement.appendChild(itemElement);
//     });
// }

// async function updateShoppingBasket(id, item, selectedSize, quantity) {
//     const totalPrice = item.price * parseInt(quantity);

//     const basketItem = {
//         id: id,
//         title: item.title,
//         size: selectedSize,
//         quantity: parseInt(quantity),
//         price: totalPrice
//     };

//     let basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];

//     const existingItemIndex = basketItems.findIndex(item => item.id === id && item.size === selectedSize);

//     if (existingItemIndex !== -1) {
//         basketItems[existingItemIndex].quantity += parseInt(quantity);
//         basketItems[existingItemIndex].price += totalPrice;
//     } 
//     else {
//         basketItems.push(basketItem);
//     }
//     localStorage.setItem('basketItems', JSON.stringify(basketItems));

//     displayBasketItems(basketItems);
// }

// function displayBasketItems(basketItems) {
//     const checkoutItemsElement = document.getElementById('checkoutItems');
//     checkoutItemsElement.innerHTML = '';

//     basketItems.forEach(item => {
//         const itemElement = document.createElement('div');
//         itemElement.innerHTML = `
//         <p>${item.title} - Size: ${item.size} - Quantity: ${item.quantity} - Price: ${item.price}</p>
//         `;

//         checkoutItemsElement.appendChild(itemElement);

//     });
// }

// document.addEventListener("DOMContentLoaded", function() {
//     const basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];

//     function calculateTotalPrice(items) {
//         return items.reduce((total, item) => total + (item.price * item.quantity), 0);
//     }

//     function displayBasketItems(items) {
//         const checkoutItemsElement = document.getElementById('checkoutItems');
//         const totalPriceElement = document.getElementById('totalPrice');

//         checkoutItemsElement.innerHTML = '';

//         items.forEach(item => {
//             const itemElement = document.createElement('div');
//             itemElement.innerHTML = 
//             `
//             <p>${item.title} - Quantity: ${item.quantity} - Price: $${item.price}</p>
//             `;

//             checkoutItemsElement.appendChild(itemElement);

//         });

//         const totalPrice = calculateTotalPrice(items);
//         totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
//     }

//     displayBasketItems(basketItems);

// })