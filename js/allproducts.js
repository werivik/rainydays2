document.addEventListener("DOMContentLoaded", function() {
    const products = document.querySelector(".productHolder");

    if (products) {
        const URL = "https://v2.api.noroff.dev/rainy-days/";
        let allProducts = [];

        function createCard(item) {
            console.log(item);

            let titleWithoutRepetition = item.title.replace(/Rainy Days/g, '');

            let code = ` 
                <div class="card">
                    <a href="jackets-details.html?id=${item.id}">
                        <img src="${item.image.url}" alt="${item.description}">
                        <div class="cardText">
                            <p class="categoryText">${item.gender}</p>
                             <h2 class="productTitle">${titleWithoutRepetition}</h2>
                        </div>
                    </a>
                    <div class="product-price-shopping">
                        <p class="priceText">${item.price}</p>
                        <p class="priceText"><i class="fa-solid fa-cart-shopping"></i></p>
                    </div>
                    <div class="product-invisible-filter">
                    <p class="priceText">${item.baseColor}</p>
                </div>
                </div>
            `;
            return code;
        }

        const getAllProducts = async (URL) => {
            try {
                const response = await fetch(URL);
                const data = await response.json();
                allProducts = data.data;
                listJackets(data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        function listJackets(list) {
            let output = "";
            for (const jacket of list) {
                output += createCard(jacket);
            }
            products.innerHTML = output;
        }

        function applyFilters() {
            const genderFilter = document.getElementById('genderFilter').value.toLowerCase();
            const colorFilter = document.getElementById('colorFilter').value.toLowerCase();
            const priceFilter = parseFloat(document.getElementById('priceFilter').value);
        
            let filteredProducts = allProducts.filter(product => {
                const productGender = product.gender.toLowerCase();
                const productColor = product.baseColor.toLowerCase();
                const productPrice = parseFloat(product.price);
        
                const passGender = genderFilter === '' || productGender === genderFilter;
                const passColor = colorFilter === '' || productColor === colorFilter;
                const passPrice = isNaN(priceFilter) || productPrice <= priceFilter;
        
                return passGender && passColor && passPrice;
            });
        
            listJackets(filteredProducts);
        }

        document.getElementById('applyFilters').addEventListener('click', applyFilters);

        getAllProducts(URL);
    } else {
        console.error("Element with class 'productHolder' not found.");
    }
});

// const URL = "https://v2.api.noroff.dev/rainy-days/";


// function createCard(item) {
//     return `
//     <div class="card">
//         <a href="jackets-details.html?id=${item.id}">
//             <img src="${item.image.url}" alt="${item.description}">
//             <div class="cardText">
//                 <p class="categoryText">${item.gender}</p>
//                 <h2 class="brandText">${item.title}</h2>
//                 <p class="priceText">${item.price}</p>
//             </div>
//         </a>
//     </div>`;
// }

// // Function to fetch all products from the API and list them
// async function fetchAndListProducts() {
//     try {
//         const response = await fetch(URL);
//         const data = await response.json();
//         listJackets(data); // Assuming the data structure has an 'item' property
//     } catch (error) {
//         console.error("Error fetching products:", error);
//     }
// }

// // Function to list jackets
// function listJackets(data) {
//     const outElement = document.getElementById("container");
//     let output = "";
//     for (const jacket of data.item) {
//         output += createCard(jacket);
//     }
//     outElement.innerHTML = output;
// }

// // Function to filter jackets based on user input
// function filterCards() {
//     const inputField = document.getElementById("queryString");
//     const filterQuery = inputField.value.toUpperCase();
//     const outElement = document.getElementById("container");
//     // Assuming you want to filter based on 'data' fetched from the API
//     const filtered = data.item.filter((card) => {
//         return card.name.toUpperCase().indexOf(filterQuery) > -1;
//     });

//     console.log(data.item.length, filtered.length);

//     listJackets(filtered, outElement);
// }

// // Event listener for input field to trigger filtering
// document.getElementById("queryString").addEventListener("keyup", filterCards);

// // Initial fetching and listing of products
// fetchAndListProducts();