/*==================================================

** スマホメニュー
==================================================*/
(function () {
  const body = document.querySelector('body');
  const menuBtn = document.querySelector('#menu-btn');
  const gnav = document.querySelector('#gnav');
  const items = document.querySelectorAll('#gnav a');
  const classToAssign = 'is-open-gnav';

  function manipulateGnav(e) {
    e.stopPropagation();
    gnav.style.transition = '';

    if (body.classList.contains(classToAssign)) {
      body.classList.remove(classToAssign);
    } else {
      body.classList.add(classToAssign);
    }
  }

  function closeGnav() {
    gnav.style.transition = 'none';
    body.classList.remove(classToAssign);
  }

  function fetchWindowWidth() {
    if(window.innerWidth > 1024) {
      closeGnav();
    }
  }

  menuBtn.addEventListener('click', manipulateGnav);
  window.addEventListener('resize', fetchWindowWidth);
  items.forEach(item => item.addEventListener('click', closeGnav));
})();