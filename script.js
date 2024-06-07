class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

class Cashier {
    constructor() {
        this.cart = [];
    }

    addItem(item) {
        this.cart.push(item);
        alert(`${item.name} ditambahkan ke keranjang dengan harga Rp ${item.price}.`);
    }

    totalPrice() {
        return this.cart.reduce((total, item) => total + item.price, 0);
    }

    checkout(payment) {
        const total = this.totalPrice();
        if (payment >= total) {
            const change = payment - total;
            this.cart = [];
            return `Pembayaran berhasil. Kembalian Anda: Rp ${change.toFixed(2)}`;
        } else {
            return "Pembayaran gagal. Uang Anda tidak cukup.";
        }
    }
}

const cashier = new Cashier();

const drinks = [
    "Hoola Drinks - Chocolate", "Hoola Drinks - Strawberry", "Hoola Drinks - Matcha",
    "Hoola Drinks - Tiramisu", "Hoola Drinks - Red Velvet", "Hoola Drinks - Blueberry",
    "Hoola Drinks - Avocado", "Hoola Drinks - Capuccino", "Hoola Drinks - Oreo",
    "Hoola Drinks - Hazelnut", "Hoola Drinks - Lyche", "Hoola Drinks - Orange",
    "Hoola Drinks - Mango", "Hoola Drinks - Melon"
];

const foods = {
    "Dimsum 3 pcs": 10000,
    "Dimsum 5 pcs": 15000,
    "Mie Instan": 7000,
    "Fried Chicken Wings": 8000,
    "Fried Chicken Breast": 11000,
    "Fried Chicken Drumstick": 8000,
    "Fried Chicken Thigh": 11000,
    "Rice": 4000
};

document.addEventListener('DOMContentLoaded', () => {
    const drinksList = document.getElementById('drinks-list');
    drinks.forEach((drink, index) => {
        const li = document.createElement('li');
        li.textContent = `${drink} - Rp 5000`;
        li.onclick = () => cashier.addItem(new Item(drink, 5000));
        drinksList.appendChild(li);
    });

    const foodsList = document.getElementById('foods-list');
    Object.entries(foods).forEach(([food, price], index) => {
        const li = document.createElement('li');
        li.textContent = `${food} - Rp ${price}`;
        li.onclick = () => cashier.addItem(new Item(food, price));
        foodsList.appendChild(li);
    });
});

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
    if (sectionId === 'checkout') {
        document.getElementById('total-checkout-price').textContent = `Total: Rp ${cashier.totalPrice().toFixed(2)}`;
    }
}

function hideSection(sectionId) {
    document.getElementById(sectionId).style.display = 'none';
}

function showTotal() {
    document.getElementById('total-price').textContent = `Rp ${cashier.totalPrice().toFixed(2)}`;
    showSection('total');
}

function processPayment() {
    const payment = parseFloat(document.getElementById('payment').value);
    const result = cashier.checkout(payment);
    document.getElementById('checkout-result').textContent = result;
}
