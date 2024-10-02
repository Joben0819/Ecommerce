const list = document.getElementById('items');
const purchase = document.getElementById('list');
const purchase2 = document.getElementById('listed');
const next = document.getElementById('btn');
const bag = document.getElementById('bag');
const value = JSON.parse(sessionStorage.getItem('data')) ?? [];
const data = [
    {
        img: './assets/img/bought/Festive.svg', text: "Festive Looks Rust Red Ribbed Velvet Long Sleeve Bodysuit", price: "$38", decrease: "", quantity: 1, id: "festive"
    },
    {
        img: './assets/img/bought/Chevron.svg', text: "Chevron Flap Crossbody Bag", price: "$5.77", decrease: './assets/img/bought/7.34.svg', quantity: 1, id: "chevron"
    },
    {
        img: './assets/img/bought/Manila.svg', text: "Manilla Tan Multi Plaid Oversized Fringe Scarf", price: "$29", decrease: './assets/img/bought/39.svg', quantity: 1, id: "manila"
    },
    {
        img: './assets/img/bought/Diamante.svg', text: "Diamante Puff Sleeve Dress - Black", price: "$45.99", decrease: "", quantity: 1, id: "diamante"
    },
    {
        img: './assets/img/bought/Bannete.svg', text: "Banneth Open Front Formal Dress in Black", price: "$69", decrease: './assets/img/bought/99.95.svg', quantity: 1, id: "banette"
    },
];

// Display initial product list
data.forEach((item, i) => {
    const product = `
        <div class="cards">
            <img src='${item.img}'>
            <p class="desc">${item.text}</p>
            <div class="pricetag">
                <p class="price" style='color: ${!item.decrease ? 'black' : 'red'}'>${item.price}</p>
                <img class="decrease" src='${item.decrease}'>
                <button type="button" class="btn btn-dark" onclick="Add(${i})">Buy</button>
            </div>
        </div>`;
    list.innerHTML += product;
});

// Load purchase list from sessionStorage
function reloadPurchaseList() {
    const value = JSON.parse(sessionStorage.getItem('data')) ?? [];
    purchase.innerHTML = value.map(res =>
        `
        <div class="cards" id='${res.id}' onmouseover="hoverEffect('${res.id}')" onmouseout="removeHoverEffect('${res.id}')">
            <img src='${res.img}'>
            <div class="details">
                <p class="desc">${res.text}</p>
                <p>${res.quantity}</p>
                <div class="pricetag">
                    <p class="price">${res.price}</p>
                    <img class="decrease" src='${res.decrease}'>
                </div>
            </div>
        </div>
        `
    ).join('');
}

// Update hover effect dynamically
function hoverEffect(id) {
    document.getElementById(id).style.backgroundColor = "#f0f0f0"; // Example hover style
}

function removeHoverEffect(id) {
    document.getElementById(id).style.backgroundColor = ""; // Revert hover effect
}

next.addEventListener('click', () => {
    window.location.href = 'purchase.html';
});

bag.addEventListener('click', () => {
    window.location.href = 'purchase.html';
});

// Add product to the purchase list and update sessionStorage
function Add(num) {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    const session = JSON.parse(sessionStorage.getItem('data')) ?? [];
    const edit = session.filter(res => res.id !== data[num].id);
    const addition = session.filter(res => res.id === data[num].id).map(res => {
        if (res.quantity) {
            return { ...res, quantity: res.quantity + 1 };
        }
    });
    const condition = addition.length !== 0 ? addition : [data[num]];
    const array = [...edit, ...condition];

    sessionStorage.setItem('data', JSON.stringify(array));
    console.log(array, num);

    // Update the purchase list display and apply hover effect
    reloadPurchaseList();

    // Flash effect for newly added item
    purchase2.style.display = 'block';
    setTimeout(() => {
        purchase2.style.display = '';
    }, 3000);
}

// Initial load of purchase list
reloadPurchaseList();
