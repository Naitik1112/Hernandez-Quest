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

const genderGroup = document.querySelector('.gender-group');

// Click inside the gender-group
genderGroup.addEventListener('click', function (event) {
  event.stopPropagation(); // Prevent the click from propagating to the document
  this.classList.add('clicked');
});

// Click outside the gender-group
document.addEventListener('click', function () {
  genderGroup.classList.remove('clicked');
});

const createnewJobs = async (form) => {
  try {
    const res = await fetch('http://127.0.0.1:3100/api/publish/createnewjob', {
      method: 'POST',
      body: form,
    });

    const data = await res.json();

    if (res.ok && data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/api/career/getalljobs');
      }, 1000);
    } else {
      console.log('error', data.message);
    }
  } catch (err) {
    console.log(err);
  }
};

document.getElementById('Submit').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('working...');
  const form = new FormData();

  let gender;
  const title = document.getElementById('title').value;
  const photo = document.getElementById('fileInput').files[0];
  const description = document.getElementById('description').value;
  const department = document.getElementById('department').value;
  const education = document.getElementById('education').value;
  const experience = document.getElementById('experience').value;
  const salary = document.getElementById('salary').value;

  const benifits = document.getElementById('benifits').value;
  const benifitsvalues = benifits.split(',').map((value) => value.trim());

  const skills = document.getElementById('skills').value;
  const skillsvalues = skills.split(',').map((value) => value.trim());

  const procedure = document.getElementById('procedure').value;
  const procedurevalues = procedure.split(',').map((value) => value.trim());

  const other = document.getElementById('other').value;
  const othervalues = other.split(',').map((value) => value.trim());

  let ele = document.getElementsByName('gender');
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) gender = ele[i].value;
  }

  form.append('title', title);
  form.append('description', description);
  form.append('department', department);
  form.append('education', education);
  form.append('experience', experience);
  form.append('photo', photo);
  form.append('salary', salary);
  form.append('benifits', benifitsvalues);
  form.append('skills', skillsvalues);
  form.append('application_process', procedurevalues);
  form.append('otherreq', othervalues);

  createnewJobs(form);
});
