const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');
const submit = document.querySelector('.Submit');
const submitfornews = document.querySelector('.Submitnews');
let user;

user = document.querySelector('.container').getAttribute('USER');

document.addEventListener('DOMContentLoaded', function (e) {
  e.preventDefault();

  fileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === 'image/png' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg')
    ) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imagePreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file (PNG, JPG, JPEG).');
    }
  });
});

if (user === 'Admin') {
  const createnewcriminal = async (form) => {
    try {
      const res = await fetch(
        '/api/publish/createnewwanted',
        {
          method: 'POST',
          body: form,
        }
      );

      const data = await res.json();

      if (res.ok && data.status === 'success') {
        window.setTimeout(() => {
          location.assign('/api/wanted/getallwanted');
        }, 1000);
      } else {
        console.log('error', data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  submit.addEventListener('click', (e) => {
    e.preventDefault();

    const form = new FormData();

    let gender;
    const name = document.getElementById('name').value;
    const noOfCrimes = document.getElementById('crimes').value;
    const photo = document.getElementById('fileInput').files[0];
    const pricepool = document.getElementById('pricepool').value;
    const height = document.getElementById('height').value;
    const description = document.getElementById('description').value;
    let ele = document.getElementsByName('gender');
    for (i = 0; i < ele.length; i++) {
      if (ele[i].checked) gender = ele[i].value;
    }

    form.append('name', name);
    form.append('pricepool', pricepool);
    form.append('height', height);
    form.append('gender', gender);
    form.append('noOfCrimes', noOfCrimes);
    form.append('description', description);
    form.append('photo', photo);

    createnewcriminal(form);
  });
}
