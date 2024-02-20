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

        console.log(data);
        console.log(data.data);

        if (!data || !data.data) {
            throw new Error('Product not found or is misbehaving');
        }

        listFullCard(id, data.data, outElement); 

    } catch (error) {
        console.error(error);
        outElement.innerHTML = 'Failed to fetch product data. Please try again later.';
    }
}

function listFullCard(id, item, outElement) {
    console.log('Product details:', id, item);
    let titleWithoutRepetition = item.title.replace(/Rainy Days/g, '');
    const code = `
    <div id="containerdetail" class="productHolderDetail">
    <div id="${id}" class="detail-div">
        <div class="top-part">
            <div class="detail-all-photos">
                <div class="mini-pictures">
                    <img src="${item.image.url}" alt="${item.description}">
                    <img src="${item.image.url}" alt="${item.description}">
                    <img src="${item.image.url}" alt="${item.description}">
                </div>
                <img src="${item.image.url}" alt="${item.description}">
            </div>
        <div class="cardText">
            <h2 class="productTitle">${titleWithoutRepetition}</h2>
            <p class="categoryText">${item.gender}</p>
            <p class="priceText">${item.price}</p>
            <div class="bottom-buttons">
                <p class="colorText">${item.baseColor}</p>
                <p class="sizeText">${item.sizes}</p>
            </div>
        </div>

        </div>
    <div class="productinfo">
        <h3>Product Information</h3>
        <p class="descText">${item.description}</p>
    </div>
</div>
</div>
    `;
    outElement.innerHTML = code;
}

