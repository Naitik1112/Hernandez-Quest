const title = document.getElementsByClassName('title')[0];
const description = document.getElementsByClassName('description')[0];

function change() {
  document.getElementsByClassName('popup')[0].classList.add('active');
  for (
    let i = 0;
    i < document.getElementsByClassName('application').length;
    i++
  ) {
    document.getElementsByClassName('application')[i].classList.add('blur');
  }
  document.getElementsByClassName('add')[0].classList.add('blur');
  document.getElementsByClassName('News-Ann')[0].classList.add('blur');
}

document
  .getElementById('dismiss-popup-btn')
  .addEventListener('click', function () {
    window.setTimeout(() => {
      location.assign('/api/users/me');
    }, 200);
  });

const tempID = document.querySelector('.application').getAttribute('ID');

document.getElementById('accept').addEventListener('click', async (e) => {
  change();
  try {
    const res = await fetch(`/api/career/acceptrequest/${tempID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    if (res.ok && data.status === 'success') {
      description.innerHTML =
        'Application Accepted Successfully. View all selected application by clicking Accepted.';
    } else {
      title.innerHTML = `Error`;
      description.innerHTML = `${data.message}`;
    }
  } catch (e) {
    title.innerHTML = `Error`;
    description.innerHTML = `Something went wrong!! Try again after sometime.`;
  }
});

// document.getElementById('reject').addEventListener('click', (e) => {
//   e.preventDefault();
//   document.getElementsByClassName('popup')[0].classList.add('active');
//   for (
//     let i = 0;
//     i < document.getElementsByClassName('application').length;
//     i++
//   ) {
//     document.getElementsByClassName('application')[i].classList.add('blur');
//   }
//   document.getElementsByClassName('add')[0].classList.add('blur');
//   document.getElementsByClassName('News-Ann')[0].classList.add('blur');
//   document.getElementsByClassName('description')[0].innerHTML =
//     'Application Rejected Successfully. View all rejected application by clicking Rejected.';
// });
document.getElementById('reject').addEventListener('click', async (e) => {
  change();
  try {
    const res = await fetch(`/api/career/rejectrequest/${tempID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    if (res.ok && data.status === 'success') {
      description.innerHTML =
        'Application Rejected Successfully. View all rejected application by clicking Rejected.';
    } else {
      title.innerHTML = `Error`;
      description.innerHTML = `${data.message}`;
    }
  } catch (e) {
    title.innerHTML = `Error`;
    description.innerHTML = `Something went wrong!! Try again after sometime.`;
  }
});
