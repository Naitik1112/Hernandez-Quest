var acc = document.getElementsByClassName('accordion');
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    // Check if the clicked accordion is already active
    var isActive = this.classList.contains('active_carrer');

    // Remove the active class from all accordion elements
    for (var j = 0; j < acc.length; j++) {
      acc[j].classList.remove('active_carrer');
    }

    // If the clicked accordion is not active, toggle the active class on it
    if (!isActive) {
      this.classList.toggle('active_carrer');
    }

    // Close all panels
    var allPanels = document.querySelectorAll('.accordion + div');
    allPanels.forEach((p) => (p.style.maxHeight = null));

    // If the clicked accordion is not active, open its panel
    if (!isActive) {
      var panel = this.nextElementSibling;
      if (panel) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    }
  });
}

document.querySelectorAll('.carrer_links a').forEach((link) => {
  console.log('CLICKED');
  link.addEventListener('click', function (event) {
    event.preventDefault();
    console.log(this.getAttribute('href').substring(1));
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const fileInput = document.getElementById('fileInput');
  const imagePreview = document.getElementById('imagePreview');

  fileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === 'image/png' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/webp')
    ) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imagePreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file (PNG, JPG, JPEG, WEBP).');
    }
  });
});
