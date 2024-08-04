const mainContainer = document.querySelector('.main_container');
const boxes = document.querySelectorAll('.box');
let container = null;

boxes.forEach((box, index) => {
  if (index % 3 === 0) {
    container = document.createElement('div');
    container.classList.add('container');
    mainContainer.appendChild(container);
  }
  container.appendChild(box);
});

document.querySelector('.image').onload = function () {
  // Get the width of the image
  const imgWidth = this.offsetWidth;

  // Set the max-width of the image to its current width
  this.style.maxWidth = imgWidth + 'px';
};

// Iterate over each .box element
boxes.forEach((box) => {
  // Get the image within the current .box
  const img = box.querySelector('.image');

  // Wait for the image to load
  img.onload = function () {
    // Get the width of the image
    const imgWidth = img.offsetWidth;

    // Set the max-width of the image to its current width
    img.style.maxWidth = imgWidth + 'px';
  };
});
