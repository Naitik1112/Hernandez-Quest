document.addEventListener('DOMContentLoaded', (event) => {
  const cards = document.querySelectorAll('.card');
  const cardItems = document.querySelectorAll('.card-item');

  // Function to assign numbers to cards
  function assignCardNumbers() {
    cardItems.forEach((item, index) => {
      const numberElement = item.querySelector('.number');
      if (numberElement) {
        numberElement.textContent = index + 1;
      }
    });
  }

  // Initial call to assign numbers
  assignCardNumbers();

  const swiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 50,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      568: {
        slidesPerView: 2,
      },
      924: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
      1224: {
        slidesPerView: 5,
      },
    },
  });

  const swiper_1 = new Swiper('.slider-wrapper_1', {
    loop: true,
    grabCursor: true,
    spaceBetween: 50,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1004: {
        slidesPerView: 3,
      },
      1374: {
        slidesPerView: 4,
      },
    },
  });

  swiper.on('slideChange', assignCardNumbers);
  swiper_1.on('slideChange', assignCardNumbers);
});

function adjustSliderWidth1() {
  const slider = document.querySelector('.slider-wrapper');
  if (slider) {
    const newWidth = window.innerWidth - 200;
    console.log(window.innerWidth, newWidth);
    slider.style.maxWidth = `${newWidth}px`;
  }
}

// Adjust the width on page load
window.addEventListener('load', adjustSliderWidth1);

// Adjust the width when the window is resized
window.addEventListener('resize', adjustSliderWidth1);

function adjustSliderWidth() {
  const slider = document.querySelector('.slider-wrapper_1');
  if (slider) {
    const newWidth = window.innerWidth - 200;
    slider.style.maxWidth = `${newWidth}px`;
  }
}

// Adjust the width on page load
window.addEventListener('load', adjustSliderWidth);

// Adjust the width when the window is resized
window.addEventListener('resize', adjustSliderWidth);