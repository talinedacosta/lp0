const menu_button = document.querySelector('.header__mobile-menu-button');
const menu = document.querySelector('.header-menu');

menu_button.addEventListener('click', function (e) {
    menu.classList.toggle('active');
})