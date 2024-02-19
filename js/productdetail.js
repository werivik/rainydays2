document.addEventListener("DOMContentLoaded", function() {
    const outElement = document.getElementById("containerdetail");
    const params = new URL(document.location).searchParams;
    const id = params.get("id");

    if (id) {
        getCard(id, outElement);
    } else {
        outElement.innerHTML = "Product ID not provided. Please never try again.";
    }
});

async function getCard(id, outElement) { 
    try {
        console.log('Fetching product with ID:', id); 
        const api = `https://v2.api.noroff.dev/rainy-days/${id}`;
        const response = await fetch(api);

        if (!response.ok) {
            throw new Error('Failed to fetch product data');
        }

        const data = await response.json();

        console.log("data"+data);
        console.log("data.item"+data.item);
        console.log("data.item"+data.data);

        // if (!data || !data.item) {
        //     throw new Error('Product not found or is misbehaving');
        // }

        // listFullCard(data.item, outElement); 
    } catch (error) {
        console.error(error);
        outElement.innerHTML = 'Failed to fetch product data. Please try again later.';
    }
}

function listFullCard(item, outElement) {
    console.log('Product details:', item);
    const code = `
        <div id="${item.id}">
            <img src="${item.image.url}" alt="${item.description}">
            <div class="cardText">
                <p class="categoryText">${item.gender}</p>
                <h2 class="brandText">${item.title}</h2>
                <p class="priceText">${item.price}</p>
            </div>
        </div>
    `;
    outElement.innerHTML = code;
}