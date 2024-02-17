// const params = new URLSearchParams(document.location.search);
// const id = params.get("id");
// console.log(id);

// const status = document.querySelector(".productHolder");
// const out = document.querySelector(".productHolderDetails");

// const url = `https://v2.api.noroff.dev/rainy-days/${id}`;
// console.log(url);

// fetch(url)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log(data);
//     listData(data); // Call listData after fetching the data
//   })
//   .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
//     status.innerHTML = "Failed to fetch product details";
//   });

// function listData(item) {
//     console.log(item);
//     document.title = item.title;

//     let imageUrl = item.image ? item.image.url : '';
//     let description = item.description ? item.description : '';
//     let gender = item.gender ? item.gender : '';
//     let title = item.title ? item.title : '';
//     let price = item.price ? item.price : '';

//     let newDiv = ` 
//         <div class="carddetail">
//             <img src="${imageUrl}" alt="${description}">
//             <div class="cardTextdetail">
//                 <p class="categoryTextdetail">${gender}</p>
//                 <h2 class="brandTextdetail">${title}</h2>
//                 <p class="priceTextdetail">${price}</p>
//             </div>
//         </div>
//     `;
//     out.innerHTML = newDiv;
//     status.innerHTML = "";
// }

const outElement = document.getElementById("containerdetail");

let params = new URL(document.location).searchParams;
let id = params.get("id");

async function getCard() {
    try {
        let params = new URL(document.location).searchParams;
        let id = params.get("id");
        const api = `https://v2.api.noroff.dev/rainy-days/${id}`;
        const response = await fetch(api);
        const data = await response.json();

        listFullCard(data.item, outElement);
    }
    catch(error) {
        outElement.innerHTML = `I don't want to fetch data...`;
    }
}

getCard();

function listFullCard(item, out){
    console.log(item)
    let code = ` 
    <div id="${item.id}">
        <img src="${item.image.url}" alt="${item.description}">
        <div class="cardText">
            <p class="categoryText">${item.gender}</p>
            <h2 class="brandText">${item.title}</h2>
            <p class="priceText">${item.price}</p>
        </div>
    </div>
  `;
  out.innerHTML = code;
}

function getId(id) {
    let div = "<div>";
    for (const location in id) {
        div += `<a href="jackets-details.html?id=${item.id}">`
    }
    div += "</div>";
    return div;
}