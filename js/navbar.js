// Toggle Burger Menu
const burger = document.querySelector('.burger');
const nav = document.querySelector('nav');

burger.addEventListener('click', () => {
  nav.classList.toggle('active');
  burger.classList.toggle('open');
  burger.innerHTML = burger.classList.contains('open') ? '&#10005;' : '&#9776;';
});
