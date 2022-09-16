window.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById("header_testing"),
  anchors = document.querySelectorAll(".header__logo_symbol, .nav__menu_link"),
  burgerButton = document.querySelector(".hamburger__menu"),
  mobileMenu = document.querySelector(".mobile__menu"),
  burgerLinks = document.querySelectorAll(".sidemenu ul li a, .mobile__logo_symbol"),
  modalWindow = document.querySelector('.modal__window'),
  modalField = document.querySelector('.modal__field'),
  overlay = document.querySelector('.overlay'),
  btnModalOpen = document.querySelectorAll('[data-modal]');

  // Preloader page
  function startPreload() {
    window.addEventListener('load', () => {
      document.body.classList.add('loaded_hiding');
      window.setTimeout( () => {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
      }, 500);
    }); 
  }
  startPreload();

  // fix header
  function fixHeader(el) {
    // When the user scrolls the page, execute myFunction
    // .onscroll - Обработчик для события скролла
    window.onscroll = function() {
      functionFixHeader();
    };
    // Get the offset position of the fix header
    function functionFixHeader() {
      if (window.pageYOffset > 0) {
        el.classList.add("fixed_header");
      } else {
        el.classList.remove("fixed_header");
      }
    } 
  }
  fixHeader(header);

  // Smooth Scroll
  function smoothScroll() {
    for (let i of anchors) {
      i.addEventListener('click', (e) => {
        e.preventDefault();
        const blockID = i.getAttribute('href');
        // метод «scrollIntoView» позиц-т прокрутку(под-е в конце кода)
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
      slidesPerView: 3,
      slidesPerGroup: 3,
      // откл. свайп при нажатии на кнопку в слайдере
      watchSlidesProgress: true,
      breakpoints: {
        // when window width is >= 768px
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 15
        },
        490: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        768: {
          slidesPerView: 3,
        },
      },  
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
      // autoplay: {
      //   delay: 5000,
      // },
    });
    document.getElementById('tab-1').addEventListener('click',()=>{
      swiper.slideTo(0, 500);
    });
    document.getElementById('tab-2').addEventListener('click',()=>{
        swiper.slideTo(3, 500);
    });
    document.getElementById('tab-3').addEventListener('click',()=>{
      swiper.slideTo(6, 500);
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
  // закрытия модал. окна по ESС. Cобытие keydown срабатывает, когда клавиша нажата
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
        fileInput =  document.getElementById('input__file'),
        fileInputWrapper = document.querySelector('.contact__upload'),
        BOT_TOKEN = '5324396066:AAFDhE5HZ4_mI54HC4OmzWCfjxawduNh8S8',
        CHAT_ID = '-1001758890997';

  const message = {
    loading: 'assets/images/svg/spinner.svg',
    // failureName: 'Write you name',
    // failurePhone: 'Write correct your phone number',
    // failureEmail: 'Write correct your email address'
  };

  // Function-alert from sweetalert-plugin
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
      title: 'Add file with your SV and fill all fields marked *',
      showConfirmButton: false,
      timer: 5000
    });
  }
  function showError() {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Server error, the message not send!',
      showConfirmButton: false,
      timer: 4000
    });
  }

  // Цвет-е оформление бордера + Проверка на пустую строку
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
      }
      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);
    });
  }
  validatePhone();
  // Add color for border
  phoneInput.addEventListener('input', onInputPhone); 
  function onInputPhone() {
    if (phoneInput.value.length < 17) {
      this.style.borderColor = 'red';
    } else {
      this.style.borderColor = 'green';
    }
  }
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

  const sendForm = document.querySelector('.contact__form');
  const URI_APIDOC = `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`;
  const URI_APIMESSAGE = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  postData(sendForm); 
  function postData(form) {
    // навеш-м событие 'submit' и оно будет сраб-ть каждый раз когда форма отправ-ся
    form.addEventListener('submit', function(e) {
      // отмен-м станд-е поведение браузера(у нас это перез-ка при отправке данных)
      e.preventDefault();
      let text = encodeURI(`testLandingVanilla\n\nName: ${nameInput.value};\nEmail: ${emailInput.value};\nPhone: ${phoneInput.value};\nJobs: ${typeJobs.value};\nMessage: ${messageInput.value}`);
      // Data for Upload CV
      const formData = new FormData();
      formData.append('chat_id', CHAT_ID);
      // yourCV - name input / .files[0] - перший файл массиву, подр. в кінці файлу
      formData.append('document', this.yourCV.files[0]);
      // Подгружаем спиннер
      let statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;
          width: 45px;
          height: 45px;
      `;
      fileInputWrapper.insertAdjacentElement('afterend', statusMessage); 

      if (nameInput.value !== '' && emailInput.value !== '' && phoneInput.value !== '' && 
      phoneInput.value.length > 16 && fileInput.value !== '') { 
        axios.post(`${URI_APIMESSAGE}?chat_id=${CHAT_ID}&text=` + 
        text + '&parse_mode=html') 
          // .then( () => {
          //   // console.log(data.status);
          //   showSuccess();
          //   statusMessage.remove();
          // })
          .catch( () => { 
            showError(); 
            statusMessage.remove();
          })
          .finally( () => {
            // очищаем нашу форму после отправки методом reset()
            form.reset();
          }); 
        } else {
        showInfoValidate();
        statusMessage.remove();
      }
      // send file to telegram
        axios.post(URI_APIDOC, formData, {
          headers: {
          // Нижче ми кажемо що відправляемо файл
          'Content-Type': 'multipart/form-data'
          }
        })
        .then( () => {
          showSuccess();
          statusMessage.remove();
        });
      
    });
  }

});

// Tabs
// Get the element with id="defaultOpen" and click on it
const switchTabs = document.getElementById("defaultOpen");
switchTabs.click();
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

// «scrollIntoView» 
// позиц-т прокрутку так, чтобы элемент оказался в видимой области браузера, принимает 2 параметра:
// behavior — определяет тип анимации — auto или smooth;
// block — в какое место эл-та перем-ся — start, center, end или nearest;

// sendMessage
// Use this method to send text messages. On success, the sent Message is returned.
// https://tlgrm.ru/docs/bots/api#sendmessage

// sendDocument
// Use this method to send general files. On success, the sent Message is returned. Bots can 
// currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
// https://tlgrm.ru/docs/bots/api#senddocument
