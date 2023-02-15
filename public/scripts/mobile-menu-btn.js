const btn = document.getElementById('mob-menu-btn');

btn.addEventListener('click', () => {
  btn.classList.toggle('animated');
  btn.classList.toggle('not-animated');
});

