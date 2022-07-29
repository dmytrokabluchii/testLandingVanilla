window.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById("header_testing"),
  anchors = document.querySelectorAll(".header__logo_symbol, .nav__menu_link"),
  burgerButton = document.querySelectorAll(".hamburger"),
  burgerToggle = document.querySelectorAll(".hamburger, .mobile_menu_wrap"),
  burgerLinks = document.querySelectorAll(".sidemenu ul li a, .mobile__logo_symbol"),
  modalWindow = document.querySelector('.modal__window'),
  overlay = document.querySelector('.overlay'),
  btnModalOpen = document.querySelectorAll('[data-modal]'),
  btnModalClose = document.querySelector('.modal__close_btn');

  // fix header
  function fixHeader() {
    // When the user scrolls the page, execute myFunction
    window.onscroll = function() {
      functionFixHeader();
    };
    // Get the offset position of the fix header
    function functionFixHeader() {
      if (window.pageYOffset > 0) {
        header.classList.add("fixed_header");
      } else {
        header.classList.remove("fixed_header");
      }
    } 
  }
  fixHeader();

  // Smooth Scroll
  function smoothScroll() {
      for (let i of anchors) {
        i.addEventListener('click', (e) => {
          e.preventDefault();
          const blockID = i.getAttribute('href');
          // метод «scrollIntoView» позиц-т прокрутку так, чтобы элемент оказался 
          // в видимой области браузера. Метод принимает 2 параметра:
          // behavior — определяет тип анимации — auto или smooth;
          // block — в какое место эл-та перем-ся — start, center, end или nearest;
          document.querySelector(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        });
      }
  }
  smoothScroll();

  // Hamburger-menu
  // $(".hamburger, .page_overlay").on('click', function () {
  //   $(".mobile_menu_wrap .hamburger").toggleClass("is-active");
  //   $("body").toggleClass("open");
  // });
  // // close burger
  // $(".sidemenu ul li a, .mobile__logo_symbol").on('click', function () {
  //     $("body").removeClass("open");
  // });

  function burgerMenu() {
      burgerButton.forEach(btn => {
        btn.addEventListener("click", () => {
          btn.classList.toggle("is-active");
          document.body.classList.toggle('open');
        });
      });
      // close burger
      burgerLinks.forEach(closeBtn => {
        closeBtn.addEventListener("click", () => {
          document.body.classList.remove('open');
        });
      });
  }
  burgerMenu();

  // init Swiper:
  function startSwiper() {
    const swiper = new Swiper('.swiper', {
      grabCursor: true,
      autoHeight: true,
      rewind: true,
      spaceBetween: 20,
      // откл. свайп при нажатии на кнопку в слайдере
      watchSlidesProgress: true,
      breakpoints: {
        // when window width is >= 768px
        390: {
          slidesPerView: 1,
          spaceBetween: 15
        },
        490: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
      },  
        // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        // nextEl: '.custom-next',
        // prevEl: '.custom-prev',
      },
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
      // autoplay: {
      //   delay: 5000,
      // },
    });
  }
  startSwiper();

  // Modal-window
  function openModal() {
    // скрываем и показыв-м наше мод. окно
    modalWindow.classList.toggle('active');
    overlay.classList.add('active');
    // modalWindow.classList.add('show-modal');
    // modalWindow.classList.remove('hide-modal');
    // когда мы откр-м модал. окно у нас добав-ся стиль не позвол-й прокручивать стр-цу
    document.body.style.overflow = 'hidden';
  }
  // переберем наши кнопки btnModalOpen чтобы мы могли с любой кнопки откр-ть модал.окно
  btnModalOpen.forEach(btn => {
      btn.addEventListener('click', openModal);
  });
  function closeModal() {
    modalWindow.classList.toggle('active');
    overlay.classList.remove('active');
    // modalWindow.classList.add('hide-modal');
    // modalWindow.classList.remove('show-modal');
    // восстанав-м скролл на стр-це после закрытия, если остав-м '' то браузер сам решит что ставить по дефолту
    document.body.style.overflow = '';
  }
  // только после сраб-я клика у нас выпол-ся фун-я closeModal
  btnModalClose.addEventListener('click', closeModal);
  // реал.функ-л закрытия модал. окна по клику вне мод. окна (not working!)
  modalWindow.addEventListener('click', (e) => {
    // e.target - куда кликнул польз-ль
    if(e.target === modalWindow) {
        closeModal();
    }
  });
  // закрытия модал. окна по ESС. Cобытие keydown срабатывает, когда клавиша была нажата
    document.addEventListener('keydown', (e) => {
      // у нашего объекта событие (e) есть св-во .code, кот-е может отслеж-ть код нашей клавиши
      // Метод Node.contains() возвращает Boolean, проверяет, находится ли элемент ('show') в теле страницы.
      if (e.code === 'Escape' && modalWindow.classList.contains('active')) {
          closeModal();
      }
  });


});

// Tabs
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();
  function getTabs(evt, partnersName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("partners__tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(partnersName).style.display = "block";
    evt.currentTarget.className += " active";
}
