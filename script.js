document.getElementById('menu-icon').addEventListener('click', function() {
    var navMenu = document.getElementById('nav-menu');
    var rightContent = document.getElementById('right-content');
    var toggleButton = document.getElementById('toggle-button');
    navMenu.classList.toggle('show');
    rightContent.style.display = 'none';
    toggleButton.style.display = 'block';
});

document.getElementById('toggle-button').addEventListener('click', function() {
    var navMenu = document.getElementById('nav-menu');
    var rightContent = document.getElementById('right-content');
    var toggleButton = document.getElementById('toggle-button');
    navMenu.classList.toggle('show');
    rightContent.style.display = 'flex';
    toggleButton.style.display = 'none';
});

document.querySelector('.menu-section').addEventListener('click', function() {
    var menuList = document.getElementById('menu-list');
    menuList.classList.toggle('show');
});

document.querySelectorAll('.order-btn').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const item = this.closest('.menu-item');
        const itemName = item.querySelector('h3').innerText;
        const itemPrice = item.querySelector('p').innerText;
        const itemImage = item.querySelector('img').src;

        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push({ name: itemName, price: itemPrice, image: itemImage });
        localStorage.setItem('orders', JSON.stringify(orders));
    });
});