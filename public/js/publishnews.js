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
  try {
    const res = await fetch('http://127.0.0.1:3100/api/publish/createnewnews', {
      method: 'POST',
      body: form,
    });

    const data = await res.json();

    if (res.ok && data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/api/news/getallnews');
      }, 1000);
    } else {
      console.log('error', data.message);
    }
  } catch (err) {
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
