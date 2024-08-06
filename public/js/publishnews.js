const title = document.getElementsByClassName('title')[0];
const description = document.getElementsByClassName('description')[0];
let flag = false;

function change() {
  document.getElementsByClassName('popup')[0].classList.add('active');
  for (
    let i = 0;
    i < document.getElementsByClassName('container').length;
    i++
  ) {
    document.getElementsByClassName('container')[i].classList.add('blur');
  }
  document.body.classList.add('no-scroll');
}

function customizePopup(message, descriptionn) {
  if (message === 'success') {
    const popup = document.getElementsByClassName('popup')[0];
    popup.style.boxShadow = `2px 2px 30px 10px '#078907'`;

    const icon = document.querySelector('.popup .icon');
    icon.style.borderColor = '#078907';

    const iconElement = icon.querySelector('i');
    iconElement.className = 'fa fa-check';
    iconElement.style.color = '#078907';

    const title = document.querySelector('.popup .title');
    title.textContent = 'Success';

    const description = document.querySelector('.popup .description');
    description.textContent = descriptionn;
  } else if (message === 'error') {
    const popup = document.getElementsByClassName('popup')[0];
    popup.style.boxShadow = `2px 2px 30px 10px #FF5733`;

    const icon = document.querySelector('.popup .icon');
    icon.style.borderColor = '#FF5733';

    const iconElement = icon.querySelector('i');
    iconElement.className = 'fa fa-times';
    iconElement.style.color = '#FF5733';

    const title = document.querySelector('.popup .title');
    title.textContent = 'Wasted!!';

    const description = document.querySelector('.popup .description');
    description.textContent = descriptionn;
  }
}

document
  .getElementById('dismiss-popup-btn')
  .addEventListener('click', function () {
    if (flag) {
      window.setTimeout(() => {
        location.assign('/api/career/getalljobs');
      }, 200);
    } else {
      window.setTimeout(() => {
        location.assign('');
      }, 200);
    }
    document.body.classList.remove('no-scroll');
  });

const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');
const submitfornews = document.querySelector('.Submitnews');

userr = document.querySelector('.containern').getAttribute('User');

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

const createnewNews = async (form) => {
  change();
  try {
    const res = await fetch('/api/publish/createnewnews', {
      method: 'POST',
      body: form,
    });

    const data = await res.json();

    if (res.ok && data.status === 'success') {
      customizePopup('success', 'News Added!!');
      window.setTimeout(() => {
        location.assign('/api/news/getallnews');
      }, 1000);
    } else {
      customizePopup('error', data.message);
      console.log('error', data.message);
    }
  } catch (err) {
    customizePopup('Something went wrong!!');
    console.log(err);
  }
};

submitfornews.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('pressed...');

  const form = new FormData();

  const headline = document.getElementById('headline').value;
  const photo = document.getElementById('fileInput').files[0];
  const description = document.getElementById('description').value;

  form.append('headline', headline);
  form.append('description', description);
  form.append('photo', photo);

  createnewNews(form);
});
