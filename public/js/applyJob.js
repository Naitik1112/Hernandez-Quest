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
      description.innerHTML = `Thank you for applying. You can chech your response in Profile.`;
      flag = true;
    } else {
      title.innerHTML = `Error`;
      description.innerHTML = `${data.message}`;
      console.log(data.message);
    }
  } catch (err) {
    console.log('Error', err);
    title.innerHTML = `Error`;
    description.innerHTML = `Something went wrong!! Try again later.`;
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
