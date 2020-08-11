/*==================================================

** スマホメニュー
==================================================*/
(function () {
  const body = document.querySelector("body");
  const menuBtn = document.querySelector("#menu-btn");
  const gnav = document.querySelector("#gnav");
  const items = document.querySelectorAll("#gnav a");
  const classToAssign = "is-open-gnav";

  function manipulateGnav(e) {
    e.stopPropagation();
    gnav.style.transition = "";

    if (body.classList.contains(classToAssign)) {
      body.classList.remove(classToAssign);
    } else {
      body.classList.add(classToAssign);
    }
  }

  function closeGnav() {
    gnav.style.transition = "none";
    body.classList.remove(classToAssign);
  }

  function fetchWindowWidth() {
    if (window.innerWidth > 1024) {
      closeGnav();
    }
  }

  menuBtn.addEventListener("click", manipulateGnav);
  window.addEventListener("resize", fetchWindowWidth);
  items.forEach((item) => item.addEventListener("click", closeGnav));
})();

/*==================================================

** スムーズスクロール
==================================================*/
(function () {
  const aHashes = document.querySelectorAll('a[href^="#"]');
  const header = document.querySelector("#header");
  const duration = 300;
  let headerHeight;

  let Ease = {
    easeInOut: (t) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  };

  function fetchHeaderHeight() {
    headerHeight = header.getBoundingClientRect().height;
    return headerHeight;
  }

  function move(event) {
    const currentY =
      document.documentElement.scrollTop || document.body.scrollTop;
    const targetID = event.target.hash.replace(/#/, "");
    const target = document.getElementById(targetID);

    if (target) {
      event.preventDefault();

      // Colobox inlineHTMLのために削除
      //event.stopPropagation();

      const targetY =
        window.pageYOffset + target.getBoundingClientRect().top - headerHeight;
      const startTime = performance.now();

      const loop = (nowTime) => {
        const time = nowTime - startTime;
        const normalizedTime = time / duration;

        if (normalizedTime < 1) {
          window.scrollTo(
            0,
            currentY + (targetY - currentY) * Ease.easeInOut(normalizedTime)
          );
          requestAnimationFrame(loop);
        } else {
          window.scrollTo(0, targetY);
        }
      };

      requestAnimationFrame(loop);
    }
  }

  window.addEventListener("load", fetchHeaderHeight);
  window.addEventListener("resize", fetchHeaderHeight);
  aHashes.forEach((a) =>
    a.addEventListener("click", { event: a.target, handleEvent: move }, false)
  );
})();

/*==================================================

** Colorbox
==================================================*/
jQuery(function ($) {
  $(".js-colorbox-img").colorbox({
    maxWidth: "80%",
    maxHeight: "80%",
    opacity: 0.7,
    inline: true,
  });
});

// $(function () {
//   $(".inline").colorbox({
//     inline: true,
//     maxWidth: "90%",
//     maxHeight: "90%",
//     opacity: 0.7
//   });
// });