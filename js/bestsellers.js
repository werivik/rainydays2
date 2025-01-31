document.addEventListener("DOMContentLoaded", function() {
    const productsContainer = document.querySelector(".featured-products");

    if (productsContainer) {
        const URL = "https://v2.api.noroff.dev/rainy-days/";
        let bestSellingProducts = [];

        function createCard(bestSeller) {
            let code = `
                <div class="bestsellercard">
                    <a href="jackets-details.html?id=${bestSeller.id}">
                        <img src="${bestSeller.image.url}" alt="${bestSeller.description}">
                    </a>
                </div>
            `;
            return code;
        }

        const getBestSellingProducts = async (URL) => {
            try {
                const response = await fetch(URL);
                const data = await response.json();
                bestSellingProducts = data.data;
                displayBestSellingProducts();
            } catch (error) {
                console.error("Error fetching best-selling products:", error);
            }
        }

        function displayBestSellingProducts() {
            let output = "";
            const maxProducts = 5;
            for (let i = 0; i <Math.min(bestSellingProducts.length, maxProducts); i++) {
                output += createCard(bestSellingProducts[i]);
            }
            productsContainer.innerHTML = output;
        }

        getBestSellingProducts(URL);
    } else {
        console.error("Element with class 'bottomproducts-inline' not found.");
    }
});