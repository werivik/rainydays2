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
         // products.innerHTML += code;
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

    //    let item1 = [src="/pictures/RainyDays_Jacket1.jpg",
    //     "Jacket",
    //     "Rain Jacket",
    //     "Radahn",
    //     "960 kr",
    //     "20%"];
        
    //     let item2 = [src="/pictures/RainyDays_Jacket2.jpg",
    //     "Jacket",
    //     "Under Jacket",
    //     "Alfyra",
    //     "799 kr",
    //     "20%"];

    //     let item3 = [src="/pictures/RainyDays_Jacket3.jpg",
    //     "Jacket",
    //     "Under Jacket",
    //     "Zevlor",
    //     "1199 kr",
    //     "20%"];

    //     let item4 = [src="/pictures/RainyDays_Jacket4.jpg",
    //     "Jacket",
    //     "Rain Jacket",
    //     "Gortash",
    //     "1699 kr",
    //     "20%"];
    
    //     let item5 = [src="/pictures/RainyDays_Jacket5.jpg",
    //     "Jacket",
    //     "Wind Jacket",
    //     "Astarion",
    //     "799 kr",
    //     "20%"];

    //     let item6 = [src="/pictures/RainyDays_Jacket6.jpg",
    //     "Jacket",
    //     "Rain Jacket",
    //     "Kårlach",
    //     "1399 kr",
    //     "20%"];

    //     let item7 = [src="/pictures/RainyDays_Jacket7.jpg",
    //     "Jacket",
    //     "Under Jacket",
    //     "Ogurek",
    //     "850 kr",
    //     "20%"];

    //     createCard(item1);
    //     createCard(item2);
    //     createCard(item3);
    //     createCard(item4);
    //     createCard(item5);
    //     createCard(item6);
    //     createCard(item7);
    //     createCard(item1);
    //     createCard(item2);
    //     createCard(item3);
    //     createCard(item4);
    //     createCard(item5);
    //     createCard(item6);
    //     createCard(item7);
    //     createCard(item1);
    //     createCard(item2);
    //     createCard(item3);
    //     createCard(item4);
    //     createCard(item5);
    //     createCard(item6);