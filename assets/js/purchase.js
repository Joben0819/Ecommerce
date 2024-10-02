const inventory = document.getElementById('inventory')
let value = JSON.parse(sessionStorage.getItem('data')) ?? []
var data = [
    {
        img: './assets/img/bought/Festive.svg', text: "Festive Looks Rust Red Ribbed Velvet Long Sleeve Bodysuit", price: "$38" ,decrease:"", quantity: 1 , id: "festive"
    },
    {
        img: './assets/img/bought/Chevron.svg', text: "Chevron Flap Crossbody Bag", price: "$5.77", decrease: './assets/img/bought/7.34.svg', quantity: 1, id: "chevron"
    },
    {
        img: './assets/img/bought/Manila.svg', text: "Manilla Tan Multi Plaid Oversized Fringe Scarf", price: "$29", decrease: './assets/img/bought/39.svg' , quantity: 1, id: "manila"
    },
    {
        img: './assets/img/bought/Diamante.svg', text: "Diamante Puff Sleeve Dress - Black", price: "$45.99", decrease: "", quantity: 1, id: "diamante"
    },
    {
        img: './assets/img/bought/Bannete.svg', text: "Banneth Open Front Formal Dress in Black", price: "$69", decrease: './assets/img/bought/99.95.svg', quantity: 1, id:"banette"
    },

]

function reload() {
    let value = JSON.parse(sessionStorage.getItem('data')) ?? [];
    console.log(value, "data");

    // Using map to generate the entire inventory HTML
    inventory.innerHTML = value.map((res, i) => 
        `
        <div class="product" id="product">
            <div class="content">
                <img src="${res.img}" alt="">
                <div class="context">
                    <p>Description: ${res.text}</p>
                    <p>Quantity: ${res.quantity}</p>
                    <p onclick='Delete(${i})'>Remove</p>
                </div>
            </div>
            <div class="price">
                <span>${res.price}</span>
            </div>
        </div>
        `
    ).join(''); // .join('') to convert the array to a single string
}

function Delete(num) {
    let session = JSON.parse(sessionStorage.getItem('data')) ?? [];
    const filter = session.filter((_, indx) => indx !== num);
    sessionStorage.setItem('data', JSON.stringify(filter));
    reload();
}

window.onload = () => {
    reload();
}
