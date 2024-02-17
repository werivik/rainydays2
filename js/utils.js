export function createCard(item) {
    const outElement = document.getElementById("container");
    let newDivs = "";
    console.log(item);
    for (let card of item) { 
        newDivs +=
        `<div class="card">
            <a href="jackets-details.html?id=${item.id}">
                <img src="${item.image.url}" alt="${item.description}">
                <div class="cardText">
                    <p class="categoryText">${item.gender}</p>
                    <h2 class="brandText">${item.title}</h2>
                    <p class="priceText">${item.price}</p>
                </div>
            </a>
        </div>`;
    } 

    outElement.innerHTML = newDivs;
}