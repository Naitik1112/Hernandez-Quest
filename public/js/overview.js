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

// window.addEventListener('load', adjustSliderWidth1);

// window.addEventListener('resize', adjustSliderWidth1);

function adjustSliderWidth() {
  const slider = document.querySelector('.slider-wrapper_1');
  if (slider) {
    const newWidth = window.innerWidth - 200;
    slider.style.maxWidth = `${newWidth}px`;
  }
}

// window.addEventListener('load', adjustSliderWidth);

// window.addEventListener('resize', adjustSliderWidth);



const swiper_2 = new Swiper('.slider-wrapper_3', {

  loop: true,
  grabCursor:true,
  spaceBetween:30,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable:true,
    dynamicBullets:true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
      0: {
          slidesPerView:1
      },
      568: {
          slidesPerView:2
      },
      924: {
          slidesPerView:3
      },
      1024: {
          slidesPerView:4
      },
      1224: {
          slidesPerView:4
      }
  }


});  

function adjustSliderWidth2() {
  const slider = document.querySelector('.slider-wrapper_3');
  if (slider) {
      const newWidth = window.innerWidth - 200;
      slider.style.maxWidth = `${newWidth}px`;
  }
}

// window.addEventListener('load', adjustSliderWidth2);

// window.addEventListener('resize', adjustSliderWidth2);  