const products = document.querySelector(".productHolder");
const API = "https://v2.api.noroff.dev/rainy-days";

        function createCard(item){
            console.log(item)
            let code = ` 
            <div class="card">
              <a href="jackets-details.html">
                <img src="${item.image.url}" alt="${item.description}">
                <div class="cardText">
                    <p class="categoryText">${item.gender}</p>
                    <h2 class="brandText">${item.title}</h2>
                    <p class="priceText">${item.price}</p>
                </div>
               </a>
            </div>
          `;
         products.innerHTML += code;
         return code
        }

        const getAllProducts = async (API) => {
            const response = await fetch(API);
            const data = await response.json();
           // console.log(data.data);

            listJackets (data.data);
        }

        function listJackets (list) {
            let output = "";
            for (const jacket of list){
                //console.log(jacket);
                output += createCard (jacket);
            }
            products.innerHTML = output;
        }

        getAllProducts (API);