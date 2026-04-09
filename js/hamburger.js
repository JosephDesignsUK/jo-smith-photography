// Select the elements
const menuBtn = document.querySelector('.hamburger-menu-btn');
const closeBtn = document.querySelector('.close-btn');
const menu = document.querySelector('.hamburger-menu');

// Open menu
menuBtn.addEventListener('click', () => {
    menu.classList.add('active');
});

// Close menu
closeBtn.addEventListener('click', () => {
    menu.classList.remove('active');
});