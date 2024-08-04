// window.onload = function () {
//   // Get the heights of the content sections
//   const content1Height = document.querySelector('.content_1').offsetHeight;
//   const content2Height = document.querySelector('.content_2').offsetHeight;

//   // Set the image height
//   document.querySelector('.box1').style.height =
//     content1Height + content2Height + 20 + 'px';
// };
document.addEventListener('DOMContentLoaded', function () {
  // Get the width and height of the screen
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Log the width and height to the console
  console.log('Screen width: ' + screenWidth + 'px');
  console.log('Screen height: ' + screenHeight + 'px');
});
document.getElementById('btnback').addEventListener('click', (e) => {
  e.preventDefault();
  window.history.back();
});
