document.addEventListener("DOMContentLoaded", function() {
    displayConfirmedItems();
});

function displayConfirmedItems() {
    const confirmedItems = JSON.parse(localStorage.getItem('confirmedItems')) || [];
    const confirmationContainer = document.getElementById('confirmationContainer');

    if (confirmedItems.length === 0) {
        confirmationContainer.innerHTML = '<p>No items confirmed.</p>';
        return;
    }

    let totalPrice = 0;
    let confirmationHTML = '<ul>';

    confirmedItems.forEach(item => {
        if (item.price !== null) {
            totalPrice += item.price;
            const formattedPrice = item.price.toFixed(2);
            let titleWithoutRepetitionCheckout = item.title.replace(/Rainy Days/g, '');

            confirmationHTML += `
                <li class="confirmation-container-looks">
                    <div class="confirmation-container-looks-div">
                        <div><span>${titleWithoutRepetitionCheckout}</span></div>
                        <div>Size: <span>${item.size}</span></div>
                        <div>Quantity: <span>${item.quantity}</span></div>
                        <div>Price: <span>${formattedPrice} kr</span></div>
                    </div>
                </li>
            `;
        }
    });

    confirmationHTML += '</ul>';
    const formattedTotalPrice = totalPrice.toFixed(2);
    confirmationHTML += `<p class="TP">Total Price: ${formattedTotalPrice} kr</p>`;

    confirmationContainer.innerHTML = confirmationHTML;
}