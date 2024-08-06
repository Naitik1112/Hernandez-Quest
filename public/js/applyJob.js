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

const btnsubmit = document.getElementById('Submit');
const ID = document.querySelector('.container').getAttribute('ID');

const applyforjob = async (
  name,
  email,
  education,
  experience,
  user_id,
  job_slug
) => {
  change();
  try {
    const res = await fetch('/api/career/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        education,
        experience,
        user_id,
        job_slug,
      }),
    });

    const data = await res.json();

    if (res.ok && data.status === 'success') {
      customizePopup(
        'success',
        'Thank you for applying. You can chech your response in Profile.'
      );
      flag = true;
    } else {
      console.log(data.message);
      customizePopup('error', `${data.message}`);
    }
  } catch (err) {
    customizePopup('error', `Something went wrong!! Try again later.`);
  }
};

btnsubmit.addEventListener('click', async (e) => {
  e.preventDefault();
  console.log('button pressed...');
  console.log(window.location.pathname);
  const path = window.location.pathname;
  const pathSegments = path.split('/');
  const idIndex = pathSegments.indexOf('applyform') - 1; // Assuming 'applyjob' is in the URL
  const job_slug = pathSegments[idIndex];

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const education = document.getElementById('education').value;
  const experience = document.getElementById('experience').value;
  const user_id = ID;
  applyforjob(name, email, education, experience, user_id, job_slug);
});
