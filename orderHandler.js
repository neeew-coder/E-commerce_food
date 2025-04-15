document.addEventListener('DOMContentLoaded', function () {
    // Function to get the current logged-in user
    function getCurrentUser() {
        return localStorage.getItem('currentUser'); 
    }

    // Function to add item to order
    function addItemToOrder(itemName, itemPrice, itemImage) {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            alert('Please log in to place an order.');
            return;
        }

        let orders = JSON.parse(localStorage.getItem(`${currentUser}_orders`)) || [];
        orders.push({ name: itemName, price: itemPrice, image: itemImage });
        localStorage.setItem(`${currentUser}_orders`, JSON.stringify(orders));
    }

    // Function to update total price with 10% off for the first purchase
    function updateTotalPrice() {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            document.getElementById('total-price').innerText = `Total Price: P 0.00`;
            return;
        }

        const orders = JSON.parse(localStorage.getItem(`${currentUser}_orders`)) || [];
        const selectedItems = document.querySelectorAll('#order-list li.selected');
        let totalPrice = 0;

        // Calculate total price only for selected items
        selectedItems.forEach(item => {
            const priceText = item.querySelector('span').innerText.split(' - ')[1];
            const price = parseFloat(priceText.replace('P ', ''));
            totalPrice += price;
        });

        // Check if it's the first purchase for the current user
        const isFirstPurchase = localStorage.getItem(`${currentUser}_firstPurchase`) === null;
        if (isFirstPurchase && selectedItems.length > 0) {
            totalPrice *= 0.9; // Apply 10% discount
            localStorage.setItem(`${currentUser}_firstPurchase`, 'false');
            alert('10% off applied for your first purchase!');
        }

        document.getElementById('total-price').innerText = `Total Price: P ${totalPrice.toFixed(2)}`;
    }

    // Function to load and display orders
    function loadOrders() {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            alert('Please log in to view your orders.');
            return;
        }

        const orders = JSON.parse(localStorage.getItem(`${currentUser}_orders`)) || [];
        const orderList = document.getElementById('order-list');
        orderList.innerHTML = '';

        orders.forEach(order => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${order.image}" alt="${order.name}">
                <span>${order.name} - ${order.price}</span>
            `;
            li.addEventListener('click', function () {
                li.classList.toggle('selected');
                updateTotalPrice();
            });
            orderList.appendChild(li);
        });

        updateTotalPrice();
    }

    // Add event listeners to order buttons
    document.querySelectorAll('.order-btn').forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const item = this.closest('.menu-item');
            const itemName = item.querySelector('h3').innerText;
            const itemPrice = item.querySelector('p').innerText;
            const itemImage = item.querySelector('img').src;
            addItemToOrder(itemName, itemPrice, itemImage);
            loadOrders();
        });
    });

    // Event listener for clearing selected items
    document.getElementById('clear-order').addEventListener('click', function () {
        const currentUser = getCurrentUser();
        if (!currentUser) return;

        localStorage.removeItem(`${currentUser}_orders`); 
        loadOrders();
    });

    // Event listener for buying selected items
    document.getElementById('buy-button').addEventListener('click', function () {
        const currentUser = getCurrentUser();
        if (!currentUser) return;

        const orders = JSON.parse(localStorage.getItem(`${currentUser}_orders`)) || [];
        if (orders.length > 0) {
            alert('Purchase successful!');
            localStorage.removeItem(`${currentUser}_orders`);
            loadOrders(); 
        } else {
            alert('No items to buy.');
        }
    });

    // Load orders on page load
    if (document.getElementById('order-list')) {
        loadOrders();
    }
});