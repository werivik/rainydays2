document.addEventListener("DOMContentLoaded", function() {
    const basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];

    function calculateTotalPrice(items) {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    function displayBasketItems(items) {
        const checkoutItemsElement = document.getElementById('checkoutItems');
        const totalPriceElement = document.getElementById('totalPrice');

        checkoutItemsElement.innerHTML = '';

        items.forEach(item => {
            
        })
    }
})