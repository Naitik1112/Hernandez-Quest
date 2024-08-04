var TrandingSlider = new Swiper('.tranding-slider', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});


// Function to simulate a click on the specified element
function clickIcon() {
  console.log("clicked")
  var icon = document.querySelector('.swiper-button-next.slider-arrow');
  if (icon) {
      icon.click();
  } else {
      console.error('Element not found');
  }
}

// Set an interval to click the icon every 10 seconds (10000 milliseconds)
setInterval(clickIcon, 2000);
