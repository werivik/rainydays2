document.addEventListener("DOMContentLoaded", function() {
    const products = document.querySelector(".productholder");

    if (products) {
        const URL = "https://v2.api.noroff.dev/rainy-days/";
        let allProducts = [];

        function createCard(item) {
            console.log(item.baseColor);
            let titleWithoutRepetition = item.title.replace(/Rainy Days/g, '');
            console.log(item)

            let code = ` 
                <div class="card">
                    <a href="jackets-details.html?id=${item.id}">
                        <img src="${item.image.url}" alt="${item.description}">
                        <div class="cardText">
                             <h2 class="productTitle">${titleWithoutRepetition}</h2>
                            <div class="product-details">
                                <p class="gender">${item.gender}</p>
                                <p class="price">$ ${item.price}</p>
                            </div>
                            <div class="product-invisible-filter">
                                <p class="color">${item.baseColor}</p>
                            </div>
                        </div>
                     </a>
                </div>
            `;
            return code;
        }

        const getAllProducts = async (URL) => {
            try {
                loadingMessage.style.display = "block";
                const response = await fetch(URL);
                const data = await response.json();
                allProducts = data.data;
                listJackets(data.data);
            } 
            catch (error) {
                console.error("Error fetching products:", error);
            }
            finally {
                loadingMessage.style.display = "none";
            }
        }

        function listJackets(list) {
            let output = "";
            for (const jacket of list) {
                output += createCard(jacket);
            }
            products.innerHTML = output;
        }

        function filterByGender(gender) {
            const filteredProducts = allProducts.filter(product => {
                if (gender === 'all') {
                    return true;
                } 
                
                else if (gender === 'men') {
                    return product.gender.toLowerCase() === 'male';
                } 
                
                else if (gender === 'women') {
                    return product.gender.toLowerCase() === 'female';
                } 
                
                else {
                    return product.gender.toLowerCase() === gender.toLowerCase();
                }
            });
            
            listJackets(filteredProducts);
        }

        function filterByColor(color) {
            const filteredProducts = allProducts.filter(product => {
                if (color === 'all') {
                    return true;
                } 
                
                else if (color === 'red') {
                    return product.baseColor.toLowerCase() === 'red';
                } 
                
                else if (color === 'black') {
                    return product.baseColor.toLowerCase() === 'black';
                } 
                
                else if (color === 'yellow') {
                    return product.baseColor.toLowerCase() === 'yellow';
                } 
                
                else if (color === 'green') {
                    return product.baseColor.toLowerCase() === 'green';
                } 
                
                else if (color === 'gray') {
                    return product.baseColor.toLowerCase() === 'gray';
                } 
                
                else if (color === 'blue') {
                    return product.baseColor.toLowerCase() === 'blue';
                } 
                
                else if (color === 'purple') {
                    return product.baseColor.toLowerCase() === 'purple';
                }
                
                else {
                    return product.baseColor.toLowerCase() === color.toLowerCase();
                }
            });
            
            listJackets(filteredProducts);
        }

        getAllProducts(URL);

        const genderFilterSelect = document.getElementById('genderFilter');
        genderFilterSelect.addEventListener('change', function() {
            const selectedGender = genderFilterSelect.value;
            filterByGender(selectedGender);
            console.log(selectedGender)
        });

        const colorFilterSelect = document.getElementById('colorFilter');
        colorFilterSelect.addEventListener('change', function() {
            const selectedColor = colorFilterSelect.value;
            filterByColor(selectedColor);
            console.log(selectedColor)
        });
        

    } else {
        console.error("Element with class 'productHolder' not found.");
    }
});