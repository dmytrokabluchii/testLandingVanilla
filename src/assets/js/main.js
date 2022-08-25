window.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById("header_testing"),
  anchors = document.querySelectorAll(".header__logo_symbol, .nav__menu_link"),
  burgerButton = document.querySelector(".hamburger__menu"),
  mobileMenu = document.querySelector(".mobile__menu"),
  burgerLinks = document.querySelectorAll(".sidemenu ul li a, .mobile__logo_symbol"),
  modalWindow = document.querySelector('.modal__window'),
  modalField = document.querySelector('.modal__field'),
  overlay = document.querySelector('.overlay'),
  btnModalOpen = document.querySelectorAll('[data-modal]'),
  btnModalClose = document.querySelector('.modal__close_btn'),
  contactForm = document.querySelectorAll('.contact__form');

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
  function burgerMenu(btn, menu, links) {
    btn.addEventListener('click', function(){
      btn.classList.toggle('active');
      menu.classList.toggle('active');
      document.body.classList.toggle('open');
      // добав-м стиль не позвол-й прокручивать стр-цу
      document.body.classList.toggle('overflow');
    });
    // Закрыти бургер-меню при нажатии на ссылку
    links.forEach(closeBtn => {
      closeBtn.addEventListener("click", () => {
        btn.classList.remove('active');
        menu.classList.remove('active');
        document.body.classList.remove('open');
        document.body.classList.remove('overflow');
      });
    });
  }
  burgerMenu(burgerButton, mobileMenu, burgerLinks);

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
    // восстанав-м скролл на стр-це после закрытия, если остав-м '' то браузер сам решит что ставить по дефолту
    document.body.style.overflow = '';
  }
  // реал.функ-л закрытия модал. окна по клику вне мод. окна и на "крестик"
  modalField.addEventListener('click', (e) => {
    // e.target - куда кликнул польз-ль
    if(e.target === modalField || e.target.getAttribute('data-close') == '') {
        closeModal();
    }
  });
  // закрытия модал. окна по ESС. Cобытие keydown срабатывает, когда клавиша была нажата
    document.addEventListener('keydown', (e) => {
      // у нашего объекта событие (e) есть св-во .code, кот-е может отслеж-ть код нашей клавиши
      // Метод Node.contains() возвращает Boolean, проверяет, находится ли элемент ('active') в теле страницы.
      if (e.code === 'Escape' && modalWindow.classList.contains('active')) {
          closeModal();
      }
  });


  // send form to my Telegram BOT and Validate
  const nameInput = document.getElementById('form_name'),
        emailInput = document.getElementById('form_email'),
        phoneInput = document.getElementById('form_phone'),
        typeJobs = document.getElementById('form_type_jobs'),
        messageInput = document.getElementById('form_message'),
        BOT_TOKEN = '5324396066:AAFDhE5HZ4_mI54HC4OmzWCfjxawduNh8S8',
        CHAT_ID = '-1001758890997';

  const message = {
    loading: 'assets/images/svg/spinner.svg',
    failureName: 'Write you name',
    failurePhone: 'Write correct your phone number',
    failureEmail: 'Write correct your email address'
  };

  // Цвет-е оформление бордера. Проверка на пустую строку по имени
  function validationFormColor(elem) {
    elem.addEventListener('input', () => {
      if (elem.value !== '') {
        elem.style.borderColor = 'green';
      } else {
        elem.style.borderColor = 'red';
      }
    });
  }
  validationFormColor(nameInput);
  validationFormColor(typeJobs);
  validationFormColor(messageInput);
  
  function showSuccess() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your message send, we are connect with you soon!',
      showConfirmButton: false,
      timer: 5000,
    });
  }
  function showInfoValidate() {
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'Fill all field marked *!',
      showConfirmButton: false,
      timer: 4000
    });
  }
  function showError() {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Server error!',
      showConfirmButton: false,
      timer: 3000
    });
  }
  // Phone-number mask
  function validatePhone() {
    [].forEach.call(document.querySelectorAll('#form_phone'), function(input) {
      let keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        // Element.selectionStart - повертає/задає позицію початку виділення у текстовому полі textarea або input
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+38(___)___-__-__",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          newValue = matrix.replace(/[_\d]/g, function(a) {
              return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
        i = newValue.indexOf("_");
        if (i != -1) {
          i < 5 && (i = 3);
          newValue = newValue.slice(0, i);
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function(a) {
            return "\\d{1," + a.length + "}";
          }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
          this.value = newValue;
        }
        if (event.type == "blur" && this.value.length < 5) {
          this.value = "";
        } 

        // Доработать
        phoneInput.addEventListener('input', onInputPhone); 
        function isPhoneValid(value) {
          return reg.test(value);
        }
        function onInputPhone() {
          if (isPhoneValid(phoneInput.value)) {
            this.style.borderColor = 'green';
          } else {
            this.style.borderColor = 'red';
          }
        }

      }
      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);
    });
  }
  validatePhone();
  
  // Validate EMAIL
  function validateEmail(email) {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    function onInputEmail() {
      if (isEmailValid(email.value)) {
        email.style.borderColor = 'green';
      } else {
        email.style.borderColor = 'red';
      }
      return;
    }
    email.addEventListener('input', onInputEmail); 
    function isEmailValid(value) {
      return EMAIL_REGEXP.test(value);
    }
    // return EMAIL_REGEXP.test(String(email).toLowerCase());
  }
  validateEmail(emailInput);

  // берем все наши формы и под каждую из них подвяз-м фун-ю postData, она и будет обработ-м события при отправке
  document.querySelectorAll('form').forEach(item => { 
    postData(item); 
  });
  function postData(form) {
    // навеш-м событие 'submit' и оно будет сраб-ть каждый раз когда форма отправ-ся
    form.addEventListener('submit', (e) => {
      // отмен-м станд-е поведение браузера(у нас это перез-ка при отправке данных)
      e.preventDefault();
      let text = encodeURI(`Name: ${nameInput.value};\nEmail: ${emailInput.value};\nPhone: ${phoneInput.value};\nJobs: ${typeJobs.value};\nMessage: ${messageInput.value}`);
      
      // Подгружаем спиннер Доработать!
      // const statusMessage = document.createElement('img');
      // statusMessage.src = message.loading;
      // statusMessage.style.cssText = `
      //     display: block;
      //     margin: 0 auto;
      // `;
      // form.insertAdjacentElement('afterend', statusMessage);

      if (nameInput.value !== '' && emailInput.value !== '' && phoneInput.value !== '') { 
        axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=` + 
        text + '&parse_mode=html') 
        .then( () => {
          // console.log(data.status);
          showSuccess();
        })
        .catch( () => { 
          showError(); 
        })
        .finally( () => {
          // очищаем нашу форму после отправки методом reset()
          form.reset();
        }); 
      } else {
        showInfoValidate();
      }
    });
  }

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




// RegExp.prototype.test()
// Метод test() выполняет поиск сопоставления регулярного выражения указанной строке. Возвращает true или false.

// selectionStart 
// властивість об'єкту Element (елементів textarea і input) яка повертає або задає число що представляє позицію 
// початку виділення. Для отримання кінцевої позиції виділення використовуйте властивість selectionEnd.