
document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello Bulma!');
});

// 旋转木马
(function changeTab() {
  bulmaCarousel.attach('#carousel-web', {
    slidesToScroll: 1,
    slidesToShow: 3,
    infinite: true,
    autoplay: true
  });

  bulmaCarousel.attach('#carousel-mobile', {
    slidesToScroll: 1,
    slidesToShow: 5,
    infinite: true,
    autoplay: true
  });

  bulmaCarousel.attach('#carousel-desktop', {
    slidesToScroll: 1,
    slidesToShow: 3,
    infinite: true,
    autoplay: true
  });

  const arrBulmaCarousel = bulmaCarousel.attach('.carousel');

  var oTab = document.getElementById('tabs');
  var aTabNav = oTab.querySelectorAll('.tabs li');
  var aTabContent = document.querySelectorAll('.tab-content');
  for (var i = 0; i < aTabNav.length; i++) {
    aTabNav[i].onclick = function (i) {
      return function () {
        addActiveClass(aTabNav, i);
        // addActiveClass(aTabContent,i);
        activeElement(aTabContent, i);
      };
    }(i);
  }

  function addActiveClass(obj, index) {
    for (var i = 0; i < obj.length; i++) {
      obj[i].classList.remove('is-active');
    }
    obj[index].classList.add('is-active');
  }
  function activeElement(obj, index) {
    for (var i = 0; i < obj.length; i++) {
      obj[i].style.display = 'none';
    }
    obj[index].style.display = 'block';
    arrBulmaCarousel[index].reset();
  }

  aTabNav[0].click();
})();